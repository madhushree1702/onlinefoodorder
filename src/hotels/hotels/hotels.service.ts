import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Like } from 'typeorm';
import { HotelDTO } from './dto/hotels.dto';
import { HotelRepository } from './hotels.repository';
import { AVAILABLE_ITEMS, FAILED_TO_REGISTER, HOTELS_FETCHED, HOTELS_FETCH_FAILED, HOTEL_EXISTS, HOTEL_REGISTERED, ITEMS_FETCH_FAILED, LISTOF_HOTELS_FETCHED } from 'src/constant';

/**
 * It defines dependencies
 */
@Injectable()
export class HotelsService {

    /**
     * Creating instance for HotelRepository by DI
     *  @param hotelRepo - HotelRepository
     */
    constructor(private hotelRepo:HotelRepository){}

    logger=new Logger(HotelsService.name);

    /**
     * To register the hotel
     * @param hotelDto - HotelDTO
     * @returns - Success or failure message
     * @throws - HttpException,InternalServerErrorException
     */
    async registertheHotel(hotelDto: HotelDTO): Promise<string> {
        try {
           let response= await this.hotelRepo.save(hotelDto);
            if (response) {
                this.logger.log(HOTEL_REGISTERED + `with id ${response.id}`);
                //this.logger.log('created');
                return HOTEL_REGISTERED;
            } else {
                this.logger.error(FAILED_TO_REGISTER)
                throw new HttpException(FAILED_TO_REGISTER, HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            // throw new InternalServerErrorException(err.message);
            this.logger.error(err.message);
                if (err.errno === 1062) {
                throw new ConflictException(HOTEL_EXISTS);
          }
          throw new HttpException(HOTEL_EXISTS, HttpStatus.NOT_ACCEPTABLE);

        }
        }


    /**
     * To search the hotel
     * @param hotelName - Hotelname
     * @returns -HotelDTO[]
     * @throws - HttpException,InternalServerErrorException
     */
    async searchForHotel(hotelName:string):Promise<HotelDTO[]> {
        try {
            let hotels:HotelDTO[] =await this.hotelRepo.find({where:{hotelName:Like(`%${hotelName}%`)}});
            //let itemSearch=await this.foodItemRepo.find()
            console.log(hotels)
            if (hotels.length != 0) {
                this.logger.log(HOTELS_FETCHED);
                return hotels;
                
            } else {
                this.logger.error(HOTELS_FETCH_FAILED)
                throw new HttpException(HOTELS_FETCH_FAILED, HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    /**
     * List of hotels fetched succesfully
     * @returns - HotelDTO[]
     * @throws - HttpException,InternalServerErrorException
     */
    async listOfHotels(): Promise<HotelDTO[]> {
        try {
            let hotels:HotelDTO[] =await this.hotelRepo.find()
            console.log(hotels)
            if (hotels.length !=0 ) {
                this.logger.log(LISTOF_HOTELS_FETCHED);
                return hotels;
                
            } else {
                this.logger.error(HOTELS_FETCH_FAILED)
                throw new HttpException(HOTELS_FETCH_FAILED, HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    /**
     * To fetch hotel and items available in the hotel
     * @param id - hotelId
     * @returns - HotelDTO[]
     * @throws - HttpException,InternalServerErrorException
     */
    async listOfItemsInHotel(id: number): Promise<HotelDTO> {
        try {
            let hotelsAndItems:HotelDTO =await this.hotelRepo.findOne(id,{ relations: ['foodItems'] })
            console.log(hotelsAndItems)
            if (hotelsAndItems) {
                this.logger.log(AVAILABLE_ITEMS);
                return hotelsAndItems;
                
            } else {
                this.logger.error(ITEMS_FETCH_FAILED)
                throw new HttpException(ITEMS_FETCH_FAILED, HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }
}

