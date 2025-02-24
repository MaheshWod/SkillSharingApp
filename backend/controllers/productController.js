import categoryModel from "../models/categoryModel.js"
import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";

export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required" });
      case !description:
        return res.status(400).send({ error: "Description is required" });
      case !price:
        return res.status(400).send({ error: "Price is required" });
      case !category:
        return res.status(400).send({ error: "Category is required" });
      case photo && photo.size > 1048576:
        return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    // नयाँ प्रोडक्ट बनाउने
    const product = new productModel({
      name,
      slug: slugify(name),

      description,
      price,
      category,
    });

    // यदि फोटो छ भने
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    // MongoDB मा स्टोर गर्ने
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product",
    });
  }
};



// geeting all the product

export const getProductController = async (req, res) => {
  try {
    const products = await productModel.find({})
      .populate('category')
      .select("name price description category photo")
      .limit(12)
      .sort({ createdAt: -1 });

    // console.log("Fetched Products:", products); // Debugging

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Error Getting product",
      error: err.message,
    });
  }
};
//get all products
// export const getProductController = async (req, res) => {
//   try {
//     const products = await productModel
//       .find({})
//       .populate("category")
//       .select("-photo")
//       .limit(12)
//       .sort({ createdAt: -1 });
//     res.status(200).send({
//       success: true,
//       counTotal: products.length,
//       message: "ALlProducts ",
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Erorr in getting products",
//       error: error.message,
//     });
//   }
// };
// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};





// get productPhotoController
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.
    findById(req.params.pid)
    .select("photo")
    if (product.photo.data) {
      res.set('Content-type', product.photo.contentType)
      res.status(201).send(product.photo.data);
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error photogeting product",
      error: err.message,
    });
  }
}
// export const productPhotoController = async (req, res) => {
//   try {
//       const { pid } = req.params;
//       if (!pid || pid.length !== 24) {
//           return res.status(400).send({
//               success: false,
//               message: "Invalid product ID",
//           });
//       }
//       const product = await productModel.findById(pid).select("photo");
//       if (product?.photo?.data) {
//           res.set('Content-type', product.photo.contentType);
//           return res.status(201).send(product.photo.data);
//       } else {
//           res.status(404).send({
//               success: false,
//               message: "Photo not found",
//           });
//       }
//   } catch (err) {
//       console.error(err);
//       res.status(500).send({
//           success: false,
//           message: "Error getting product photo",
//           error: err.message,
//       });
//   }
// };

// upadating product
export const updateProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, price, description, category } = req.fields;
    const { photo } = req.files;

    // Validate required fields
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    // Find and update product
    const updatedProduct = await productModel.findByIdAndUpdate(
      pid,
      {
        name,
        slug: slugify(name),
        price,
        description,
        category,
      },
      { new: true }
    ).populate("category");

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // If a new photo is provided, update it
    if (photo) {
      if (photo.size > 1048576) {
        return res.status(400).send({ error: "Photo should be less than 1MB" });
      }
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
      await updatedProduct.save();
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error in updateProductController:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// deleting product 
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo")
    res.status(201).send({
      success: true,
      message: "Product deleting successfully",

    });
  }
  catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      error: err.message,
    });
  }
}


// filters
export const productFiltersController = async (req, res) => {
  try {
    const { check } = req.body;
    let args = {};
    if (check.length > 0) args.category = check;
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
};




// searching product controller
export const searchProductController = async (req, res) => {
  try {
    // getting keyword
    const { keyword } = req.params
    const results = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    }).select("")
    res.json(results)

  }
  catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Filtering Products",
      error,
    });
  }
}




// get prdocyst by catgory
export const productCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};