import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { CityEntity } from './entities/city.entity.js';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private readonly cityRepository: Repository<CityEntity>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async getAllCitiesById(stateId: number): Promise<CityEntity[]> {
        const citiesCache = await this.cacheManager.get<CityEntity[]>(`${stateId}`);

        if (citiesCache) {
            return citiesCache;
        }

        const cities = await this.cityRepository.find({
            where: {
                stateId,
            },
        });

        await this.cacheManager.set(`${stateId}`, cities);

        return cities;
    }
}
