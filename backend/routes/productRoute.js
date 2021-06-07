import express from "express";
import Product from "../models/productModel.js";
import {getToken, isAuth, isAdmin} from "../util.js";

const router = express.Router();

router.get("/", async (req, res) =>{
    const products = await Product.find({});
    res.send(products)
})
router.get("/:id", async (req, res) =>{
    try {
        const product = await Product.findOne({_id:req.params.id});
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message:"product not found"})
    }
    } catch (error) {
        res.send( {message: error.message})
    }   
})
router.post("/",  isAdmin, isAuth, async (req, res) =>{
    const product = new Product({
        name: req.body.name,
        image:req.body.image,
        brand:req.body.brand,
        price:req.body.price,
        category:req.body.category,
        description:req.body.description,
        countInStock:req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
    })
    const newProduct = await product.save()
    if(newProduct){
        return res.status(201).send({message: "New Product Created", data: newProduct})
    }
    return res.status(500).send({message: "Error in creating product"})
}

)
router.put("/:id", isAdmin, isAuth, async (req, res) =>{
    const productId = req.params.id;
    const product = await Product.findById({_id:productId})
    if(product){
            product.name= req.body.name;
            product.image=req.body.image;
            product.brand=req.body.brand;
            product.price=req.body.price;
            product.category=req.body.category;
            product.description=req.body.description;
            product.countInStock=req.body.countInStock;
            const updatedProduct = await product.save();
            if(updatedProduct){
                return res.status(200).send({message: "Product Updated", data: updatedProduct})
            }
        }
        return res.status(500).send({message: "Error in updating product"})
}) 

router.delete("/:id", isAdmin, isAuth, async(req,res)=>{
    //const productId = req.params.id;
    const deletedProduct = await Product.findById(req.params.id)
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message: "Product Deleted"})
    }else{
        res.send({message: "Error in Deleting Product"})
    }
    

})




export default router;