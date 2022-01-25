import { IsEmail, IsNotEmpty, IsPositive, Length } from "class-validator";
import { FoodItems } from "src/fooditems/fooditems.entity";
/**
 * To declare the properties required.
 */
export class HotelDTO{

    /**
     * Name of the hotel
     * @type - string
     */
    @IsNotEmpty({message:"Name of the hotel should not be empty"})
    hotelName:string;

    /**
     * Address of the hotel
     * @type - string
     */
    @IsNotEmpty({message:"address of the hotel should not be empty"})
    address:string;

    /**
     * Contact number of the hotel
     * @type - string
     */
    @IsNotEmpty({message:"contact of the hotel should not be empty"})
    // @Length(10,11,{message:"contact number should be minimum of 10"})
    contactNumber:string;

    /**
     * Email Id of the hotel
     * @type - string
     */
    @IsNotEmpty({message:"email Id of the hotel should not be empty"})
    @IsEmail()
    hotelEmailId:string;

    /**
     * Rating of the hotel
     * @type - number
     */
    @IsNotEmpty({message:"Rating of the hotel should not be empty"})
    @IsPositive()
    hotelRating:number;

    /**
     * FoodItems
     */
    foodItems:FoodItems[]

}