require("dotenv").config()
const express=require("express")
const cors=require("cors")
const { MongoClient } = require("mongodb")


const app=express()

app.use(express.json())
app.use(cors())




const uri = process.env.mongoDB
const client = new MongoClient(uri);


async function connectToMongo() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Failed to connect to MongoDB', err);
    }
  }


app.get("/",(req,res)=>
{

    res.send("Welecome to server")
})

app.get("/getData",async (req,res)=>
{
 
    const database = client.db("Team");
    const collection1 = database.collection("collection1");
    const collection2 = database.collection("collection2");
    console.log(collection1)
    const result=await collection1.aggregate([{$lookup:{from:"collection2",localField:"email",foreignField:"email",as:"data2"}}]).toArray();

    res.send(result) 
     
})





app.listen(process.env.PORT,async()=>
{
    await connectToMongo();
    console.log("Server started")
})