import { Hotels } from "src/hotels/hotels/hotels.entity";
import { Orders } from "src/orders/orders.entity";
import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

/**
 * To create FoodItems table in database
 */
@Entity()
export class FoodItems{

    /**
     * Id is auto generated 
     */
    @PrimaryGeneratedColumn()
    id:number;

    /**
     * Name of the food item
     * @type - string
     */
    @Column()
    name:string;

    /**
     * Amount of the food item
     * @type - number
     */
    @Column()
    amount:number;

    /**
     * what are all the ingredients of the food item
     * @type - string
     */
    @Column()
    ingredients:string;

    /**
     * Description about food
     * @type - string
     */
    @Column()
    description:string;

    /**
     * whether the food is veg type or nonveg type
     * @type - string 
     */
    @Column()
    foodType:string;

    /**
     * Many to one relationship for hotels and foodItems
     */
    @ManyToOne(()=>Hotels, hotels=> hotels.foodItems, {cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE' })
    hotels: Hotels;

    // @ManyToOne(()=>Orders, orders=> orders.foodItems, {cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE' })
    // orders: Orders;

    /**
     * Many to many relationship for order and food items
     */
    @ManyToMany(() => Orders, (orders) => orders.foodItems)
    orders: Orders[];
}