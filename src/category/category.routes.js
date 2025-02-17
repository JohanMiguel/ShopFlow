import { Router } from "express";
import { saveCategory,getCategorys,getCategoryByName, actualizarCategory } from "./category.controller.js";
import { saveCategoryValidator, updateCategoryValidator} from "../middlewares/category-validatos.js";

const router = Router()
router.post("/saveCategory", saveCategoryValidator, saveCategory)
router.get("/", getCategorys)
router.get("/buscarCategory/:name", getCategoryByName);
router.put("/updateCategoria/:uid", updateCategoryValidator, actualizarCategory);
export default router