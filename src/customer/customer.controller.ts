import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CUSTOMER_REGISTERED, LOGIN_FAIL, LOGIN_SUCCESSFULL, REGISTRATION_FAILED } from 'src/constant';
import { CustomerService } from './customer.service';
import { CustomerDTO } from './dto/customer.dto';
import { LogInDTO } from './dto/logindto';

/**
 * To make requests for customers
 */
@ApiTags('customer')
@Controller('customer')
export class CustomerController {

    /**
    * To create instance for CustomerService by DI 
    * @param CustomerService - CustomerService
    */
    constructor(private customerService: CustomerService) {

    }

    /**
     * To Register customer
     * @param customer
     * @returns success or failure message
     */
    @ApiCreatedResponse({ description: CUSTOMER_REGISTERED, status: HttpStatus.CREATED })
    @ApiInternalServerErrorResponse({ description: REGISTRATION_FAILED, status: HttpStatus.INTERNAL_SERVER_ERROR })
    @ApiBody({ description: 'CustomerDTO', required: true, type: CustomerDTO })
    @Post()
    registerCustomer(@Body() customer: CustomerDTO): Promise<String> {
        const result = this.customerService.registerTheCustomer(customer);
        return result;
    }

    /**
     * To login the customer
     * @param customerLogin - LogInDTO
     * @returns - Successful or failure message
     */
    @ApiOkResponse({ description: LOGIN_SUCCESSFULL, status: HttpStatus.OK })
    @ApiInternalServerErrorResponse({ description: LOGIN_FAIL, status: HttpStatus.INTERNAL_SERVER_ERROR })
    @Post('/login')
    loginCustomer(@Body() customerLogin: LogInDTO): Promise<{ token }> {
        return this.customerService.loginTheCustomer(customerLogin);
    }
}
