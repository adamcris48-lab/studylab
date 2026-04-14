export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    // Debug logging (VERY useful if something breaks)
    if (!response.ok) {
      console.error("Anthropic API error:", data);
      return res.status(response.status).json({
        error: "Anthropic API failed",
        details: data
      });
    }

    return res.status(200).json(data);

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({
      error: "Internal server error"
    });
  }
}
