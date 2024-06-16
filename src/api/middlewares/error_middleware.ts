import { NextFunction } from "express";
import BaseException from "../../core/application/common/exceptions/base_exception";
import {Request, Response} from "express";
import ErrorModel from "../models/error_model";
export const ErrorMiddleware = (
    ex: BaseException | Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const errorModel = new ErrorModel();
        let errorStatusCode = 400;
        switch(ex.name){
            
            default:
                errorModel.message = ex.message;
                errorModel.errors = {}
        }

        return response.status(errorStatusCode).json(errorModel);
  };