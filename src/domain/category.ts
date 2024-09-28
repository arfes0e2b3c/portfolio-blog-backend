import { HTTPException } from "hono/http-exception";
import { findCategoryByName } from "../repository/category";

export const checkDuplicateName = async (name: string) => {
	const existingCategory = await findCategoryByName(name);
	if (existingCategory.length > 0) {
		throw new HTTPException(400, {
			message: "A category with the same name already exists",
		});
	}
};
