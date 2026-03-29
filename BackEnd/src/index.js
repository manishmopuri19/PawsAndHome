import "dotenv/config"; 
import app from "./app.js";
import connectDB from "./config/database.js";
import { initCloudinary } from "./config/cloudinary.js";
import { connectRedis } from "./config/redisconfig.js";
const PORT = process.env.PORT || 8000;

const startServer = async () => {
    try {
        initCloudinary();
        
        await connectDB();
        await connectRedis(); 

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server failed to start:", error.message);
        process.exit(1);
    }
};

startServer();

