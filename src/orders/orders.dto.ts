import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { Customer } from "src/customer/customer.entity";
import { FoodItems } from "src/fooditems/fooditems.entity";

/**
 * Orders DTO
 */
export class OrdersDTO {

    /**
     * Id generated automatically
     */
    id: number;

    // /**
    //  * Name of the item
    //  * @type - string
    //  */
    // @IsNotEmpty({message: 'Item name should not be empty'})
    // @IsString({message: 'Item name should be text/string'})
    // itemName: string;

    /**
     * Quantity of the item
     * @type - number
     */
    @IsNumber()
    @IsNotEmpty({message: 'Item quantity should not be empty'})
    @IsPositive({message: 'Mobile number should be positive number'})
    quantity: number;

    /**
     * Rating for the item and order
     * @type - number
     */
    @IsNotEmpty({message: 'Rating should not be empty'})
    @IsNumber()
    rating: number;

    /**
     * customer
     */
    customer: Customer;

    /**
     * Food items variable and class 
     */
    @IsNotEmpty()
    @IsArray()
    foodItems: FoodItems[];
}