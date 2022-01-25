import { EntityRepository, Repository } from "typeorm";
import { OrderStatus } from "./order-status.enum";
import { Orders } from "./orders.entity";

/**
 * Entity repository used to connect with database using TypeOrm
 */
@EntityRepository(Orders)
export class OrdersRepository extends Repository<Orders> {

    /**
     * To give rating for the order
     * @param id 
     * @param rating 
     * @returns 
     */
    async changeRating(id:number, rating: number){
        return await this
        .createQueryBuilder()
        .update(Orders)
        .set({rating: rating})
        .where("id = :id", { id })
        .execute();
    }

    /**
     * Status of the order
     * @param id 
     * @returns 
     */
    async cancelOrder(id: number) {
        return await this
        .createQueryBuilder()
        .update(Orders)
        .set({status: OrderStatus.Cancelled})
        .where("id = :id", { id })
        .execute();
    }
}