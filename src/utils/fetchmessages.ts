// src/utils/fetchmessages.ts
interface LinkedInCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
}

interface ApiResponse {
  conversations: Array<{
    username: string;
    messages: string[];
  }>;
  error?: string;
}

export const fetchMessages = async (
  setChats: (chats: { name: string; messages: string[] }[]) => void,
  setError: (error: string) => void,
  setLoading: (loading: boolean) => void
) => {
  try {
    setLoading(true);
    setError("");

    // Get LinkedIn cookies
    const cookies = await chrome.cookies.getAll({ domain: "linkedin.com" });
    if (!cookies.length) {
      throw new Error("No LinkedIn cookies found");
    }

    // Convert to simple object format
    const cookieData: LinkedInCookie[] = cookies.map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path,
    }));

    // Make API call using fetch
    const response = await fetch("http://127.0.0.1:8000/api/scrape-messages/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cookies: cookieData }),
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      throw new Error(errorData.error || "Server responded with an error");
    }

    const data: ApiResponse = await response.json();

    if (data.conversations) {
      const formattedChats = data.conversations.map((conv) => ({
        name: conv.username,
        messages: conv.messages,
      }));
      setChats(formattedChats);
    }
  } catch (err) {
    console.error("API Error:", err);
    setError(err instanceof Error ? err.message : "Failed to fetch messages");
  } finally {
    setLoading(false);
  }
};
