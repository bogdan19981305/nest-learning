import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'node:path';
import { ConfigService } from '@nestjs/config';
import { isDev } from '../utils/isDev.util';
import { GqlContextInterface } from '../common/interfaces/gql-context.interface';

export const getGraphQLConfig = (config: ConfigService): ApolloDriverConfig => {
  return {
    driver: ApolloDriver,
    autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
    sortSchema: true,
    playground: isDev(config),
    context: ({ req, res }: GqlContextInterface) => ({ req, res }),
  };
};
