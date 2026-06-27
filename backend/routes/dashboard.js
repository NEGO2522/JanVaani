const express = require("express");
const router = express.Router();
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

router.get("/priorities", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("complaints")
      .select("*")
      .order("priority_score", { ascending: false });

    if (error) throw error;

    // Category wise group karo
    const grouped = data.reduce((acc, complaint) => {
      const cat = complaint.category || "Other";
      if (!acc[cat]) {
        acc[cat] = {
          category: cat,
          count: 0,
          avg_score: 0,
          top_justification: complaint.justification,
          complaints: []
        };
      }
      acc[cat].count++;
      acc[cat].complaints.push(complaint);
      acc[cat].avg_score = Math.round(
        acc[cat].complaints.reduce((s, c) => s + c.priority_score, 0) /
        acc[cat].complaints.length
      );
      return acc;
    }, {});

    const priorities = Object.values(grouped)
      .sort((a, b) => b.avg_score - a.avg_score);

    res.json({ success: true, priorities });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;