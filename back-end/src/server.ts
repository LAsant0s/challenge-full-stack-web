import express from "express";
import { router } from "./routes/router";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorHandler);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
