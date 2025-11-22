import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UserService } from './user.service'
import { Reflector } from '@nestjs/core'
import { permission } from 'process'

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService

  @Inject(Reflector)
  private reflector: Reflector //meta data dây là 1 decorator của nest

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //1.get infor user from request
    const request: Request = context.switchToHttp().getRequest()
    const user = request['user']

    if (!user) {
      throw new UnauthorizedException('User not found in request')
    }

    //check permission logic here
    const permissions = await this.userService.getPermissionsByUserId(user.id)
    if (!permissions) {
      throw new UnauthorizedException('No permissions found for user')
    }

    /*
      permissions = [
          "ADD_USER",
          "EDIT_USER",
          "DEL_USER"
      ]
    */

    const requiredPermissions = this.reflector.get<string[]>(
      'permissions',
      context.getHandler(),
    )

    for (let i = 0; i < requiredPermissions.length; i++) {
      const rp = requiredPermissions[i]
      if (!permissions.includes(rp)) {
        throw new UnauthorizedException(`User lacks required permission: ${rp}`)
      }
    }
    
    return true
  }
}
