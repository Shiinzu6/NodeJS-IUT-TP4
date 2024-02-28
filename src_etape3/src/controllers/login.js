import {createHash} from "node:crypto"

const users = []    // Simule BDD pour le stockage des utilisateurs
const role = ['admin', 'utilisateur']

export const addUser = async (req, res) => {
    const {email, password} = req.body

    let user = users.find((u) => u.email === email && u.password === hashedPassword)
    if (user) {
        res.status(401).send({
            message: "Utilisateur déjà enregistré",
            user
        })
    }

    const hashedPassword = createHash("sha256").update(password).digest().toString("hex")

    const userRole = role[Math.floor(Math.random() * role.length)];

    const newUser = { email, password: hashedPassword, role: userRole };
    users.push(newUser);

    res.send({ message: "Utilisateur créé avec succès", user: { email, role: userRole } });

}

export const loginUser = async function (req, res) {

    const { email, password } = req.body;
    const hashedPassword = createHash("sha256").update(password).digest("hex");

    let user = users.find(u => u.email === email && u.password === hashedPassword);

    if (!user) {
        return res.status(401).send({ message: "Utilisateur non-identifié" });
    }

    const token = req.server.jwt.sign({ email: user.email, role: user.role }, { expiresIn: '1h' });

    res.send({ token });

}