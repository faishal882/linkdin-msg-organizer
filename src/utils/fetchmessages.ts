interface CachedData {
  conversations: Array<{
    username: string;
    thread_url: string;
    messages: string[];
    label: string;
  }>;
  timestamp: number;
}

const CACHE_KEY = "linkedin_messages_cache";
const CACHE_EXPIRATION = 30 * 60 * 1000; // 30 minutes in milliseconds

// Utility functions for cache management
const loadFromCache = (): CachedData | null => {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;
  try {
    const data: CachedData = JSON.parse(cached);
    const isExpired = Date.now() - data.timestamp > CACHE_EXPIRATION;
    return isExpired ? null : data;
  } catch (error) {
    console.error("Error parsing cache:", error);
    return null;
  }
};

const saveToCache = (data: ApiResponse) => {
  const cacheData: CachedData = {
    conversations: data.conversations,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
};

// Updated fetchMessages function
export const fetchMessages = async (
  setChats: (
    chats: {
      name: string;
      thread_url: string;
      messages: string[];
      label: string;
    }[]
  ) => void,
  setError: (error: string) => void,
  setLoading: (loading: boolean) => void,
  forceRefresh = false // Add this parameter
) => {
  try {
    setLoading(true);
    setError("");

    // Check if Gemini API key exists in localStorage
    const geminiApiKey = localStorage.getItem("geminiApiKey");
    if (!geminiApiKey) {
      throw new Error("Please provide your LLM Key");
    }

    // Retrieve the number of conversations from localStorage
    const numConversations = localStorage.getItem("numConversations");
    if (
      !numConversations ||
      isNaN(Number(numConversations)) ||
      Number(numConversations) <= 0
    ) {
      throw new Error(
        "Please provide a valid number of conversations to scrape"
      );
    }

    // Check cache first
    const cachedData = loadFromCache();
    if (cachedData && !forceRefresh) {
      setChats(
        cachedData.conversations.map((conv) => ({
          name: conv.username,
          thread_url: conv.thread_url,
          messages: conv.messages,
          label: conv.label,
        }))
      );
      return;
    }

    if (cachedData && forceRefresh) {
      localStorage.removeItem(CACHE_KEY);
    }

    // Proceed with API call if no cache
    const cookies = await chrome.cookies.getAll({ domain: "linkedin.com" });
    if (!cookies.length) {
      throw new Error("No LinkedIn cookies found");
    }

    const cookieData: LinkedInCookie[] = cookies.map((cookie) => ({
      name: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path,
    }));

    // Include cookies, Gemini API key, and number of conversations in the request payload
    const response = await fetch(
      "http://127.0.0.1:8000/api/classify-messages/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cookies: cookieData,
          api_key: geminiApiKey, // Include the Gemini API key
          num_conversations: Number(numConversations), // Include the number of conversations
        }),
      }
    );

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      throw new Error(errorData.error || "Server error");
    }

    const data: ApiResponse = await response.json();
    saveToCache(data);

    setChats(
      data.conversations.map((conv) => ({
        name: conv.username,
        thread_url: conv.thread_url,
        messages: conv.messages,
        label: conv.label,
      }))
    );
  } catch (err) {
    console.error("API Error:", err);
    setError(err instanceof Error ? err.message : "Fetch failed");
  } finally {
    setLoading(false);
  }
};
