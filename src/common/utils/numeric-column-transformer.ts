
/** By default, typeORM converts numbers to text so that no
 * values ​​are lost. This class transforms to a number */
export class NumericColumnTransformer {

  from(data: string): number {
    return Number(data);
  }

  to(data: number): number {
    return data;
  }

}
