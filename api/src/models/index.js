import mongoose from "mongoose";

import Conversion from "./conversion";

const connectDb = () => {
    return mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    });
};

const models = { Conversion };

export { connectDb };

export default models;