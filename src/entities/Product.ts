import { NumericColumnTransformer } from 'src/common/utils/numeric-column-transformer';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { PurchaseProduct } from './PurchaseProduct';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  urlImg: string;

  @Column({ default: 0, transformer: new NumericColumnTransformer() })
  reviews: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: new NumericColumnTransformer(),
  })
  price: number;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: true,
    transformer: new NumericColumnTransformer(),
  })
  previousPrice: number;

  @OneToMany(
    () => PurchaseProduct, // Type of entity that the function will use
    (purchaseProduct) => purchaseProduct.product, // An instance is generated in the purchaseProduct field
  )
  purchaseProducts: Relation<PurchaseProduct[]>;
}
