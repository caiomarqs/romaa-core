import jwt from "jsonwebtoken"
import { env } from "../dot-env.js"

const verifyToken = (req, res, next) => {
    let token = getToken(req)

    if (!token) {
        return res.status(403).send({ message: "No token provided!" })
    }

    jwt.verify(token, env.jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" })
        }

        req.userId = decoded.id
        next()
    })
}

const getToken = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }

    return null;
}


const genarateToken = (user) => {
    return jwt.sign({ id: user._id }, env.jwtSecret, {
        expiresIn: 86400, // 24 hours
    })
}

const AuthMiddleware = {
    verifyToken,
    genarateToken
}

export { AuthMiddleware }

// isAdmin = async (req, res, next) => {
//     try {
//         const user = await User.findByPk(req.userId)
//         const roles = await user.getRoles()
//         for (let i = 0 i < roles.length i++) {
//             if (roles[i].name === "admin") {
//                 return next()
//             }
//         }
//         return res.status(403).send({
//             message: "Require Admin Role!",
//         })
//     } catch (error) {
//         return res.status(500).send({
//             message: "Unable to validate User role!",
//         })
//     }
// }
// isModerator = async (req, res, next) => {
//     try {
//         const user = await User.findByPk(req.userId)
//         const roles = await user.getRoles()
//         for (let i = 0 i < roles.length i++) {
//             if (roles[i].name === "moderator") {
//                 return next()
//             }
//         }
//         return res.status(403).send({
//             message: "Require Moderator Role!",
//         })
//     } catch (error) {
//         return res.status(500).send({
//             message: "Unable to validate Moderator role!",
//         })
//     }
// }
// isModeratorOrAdmin = async (req, res, next) => {
//     try {
//         const user = await User.findByPk(req.userId)
//         const roles = await user.getRoles()
//         for (let i = 0 i < roles.length i++) {
//             if (roles[i].name === "moderator") {
//                 return next()
//             }
//             if (roles[i].name === "admin") {
//                 return next()
//             }
//         }
//         return res.status(403).send({
//             message: "Require Moderator or Admin Role!",
//         })
//     } catch (error) {
//         return res.status(500).send({
//             message: "Unable to validate Moderator or Admin role!",
//         })
//     }
// }