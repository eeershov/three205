import { Request, Response} from 'express';
import { User, ApiResponse } from '../interfaces';
import fs from 'fs';

const RESPONSE_DELAY = 5000; // 5000 in prod

// fast sync file read and type convertion
const JSON_DATA: Record<keyof User, string>[] = await JSON.parse(
  fs.readFileSync('./data.json', 'utf8')); 
const USERS_DATA: User[] = JSON_DATA.map(user => {
  return {
    email: user.email,
    number: parseInt(user.number)
  }
})

const timeoutByIP: {[key: string] : NodeJS.Timeout} = {};
export async function getUsers(req: Request, res: Response) {
  let clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'disconnected';
  if (clientIP) clientIP = clientIP.toString();
  if (timeoutByIP.hasOwnProperty(clientIP)) {
    clearTimeout(timeoutByIP[clientIP]); // cancel ongoing response
  }

  const email = req.query.email;
  let number: number | null = null;
  if (req.query.number) number = parseInt(req.query.number.toString());

  const foundUsers = USERS_DATA.filter(user => {
    if (number != null) {
      return user.email === email && user.number === number;
    }
      return user.email === email;
  })

  let response: ApiResponse<User[]>;
  if (foundUsers.length === 0) {
    response = new ApiResponse({
      success: false,
      code: 200, // as not to process the 204 code separately on the client side
      error: true,
      message: 'users not found',
      data: []
    });
  } else {
    response = new ApiResponse({
      success: true,
      code: 200,
      error: false,
      message: 'users found',
      data: foundUsers
    });
  }

  const timeoutID = setTimeout(() => {
    res.status(response.code).send(response);
  }, RESPONSE_DELAY);
  timeoutByIP[clientIP] = timeoutID;
}
