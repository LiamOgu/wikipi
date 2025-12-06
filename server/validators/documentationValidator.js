export const validateDocumentation = (req, res, next) => {
  const { title, excerpt, content } = req.body;
  if (!title || title.trim().length === 0) {
    return res.status(400).json({
      message: "Le titre est requis",
    });
  }

  if (content && content.length > 10000) {
    return res.status(400).json({
      message: "Content trop long (max 10000 caractères)",
    });
  }
  if (excerpt && excerpt.length > 50) {
    return res.status(400).json({
      message: "Extrait trop long (max 50 caractères)",
    });
  }
  next();
};
