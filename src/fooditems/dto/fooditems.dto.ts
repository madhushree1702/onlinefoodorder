import { IsNotEmpty, IsPositive } from "class-validator";
/**
 * To declare the required properties
 */
export class FoodItemsDTO {
     
    /**
     * Id is auto generated
     */
    id:number;
    
    /**
     * Name of the food item
     * @type - string
     */
    @IsNotEmpty({ message: "Name of food item should not be empty" })
    name: string;

    /**
     * Amount of the food item
     * @type - number
     */
    @IsNotEmpty({ message: "amount of food item should not be empty" })
    @IsPositive({ message: "amount should be positive" })
    amount: number;

    /**
     * Ingredients of the food items
     * @type - string
     */
    @IsNotEmpty({ message: "Ingridients of food item should not be empty" })
    ingredients: string;

    /**
     * Description about the food items
     * @type - string
     */
    @IsNotEmpty({ message: "description should not be empty" })
    description: string;

    /**
     * It describes the food type whether the food item is veg or nonveg
     */
    @IsNotEmpty({ message: "Type of food should be mentioned veg or nonveg" })
    foodType:string;
}