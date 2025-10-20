import { aj } from "../config/arcjet.js";



const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);
        console.log("Arcjet decision:", decision);

        // if (decision.isDenied) {
        //     if (decision.reason.isRateLimit()) return res.status(429).json({ message: "Too Many Requests - Rate limit exceeded" });
        //     // if (decision.reason.isBot()) return res.status(403).json({ message: "Access denied - Bot detected" });

        //     return res.status(403).json({ message: "Access denied." });
        // }
        next();
    } catch (err) {
        res.status(500).json({ message: "Arcjet Middleware Error: " + err.message });
    }
}

export default arcjetMiddleware;