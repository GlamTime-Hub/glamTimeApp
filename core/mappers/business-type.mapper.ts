import { BusinessType } from "../interfaces/business-type.interface";

export class BusinessTypeMapper {
  static fromBusinessTypeDBtoBusinessType = (
    businessType: any
  ): BusinessType => {
    return {
      id: businessType._id,
      type: businessType.type,
    };
  };
}
