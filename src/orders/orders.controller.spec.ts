// import { Test, TestingModule } from '@nestjs/testing';
// import { OrdersController } from './orders.controller';

import { Test, TestingModule } from "@nestjs/testing"
import { OrdersController } from "./orders.controller"
import { OrdersService } from "./orders.service"

// describe('OrdersController', () => {
//   let controller: OrdersController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [OrdersController],
//     }).compile();

//     controller = module.get<OrdersController>(OrdersController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

// describe('Given OrdersController', () => {
//   it('should match', () => {

//     expect(1).toBe(1);
//     expect('HCL').toBe('HCL')
//     expect('HCL').not.toBe('HCL TECH')
//     expect (2).not.toBe(20);

//     const isOpen = true;
//     expect(isOpen).toBe(true);
//     expect(isOpen).not.toBe(false);

//     let value = null;
//     expect(value).toBe(null)

//   });

// })  -----------Test----------

//---------------------------------------------------------------------------------//

// const orders = [{
//   quantity: 2,
//   rating: 5
// }]
// describe('Given OrdersController', () => {
//   let ordersController: OrdersController; 
//   let ordersService: OrdersService;

//   beforeEach(async () => {
//     let module:TestingModule = await Test.createTestingModule({
//       controllers: [OrdersController],
//       providers: [OrdersService, {
//         provide: OrdersService,
//         useFactory: () => ({
//           getAllOrders: jest.fn()
//         })
//       }]
//     }).compile()

//   ordersController = module.get<OrdersController>(OrdersController);
//   ordersService = module.get<OrdersService>(OrdersService);
// })

// it('should be defined', () => {
//   expect (ordersController).toBeDefined();  
// })

// describe('When getAllOrders()', () => {
//   it('should return response', async () => {

//     let getAllOrdersSpy = jest.spyOn(ordersService, 'getAllOrders').mockResolvedValue([]);

//       let response = await ordersController.getAllOrders();
//       expect(response).toEqual(orders)
//       expect(getAllOrdersSpy).toHaveBeenCalled()
//       expect(getAllOrdersSpy).toHaveBeenCalledTimes(1);
//   })
// })

// })