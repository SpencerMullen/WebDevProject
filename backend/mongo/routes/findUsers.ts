import model from "../model";

export const findUserById = (userId: string) => model.findById(userId);

export const findAllUsers = () => model.find();