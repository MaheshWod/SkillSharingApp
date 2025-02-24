


// import JWT from "jsonwebtoken";
// import userModel from "../models/userModel.js";

// //Protected Routes token base
// export const requireSignIn = async (req, res, next) => {
//   try {
//     const decode = JWT.verify(
//       req.headers.authorization,
//       process.env.JWT_SECRET
//     );
//     req.user = decode;
//     next();
//   } catch (error) {
//     console.log(error);
//   }
// };

// //admin acceess
// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     if (user.role !== 1) {
//       return res.status(401).send({
//         success: false,
//         message: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin middelware",
//     });
//   }
// };


import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Route Middleware (Token Based)
export const requireSignIn = async (req, res, next) => {
  try {
      const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
      if (!token) return res.status(401).json({ message: "Token is missing" });

      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
  } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Invalid or expired token" });
  }
};


// Admin Access Middleware
export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(403).json({ success: false, message: "Unauthorized Access" });
    }

    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    return res.status(500).json({ success: false, message: "Server error in admin middleware" });
  }
};
