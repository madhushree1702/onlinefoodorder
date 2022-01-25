import { HttpException, Injectable, Logger, HttpStatus, InternalServerErrorException, ConflictException } from '@nestjs/common';
import { FAILED_TO_ADD, FAILED_TO_FETCH, ITEM_ADDED, ITEMS_FETCHED, FOODITEM_EXISTS } from 'src/constant';
import { FoodItemsDTO } from './dto/fooditems.dto';
import { FoodItemsRepository } from './fooditems.repository';

/**
 * To write business logics
 */
@Injectable()
export class FooditemsService {
    /**
     * To create instance for FoodItemsRepository by DI
     * @param foodItemRepo - FoodItemsRepository
     */
    constructor(private foodItemRepo: FoodItemsRepository) { }

    logger = new Logger(FooditemsService.name);

    /**
     * To add the food item
     * @param foodItemsDto - FoodItemsDTO
     * @returns - Success Or failure message
     * @throws - HttpException,InternalServerErrorException
     */
    async addFoodItem(foodItemsDto: FoodItemsDTO): Promise<string> {

        try {
            let food:FoodItemsDTO = await this.foodItemRepo.save(foodItemsDto);
            if (food) {
                this.logger.log(ITEM_ADDED + `with id ${food.id}`);
                //this.logger.log('created');
                return ITEM_ADDED;
            } else {
                this.logger.error(FAILED_TO_ADD)
                throw new HttpException(FAILED_TO_ADD, HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }

    }
    
    /**
     * To fetch the items by name
     * @param name - itemName
     * @returns - FoodItemsDTO[]
     * @throws - HttpException,InternalServerErrorException
     */
    async searchFoodItem(name: string): Promise<FoodItemsDTO[]> {
        try {
            let itemSearch:FoodItemsDTO[] = await this.foodItemRepo.itemSearch(name);
            //let itemSearch=await this.foodItemRepo.find()
            console.log(itemSearch)
            if (itemSearch.length!=0) {
                this.logger.log(ITEMS_FETCHED);
                return itemSearch;
                
            } else {
                this.logger.error(FAILED_TO_FETCH)
                throw new HttpException(FAILED_TO_FETCH, HttpStatus.BAD_REQUEST)
            }
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

}
