import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType, ValidationPipe, Logger } from '@nestjs/common';
import { config } from 'dotenv';
import { ENVIRONMENT } from 'common/environment.enum';

config();

async function bootstrap() {
  const { PORT, NODE_ENV } = process.env;

  // const url = ENVIRONMENT.DEVELOPMENT.toString()
  //   ? 'http://localhost:3000'
  //   : process.env.FRONTEND_URL;

  const logger = new Logger();

  const app = await NestFactory.create(AppModule, {
    logger: NODE_ENV === 'development' ? logger : ['error'],
  });

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      errorHttpStatusCode: 422,
    }),
  );

  if (NODE_ENV === ENVIRONMENT.DEVELOPMENT.toString()) {
    const configSwagger = new DocumentBuilder()
      .setTitle('Email Smtp API')
      .setDescription('API for sent emails')
      .setVersion('1.0')
      .addTag('modules')
      .build();

    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('swagger', app, document);
  }

  await app.listen(PORT ?? 3333);
}

void (async () => {
  await bootstrap();
})();
