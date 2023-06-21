const mongoose = require('mongoose')

export default async function dbConnect(){
    await mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}