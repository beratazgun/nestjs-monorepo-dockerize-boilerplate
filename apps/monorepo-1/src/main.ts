import { NestFactory } from '@nestjs/core';
import { Monorepo1Module } from './monorepo-1.module';
import { ConfigSchemaType } from 'config/env.validation';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { bold } from 'cli-color';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { snakeCase } from 'lodash';

/**
 * initializeSwaggerDocumentation
 */
function initializeSwaggerDocumentation(app: NestExpressApplication) {
  const config = new DocumentBuilder()
    .setTitle('Backend Service - API Documentation')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
    operationIdFactory: (controllerKey: string, methodKey: string) => {
      return snakeCase(methodKey).replace(/_/g, ' ');
    },
  });

  SwaggerModule.setup('api/v1/doc', app, document);
}

/**
 * bootstrap
 */
async function bootstrap() {
  const monorepo1App =
    await NestFactory.create<NestExpressApplication>(Monorepo1Module);

  const configService = monorepo1App.get(ConfigService<ConfigSchemaType>);

  /**
   * The PORT is retrieved from the configuration service.
   */
  const PORT = configService.get<string>('MONOREPO_1_PORT');

  /**
   * Swagger documentation is initialized.
   */
  initializeSwaggerDocumentation(monorepo1App);

  /**
   * The app listens on the specified port.
   */
  await monorepo1App.listen(PORT).then(() => {
    Logger.log(
      bold.whiteBright(`Monorepo-1 is running on port ${PORT}`),
      bold.whiteBright('Monorepo-1'),
    );
  });
}

bootstrap();
