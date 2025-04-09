export interface ServiceInfo {
  id: string;
  status: boolean;
  price: number;
  duration: number;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
  service: ServiceInfo;
}

export interface Service {
  id: string;
  name: string;
  subCategories: SubCategory[];
}
