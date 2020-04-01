import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';

const Authorized = ({
  children, authenticated, adminOnly, publicOnly, allowedRoles, allowedPermissions,
}) => {
  const { userData } = useContext(UserContext);
  const {
    loggedIn,
    isAdmin,
    roles,
    permissions,
  } = userData;

  // Check for public only
  if (publicOnly && (loggedIn || isAdmin)) return <div />;

  // Check for roles
  if (allowedRoles
    && allowedRoles.length
    && !allowedRoles.some(r => roles.includes(r))) { return <div />; }

  // Check for permissions
  if (allowedPermissions
    && allowedPermissions.length
    && !allowedPermissions.some(r => permissions.includes(r))) { return <div />; }

  // Check if admin
  if (adminOnly && !isAdmin) return <div />;

  // Check for registered only
  if (authenticated && !loggedIn) return <div />;

  // Return component if all check passed
  return children ? <>{children}</> : <div />;
};

export default Authorized;
