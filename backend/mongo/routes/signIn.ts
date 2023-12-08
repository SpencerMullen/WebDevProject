import model from "../model";

export default async function signIn (username: string, password: string ) {
    model.findOne({ username, password });
}
