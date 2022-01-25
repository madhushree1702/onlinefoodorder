import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodItems } from './fooditems/fooditems.entity';
import { FooditemsModule } from './fooditems/fooditems.module';
import { CustomerModule } from './customer/customer.module';
import { HotelsModule } from './hotels/hotels/hotels.module';
import { OrdersModule } from './orders/orders.module';

/**
 * Defining module, OrderModule
 * Defining TypeOrmModule and adding user entity
 */
@Module({
  imports: [TypeOrmModule.forRoot(), CustomerModule, HotelsModule, OrdersModule, FooditemsModule],
  controllers: [AppController],
  providers: [AppService],
})

/**
 * AppModule class
 */
export class AppModule {}
