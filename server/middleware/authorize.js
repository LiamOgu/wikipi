export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Authentification requise" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Accès refusé: permissions insuffisantes",
      });
    }

    next();
  };
};

export const isAdmin = authorize("admin");

export const isModeratorOrAdmin = authorize("admin", "modo");
