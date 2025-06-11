import { DocumentBuilder } from '@nestjs/swagger';

export const getSwaggerConfig = () => {
  return new DocumentBuilder()
    .setTitle('Nest course API')
    .setDescription('API doc for nest js course')
    .setVersion('1.0.0')
    .setContact('Bogdan', 'google.com', 'litvinenkob16@gmail.com')
    .setLicense('MIT', 'https://opensource.org/license/mit/')
    .addBearerAuth()
    .build();
};
