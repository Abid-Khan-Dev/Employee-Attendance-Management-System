let middlewareObject = {};

// This middleware adds the logged-in user (employee) data to res.locals, so it can be accessed globally in views (like for the topbar).
middlewareObject.addEmployeeToLocals = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.employee = req.user;
  } else {
    res.locals.employee = null;
  }
  next();
};

// isNotLoggedIn
middlewareObject.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated() || (!req.user && req.user.role !== "employee")) {
    return next();
  }
  next();
};

// isLoggedIn
middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user && req.user.role === "employee") {
    return next();
  }
  res.redirect("/auth/login");
};

// for admin
middlewareObject.isNotAdmin = (req, res, next) => {
  if (!req.isAuthenticated() || (!req.user && req.user.role !== "admin")) {
    return next();
  }
  res.redirect("/admin/dashboard");
};

// for admin Protected
middlewareObject.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user && req.user.role === "admin") {
    return next();
  }
  res.redirect("/admin/auth/login");
};

module.exports = middlewareObject;
