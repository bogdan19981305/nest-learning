import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    const request: Request = ctx.getContext<{ req: Request }>().req;

    const user: User = request.user as User;

    if (!user) {
      throw new UnauthorizedException('User not found in request context');
    }

    return data ? user?.[data] : user;
  },
);
