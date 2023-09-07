import mongoose from 'mongoose'

const dbConnect = () => {
    if(mongoose.connection.readyState >= 1 ) return

    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DB_URL, () => console.log('Connected to database...') )
}


export default dbConnect