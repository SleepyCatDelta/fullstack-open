const mongoose = require('mongoose')

let uri = process.env.MONGODB_URI

const connectDB = async () => {
  if (!uri) {
    const { MongoMemoryServer } = require('mongodb-memory-server')
    const mongod = await MongoMemoryServer.create()
    uri = mongod.getUri()
    console.log('Using in-memory MongoDB at:', uri)
  }
  await mongoose.connect(uri)
  console.log('Connected to MongoDB')
}

module.exports = { connectDB }
