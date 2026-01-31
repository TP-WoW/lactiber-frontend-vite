import { UserContext } from "@/contexts/user-context";
import { useContext } from "react";

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
}