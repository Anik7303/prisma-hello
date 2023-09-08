import dotenv from "dotenv";
import express from "express";

import { getNetworkIP } from "@/lib/utils";
import { catchAllError, notFound } from "@/middlewares/error";
import testRoutes from "@/routes/test";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// variables
const PORT = process.env.PORT || "8000";

const app = express();

app.use(express.json());

// routes
app.use(testRoutes);

// error middlewares
app.use(notFound);
app.use(catchAllError);

async function main() {
  await app.listen(parseInt(PORT));
  console.log(`Local address: http://127.0.0.1:${PORT}`);
  console.log(`Network address: http://${getNetworkIP()}:${PORT}`);
}

main();
