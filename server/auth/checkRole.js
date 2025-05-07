// Middleware kiểm tra vai trò người dùng
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.teacher.role;
  
      if (allowedRoles.includes(userRole)) {
        next(); // Cho phép truy cập
      } else {
        return res.status(403).json({ message: 'Access denied. Unauthorized role.' });
      }
    };
  };
  
  module.exports = checkRole;
  