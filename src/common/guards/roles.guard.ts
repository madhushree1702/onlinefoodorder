import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ROLES_KEY } from "src/customer/roles.enum";
import { Role } from "src/customer/roles/roles.decorator";
import { Reflector } from "@nestjs/core";

/**
 * Roles Guard
 */
@Injectable()

/**
 * RolesGuard class
 */
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        console.log(requiredRoles)
        if (!requiredRoles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        console.log(user);
        return requiredRoles.some((role) => user.role?.includes(role));
    }
}