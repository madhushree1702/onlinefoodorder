import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/customer.entity';
import { CustomerRepository } from 'src/customer/customer.repository';
import { OrdersController } from './orders.controller';
import { Orders } from './orders.entity';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';


/**
 * Orders module decorator
 */
@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([ Orders, OrdersRepository, Customer, CustomerRepository]) ],
  controllers: [OrdersController],
  providers: [OrdersService]
})

/**
 * Orders module class
 */
export class OrdersModule {}
