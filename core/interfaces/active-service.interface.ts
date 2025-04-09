export interface ActiveService {
  name: string;
  businessId: string;
  categoryId: string;
  subcategoryId: string;
  duration: number;
  price: number;
  status: boolean;

  serviceId?: string;
}
