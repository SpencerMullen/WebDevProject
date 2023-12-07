import model from "../model";

export const findUserById = (userId: string) => model.findById(userId);