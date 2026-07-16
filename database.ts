import knex from "knex";
import path from "path";
import fs from "fs";

// Select Client from Environment, defaulting to SQLite for easy zero-config execution
const DB_CLIENT = process.env.DB_CLIENT || "sqlite3";

// Set Up Connection details
let connectionConfig: any;

if (DB_CLIENT === "sqlite3") {
  const dbPath = path.join(process.cwd(), "db.sqlite");
  connectionConfig = {
    filename: dbPath
  };
} else {
  // MySQL or PostgreSQL server connection parameters
  connectionConfig = {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "wings_study_portal",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : (DB_CLIENT === "mysql2" ? 3306 : 5432),
  };
}

export const db = knex({
  client: DB_CLIENT,
  connection: connectionConfig,
  useNullAsDefault: DB_CLIENT === "sqlite3",
});

// Seed values matching initial UI states to ensure the database starts populated with classic elements
const INITIAL_EVENTS = [
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

const INITIAL_POSTS = [
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

const INITIAL_REPLIES = [
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

// Initialize DB schema automatically
export async function initializeDatabase() {
  console.log(`[Database] Initializing dynamic SQL schema using client: ${DB_CLIENT}...`);

  try {
    // 1. APPOINTMENTS TABLE
    if (!(await db.schema.hasTable("appointments"))) {
      await db.schema.createTable("appointments", (table) => {
        table.string("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("phone").notNullable();
        table.string("country").notNullable();
        table.string("startDate").notNullable();
        table.string("mode").notNullable();
        table.string("funding").notNullable();
        table.string("date").notNullable();
        table.string("time").notNullable();
        table.string("service").nullable();
        table.text("message").nullable();
        table.boolean("isContacted").defaultTo(false);
      });
      console.log("[Database] Created 'appointments' table.");
    }

    // 2. RESUMES TABLE
    if (!(await db.schema.hasTable("resumes"))) {
      await db.schema.createTable("resumes", (table) => {
        table.string("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("phone").notNullable();
        table.string("targetCountry").notNullable();
        table.string("experience").notNullable();
        table.string("qualification").notNullable();
        table.string("interestMajor").notNullable();
        table.string("intakeYear").notNullable();
        table.integer("score").notNullable();
        table.string("fileName").notNullable();
        table.string("fileSize").notNullable();
        table.string("date").notNullable();
        table.string("time").notNullable();
        table.string("status").notNullable();
        table.text("notes").nullable();
      });
      console.log("[Database] Created 'resumes' table.");
    }

    // 3. ELIGIBILITY_CHECKS TABLE
    if (!(await db.schema.hasTable("eligibility_checks"))) {
      await db.schema.createTable("eligibility_checks", (table) => {
        table.string("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.string("phone").notNullable();
        table.string("studyLevel").notNullable();
        table.string("gpa").notNullable();
        table.string("englishScore").notNullable();
        table.string("budget").notNullable();
        table.string("targetCountry").notNullable();
        table.string("rating").notNullable();
        table.string("status").notNullable();
        table.string("date").notNullable();
        table.string("time").notNullable();
      });
      console.log("[Database] Created 'eligibility_checks' table.");
    }

    // 4. COMMUNITY_EVENTS TABLE
    if (!(await db.schema.hasTable("community_events"))) {
      await db.schema.createTable("community_events", (table) => {
        table.string("id").primary();
        table.string("title").notNullable();
        table.string("speaker").notNullable();
        table.string("role").notNullable();
        table.string("date").notNullable();
        table.string("time").notNullable();
        table.string("platform").notNullable();
        table.boolean("registered").defaultTo(false);
      });
      console.log("[Database] Created 'community_events' table.");
      
      // Auto seed events
      await db("community_events").insert(INITIAL_EVENTS);
      console.log("[Database] Seeded default events.");
    }

    // 5. FORUM_POSTS TABLE
    if (!(await db.schema.hasTable("forum_posts"))) {
      await db.schema.createTable("forum_posts", (table) => {
        table.string("id").primary();
        table.string("author").notNullable();
        table.string("avatar").notNullable();
        table.string("category").notNullable();
        table.text("question").notNullable();
        table.text("details").notNullable();
        table.integer("upvotes").defaultTo(0);
        table.boolean("userUpvoted").defaultTo(false);
        table.string("date").notNullable();
        table.string("email").nullable();
        table.string("phone").nullable();
      });
      console.log("[Database] Created 'forum_posts' table.");

      // Auto seed posts
      await db("forum_posts").insert(INITIAL_POSTS);
      console.log("[Database] Seeded default forum posts.");
    }

    // 6. FORUM_REPLIES TABLE
    if (!(await db.schema.hasTable("forum_replies"))) {
      await db.schema.createTable("forum_replies", (table) => {
        table.string("id").primary();
        table.string("postId").notNullable().references("id").inTable("forum_posts").onDelete("CASCADE");
        table.string("parentId").nullable();
        table.string("author").notNullable();
        table.string("avatar").notNullable();
        table.string("role").notNullable();
        table.text("content").notNullable();
        table.string("date").notNullable();
        table.string("email").nullable();
        table.string("phone").nullable();
      });
      console.log("[Database] Created 'forum_replies' table.");

      // Auto seed replies
      await db("forum_replies").insert(INITIAL_REPLIES);
      console.log("[Database] Seeded default forum replies.");
    }

    console.log("[Database] Database structures populated & synced successfully.");
  } catch (err) {
    console.error("[Database] Initialization failure schema generation: ", err);
  }
}
