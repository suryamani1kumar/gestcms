export const BookingsOverview = async (params: {
  startDate: string;
  endDate: string;
}) => {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/booking/overview?${query}`,
      {
        credentials: "include",
      }
    );
    if (!response.ok) {
      return { data: {} };
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching bookings overview:", error);
    return { data: {} };
  }
};

export const acknowledgementMail = async (formData: any) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/ack-mail`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    return response.json();
  } catch (error) {
    console.error("Error sending acknowledgement mail:", error);
    throw error;
  }
};

export const locations = async (ref: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/location/${ref}`
    );
    return response.json();
  } catch (error) {
    console.error("Error fetching location data:", error);
    return { data: null };
  }
};
