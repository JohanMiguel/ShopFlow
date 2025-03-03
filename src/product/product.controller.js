import Product from './product.model.js';
import fs from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const saveProduct = async (req, res) => {
    try {
        const data = req.body;
        const product = await Product.create(data);
        return res.status(201).json({
            success: true,
            message: "Producto agregado al Sistema",
            data: product
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar Prodducto",
            error: err.message
        })
    }
}

export const getProducts = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { status: true };

    try {
        const products = await Product.find(query).populate("category", "name") 
            .skip(Number(desde))
            .limit(Number(limite));

        const total = await Product.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener los productos',
            error: error.message,
        });
    }
};
export const getProductByName = async (req, res) => {
    try {
        const { name } = req.params;

        const product = await Product.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } })
            .populate("category", "name");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado",
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar el producto",
            error: error.message,
        });
    }
};

//actualizar informacion del producto
export const updateProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const data = req.body;


        const updatePro = await Product.findByIdAndUpdate(idProduct, data, {new: true} )

        return res.status(200).json({
            message: "Producto Actualizado",
            updatePro
        });
    } catch (err) {
        return res.status(500).json({
            message: "Poducto no actualizado",
            error: err.message
        });
    }
};

// eliminar
export const deleteProduct = async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = await Product.findByIdAndUpdate(idProduct, { status: false }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente",
            product
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar Producto",
            error: err.message
        });
    }
};
