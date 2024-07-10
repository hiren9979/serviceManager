import express from "express";
const router = express.Router();
import  {
addCategoryController,
  deleteCategoryController,
  getAllCategory,
  getCategory,
  updateCategoryController,
} from "../controller/category/categoryController.js";
import { addServiceController, getAllServices, getService, removeServiceController, updateServiceController } from "../controller/service/serviceController.js";
import { userLogin } from "../controller/auth/authController.js";
import { auth } from "../middleware/authMiddleware.js";

router.get("/login", userLogin)
router.post("/category",auth, addCategoryController);
router.put("/category", updateCategoryController);
router.get("/categories",auth, getAllCategory);
router.get("/category", getCategory);
router.delete("/category", deleteCategoryController);
router.post("/category/service", addServiceController)
router.get("/category/services", getAllServices)
router.get("/category/service", getService)
router.delete("/category/service", removeServiceController)
router.put("/category/service", updateServiceController)

export default router;
