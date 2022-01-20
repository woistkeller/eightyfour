import { useMemo } from "react";
import { useSelector } from "react-redux";

//saving the logged user as a memo
export const useAuth = () => {
  const user = useSelector((state) => state.authUser);
  return useMemo(() => ({ user }), [user]);
};
