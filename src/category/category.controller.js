import Category from "./category.model.js"
import Product from "../product/product.model.js"; //
import fs from "fs/promises"



// se inicia Trabajo de category_team
export const saveCategory  = async(req, res) => {
    try {
        const { name, description} = req.body;
        const newCategory = new Category({
            name,description
            })

        await newCategory.save();
        return res.status(201).json({
            succes: true,
            message: "Categoria creada exitosamente",
            Category: newCategory
        })

    } catch (err) {
        return res.status(500).json({
            succes: false,
            msg: "Error al crear la categoria ",
            err
        })
    }
}

export const getCategorys = async(req,res) =>{
    try {
        const { limite = 5, desde = 0 } = req.query
        const query = {};
        const [total, categorys] = await Promise.all([
            Category.countDocuments(query),
            Category.find(query)
                .skip(Number(desde))
                .limit(Number(limite))
        ])

        return res.status(200).json({
            succes: true,
            total,
            categorys
        })
    } catch (err) {
        return res.status(500).json({
            succes: false,
            message: "Error al obtener las categorias"
        })
    }
}

// no funcional 
export const actualizarCategory = async (req, res) => {
    try {
      const { uid } = req.params;
      const  data  = req.body;
      const categorys = await Category.findByIdAndUpdate(uid, data, { new: true });
      res.status(200).json({
          success: true,
          msg: 'La Categoria esta Actualizada',
          appointments,
      });
  } catch (err) {
      res.status(500).json({
          success: false,
          msg: 'Error al actualizar la Categoria',
          error: err.message
      });
  }
  }

  export const getCategoryByName = async (req, res) => {
    try {
        const { name } = req.params;
        const category = await Category.findOne({ name: new RegExp(`^${name}$`, "i") });

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Categoría no encontrada",
            });
        }

        res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error al buscar la categoría",
            error: error.message,
        });
    }
};
