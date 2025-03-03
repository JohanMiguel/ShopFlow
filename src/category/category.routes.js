import { Router } from "express";
import { saveCategory,getCategorys,getCategoryByName, updateCategory } from "./category.controller.js";
import { saveCategoryValidator, updateCategoryValidator} from "../middlewares/category-validatos.js";

const router = Router()
router.post("/saveCategory", saveCategoryValidator, saveCategory)
router.get("/", getCategorys)
router.get("/buscarCategory/:name", getCategoryByName);
router.put("/updateCategoria/:idCategory", updateCategoryValidator, updateCategory);
export default router