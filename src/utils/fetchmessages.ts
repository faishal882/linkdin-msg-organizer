import axios from "axios";

export const fetchMessages = async (
  setChats: (chats: any) => void,
  setError: (error: string) => void,
  setLoading: (loading: boolean) => void
) => {
    try {
      const cookies: any = await new Promise((resolve, reject) => {
        chrome.cookies.getAll({ domain: "www.linkedin.com" }, (cookies) => {
          if (!cookies.length)
            reject(new Error("No LinkedIn cookies found."));
          else resolve(cookies);
        });
      });

      const response = await axios.post(
        "http://127.0.0.1:8000/api/scrape-messages/",
        JSON.stringify(cookies)
      );

      if (response.data.conversations) {
        const formattedChats = response.data.conversations.map(
          (conv: any) => ({
            name: conv.username,
            messages: conv.messages,
          })
        );
        setChats(formattedChats);
      }
    } catch (err) {
      setError("Failed to fetch messages.....");
    } finally {
      setLoading(false);
    }
};