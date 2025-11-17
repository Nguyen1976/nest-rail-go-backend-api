import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest()

    const token = request.headers['authorization']?.split(' ')[1]

    if (token) {
      try {
        const decoded = this.jwtService.verify(token)
        if (decoded) {
          request['user'] = decoded
          return true
        }
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token')
      }
    }
    return false
  }
}

//nest g guard login --no-spec --flat
