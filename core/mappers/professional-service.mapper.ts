import { ProfessionalService } from "../interfaces/professional-service.interface";

export class ProfessionalServiceMapper {
  static fromProfessionalServideDBToProfessionalService(
    professionalService: any
  ): ProfessionalService {
    return {
      id: professionalService._id,
      name: professionalService.name,
      subCategories: professionalService.subCategories.map(
        (subcategory: any) => ({
          id: subcategory._id,
          name: subcategory.name,
          categoryId: subcategory.categoryId,
          service: {
            id: subcategory.service._id,
            status: subcategory.service.status,
            price: subcategory.service.price,
            duration: subcategory.service.duration,
            business: subcategory.service.business,
            category: subcategory.service.category,
            subCategory: subcategory.service.subCategory,
            isAssignedToProfessional:
              subcategory.service.isAssignedToProfessional,
          },
        })
      ),
    };
  }
}
