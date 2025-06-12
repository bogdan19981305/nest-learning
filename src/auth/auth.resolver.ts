import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GqlContextInterface } from '../common/interfaces/gql-context.interface';
import { AuthModel } from './models/auth.model';
import { RegisterInput } from './inputs/register.input';
import { LoginInput } from './inputs/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthModel)
  async register(
    @Context() { res }: GqlContextInterface,
    @Args('data') input: RegisterInput,
  ) {
    return this.authService.register(res, input);
  }

  @Mutation(() => AuthModel)
  async login(
    @Context() { res }: GqlContextInterface,
    @Args('data') input: LoginInput,
  ) {
    return this.authService.login(res, input);
  }

  @Mutation(() => AuthModel)
  async refresh(@Context() { res, req }: GqlContextInterface) {
    return this.authService.refresh(res, req);
  }

  @Mutation(() => Boolean)
  logout(@Context() { res }: GqlContextInterface) {
    return this.authService.logout(res);
  }
}
