import { EntityRepository, Repository } from "typeorm";
import { Hotels } from './hotels.entity';

/**
 * To connect to database and hotels table
 */
@EntityRepository(Hotels)
export class HotelRepository extends Repository<Hotels>{

}