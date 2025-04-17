import axiosClient from "@/core/api/axios-client";
import { CategoryMapper } from "@/core/mappers/category.mapper";

export const getCategoriesByBusinessTypeAction = async (
  businessType: string
) => {
  try {
    console.log("businessTypezsadasd", businessType);
    const { data } = await axiosClient.get(
      "util/categories-by-business-type/" + businessType
    );

    const categories = data.data.map((category: any) =>
      CategoryMapper.fromCategoryDBtoCategory(category)
    );

    return {
      status: true,
      data: categories,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
