import { IsEmail, IsNotEmpty, IsPositive, IsString, Length } from "class-validator";

/**
 * Customer DTO
 */
export class CustomerDTO {

    /**
     * Customer Name
     */
    @IsString()
    @Length(3,8,{message: 'Customer Name should be minimum of 3 digits and maximum of 8 digits' })
    customerName: string;

 
    /**
     * Email Id of the customer
     */
    @IsEmail()
    @IsNotEmpty()
    emailId: string;
    

    /**
     * Password of the customer
     */
    @IsNotEmpty()
    @Length(8,10,{message: 'password should be minimum of 8 digits and maximum of 10 digits' })
    password: string;
    
    /**
     * Place
     */
    @IsNotEmpty()
    place:string

    /**
     * Phone number of the customer
     */
    @IsNotEmpty()
    phoneNumber:string;


}
