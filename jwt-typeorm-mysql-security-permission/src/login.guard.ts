import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { IS_PERMITALL } from './common/custom-decorator'

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService

  @Inject()
  private reflector: Reflector

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //check req public
    const isPermitAll = this.reflector.getAllAndOverride(IS_PERMITALL, [
      context.getHandler(),
      context.getClass(),
    ])

    if (isPermitAll) {
      return true
    }

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
