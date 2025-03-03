import { Router } from "express";
import { saveProduct,getProducts, getProductByName, updateProduct, deleteProduct} from "./product.controller.js";
import { createProductValidator,updateProductValidator,deleteProductValidator } from "../middlewares/product-validator.js";


const router = Router();

router.post("/addProduct", createProductValidator, saveProduct);
router.get("/", getProducts);
router.get("/findProduct/:name", getProductByName);
router.put("/update/:idProduct",updateProductValidator, updateProduct);
router.delete("/delete/:idProduct",deleteProductValidator, deleteProduct);
export default router