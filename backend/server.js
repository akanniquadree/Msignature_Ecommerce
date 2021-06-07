import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
//import bodyParser from 'body-parser';
import config from "./config.js";
import userRoute from './routes/userRoute.js'
import productRoute from './routes/productRoute.js'
import data from "./data.js";

dotenv.config();

const mongodbUrl = config.MONGODB_URL;

 mongoose.connect(mongodbUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch(error=> console.log(error.reason));


const app = express();
//app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/users", userRoute);
app.use("/api/products", productRoute);


app.get("/api/products/:id", (req, res )=>{
    const productId = req.params.id;
    const product = data.products.find(x=>x._id === Number(productId))
    if (product)
        res.send(product);
    else
        res.status(404).send({msg: "Product not found"})
});



app.get("/api/products",  (req, res )=>{
    res.status(200).send(data.products);
});

app.listen(5000, ()=>{
    console.log("server is listening in port 5000")
})