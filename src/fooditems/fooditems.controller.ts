import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { FooditemsService } from './fooditems.service';
import { FoodItemsDTO } from './dto/fooditems.dto';
import { ApiCreatedResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FAILED_TO_ADD, FAILED_TO_FETCH, ITEMS_FETCHED, ITEM_ADDED } from 'src/constant';
import { Roles } from 'src/customer/roles.enum';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/customer/roles/roles.decorator';

/**
 * Food items controller with all crud operations
 * @author Madhushree
 */
@ApiTags('fooditems')
@Controller('fooditems')
export class FooditemsController {

    /**
     * Dependency Injection
     * @param foodItemsService 
     */
    constructor(private foodItemsService:FooditemsService){
       
    }
    
    /**
     * To add item into table
     * @param foodItemsDto - FoodItemsDTO
     * @returns - Sucess or failure message
     */
    @ApiCreatedResponse({
        description: ITEM_ADDED,
        status: HttpStatus.CREATED,
      })
    @ApiInternalServerErrorResponse({
        description: FAILED_TO_ADD,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      })
    //@Roles(Role.Admin)
   // @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    addItem(@Body() foodItemsDto:FoodItemsDTO):Promise<string>{
        return this.foodItemsService.addFoodItem(foodItemsDto);
    }

    /**
     * 
     * @param name Search item by item name
     * @returns 
     */
    @ApiOkResponse({ 
        description:ITEMS_FETCHED, 
        status: HttpStatus.OK })
    @ApiInternalServerErrorResponse({ 
        description:FAILED_TO_FETCH, 
        status: HttpStatus.INTERNAL_SERVER_ERROR })
    @Get('/:name')
    searchItem(@Param('name') name:string):Promise<FoodItemsDTO[]>{
        return this.foodItemsService.searchFoodItem(name);
    }

}
