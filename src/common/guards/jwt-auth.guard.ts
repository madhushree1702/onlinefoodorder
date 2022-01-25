import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

/**
 * JwtAuthGuard for authorization
 */
@Injectable()

/**
 * JwtAuthGuard class
 */
export class JwtAuthGuard extends AuthGuard('jwt') {}