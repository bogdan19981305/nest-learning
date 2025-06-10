import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MovieModule } from './movie/movie.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Nest course API')
    .setDescription('API doc for nest js course')
    .setVersion('1.0.0')
    .setContact('Bogdan', 'google.com', 'litvinenkob16@gmail.com')
    .setLicense('MIT', 'https://opensource.org/license/mit/')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [MovieModule],
  });

  SwaggerModule.setup('/swagger', app, document, {
    jsonDocumentUrl: '/swagger-json',
    yamlDocumentUrl: '/swagger-yaml',
    customSiteTitle: 'Nest course API',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
