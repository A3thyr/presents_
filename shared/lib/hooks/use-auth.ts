"use client";

import { useQuery } from "@tanstack/react-query";
import { UserService, useUserStore } from "@/entities/user";
import { AuthService } from "@/entities/auth";

export function useAuth() {
  const { setUser } = useUserStore();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await UserService.getMe();
      setUser(user);
      return user;
    },
    refetchOnWindowFocus: false,
  });

  const authCheck = useQuery({
    queryKey: ["check"],
    queryFn: AuthService.getCheck
  })

  return { isAuth: !!userQuery.data, userQuery, authCheck };
}
