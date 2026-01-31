import { keysToCamelCase } from "@/lib/utils";
import type { LoginResponse } from "@/types/types";

export const loginUser = async (email: string, password: string) => {
  try {
    // Simulación de una llamada a una API
    const result = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );
    if (!result.ok) {
      throw new Error("Login failed");
    }
    const data = await result.json();
    const camelCaseResponse = keysToCamelCase(data) as LoginResponse;

    console.log("Login response data:", camelCaseResponse);
    return camelCaseResponse;
  } catch (error) {
    if (error instanceof Error) {
      return {
        statusCode: 500,
        message: error.message
      } as LoginResponse;
    }
  }
};
