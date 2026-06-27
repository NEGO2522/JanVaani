const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");
const OpenAI = require("openai");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getCoordinates = (locationStr) => {
  if (!locationStr) return { lat: 20.5937, lng: 78.9629 };
  const loc = locationStr.toLowerCase();
  if (loc.includes('delhi')) return { lat: 28.6139, lng: 77.2090 };
  if (loc.includes('mumbai')) return { lat: 19.0760, lng: 72.8777 };
  if (loc.includes('jaipur')) return { lat: 26.9124, lng: 75.7873 };
  if (loc.includes('noida')) return { lat: 28.5355, lng: 77.3910 };
  if (loc.includes('patna')) return { lat: 25.5941, lng: 85.1376 };
  if (loc.includes('chennai')) return { lat: 13.0827, lng: 80.2707 };
  if (loc.includes('kolkata')) return { lat: 22.5726, lng: 88.3639 };
  if (loc.includes('bangalore') || loc.includes('bengaluru')) return { lat: 12.9716, lng: 77.5946 };
  if (loc.includes('hyderabad')) return { lat: 17.3850, lng: 78.4867 };
  return { lat: 20.5937, lng: 78.9629 };
};

router.post("/submit", async (req, res) => {
  const { text, location } = req.body;

  try {
    // Step 1: AI se category aur evidence lo
    const aiResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an AI that analyzes citizen complaints in India.
          Return JSON only with this format:
          {
            "category": "Road/Water/School/Hospital/Electricity/Other",
            "priority_score": number between 1-100,
            "evidence": {
              "impact": "who is affected",
              "urgency": "how urgent",
              "affected_population": estimated number
            },
            "justification": "2-3 line ready justification for MP in English"
          }`
        },
        {
          role: "user",
          content: `Analyze this complaint from ${location}: "${text}"`
        }
      ],
      response_format: { type: "json_object" }
    });

    const analysis = JSON.parse(aiResponse.choices[0].message.content);

    // Step 2: Supabase mein save karo
    const { data, error } = await supabase
      .from("complaints")
      .insert([{
        text,
        location,
        category: analysis.category,
        priority_score: analysis.priority_score,
        evidence: analysis.evidence,
        justification: analysis.justification
      }])
      .select();

    if (error) throw error;

    res.json({ success: true, data: data[0] });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("complaints")
      .select("*");
      
    if (error) throw error;
    
    // Dynamically map location string to lat/lng for the frontend map
    const mappedData = data.map(complaint => {
      const coords = getCoordinates(complaint.location);
      return { ...complaint, lat: coords.lat, lng: coords.lng };
    });
    
    res.json({ success: true, data: mappedData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;