import userModel from "../model";
export default async function signIn(username: string, password: string) {
    const user = await userModel.findOne({ username: username });
    if (user === null || user === undefined) {
        throw new Error("User not found");
    }
    if (password !== user.password) {
        throw new Error("Invalid username or password");
    }
    const userInfo = {
        id: user._id,
        username: user.username,
        userType: user.userType,
    };

    return userInfo;
}
