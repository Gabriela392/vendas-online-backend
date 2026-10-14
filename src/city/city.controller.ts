import { CityService } from './city.service.js';
import { CityEntity } from './entities/city.entity.js';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('city')
export class CityController {

constructor(private readonly cityService: CityService ) {}

    @Get('/:stateId')
    async getAllCitiesByStateId(
        @Param('stateId') stateId: number,
    ): Promise<CityEntity[]> {
        return this.cityService.getAllCitiesById(stateId);
    }
}