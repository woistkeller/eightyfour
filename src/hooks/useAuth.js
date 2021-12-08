import { useMemo } from "react";

import { useSelector } from "react-redux";

export const useAuth = () => {
  const user = useSelector((state) => state.authUser);
  return useMemo(() => ({ user }), [user]);
};
