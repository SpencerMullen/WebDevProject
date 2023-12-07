import model from "../model";

export const updateUser = (genreList: string, user: string) =>
  model.updateOne({ _id: userId }, { $set: user });