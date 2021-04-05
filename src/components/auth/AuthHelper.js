const AuthHelper = {
  isAuthorized(userData, authorizations) {
    const {
      authenticated,
      adminOnly,
      publicOnly,
      allowedRoles,
      allowedPermissions,
    } = authorizations;

    const {
      loggedIn,
      isAdmin,
      roles,
      permissions,
    } = userData;

    // Check for public only
    if (publicOnly && (loggedIn || isAdmin)) return false;

    // Check for roles
    if (allowedRoles
      && allowedRoles.length
      && !allowedRoles.some(r => roles.includes(r))) { return false; }

    // Check for permissions
    if (allowedPermissions
      && allowedPermissions.length
      && !allowedPermissions.some(r => permissions.includes(r))) { return false; }

    // Check if admin
    if (adminOnly && !isAdmin) return false;

    // Check for registered only
    return !(authenticated && !loggedIn);
  },
};

export default AuthHelper;
