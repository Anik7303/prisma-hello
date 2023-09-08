import { Router } from "express";

import { get } from "@/controllers/test";

const router = Router();

router.route("/test").get(get);

export default router;
