import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserModel } from './models/user.model';
import { Authorized } from '../auth/decorators/authorized.decorator';
import { User, UserRole } from '@prisma/client';
import { Authorization } from '../auth/decorators/authorization.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Authorization(UserRole.ADMIN)
  @Query(() => [UserModel])
  getUsers() {
    return this.userService.findAll();
  }
  @Query(() => UserModel)
  getMe(@Authorized() user: User): User {
    return user;
  }
}
