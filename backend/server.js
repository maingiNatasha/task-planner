import app from "./src/app.js";
import dotenv from "dotenv";

// Read .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));