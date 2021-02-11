import React, { useContext } from 'react';

const Authorized = ({
  children, authenticated, adminOnly, publicOnly, allowedRoles, allowedPermissions,
}) => (children ? <>{children}</> : <div />);
export default Authorized;
