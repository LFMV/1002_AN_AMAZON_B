import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsUUID, ValidateNested } from 'class-validator';

class ProductDto {
  @IsUUID()
  id: string;
}

class PurchaseDto {
  @IsUUID()
  id: string;
}

export class CreatePurchaseProductDto {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ValidateNested()
  @Type(
    () => ProductDto
  )
  product: ProductDto;

  @ValidateNested()
  @Type(
    () => PurchaseDto
  )
  purchase: PurchaseDto;
}


/** Structure JSON
 *
 * {
  "quantity": 3,
  "product": {
    "id": "e08a0944-b400-48b6-b7a3-098e7e024e28"
  },
  "purchase": {
    "id": "41579397-133d-4bbd-af4e-139ea0737cd0"
  }
}
 */
