import type { INestApplication } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { getSwaggerConfig } from '../config/swagger.config';

export const swaggerSetup = (app: INestApplication): void => {
  const config = getSwaggerConfig();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/swagger', app, document, {
    jsonDocumentUrl: '/swagger-json',
    yamlDocumentUrl: '/swagger-yaml',
    customSiteTitle: 'Nest course API',
  });
};
