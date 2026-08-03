import { AgentFormData } from "@/types";

export const registerAgent = async (agentData: AgentFormData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentData),
      }
    );

    return response.json();
  } catch (error) {
    console.error("Error creating agent:", error);
    throw error;
  }
};

export const getAllAgents = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/get`,
      {
        credentials: "include",
      }
    );
    if (response.status === 401 || response.status === 403) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return;
    }
    return response.json();
  } catch (error) {
    console.error("Error getting agents:", error);
    throw error;
  }
};

export const updateAgent = async (agentData: Partial<AgentFormData>, id: string | number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/update/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(agentData),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const deleteAgent = async (id: string | number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/delete/${id}`,
      {
        method: "DELETE",
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error deleting agent:", error);
    throw error;
  }
};
