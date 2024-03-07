import { Request, Response, NextFunction } from "express";

const rejectUnauthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.sendStatus(403);
    }
};

export { rejectUnauthenticated };
