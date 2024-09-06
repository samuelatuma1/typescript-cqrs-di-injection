import { NextFunction } from "express";
import BaseException from "../../core/application/common/exceptions/base_exception";
import { Request, Response } from "express";
export declare const ErrorMiddleware: (ex: BaseException | Error, request: Request, response: Response, next: NextFunction) => Response<any, Record<string, any>>;
