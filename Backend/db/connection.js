import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log('Failed to connect', error);
    }
}
export default connectDB;

// import mongoose from "mongoose";

// const connectDB = async () => {
//   try {
//     console.log('MONGO_URI (debug) =', process.env.MONGO_URI);
//     if (!process.env.MONGO_URI) {
//       throw new Error('MONGO_URI is not defined. Check .env loading and path.');
//     }
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log('mongodb connected successfully');
//   } catch (error) {
//     console.error('Failed to connect', error);
//   }
// }

// export default connectDB;
