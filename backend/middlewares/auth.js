import { getSession } from "next-auth/react";
import ErrorHandler from "../utils/errorHandler";

const isAuthenticatedUser = async (req, res, next) => {
    try {
        const session = await getSession({ req });
        if(!session) {
            return next(new ErrorHandler("Login required", 400))
        }
        req.user = session?.user;
        next();
    } catch (error) {
        return next(new ErrorHandler(error?.message, 400))
    }
}

const authorizeRoles  = (...roles) => async (req, res, next) => {
    if(!roles.includes(req?.user?.role)) {
        return next(new ErrorHandler(`Role (${req?.user?.role}) is not allowed to access this resources`, 400));
    }
    
    next();
}

export { isAuthenticatedUser, authorizeRoles }