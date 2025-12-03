import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUrl()
  urlImg: string;

  @IsNumber()
  @IsOptional()
  previousPrice: number;

  @IsNumber()
  @IsOptional()
  reviews: number;
}

/** Structure JSON
 *
 * {
  "name": "Zapatos Deportivos Airmax",
  "description": "Unos zapatos deportivos muy cómodos y ligeros para correr largas distancias.",
  "price": 150.00,
  "urlImg": "ejemplo.com",
  "previousPrice": 180.00,
  "reviews": 4
  }
 */
