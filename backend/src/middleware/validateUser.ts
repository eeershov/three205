import { Request, Response, NextFunction } from 'express';
import { userSchema } from "../interfaces";
import { ApiResponse } from '../interfaces';
import { fromZodError } from 'zod-validation-error';
import { ZodError } from 'zod';


export const validateUser = () =>
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.query.email;
    const numberString = req.query.number?.toString();
    let number;
    // check and convert if number is valid
    if (numberString) {
      const numbersPattern = /^\d+$/;
      const isOnlyNumbers = numbersPattern.test(numberString)
      isOnlyNumbers ? number = parseInt(numberString?.toString()) : number = NaN;
    }

    try {
      userSchema.parse({
        email,
        number
      });
      return next();
    } catch (err) {
      const validationError = fromZodError(err as ZodError);
      const response = new ApiResponse({
        success: false,
        code: 400,
        error: true,
        message: validationError.details[0].message,
        data: [],
      })
      return res.status(200).send(response);
    }
  };
