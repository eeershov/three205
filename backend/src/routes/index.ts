import { Router } from "express";
import { getUsers } from "../controllers/getUsers";
import { validateUser } from "../middleware/validateUser";

const router = Router();


router.get('/users', validateUser(), getUsers);

export default router;
