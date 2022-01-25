import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { Code } from "typeorm";

/**
 * Interceptor
 */
@Injectable()

/**
 * Displaying Http status code
 */
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log("in interceptor")
        let statusCode = context.switchToHttp().getResponse().statusCode;
        let response = next.handle().pipe(map(data=> {
            return {
                data,
                statusCode: statusCode
            }
        }))

        /**
         * @returns response
         */
        return response;
    }
    
}