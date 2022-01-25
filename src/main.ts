import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionExceptionFilter } from './common/exception-filter/exception-filter.filter';
import { ResponseInterceptor } from './interceptor/response.interceptor';

/**
 * Bootstrapping
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Global binding
   */
   app.enableCors();

   app.useGlobalFilters(new ExceptionExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
  }));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'onlinefoodorder-versioning'
  })

  /**
   * Documentation for api - Swagger Configuration
   * @returns created swagger configuration
   */
   let swaggerConfig = new DocumentBuilder()
   .setTitle('onlinefoodorder-apis')
   .setDescription('Online food order application apis documentation')
   .setVersion('1.0')
   .setContact('Madhushree', '', 'kumari.madhushree@hcl.com')
   .addBearerAuth()
   .build()

 let document = SwaggerModule.createDocument(app, swaggerConfig);
 SwaggerModule.setup('onlinefoodorder-apis', app, document)

  await app.listen(3000);
}
bootstrap();
