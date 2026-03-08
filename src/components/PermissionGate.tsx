import { useAuth } from "@/lib/auth";
import type { ReactNode } from "react";

type AppRole = "super_admin" | "admin" | "manager" | "user" | "viewer";

const ROLE_HIERARCHY: Record<AppRole, number> = {
  super_admin: 5,
  admin: 4,
  manager: 3,
  user: 2,
  viewer: 1,
};

interface Props {
  requiredRole?: AppRole;
  allowedRoles?: AppRole[];
  children: ReactNode;
  fallback?: ReactNode;
}

export function PermissionGate({ requiredRole, allowedRoles, children, fallback = null }: Props) {
  const { role } = useAuth();
  if (!role) return <>{fallback}</>;

  if (allowedRoles) {
    return allowedRoles.includes(role) ? <>{children}</> : <>{fallback}</>;
  }

  if (requiredRole) {
    return ROLE_HIERARCHY[role] >= ROLE_HIERARCHY[requiredRole] ? <>{children}</> : <>{fallback}</>;
  }

  return <>{children}</>;
}
