import { Router, Request, Response } from "express";
import fs from 'fs';

const router = Router();

interface User {
  email: string;
  number: number;
}

// fast sync file read and type convertion
const JSON_DATA: Record<keyof User, string>[] = await JSON.parse(
  fs.readFileSync('./data.json', 'utf8')); 
const USERS_DATA: User[] = JSON_DATA.map(user => {
  return {
    email: user.email,
    number: parseInt(user.number)
  }
})

function getUsers(req: Request, res: Response) {
  const email = req.query.email;
  const foundUsers = USERS_DATA.filter(user => {
    return user.email === email;
  })
  res.send(foundUsers);
}

router.get('/users', getUsers);

export default router;
