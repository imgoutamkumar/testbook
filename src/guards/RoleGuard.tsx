import { Navigate, Outlet, useLocation } from "react-router-dom"

type Props = {
  allowedRoles: string[]
}

const RoleGuard = ({ allowedRoles }: Props) => {
  const location = useLocation();
  
  // We only check the role now, because the JWT token is safely hidden in the HttpOnly cookie!
  const role = localStorage.getItem("role");

  // If no role is found, they aren't logged in. Send to login.
  if (!role) {
    // We pass the current URL they tried to visit so we can redirect them back after login!
    return <Navigate to="/auth/login" state={{ from: location }} replace />
  }

  // If they are logged in but have the wrong role (e.g., Student trying to access Admin)
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RoleGuard