import { Body, Controller, Logger, Param, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CheckoutDto } from './dto/checkout.dto';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {

  private readonly logger = new Logger('PaymentController')

  constructor(

    private readonly paymentService: PaymentService

  ) {}

  @Post('checkout')
  checkout( @Body() checkoutDto: CheckoutDto ) {

    return this.paymentService.checkout( checkoutDto );

  }

}
