import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("x-token");
    const secretJwt: string = "User";

    if (!token) {
        return res.status(403).json({
            ok: false,
            msg: "Token not provided",
        });
    }

    try {
        const { email, _idUser } = jwt.verify(token, secretJwt) as { email: string; _idUser: string };

        req.body._idUser = _idUser;
        req.body.email = email;

        next();

    } catch (err) {

        return res.status(401).json({
            ok: false,
            msg: "Invalid or expired token",
        });
    }
};

export { validateJWT };
