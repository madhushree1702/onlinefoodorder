import { EntityRepository, Like, Repository } from "typeorm";
import { FoodItemsDTO } from "./dto/fooditems.dto";
import { FoodItems } from './fooditems.entity';

/**
 * To connect to database and to write 
 */
@EntityRepository(FoodItems)
export class FoodItemsRepository extends Repository<FoodItems>{

    /**
     * To fetch the items available with that name
     * @param name - itemName
     * @returns - List of items with that name
     */
    itemSearch(name:string):Promise<FoodItemsDTO[]>{
       return this.find({where:{name:Like(`%${name}%`)}});
    }
}
// .where("user.firstName like %:name%", { name: firstName })
// return this.find({ select: ['name','ingredients','description','foodType'], where: { name: Like(`${name}`) } });