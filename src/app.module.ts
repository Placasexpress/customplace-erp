import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { EmailModule } from 'mailersend/lib/modules/Email.module';
import { ProfileModule } from './modules/user/modules/profile/profile.module';
import { AddressModule } from './modules/address/address.module';
import { ProductModule } from './modules/product/product.module';
import { CompanyModule } from './modules/company/company.module';
import { MarketplaceProfileModule } from './modules/company/modules/marketplaceProfile/marketplace-profile.module';
import { CategoryModule } from './modules/category/category.module';
import { ClientModule } from './modules/client/client.module';
import { StepModule } from './modules/step/step.module';
import { OrderModule } from './modules/order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    EmailModule,
    ProfileModule,
    AddressModule,
    ProductModule,
    CompanyModule,
    MarketplaceProfileModule,
    CategoryModule,
    ClientModule,
    StepModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
