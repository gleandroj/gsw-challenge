import mongoose from "mongoose";

import Conversion from "./conversion";

const connectDb = () => {
    return mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
    });
};

export { connectDb, Conversion };