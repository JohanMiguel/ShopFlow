import { body, param } from "express-validator";
import { validarCampos} from "./validate-fields.js";
import { deleteFileOnError} from "./delete-file-on-error.js";
import { handleErrors } from "./handle-errors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { categoryExists } from "../helpers/db-validators.js";


export const saveCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").notEmpty().withMessage("El nombre es requerido"),
    body("description").notEmpty().withMessage("La description es requerido"),
    validarCampos,
    deleteFileOnError,
    handleErrors
]

export const updateCategoryValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    param("id", "No es un ID válido").isMongoId(),
    param("id").custom(categoryExists),
    validarCampos,
    handleErrors
];