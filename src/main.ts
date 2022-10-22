import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ExceptionsLoggerFilter } from './utils/exceptionsLogger.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle("Ads")
    .setDescription("Service for managing ads")
    .setVersion("1.0")
    .addTag("ads")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("docs", app, document);

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsLoggerFilter(httpAdapter));

  await app.listen(3000);

}
bootstrap();
