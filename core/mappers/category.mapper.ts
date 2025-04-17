import { Category } from "../interfaces/category.interface";

export class CategoryMapper {
  static fromCategoryDBtoCategory(category: any): Category {
    return {
      id: category._id,
      name: category.name,
      businesstype: category.businesstype,
    };
  }
}
