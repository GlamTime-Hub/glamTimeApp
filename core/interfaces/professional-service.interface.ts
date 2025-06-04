export interface ServiceInfo {
  id: string;
  status: boolean;
  price: number;
  duration: number;
  business: string;
  category: string;
  subCategory: string;
  isAssignedToProfessional: boolean;
}

export interface SubCategoryWithService {
  id: string;
  name: string;
  categoryId: string;
  service: ServiceInfo;
}

export interface ProfessionalService {
  id: string;
  name: string;
  subCategories: SubCategoryWithService[];
}
