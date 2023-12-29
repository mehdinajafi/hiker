"use server";

import backend from "@/backend";

export const subscribeToNewsletter = async (prev: any, formData: FormData) => {
  try {
    const email = formData.get("email");

    const res = await backend("/api/subscribe", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    const data = await res.json();

    if (!res.ok) {
      return {
        status: "error",
        toast: {
          id: new Date().getTime(),
          title: data.message,
        },
      };
    }

    return {
      status: "success",
      toast: {
        id: new Date().getTime(),
        title: data.message,
      },
    };
  } catch (error) {
    return {
      status: "error",
      toast: {
        id: new Date().getTime(),
        title: "Something went wrong!",
      },
    };
  }
};
