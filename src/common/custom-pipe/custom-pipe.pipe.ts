import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

/**
 * Injectable
 */
@Injectable()

/**
 * Implementing custom pipe
 */
export class CustomPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        let fmtValue = parseInt(value);
        return fmtValue;
    }
    
}