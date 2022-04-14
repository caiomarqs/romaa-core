import dotenv from 'dotenv';
dotenv.config();

const env = {
    mongoUri: process.env.MONGO_URI,
}

export { env }