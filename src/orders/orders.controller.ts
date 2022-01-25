import { Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrdersDTO } from './orders.dto';
import { OrdersService } from './orders.service';

/**
 * Orders controller with all crud operations
 * @author Madhushree
 */
@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    getAllOrders() {
      throw new Error("Method not implemented.");
    }

    /**
     * Dependency Injection
     * @param ordersService 
     */
    constructor(private ordersService: OrdersService) {}

    /**
     * Placing an order for food items
     * @param order
     * @returns 
     */
    @ApiOkResponse({ description: 'Order placed successfully', status: HttpStatus.CREATED})
    @ApiInternalServerErrorResponse({ description: 'Unable to place order', status: HttpStatus.INTERNAL_SERVER_ERROR })
    @Post('/makeOrder')
    placeOrder(@Body() order: OrdersDTO) {
        return this.ordersService.placeItemOrder(order);
    }

    /**
     * Fetching all the orders
     * @returns orders
     */
    @ApiOkResponse({ description: 'Orders fetched successfully', status: HttpStatus.OK })
    @ApiNotFoundResponse({ description: 'Orders not found', status: HttpStatus.NOT_FOUND })
    @ApiInternalServerErrorResponse({ description: 'Unable to fetch orders', status: HttpStatus.INTERNAL_SERVER_ERROR })
    @Get('/listOfOrders/:customerId')
    allOrders(@Param('customerId', ParseIntPipe) customerId: number): Promise<OrdersDTO[]> {
          return this.ordersService.getAllOrders(customerId);
    }

    /**
     * Cancel order
     * @param id 
     * @returns 
     */
    @ApiOkResponse({ description: 'Orders canceled successfully', status: HttpStatus.OK })
    @ApiNotFoundResponse({ description: 'Order not found', status: HttpStatus.NOT_FOUND })
    @ApiInternalServerErrorResponse({ description: 'Unable to cancel order', status: HttpStatus.INTERNAL_SERVER_ERROR })
    @Patch('/cancelOrder/:orderId')
    cancelOrder(@Param('orderId', ParseIntPipe) orderId: number) {
        return this.ordersService.cancelOrder(orderId);
    }

    /**
     * Give ratings for order
     * @param id 
     * @param rating 
     * @returns 
     */
    @ApiOkResponse({ description: 'Rating updated successgully', status: HttpStatus.OK })
    @ApiInternalServerErrorResponse({ description: 'Unable to update rating', status: HttpStatus.INTERNAL_SERVER_ERROR})
    @Patch('/rating/:orderId/:rating')
    giveRating( @Param('orderId') orderId: number, @Param('rating') rating: number): Promise<string> {
        return this.ordersService.giveRating(orderId, rating);
    }
}
