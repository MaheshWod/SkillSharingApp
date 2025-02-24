import express from 'express'
import { isAdmin, requireSignIn } from '../middlewares/authMiddlewares.js'
import {
     updateCategoryController,
     createCategoryController,
     categoryControlller,
     singleCategoryController,
     deleteCategoryCOntroller} from '../controllers/createcategoryController.js'

const router = express.Router()

router.post("/create-category",requireSignIn,isAdmin, createCategoryController)

// update category for admin
router.put ("/update-category/:id",requireSignIn,isAdmin
    , updateCategoryController
)

// getting all category
router.get('/get-category',categoryControlller)

// get single category
router.get('/single-category/:slug',singleCategoryController)

// delete category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryCOntroller)

export default router