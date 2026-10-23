import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Client } from 'soap';
import { CityService } from '../../city/city.service';
import { CorreiosService } from '../correios.service';

describe('CorreiosService', () => {
  let service: CorreiosService;
  let cityService: CityService;
  let httpService: HttpService;
  let soapClientFactory: jest.Mock<() => Promise<Client>>;

  beforeEach(async () => {
    soapClientFactory = jest.fn<() => Promise<Client>>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CorreiosService,
        {
          provide: CityService,
          useValue: {},
        },
        {
          provide: 'SOAP_CORREIOS',
          useValue: soapClientFactory,
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CorreiosService>(CorreiosService);
    cityService = module.get<CityService>(CityService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityService).toBeDefined();
    expect(httpService).toBeDefined();
    expect(soapClientFactory).not.toHaveBeenCalled();
  });

  it('should create the SOAP client only when a delivery price is requested', async () => {
    const connectionError = new Error('Correios service unavailable');
    soapClientFactory.mockRejectedValueOnce(connectionError);

    await expect(
      service.priceDelivery('04014', '01001000', {
        weight: 1,
        length: 10,
        height: 10,
        width: 10,
        diameter: 0,
        productValue: 30,
      }),
    ).rejects.toBe(connectionError);

    expect(soapClientFactory).toHaveBeenCalledTimes(1);
  });
});
