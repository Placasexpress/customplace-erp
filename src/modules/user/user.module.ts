import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, EmailService],
  exports: [UserService],
})
export class UserModule {}
