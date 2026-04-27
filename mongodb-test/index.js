const { MongoClient } = require("mongodb");

// 🔴 Replace with your actual connection string
const uri = "mongodb+srv://admin:Rejeesh@2002@cluster0.lmctdfo.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    // Select database
    const db = client.db("testDB");

    // Select collection
    const collection = db.collection("users");

    // Insert a document
    const result = await collection.insertOne({
      name: "John",
      age: 25
    });

    console.log("Inserted ID:", result.insertedId);

  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    await client.close();
  }
}

run();

