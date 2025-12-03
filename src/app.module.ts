import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { PaymentModule } from './payment/payment.module';
import { PurchaseProductModule } from './purchase-product/purchase-product.module';
import { PurchaseModule } from './purchase/purchase.module';

@Module({
  imports: [ ProductsModule, DatabaseModule, PaymentModule, PurchaseProductModule, PurchaseModule ],
})
export class AppModule { }
