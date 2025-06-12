import { Request, Response } from 'express';

export interface GqlContextInterface {
  req: Request;
  res: Response;
}
