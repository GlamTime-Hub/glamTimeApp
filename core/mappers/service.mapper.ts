import { Service } from "../interfaces/service.interface";

export class ServiceMapper {
  static fromServiceDBToService(service: any): Service {
    return {
      id: service._id,
      name: service.name,
      subCategories: service.subCategories.map((subcategory: any) => ({
        id: subcategory._id,
        name: subcategory.name,
        categoryId: subcategory.categoryId,
        service: {
          id: subcategory.service._id,
          status: subcategory.service.status,
          price: subcategory.service.price,
          duration: subcategory.service.duration,
        },
      })),
    };
  }
}
