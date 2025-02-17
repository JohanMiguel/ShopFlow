import Category from "../category/category.model.js";
import Product from "./product.model.js";

export const saveProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;
        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada"
            });
        }
        const product = new Product({
            name,
            description,
            price,
            stock,
            category: category._id 
        });

        await product.save();

        res.status(201).json({
            success: true,
            message: "Producto creado exitosamente",
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al guardar Producto",
            error
        });
    }
};


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