import { Router } from "express";
import { getUsers } from "../controllers/getUsers";

const router = Router();


router.get('/users', getUsers);

export default router;
