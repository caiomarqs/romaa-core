import dotenv from 'dotenv';
dotenv.config();

const env = {
    mongoUri: process.env.MONGO_URI,
    jwtSecret: process.env.JWT_SECRET
}

export { env }