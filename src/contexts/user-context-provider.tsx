import { useState, useEffect, type ReactNode } from "react";
import { UserContext } from "./user-context";
import type { User } from "@/types/types";
import { loginUser } from "@/actions/loginActions"; 

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Aquí puedes cargar el usuario desde un API, localStorage, etc.
  const loginRequest = async () => {
    const response = await loginUser("rafael.ortizpostigo@tetrapak.com", "TPAdmin1");
    console.log("Login response in UserProvider:", response);
    if (!response) {
      throw new Error("Login failed: No response received.");
    }
    setUser({
      id: response.id || "",
      userName: response.userName || "",
      email: response.email || "",
      displayName: response.displayName || "",
      isActive: response.isActive || false,
      roleId: response.roleId || "",
      roleName: response.roleName || "",
      roleDescription: response.roleDescription || "",
      permissionsJson: response.permissionsJson || "",
      avatar: response.avatar || "",
    });
  };
  useEffect(() => {
    const fetchUser = async () => {
      await loginRequest();
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}


