import { body} from "express-validator";
import { validarCampos} from "./validate-fields.js";
import { deleteFileOnError} from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js"
import { hasRoles } from "./validate-roles.js";

export const createProductValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La descripción es requerida"),
    body("price").notEmpty().withMessage("El precio es requerida"),
    body("stock").notEmpty().withMessage("El stock es requerida"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]