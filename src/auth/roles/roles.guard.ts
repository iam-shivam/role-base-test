import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../roles.decorator';
import { Role } from '../roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
  const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
    context.getHandler(),
    context.getClass(),
  ]);
  console.log(requiredRoles);
  if (!requiredRoles) return true;

  const { user } = context.switchToHttp().getRequest();
  console.log(context.switchToHttp().getRequest())  
  console.log('RolesGuard: user:', user);
  // console.log('RolesGuard: user:', user.role);
  if (!user || !user.role) {
    console.warn('RolesGuard: user or user.role is undefined');
    return false;
  }
console.log('RolesGuard: user role:', user.role);
console.log(requiredRoles.includes(user.role))
  return requiredRoles.includes(user.role);
}

}
