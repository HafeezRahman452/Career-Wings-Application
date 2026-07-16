import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { db, initializeDatabase } from "./database";

async function startServer() {
  // Sync database structure first
  await initializeDatabase();

  const app = express();
  const PORT = 3000;

  // JSON and request body parsers
  app.use(express.json());
  app.use(cors());

  // === API ENDPOINTS ===

  // 1. APPOINTMENTS
  app.get("/api/appointments", async (req, res) => {
    try {
      const appointments = await db("appointments").select("*").orderBy("id", "desc");
      res.json(appointments);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to retrieve appointments", details: err.message });
    }
  });

  app.post("/api/appointments", async (req, res) => {
    try {
      const data = req.body;
      const id = data.id || `appt-${Date.now()}`;
      const newAppt = {
        id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        country: data.country || "australia",
        startDate: data.startDate || "Fall 2026",
        mode: data.mode || "Virtual Video Session",
        funding: data.funding || "Family Support",
        date: data.date || new Date().toLocaleDateString('en-GB'),
        time: data.time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        service: data.service || null,
        message: data.message || null,
        isContacted: data.isContacted ? 1 : 0
      };

      await db("appointments").insert(newAppt);
      res.status(201).json(newAppt);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to create appointment", details: err.message });
    }
  });

  app.put("/api/appointments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { isContacted } = req.body;
      
      await db("appointments")
        .where({ id })
        .update({ isContacted: isContacted ? 1 : 0 });
        
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to update appointment", details: err.message });
    }
  });

  app.delete("/api/appointments/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db("appointments").where({ id }).delete();
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to delete appointment", details: err.message });
    }
  });


  // 2. RESUMES
  app.get("/api/resumes", async (req, res) => {
    try {
      const resumes = await db("resumes").select("*").orderBy("id", "desc");
      res.json(resumes);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to retrieve resumes", details: err.message });
    }
  });

  app.post("/api/resumes", async (req, res) => {
    try {
      const data = req.body;
      const id = data.id || `res_${Date.now()}`;
      const newRecord = {
        id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        targetCountry: data.targetCountry || "Australia",
        experience: data.experience || "1-2 Years",
        qualification: data.qualification || "Bachelors",
        interestMajor: data.interestMajor || "CS & AI",
        intakeYear: data.intakeYear || "2026",
        score: Number(data.score) || 75,
        fileName: data.fileName || "Text_Submission.pdf",
        fileSize: data.fileSize || "N/A",
        date: data.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        time: data.time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        status: data.status || "STRONG MATCH",
        notes: data.notes || "Automated ATS scan complete."
      };

      await db("resumes").insert(newRecord);
      res.status(201).json(newRecord);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to insert resume record", details: err.message });
    }
  });

  app.delete("/api/resumes/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db("resumes").where({ id }).delete();
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to delete resume record", details: err.message });
    }
  });


  // 3. ELIGIBILITY CHECKS
  app.get("/api/eligibility", async (req, res) => {
    try {
      const checks = await db("eligibility_checks").select("*").orderBy("id", "desc");
      res.json(checks);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to retrieve checks", details: err.message });
    }
  });

  app.post("/api/eligibility", async (req, res) => {
    try {
      const data = req.body;
      const id = data.id || `candidate-${Date.now()}`;
      const newCandidate = {
        id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        studyLevel: data.studyLevel || "Secondary School",
        gpa: data.gpa,
        englishScore: data.englishScore,
        budget: data.budget,
        targetCountry: data.targetCountry,
        rating: data.rating,
        status: data.status,
        date: data.date || new Date().toLocaleDateString('en-GB'),
        time: data.time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      };

      await db("eligibility_checks").insert(newCandidate);
      res.status(201).json(newCandidate);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to log eligibility candidate", details: err.message });
    }
  });

  app.delete("/api/eligibility/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await db("eligibility_checks").where({ id }).delete();
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to remove eligibility record", details: err.message });
    }
  });


  // 4. COMMUNITY EVENTS
  app.get("/api/events", async (req, res) => {
    try {
      const events = await db("community_events").select("*").orderBy("id", "asc");
      // Handle SQLite conversion of 0/1 to boolean
      const mapped = events.map(e => ({
        ...e,
        registered: e.registered === 1 || e.registered === true || e.registered === '1'
      }));
      res.json(mapped);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to fetch events", details: err.message });
    }
  });

  app.put("/api/events/:id/register", async (req, res) => {
    try {
      const { id } = req.params;
      const { registered } = req.body;
      
      await db("community_events")
        .where({ id })
        .update({ registered: registered ? 1 : 0 });
        
      res.json({ success: true, id, registered });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to update registration status", details: err.message });
    }
  });


  // 5. FORUM POSTS & REPLIES
  app.get("/api/posts", async (req, res) => {
    try {
      const posts = await db("forum_posts").select("*").orderBy("id", "desc");
      const replies = await db("forum_replies").select("*").orderBy("id", "asc");

      // Merge posts with their respective replies
      const postsWithReplies = posts.map(p => {
        const postReplies = replies.filter(r => r.postId === p.id);
        return {
          ...p,
          userUpvoted: p.userUpvoted === 1 || p.userUpvoted === true,
          replies: postReplies
        };
      });

      res.json(postsWithReplies);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to fetch forum posts", details: err.message });
    }
  });

  app.post("/api/posts", async (req, res) => {
    try {
      const data = req.body;
      const id = data.id || `post-${Date.now()}`;
      const newPost = {
        id,
        author: data.author || "Anonymous Student",
        avatar: data.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800",
        category: data.category || "General Inquiry",
        question: data.question,
        details: data.details,
        upvotes: Number(data.upvotes) || 0,
        userUpvoted: data.userUpvoted ? 1 : 0,
        date: data.date || "Just now",
        email: data.email || null,
        phone: data.phone || null
      };

      await db("forum_posts").insert(newPost);
      res.status(201).json({ ...newPost, userUpvoted: !!newPost.userUpvoted, replies: [] });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to create post", details: err.message });
    }
  });

  app.put("/api/posts/:id/upvote", async (req, res) => {
    try {
      const { id } = req.params;
      const { upvotes, userUpvoted } = req.body;

      await db("forum_posts")
        .where({ id })
        .update({
          upvotes: Number(upvotes),
          userUpvoted: userUpvoted ? 1 : 0
        });

      res.json({ success: true, id, upvotes, userUpvoted });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to update upvote status", details: err.message });
    }
  });

  app.post("/api/posts/:postId/replies", async (req, res) => {
    try {
      const { postId } = req.params;
      const data = req.body;
      const id = data.id || `rep-${Date.now()}`;
      const newReply = {
        id,
        postId,
        parentId: data.parentId || null,
        author: data.author,
        avatar: data.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800",
        role: data.role || "Student Peer",
        content: data.content,
        date: data.date || "Just now",
        email: data.email || null,
        phone: data.phone || null
      };

      await db("forum_replies").insert(newReply);
      res.status(201).json(newReply);
    } catch (err: any) {
      res.status(500).json({ error: "Failed to add reply", details: err.message });
    }
  });

  app.delete("/api/posts/:id", async (req, res) => {
    try {
      const { id } = req.params;
      // Cascade delete might be handled by foreign key constraints, 
      // but let's delete explicitly for SQLite support too.
      await db("forum_replies").where({ postId: id }).delete();
      await db("forum_posts").where({ id }).delete();
      res.json({ success: true, id });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to delete forum post", details: err.message });
    }
  });


  // 5.5 SCHOLARSHIP AND DISCOUNT CALCULATIONS
  app.post("/api/scholarship/calculate", (req, res) => {
    try {
      const { tuitionFee, discountPercentage = 10 } = req.body;
      if (!tuitionFee || isNaN(Number(tuitionFee))) {
        return res.status(400).json({ error: "tuitionFee must be a valid number" });
      }

      const fee = Number(tuitionFee);
      const pct = Number(discountPercentage);
      const discountAmount = (fee * pct) / 100;
      const netTuitionFee = fee - discountAmount;

      res.json({
        originalFee: fee,
        discountPercentage: pct,
        discountAmount,
        netTuitionFee,
        savingsMessage: `You save ${pct}% (equivalent to $${discountAmount.toLocaleString()}) through Career Wings exclusive partner waiver!`
      });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to calculate discount", details: err.message });
    }
  });


  // 6. DB CLEAN AND RESET COMMANDS
  app.post("/api/admin/reset", async (req, res) => {
    try {
      // Clear all generated tables
      await db("forum_replies").delete();
      await db("forum_posts").delete();
      await db("community_events").delete();
      await db("eligibility_checks").delete();
      await db("resumes").delete();
      await db("appointments").delete();

      // Seed initial static sets again
      const SEED_EVENTS = [
        {
          id: "evt-1",
          title: "Mastering the Canada F-1/GIC Process for Fall 2026",
          speaker: "Sandeep Malhotra",
          role: "Canada Visa Dean",
          date: "June 10, 2026",
          time: "4:00 PM IST",
          platform: "Zoom Video Webinar",
          registered: false
        },
        {
          id: "evt-2",
          title: "Russell Group Admission Secrets: 100% Scholarship Pitching",
          speaker: "Fiona Sterling",
          role: "UK Partner Liaison",
          date: "June 15, 2026",
          time: "6:30 PM IST",
          platform: "YouTube Live Interactive",
          registered: false
        }
      ];

      const SEED_POSTS = [
        {
          id: "post-1",
          author: "Arjun Sharma",
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
          category: "Visa Timeline",
          question: "Do I need my physical degree certificate or will a provisional list work for UK CAS applications?",
          details: "I am graduating in July, and the physical university convocations are scheduled for November. Will UK universities issue CAS based on provisional transcripts?",
          upvotes: 24,
          userUpvoted: false,
          date: "1 day ago"
        },
        {
          id: "post-2",
          author: "Fatima Al-Sayed",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
          category: "German APS",
          question: "What is the average timeline to get an APS certificate in India/Pakistan currently?",
          details: "I submitted my documents to APS New Delhi 6 weeks ago and haven't heard back yet. My winter term admission deadlines are approaching in August.",
          upvotes: 18,
          userUpvoted: false,
          date: "3 days ago"
        }
      ];

      const SEED_REPLIES = [
        {
          id: "rep-1",
          postId: "post-1",
          author: "Fiona Sterling",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
          role: "Expert Staff",
          content: "Almost all Russell Group UK universities accept a certified dynamic provisional certificate and final year transcripts to offer you an unconditional CAS! Make sure your transcripts are stamped by the registrar or controller of exams to avoid secondary CAS audit cycles.",
          date: "18 hours ago"
        },
        {
          id: "rep-2",
          postId: "post-1",
          author: "Zainab Raza",
          avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
          role: "Student Peer",
          content: "Yes, I got CAS last year using only the provisional grade card and my backlog-clearance summary. Sandeep Malhotra verified it in 48 hours.",
          date: "12 hours ago"
        },
        {
          id: "rep-3",
          postId: "post-2",
          author: "Dr. Elizabeth Moore",
          avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
          role: "Expert Staff",
          content: "APS validation is currently averaging between 45 to 60 business days. Make sure you check if your university requires your digital DigiLocker verification as that can speed up the audit time. Germany processes these directly via verified university streams.",
          date: "2 days ago"
        }
      ];

      await db("community_events").insert(SEED_EVENTS);
      await db("forum_posts").insert(SEED_POSTS);
      await db("forum_replies").insert(SEED_REPLIES);

      res.json({ success: true, message: "Database reset to clean base parameters completed." });
    } catch (err: any) {
      res.status(500).json({ error: "Failed to reset database", details: err.message });
    }
  });


  // === VITE / STATIC FILES MIDDLEWARE ===
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Web application server online at http://localhost:${PORT}`);
  });
}

startServer().catch((e) => {
  console.error("Critical server bootstrap error:", e);
});
