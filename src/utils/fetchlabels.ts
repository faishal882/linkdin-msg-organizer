const DEFAULT_LABELS = [
  "spam",
  "conversation",
  "greeting",
  "internship",
  "job",
  "other",
];

export const fetchLabels = async (): Promise<string[]> => {
  try {
    const response = await fetch("http://127.0.0.1:8000/api/fetch-labels/");
    if (!response.ok) {
      throw new Error("Failed to fetch labels");
    }
    const data = await response.json();
    // Extract only the 'name' field from the API response
    const fetchedLabels = data.map((item: { name: string }) =>
      item.name.toLowerCase()
    );
    return fetchedLabels.length > 0 ? fetchedLabels : DEFAULT_LABELS;
  } catch (error) {
    console.error("Error fetching labels:", error);
    return DEFAULT_LABELS; // Fallback to default labels
  }
};
