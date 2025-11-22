import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserService } from './user.service'

@Injectable()
export class PermissionRabcGuard implements CanActivate {
  @Inject(UserService)
  private userService: UserService

  @Inject()
  private reflector: Reflector

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //get user from context
    const userContext = context.switchToHttp().getRequest().user

    if (!userContext) {
      return true
    }

    // const userPermissions = await this.userService.getRolesByUserId(
    //   userContext.userId,
    // )

    //Chỉ cần lấy ra role và quyền của role đó và so sánh với permit required là được
    return true
  }
}
