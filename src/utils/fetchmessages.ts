interface CachedData {
  conversations: Array<{
    username: string;
    messages: string[];
  }>;
  timestamp: number;
}

const CACHE_KEY = "linkedin_messages_cache";
const CACHE_EXPIRATION = 5 * 60 * 1000; // 5 minutes in milliseconds

// Add these new utility functions
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
  setChats: (chats: { name: string; messages: string[] }[]) => void,
  setError: (error: string) => void,
  setLoading: (loading: boolean) => void,
  forceRefresh = false // Add this parameter
) => {
  try {
    setLoading(true);
    setError("");

    // Check cache first
    const cachedData = loadFromCache();
    if (cachedData && !forceRefresh) {
      setChats(
        cachedData.conversations.map((conv) => ({
          name: conv.username,
          messages: conv.messages,
        }))
      );
      return;
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

    const response = await fetch("http://127.0.0.1:8000/api/scrape-messages/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cookies: cookieData }),
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      throw new Error(errorData.error || "Server error");
    }

    const data: ApiResponse = await response.json();
    saveToCache(data);

    setChats(
      data.conversations.map((conv) => ({
        name: conv.username,
        messages: conv.messages,
      }))
    );
  } catch (err) {
    console.error("API Error:", err);
    setError(err instanceof Error ? err.message : "Fetch failed");
  } finally {
    setLoading(false);
  }
};
