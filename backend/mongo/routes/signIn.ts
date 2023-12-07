import model from "../model";

export default function signIn(username: string, password: string ) {
    model.findOne({ username, password });
}
