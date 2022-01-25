import { Customer } from "src/customer/customer.entity";
import { FoodItems } from "src/fooditems/fooditems.entity";
import { JoinTable } from "typeorm";
import { Column, Entity, ManyToOne, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderStatus } from "./order-status.enum";

/**
 * All the entities of the orders
 */
@Entity()

export class Orders {

    /**
     * Id is auto generated
     */
    @PrimaryGeneratedColumn()
    id: number;

    // /**
    //  * Name of the item
    //  * @type - string
    //  */
    // @Column()
    // itemName: string;

    /**
     * Quantity of the item
     * @type - number
     */
    @Column()
    quantity: number;

    /**
     * Rating for the service
     * @type - number
     */
    @Column({ default: 0 })
    rating: number;

    /**
     * Order status
     */
    @Column({type: 'enum', default: OrderStatus.Placed, enum: OrderStatus})
    status: OrderStatus;

    /**
     * Many to one relation between order and customer
     */
    @ManyToOne(()=>Customer, customer=> customer.orders, {cascade: ['insert', 'update', 'remove'], onDelete: 'CASCADE' })
    customer: Customer;

    /**
     * Many to many relation between fooditems and order
     */
    @ManyToMany(() => FoodItems, (foodItems) => foodItems.orders)
    @JoinTable()
    foodItems: FoodItems[];
}
