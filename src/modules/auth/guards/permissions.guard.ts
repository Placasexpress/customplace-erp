import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../prisma/prisma.service';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { AuthRequest } from '../models/AuthRequest';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.get<string[]>(
      PERMISSIONS_KEY,
      context.getHandler(),
    );

    if (!requiredPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest<AuthRequest>();

    const userId = request.user?.id;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    const userPermissions = await this.prisma.userPermissions.findMany({
      where: { userId },
      select: { permission: true },
    });

    const userPermissionNames = userPermissions.map((up) => up.permission.name);

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissionNames.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException(
        'User does not have the required permissions',
      );
    }

    return true;
  }
}
