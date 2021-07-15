import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json, urlencoded } from 'body-parser';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { join } from 'path';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as setTZ from 'set-tz';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  app.enableCors({
    origin: process.env.CORS_ORIGINS.split(','),
    optionsSuccessStatus: 200,
  });

  app.use(
    helmet(),
    compression(),
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  app.use(
    json({
      limit: '50mb',
    }),
    urlencoded({
      limit: '50mb',
      extended: true,
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  app.use('/images', express.static(join(__dirname, '..', 'uploads')));

  const config = new DocumentBuilder()
    .setTitle('affiliate')
    .setDescription(
      `API service for Member,Mobile App UNICORN AUTO,affiliate : BASE URL = ${process.env.APP_URL}`,
    )
    .setVersion('1.0')
    .addTag('user')
    .build();
  process.env.TZ = 'Asia/Bangkok';
  const document = SwaggerModule.createDocument(app, config);
  setTZ('Asia/Bangkok');
  SwaggerModule.setup('api', app, document);

  await app.listen(3000, () => {
    console.log('Listening on port 3000');
  });
}
bootstrap();
