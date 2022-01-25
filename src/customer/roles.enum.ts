import { SetMetadata } from "@nestjs/common";
import { Role } from "./roles/roles.decorator";

/**
 * To define roles
 */
export const ROLES_KEY='roles';

/**
 * ROLES_KEY
 * @param roles 
 * @returns 
 */
export const Roles=(...roles:Role[])=>SetMetadata(ROLES_KEY,roles);