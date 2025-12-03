import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsPositive,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class CartProduct {
  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsUUID()
  id: string;
}

export class SavePurchaseDto {
  @IsNumber()
  @IsPositive()
  total: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(
    () => CartProduct
  )
  products: CartProduct[];
}

/** Structure JSON
 *
 * {
  "total": 1200.50,
  "products": [
    {
      "quantity": 2,
      "id": "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11"
    },
    {
      "quantity": 1,
      "id": "123e4567-e89b-12d3-a456-426614174000"
    },
    {
      "quantity": 5,
      "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479"
    }
  ]
}
 *
 */
