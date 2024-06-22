import React from "react";
import { useAuthContext } from "@/components/auth-context";
import { useQueryClient } from "react-query";

const Logout: React.FC = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuthContext();
  logout();
  queryClient.clear();

  return null;
};

export default Logout;
