import {addUser, loginUser} from "../controllers/login.js";

export default async (app, opts) => {
    app.post('/signup', {}, addUser)
    app.post('/signin', {}, loginUser)
}

