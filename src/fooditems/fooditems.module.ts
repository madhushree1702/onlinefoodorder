import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FooditemsController } from './fooditems.controller';
import { FooditemsService } from './fooditems.service';
import { FoodItems } from './fooditems.entity';
import { FoodItemsRepository } from './fooditems.repository';

/**
 * Food items module
 */
@Module({
  imports: [TypeOrmModule.forFeature([FoodItems, FoodItemsRepository])],
  controllers: [FooditemsController],
  providers: [FooditemsService]
})

/**
 * Food items class
 */
export class FooditemsModule { }
