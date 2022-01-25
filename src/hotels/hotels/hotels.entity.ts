import { FoodItems } from "src/fooditems/fooditems.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"

/**
 * Entity to create Hotels table in database
 */
@Entity()
@Unique(['hotelName'])
export class Hotels{

    /**
     * Id is auto generated
     */
    @PrimaryGeneratedColumn()
    id:number

    /**
     * Name of the hotel
     * @type - string
     */
    @Column()
    hotelName:string

    /**
     * Address of the hotel
     * @type - string
     */
    @Column()
    address:string

    /**
     * Contact number of the hotel
     * @type - number
     */
    @Column()
    contactNumber:string

    /**
     * Email Id of the hotel
     * @type - string
     */
    @Column()
    hotelEmailId:string

    /**
     * Rating of the hotel
     * @type - number
     */
    @Column()
    hotelRating:number

    /**
     * Relationship between fooditems and hotel
     */
    @OneToMany(()=>FoodItems,(foodItems)=>foodItems.hotels)
    foodItems:FoodItems[];

}