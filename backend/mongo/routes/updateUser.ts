import model from "../model";

//might want to update everything to allow for flexibility...?
export const updateUser = (genreList: string, userId: string) =>
  model.updateOne({ _genreList: genreList }, { $set: user });