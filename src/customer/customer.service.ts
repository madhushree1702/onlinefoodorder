import { ConflictException, HttpException, HttpStatus, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CustomerRepository } from './customer.repository';
import { CustomerDTO } from './dto/customer.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { CUSTOMER_EXISTS, CUSTOMER_REGISTERED } from 'src/constant';
import { LogInDTO } from './dto/logindto';
import { JwtPayload } from './jwt/jwt-payload.interface';

/**
 * To write business logics
 */
@Injectable()
export class CustomerService {

    /**
     * To create instance using DI
     * @param customerRepo - CustomerRepository
     * @param jwtService - JwtService
     */
    constructor(private customerRepo:CustomerRepository,
        private jwtService:JwtService){

    }

    logger=new Logger(CustomerService.name)

    /**
     * To register the customer
     * @param customer - CustomerDTO
     * @returns - Success or failure message
     */
    async registerTheCustomer(customer:CustomerDTO): Promise<string> {
        try {
          const { password } = customer;
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(password, salt);
          const response = await this.customerRepo.save({
            ...customer,
            password: hashedPassword,
          });
          if (response) {
            this.logger.log(CUSTOMER_REGISTERED+`with id ${response.id}`);
            return CUSTOMER_REGISTERED;
          } else {
            throw new InternalServerErrorException(CUSTOMER_EXISTS);
          }
        } catch (err) {
          this.logger.error(err.message);
          if (err.errno === 1062) {
            throw new ConflictException(CUSTOMER_EXISTS);
          }
          throw new HttpException(CUSTOMER_EXISTS, HttpStatus.NOT_ACCEPTABLE);
        }
    }
  
   /**
   * To login the registered user
   * @param userLogin - LoginDTO
   * @returns - token
   */
  async loginTheCustomer(customerLogin: LogInDTO): Promise<{ token }> {
    try {
      const userInfo = await this.customerRepo.findOneOrFail({
        emailId: customerLogin.emailId,
      });
      if (
        userInfo &&
        (await bcrypt.compare(customerLogin.password, userInfo.password))
      ) {
        const payload: JwtPayload = { emailId: userInfo.emailId };
        const token = this.jwtService.sign(payload);
        this.logger.log('customer logged in successfully');
        return { token };
      } else {
        throw new UnauthorizedException(`Invalid credentials`);
      }
    } catch (error) {
      this.logger.error(error.message);
      if (error?.status === 401) {
        throw new UnauthorizedException(`Invalid Credentials`);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
