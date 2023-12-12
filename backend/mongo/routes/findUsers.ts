import model from "../model";

export const findUserById = async (id: string) => await model.findById(id);

export const findAllUsers = async () => await model.find();

export const findUserByUsername = async (username: string) => await model.findOne({ username: username });