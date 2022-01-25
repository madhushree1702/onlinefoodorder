import { IsEmail, IsNotEmpty } from "class-validator";

/**
 * Login DTO
 */
export class LogInDTO{

    /**
     * Email Id
     */
    @IsNotEmpty({message:'email should not be empty'})
    @IsEmail({message:'enter valid email id'})
    emailId:string;

    /**
     * Password
     */
    @IsNotEmpty({message:'password should not be empty'})
    password:string;
}