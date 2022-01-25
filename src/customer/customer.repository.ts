import { EntityRepository, Repository } from "typeorm";
import { Customer } from "./customer.entity";

/**
 * Entity repository used to connect with database using TypeOrm
 */
@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer>{
    
}