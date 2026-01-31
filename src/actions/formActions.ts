  export const getAllForms = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/forms`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch forms");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
    return;
  };
  export const getAllFormReports = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/form-reports`,
      );
      if (!response.ok) {
        throw new Error("Failed to fetch forms");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
    return;
  };