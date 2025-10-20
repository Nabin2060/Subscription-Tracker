import { verifyToken } from '../utils/token.js';
import userModel from '../models/user.model.js';
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Unauthorized access: No token provided" });
        }
        const token = authHeader.substring(7);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access token is required",

            });
        }
        const decoded = verifyToken(token);
        const userId = decoded.data;
        const user = await userModel.findById(userId.id).select('-password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized access: User not found",
            });
        }
        req.user = user;
        next();

    } catch (err) {
        res.status(500).json({ message: "Unauthorized access: " + err.message });
    }
};

export const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
        }

        // Handle both single "role" and array "roles"
        const userRoles = Array.isArray(req.user.roles)
            ? req.user.roles
            : [req.user.role || 'user'];

        const hasRole = userRoles.some(role => roles.includes(role));

        if (!hasRole) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions',
            });
        }

        next();
    };
};
