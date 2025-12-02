import { Type } from 'class-transformer';

import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsPositive,
  IsString,
  IsUrl,
  IsUUID,
  ValidateNested,
} from 'class-validator';

class ProductDto {

  @IsUUID()
  id: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  urlImg: string;

  // @IsNumber()
  // @IsPositive()
  // quantity: number;

}

class CheckoutProduct {
  @IsObject()
  // verify that it meets the specifications ProductDto
  @ValidateNested() // each: true = ensure that it meets the specification
  @Type(
    () => ProductDto // return constructor
  )
  product: ProductDto;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CheckoutDto {
  @IsNumber()
  @IsPositive()
  total: number;

  @IsArray()
  @ArrayMinSize(1)
  // verify that it meets the specifications CheckoutProduct
  @ValidateNested({ each: true }) // each: true = ensure that it meets the specification
  @Type(
    () => CheckoutProduct // return constructor
  )
  products: CheckoutProduct[];
}

/** Structure JSON
 *
 * {
  "total": 100,
  "products": [
    {
      "product": {
        "id": "08535c28-5465-4eaa-9623-f92e634b8051",
        "price": 50,
        "name": "Product",
        "urlImg": "https://example.com/img.jpg"
      },
      "quantity": 2
    }
  ]
}
 *
 */
