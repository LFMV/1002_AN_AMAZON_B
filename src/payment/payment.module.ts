import { Module, forwardRef } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseProduct } from 'src/entities/PurchaseProduct';
import { Purchase } from 'src/entities/Purchase';
import { PurchaseModule } from 'src/purchase/purchase.module';
// import { PurchaseProductService } from 'src/purchase-product/purchase-product.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    TypeOrmModule.forFeature([ PurchaseProduct, Purchase ]),
    forwardRef(() => PurchaseModule),
  ],
  exports: [
    PaymentService
  ]

})
export class PaymentModule {}
