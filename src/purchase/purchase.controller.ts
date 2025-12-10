import { Body, Controller, Delete, Logger, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { SavePurchaseDto } from './dto/save-purchase.dto';
import { PurchaseService } from './purchase.service';
import { PaymentService } from 'src/payment/payment.service';

@Controller('purchase')
export class PurchaseController {
  private readonly logger = new Logger('PurchaseController');

  constructor(
    private readonly purchaseService: PurchaseService,
  ) {}

  @Post()
  async save( @Body() savePurchaseDto: SavePurchaseDto ) {

    return await this.purchaseService.save( savePurchaseDto );

  }

  @Delete(':id')
  async remove( @Param('id', ParseUUIDPipe) id: string ){

  this.logger.log(id)
  return this.purchaseService.remove( id );

  }

}
