import { Product } from 'src/entities/Product';
import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import Stripe from 'stripe';
import { envs } from 'src/config/envs';
import { Purchase } from 'src/entities/Purchase';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { PurchaseService } from 'src/purchase/purchase.service';
import { string } from 'joi';
import { isUUID } from 'class-validator';
import { PurchaseProduct } from 'src/entities/PurchaseProduct';

@Injectable()
export class PaymentService {

  stripe;
  private readonly logger = new Logger('PaymentService')

  constructor(

    @InjectRepository(Purchase)
    private readonly parchaseRepository: Repository<Purchase>,
    private readonly PurchaseProductService: PurchaseService,

  ) {

    this.stripe = new Stripe( envs.stripe.secretKey );

  }

  async checkout(checkoutDto: CheckoutDto): Promise<{ checkoutUrl: string }> {

    console.log('checkoutDto',checkoutDto)
    // // save Purchase
    // const purchase = await this.parchaseRepository.save({
    //   total: checkoutDto.total,
    // });

    //
    const products = checkoutDto.products.map( (product) => ({
      id: product.product.id,
      quantity: product.quantity
    }))

    const save =  await this.PurchaseProductService.save({
      total: checkoutDto.total,
      products: products,
    })

    const result: any = {}
    // Error
    if (!result.url) {
      throw new InternalServerErrorException();
    }

    // await this.productRepository.save( checkoutDto )

    return {
      checkoutUrl: result.url,
    };
  }

  // create product of PurchaseProducts (order products)
    // await this.createPurchaseProducts( purchase.id, checkoutDto.products, );

    // const result = await this.stripe.checkout.sessions.create({

    //   line_items: checkoutDto.products.map(({ product, quantity }) => {
    //     return {

    //         price_data: {

    //           currency: 'USD',
    //           product_data: {
    //             name: product.name,
    //             images: [product.urlImg],
    //           },
    //           unit_amount: product.price * 100,

    //         },
    //         quantity: quantity,

    //     };
    //   }),
    //   mode: 'payment',
    //   payment_method_types: ['card'],
    //   // success_url: 'https://amazon-front-gamma.vercel.app/payment/success',
    //   // cancel_url: 'https://amazon-front-gamma.vercel.app/',
    //   success_url: 'https://localhost:4200/payment/success',
    //   cancel_url: 'https://localhost:4200',

    // });


  // private async createPurchaseProducts(
  //   purchaseId: string,
  //   products: CreateProductDto[],
  // ) {
  //     const purchaseProducts = products.map( (item) => {
  //       return {
  //         product: {
  //           id: item.product.id, // Acceder al id del ProductDto anidado
  //         },
  //         quantity: item.quantity,
  //         purchase: {
  //           id: purchaseId,
  //         },
  //       };
  //     });

  //   // Guardar en paralelo o secuencialmente
  //   await Promise.all(
  //     purchaseProducts.map( (pp) =>
  //       this.PurchaseProductService.save(pp)
  //     )
  //   );
  // }

}
