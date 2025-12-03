import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseProduct } from 'src/entities/PurchaseProduct';
import { Purchase } from 'src/entities/Purchase';
// import { PurchaseProductService } from 'src/purchase-product/purchase-product.service';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    TypeOrmModule.forFeature([ PurchaseProduct, Purchase ])
  ],
  exports: [
    PaymentModule
  ]

})
export class PaymentModule {}
