import express, { NextFunction, Request, Response } from 'express';
import AppError from "../errors/app.error";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const validateToken = async (req: Request, res: Response, next:NextFunction) => {
   let token =  req.headers.authorization

   if(!token){
    throw new AppError('Missing Bearer Token', 401)
   }
   token = token.split(' ')[1]

   jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any)=>{

        if(error){
            throw new AppError(error.message, 401)
        }
        
        req.user = {
            id: parseInt(decoded.sub),
            admin: decoded.admin
        }

   })

    return next()

}

export default validateToken