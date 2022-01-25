import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { CustomerRepository } from "../customer.repository";
import { JwtPayload } from "./jwt-payload.interface";

/**
 * JWT Strategy
 */
@Injectable()

/**
 * JwtStrategy class
 */
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private customerRepo: CustomerRepository){
        super({
            secretOrKey:'topSecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }
    async validate(payload: JwtPayload){
        try{
            let response=this.customerRepo.findOneOrFail({emailId: payload.emailId})
            return response;
        }catch(error){
            throw new HttpException(error.message,HttpStatus.UNAUTHORIZED)
        }
    }
}