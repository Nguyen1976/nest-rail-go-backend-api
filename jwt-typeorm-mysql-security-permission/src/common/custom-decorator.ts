import { SetMetadata } from '@nestjs/common'

export const IS_PERMITALL = 'isPermitAll'
export const permitAll = () => {
  return SetMetadata(IS_PERMITALL, true)
}

export const IS_REQUIRED_PERMISSIONS = 'requiredPermissions'
export const RequiredPermissions = (permissions: string[]) => {
  return SetMetadata(IS_REQUIRED_PERMISSIONS, permissions)
}
