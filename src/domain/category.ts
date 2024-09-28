import { HTTPException } from "hono/http-exception";
import { findCategoryById, findCategoryByName } from "../repository/category";

export const checkDuplicateName = async (name: string) => {
	const existingCategory = await findCategoryByName(name);
	if (existingCategory.length > 0) {
		throw new HTTPException(400, {
			message: "A category with the same name already exists",
		});
	}
};

export const checkExistCategory = async (categoryId: string) => {
	const existingCategory = await findCategoryById(categoryId);
	if (existingCategory.length === 0) {
		throw new HTTPException(400, {
			message: "The specified category does not exist",
		});
	}
};
