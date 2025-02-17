import { Router } from "express";
import { saveProduct,getProducts, getProductByName } from "./product.controller.js";
import { createProductValidator } from "../middlewares/product-validator.js";


const router = Router();

router.post("/addProduct", createProductValidator, saveProduct);
router.get("/", getProducts);
router.get("/findProduct/:name", getProductByName);

export default router