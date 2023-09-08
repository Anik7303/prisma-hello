import { PrismaClient } from "@prisma/client";
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
  const prisma = new PrismaClient();
  try {
    await app.listen(parseInt(PORT));
    console.log(`Local address: http://127.0.0.1:${PORT}`);
    console.log(`Network address: http://${getNetworkIP()}:${PORT}`);

    // await prisma.user.create({
    //   data: {
    //     email: "john@gmail.com",
    //     name: "John Doe",
    //     posts: {
    //       create: {
    //         title: "Post 1",
    //         content: "Post content 1",
    //       },
    //     },
    //   },
    // });

    const users = await prisma.user.findMany({ include: { posts: true } });
    console.log({ users });
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
