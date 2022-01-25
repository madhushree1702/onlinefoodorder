import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { Customer } from './customer.entity';
import { CustomerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { JwtStrategy } from './jwt/jwt.strategy';

/**
 * Customer module
 */
@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: '400s'
      }
    }),
    TypeOrmModule.forFeature([Customer, CustomerRepository])],
  exports:[JwtStrategy,PassportModule],
  controllers: [CustomerController],
  providers: [CustomerService,JwtStrategy]
})

/**
 * Customer module class
 */
export class CustomerModule {}
