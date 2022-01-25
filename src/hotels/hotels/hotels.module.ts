import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelsController } from './hotels.controller';
import { Hotels } from './hotels.entity';
import { HotelRepository } from './hotels.repository';
import { HotelsService } from './hotels.service';

/**
 * Hotels module decorator
 */
@Module({
    imports: [TypeOrmModule.forFeature([Hotels,HotelRepository])],
    controllers: [HotelsController],
    providers: [HotelsService]
})

/**
 * Hotels module class
 */
export class HotelsModule { }
