import { Module, forwardRef } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from 'src/entities/Purchase';
import { PurchaseProductService } from 'src/purchase-product/purchase-product.service';
import { PurchaseProduct } from 'src/entities/PurchaseProduct';
import { PaymentModule } from 'src/payment/payment.module';

@Module({
  controllers: [ PurchaseController ],
  providers: [ PurchaseService, PurchaseProductService ],
  imports: [ 
    TypeOrmModule.forFeature([ Purchase, PurchaseProduct ]),
    forwardRef(() => PaymentModule),
  ],
  exports: [ PurchaseService ],
})
export class PurchaseModule {}
