import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();
app.use(express.json());

await connectDb();
app.use("/api/v1", userRoutes);
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
