import { Schema, model } from "mongoose";

const productSchema = Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        maxLength: [25, "Name cannot exceed 25 characters"]
    },
    description:{
        type: String,
        required: [true, "Description is required"],
        maxLength: [25, "Description cannot exceed 25 characters"]
    },
    price:{
        type: Number,
        required: [true, "Price is required"],
    },
    category:{
        type: Schema.ObjectId,
        ref: 'Category',
        required: true,
    },
    stock:{
        type: Number,
        required: true,
    },
    profilePicture:{
        type: String,
        required: [false, "Name is required"],
    },
    status:{
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false,
});

export default model('Product', productSchema)