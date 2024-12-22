const apiUrl = import.meta.env.VITE_BASE_URL || "http://localhost:8080";

export const denyApplication = async (id: string): Promise<void> => {
  const response = await fetch(`${apiUrl}/application/${id}/deny`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to deny application");
  }
};
