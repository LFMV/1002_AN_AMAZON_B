import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from 'src/entities/Purchase';
import { PurchaseProductService } from 'src/purchase-product/purchase-product.service';
import { Repository } from 'typeorm';
import { SavePurchaseDto } from './dto/save-purchase.dto';
import { isUUID } from 'class-validator';
import { PurchaseProduct } from 'src/entities/PurchaseProduct';

@Injectable()
export class PurchaseService {

  private readonly logger = new Logger('PurchaseService');
  constructor(

    @InjectRepository( Purchase )
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly purchaseProductService: PurchaseProductService,


  ) {}

  async save(savePurchaseDto: SavePurchaseDto): Promise<{ message: string }> {

    const purchase = await this.purchaseRepository.save({
      total: savePurchaseDto.total,
      products: savePurchaseDto.products
    });

    this.createPurchaseProducts(purchase.id, savePurchaseDto.products);

    return { message: 'Purchase saved Successfully' };
  }

  private async createPurchaseProducts(
    purchaseId: string,
    products: { id: string; quantity: number }[],
  ) {

    const purchaseProducts = products.map(( product ) => {
      return {
        product: {
          id: product.id,
        },
        quantity: product.quantity,
        purchase: {
          id: purchaseId,
        },
      };
    });

    purchaseProducts.forEach(( purchaseProduct ) => {
      this.purchaseProductService.create( purchaseProduct );
    });

  }

  /**
   * Elimina todos los productos asociados a una compra específica
   * @param purchaseId - ID de la compra
   * @returns Número de productos eliminados
   */
    async deleteProductsByPurchaseId( purchaseId: string ) {

      console.log(purchaseId)
      try {
         if( isUUID(purchaseId ) ){

          const ans = await this.purchaseRepository
                      .createQueryBuilder()
                      .delete()
                      .from(PurchaseProduct)
                      .where(`purchaseId = :purchaseId`, { purchaseId})
                      .execute()

              this.logger.log(`Deleted ${ans.affected} products for purchase ${purchaseId}`)
              return {
              delete: ans.affected
              }
         }


      } catch (error) {
        this.logger.error(`Error deleting products for purchase ${purchaseId}: Error!!! - ${error}`)
        throw error;
      }
    }

    //  Elimina productos cargándolos primero (útil si tienes hooks o cascadas)
    async deleteProductsByPurchaseIdWithLoad(id: string) {
    try {

      const products = await this.purchaseRepository.find({
        where: { id }
      });

      if (products.length === 0) {
        return {
          deleted: 0,
          id,
          message: 'No products found for this purchase'
        };
      }

      await this.purchaseRepository.remove(products);

      this.logger.log(`Deleted ${products.length} products for purchase ${id}`);

      return {
        deleted: products.length,
        id
      };

    } catch (error) {
      this.logger.error(`Error deleting products for purchase ${id}`, error);
      throw error;
    }
  }

  // En tu purchase.service.ts. not working
    async remove(id: string) {

      // Opción 1: Usar remove() - activa las cascadas de TypeORM
      const purchase = await this.purchaseRepository.findOne({
        where: { id },
        relations: ['purchaseProducts'] // carga los productos
      });

      if (!purchase) {
        throw new NotFoundException(`Purchase with id ${id} not found`);
      }

      // Esto borrará purchase Y sus products por la cascada
      await this.purchaseRepository.remove(purchase);

      return { deleted: true, id };

 }

}
