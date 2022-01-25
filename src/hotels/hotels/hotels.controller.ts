import { Body, Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
// import { RolesGuard } from 'src/common/guards/roles.guard';
import { AVAILABLE_ITEMS, FAILED_TO_REGISTER, HOTELS_FETCHED, HOTELS_FETCH_FAILED, HOTEL_REGISTERED, ITEMS_FETCH_FAILED, LISTOF_HOTELS_FETCHED } from 'src/constant';
import { Roles } from 'src/customer/roles.enum';
import { Role } from 'src/customer/roles/roles.decorator';
import { HotelDTO } from './dto/hotels.dto';
import { Hotels } from './hotels.entity';
import { HotelsService } from './hotels.service';

/**
 * Hotel controller with all the crud operations
 */
@ApiTags('hotels')
@ApiBearerAuth('swagger')
@Controller('hotels')
export class HotelsController {
    constructor(private hotelsService: HotelsService) {

    }

    /**
     * To register the hotel
     * @param hotelDto - HotelDTO
     * @returns - Succes or failure message
     */
    @ApiCreatedResponse({
        description: HOTEL_REGISTERED,
        status: HttpStatus.CREATED,
    })
    @ApiInternalServerErrorResponse({
        description: FAILED_TO_REGISTER,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @Roles(Role.Admin)
    // @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    registerTheHotel(@Body() hotelDto: HotelDTO): Promise<string> {
        return this.hotelsService.registertheHotel(hotelDto);
    }

    /**
     * To fetch the list of hotels
     * @returns - HotelDTO[]
     */
    @ApiOkResponse({
        description: LISTOF_HOTELS_FETCHED,
        status: HttpStatus.OK,
    })
    @ApiInternalServerErrorResponse({
        description: HOTELS_FETCH_FAILED,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @Get()
    listOfHotels(): Promise<HotelDTO[]> {
        return this.hotelsService.listOfHotels();
    }

    /**
     * To fetch the hotels by hotel name
     * @param hotelName - hotelname
     * @returns - HotelDTO[]
     */
    @ApiOkResponse({
        description: HOTELS_FETCHED,
        status: HttpStatus.OK,
    })
    @ApiInternalServerErrorResponse({
        description: HOTELS_FETCH_FAILED,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @Get('/:hotelName')
    searchHotel(@Param('hotelName') hotelName: string): Promise<HotelDTO[]> {
        return this.hotelsService.searchForHotel(hotelName);
    }

    /**
     * To fetch the list of hotels along with the items available
     * @param id - hotelID
     * @returns - HotelDTO[]
     */
    @ApiOkResponse({
        description: AVAILABLE_ITEMS,
        status: HttpStatus.OK,
    })
    @ApiInternalServerErrorResponse({
        description:ITEMS_FETCH_FAILED ,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
    })
    @Get('/items/:id')
    listOfItems(@Param('id')id:number):Promise<HotelDTO>{
        return this.hotelsService.listOfItemsInHotel(id);
    }

}
