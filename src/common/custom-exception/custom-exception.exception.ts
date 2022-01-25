import {HttpException, HttpStatus} from "@nestjs/common";

/**
 * For handling exception like HttpStatus NOT_FOUND
 */
export class CustomException extends HttpException {
    constructor (message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}