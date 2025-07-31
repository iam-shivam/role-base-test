import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    console.log('Guard Check - user:', user);
    console.log('Guard Check - error:', err);
    console.log('Guard Check - info:', info);
    console.log('Guard Check - context:', context.getHandler().name);
    return super.handleRequest(err, user, info, context, status); // ✅ Pass all args to super
  }
}
