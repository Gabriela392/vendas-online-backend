import { Module } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { CorreiosController } from './correios.controller';
import { HttpModule } from '@nestjs/axios';
import { CityModule } from '../city/city.module';
import { Client, createClientAsync } from 'soap';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    CityModule,
  ],
  providers: [
    CorreiosService,
    {
      provide: 'SOAP_CORREIOS',
      useFactory: () => () =>
        createClientAsync(
          'http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl',
        ),
    },
  ],
  controllers: [CorreiosController],
  exports: [CorreiosService],
})
export class CorreiosModule {}
