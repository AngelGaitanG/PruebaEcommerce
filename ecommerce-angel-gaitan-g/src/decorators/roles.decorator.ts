import { SetMetadata, applyDecorators } from "@nestjs/common";
import { Role } from "src/auth/role.enum";

export const Roles = (...roles: Role[]) => {
    return applyDecorators(SetMetadata('roles', roles))
}