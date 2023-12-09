import model from "../model";

export const findUserById = async (userId: string) => model.findById(userId);

export const findAllUsers = () => model.find();