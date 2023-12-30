import model from "../model";

//might want to update everything to allow for flexibility...?
export const updateUser = async (id: string, newUser: any) => {
    try {
        const user = await model.findById(id);
        if (user) {
            await model.findByIdAndUpdate(id, newUser);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}