import { Orders } from "src/orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Role } from "./roles/roles.decorator";

/**
 * All the entities of the customer
 */
@Entity()
@Unique(['emailId'])
export class Customer{

    /**
     * Id is auto generated
     */
    @PrimaryGeneratedColumn()
    id:number

    /**
     * Name of the customer
     * @type - string
     */
    @Column()
    customerName:string

    /**
     * Email Id of the customer
     * @type - string
     */
    @Column()
    emailId:string

    /**
     * Password 
     * @type - string
     */
    @Column()
    password:string

    /**
     * Place
     * @type - string
     */
    @Column()
    place:string

    /**
     * Phone number
     * @type - number
     */
    @Column()
    phoneNumber:string

    /**
     * Roles
     */
    @Column({ type: 'enum', enum: Role, default: Role.Customer })
    role:Role;

    /**
     * Relationship between order and customer
     */
    @OneToMany(()=>Orders,(orders)=>orders.customer)
    orders:Orders[];
}