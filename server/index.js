import express from "express";
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js"
import productRoutes from "./routes/product.js"
import transactionsRoutes from "./routes/transaction.js"
import Product from "./models/Product.js"
import Transaction from "./models/Transaction.js"
import KPI from "./models/KPI.js"
import { kpis,products, transactions } from "./data/data.js";

dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const corsOptions = {
    origin: 'https://budget-navigator-29am.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization','multipart/form-data'],
    optionsSuccessStatus: 200, 
  };
app.use(cors(corsOptions));

app.use("/kpi",kpiRoutes);
app.use("/product",productRoutes);
app.use("/transaction",transactionsRoutes);

// console.log("hiiiiii");
console.log(process.env.MONGO_URL)
const PORT=process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL)
.then(async()=>{
    app.listen(PORT,()=>console.log(`server port: ${PORT}`));

    // only one time use when we connect the application

    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products)
    // Transaction.insertMany(transactions);
})
.catch((error)=>console.log(`${error} did not connect`));
 
// mongoose.Promise = global.Promise;