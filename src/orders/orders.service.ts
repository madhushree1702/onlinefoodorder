import { HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CustomerRepository } from 'src/customer/customer.repository';
import { OrdersDTO } from './orders.dto';
import { Orders } from './orders.entity';
import { OrdersRepository } from './orders.repository';

/**
 * It will insert/update/delete/retrieve product information in the database/repository
 * @author Madhushree
 */
@Injectable()
export class OrdersService {

    logger = new Logger(OrdersService.name);

    /**
     * Creating instance for OrdersRepository by DI
     * @param ordersRepo 
     * @param customerRepo 
     */
    constructor( private ordersRepo: OrdersRepository, private customerRepo: CustomerRepository) {}

    /**
     * Placing an order for fooditems
     * @param order 
     * @returns 
     */
    async placeItemOrder(order: OrdersDTO) {
        try {
            //  let response = await this.foodItemsRepo.save(order.foodItems);
            //  let result = await this.orderRepo.save({ ...order, foodItems: response });
            //  return result;

            let customer = await this.customerRepo.findOne({ where: {id: order.customer.id }});
            if (customer) {
                order.customer = customer;
                let result = await this.ordersRepo.save(order)

                if(result) {
                    const msg:string = `Order placed successfully with order id ${result.id}`;
                    return msg;
                } else {
                    throw new InternalServerErrorException('Some problem with placing order, try again later');
                }
            } else {
                throw new NotFoundException(`Customer with customer id ${order.customer.id} not found`);
            }
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }

    /**
     * Fetch all orders
     * @returns 
     */
    async getAllOrders(customerId: number): Promise<OrdersDTO[]> {
        try {
            let customer = await this.customerRepo.findOne({ where: { id: customerId }, relations: ['orders', 'orders.foodItems'] });
            if(customer.orders.length > 0) {
                this.logger.log(`${customer.orders.length} orders found`);
                return customer.orders;
            } else {
                throw new NotFoundException(`No existing orders found`);
            }
        } catch (error) {
            this.logger.error(error.message);
            throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR )
        }
    }

    /**
     * This is for cancel the order
     * @param id 
     * @returns 
     */
    async cancelOrder(orderId: number) {
        try {
            let order = await this.ordersRepo.findOne({ where: { id: orderId }});
            if(order) {
                let response = await this.ordersRepo.cancelOrder(orderId);
                if(response) {
                    const message: string = 'Order cancelled successfully';
                    this.logger.log(message);
                    return message;
                } else {
                    throw new InternalServerErrorException('Unable to cancel order');
                }
            } else {
                throw new NotFoundException('Order not found');
            }
        } catch (error) {
            this.logger.error(error.message)
            throw new InternalServerErrorException(error.message)
        }
    }

    /**
     * Give the feedback as rating after ordering the food
     * @param id 
     * @param rating 
     * @returns 
     */
    async giveRating(orderId: number, rating: number): Promise<string> {
        try {
            let order = await this.ordersRepo.findOne({ where: { id: orderId }});
            if(order) {
                let response = await this.ordersRepo.changeRating(orderId, rating);
                if(response) {
                    const message: string = 'Rating updated successfully';
                    this.logger.log(message);
                    return message;
                } else {
                    throw new InternalServerErrorException('Unable to update rating');
                }
            } else {
                throw new NotFoundException('Order not found');
            }   
        } catch (error) {
            this.logger.error(error.message);
            throw new InternalServerErrorException(error.message);
        }
    }
}
