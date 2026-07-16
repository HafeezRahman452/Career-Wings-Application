import React, { useState } from "react";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Send, 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  Video, 
  CheckCircle, 
  Plus, 
  ChevronUp, 
  ChevronDown,
  X,
  Share2,
  Sparkles,
  Award,
  BookOpen,
  Database,
  Shield,
  Trash2,
  Lock,
  Unlock
} from "lucide-react";

interface CommunityGroup {
  id: string;
  country: string;
  name: string;
  membersCount: string;
  activeNow: string;
  platform: "Telegram" | "WhatsApp" | "Discord";
  description: string;
  image: string;
  link?: string;
}

interface CommunityEvent {
  id: string;
  title: string;
  speaker: string;
  role: string;
  date: string;
  time: string;
  platform: string;
  registered: boolean;
}

interface ForumReply {
  id: string;
  author: string;
  avatar: string;
  role: "Expert Staff" | "Student Peer";
  content: string;
  date: string;
  email?: string;
  phone?: string;
  replies?: ForumReply[];
}

interface ForumPost {
  id: string;
  author: string;
  avatar: string;
  category: string;
  question: string;
  details: string;
  upvotes: number;
  userUpvoted: boolean;
  replies: ForumReply[];
  date: string;
  email?: string;
  phone?: string;
}

const GROUPS_DATA: CommunityGroup[] = [
  {
    id: "grp-1",
    country: "United Kingdom",
    name: "UK Autumn 2026 Master Class",
    membersCount: "2,480 Members",
    activeNow: "142 online",
    platform: "WhatsApp",
    description: "Russell Group applicants coordinating SOP drafts, reference letters, and visa CAS timelines.",
    image: "🇬🇧",
    link: "https://chat.whatsapp.com/Kdf9a8SdfS7As8df"
  },
  {
    id: "grp-2",
    country: "Canada",
    name: "Canada Express Pathway Hub",
    membersCount: "3,190 Members",
    activeNow: "289 online",
    platform: "Telegram",
    description: "Live provincial attestation letters (PAL) guidance, GIC payment hacks, and accommodation hunts.",
    image: "🇨🇦",
    link: "https://t.me/wings_canada_express"
  },
  {
    id: "grp-3",
    country: "Germany",
    name: "German Scholars & APS Network",
    membersCount: "1,560 Members",
    activeNow: "94 online",
    platform: "Discord",
    description: "Step-by-step APS credential verification, public university exams, and Sperrkonto setups.",
    image: "🇩🇪",
    link: "https://discord.gg/german_APS"
  },
  {
    id: "grp-4",
    country: "United States",
    name: "USA Ivy & F-1 Conquerors",
    membersCount: "1,820 Members",
    activeNow: "115 online",
    platform: "Telegram",
    description: "Mock visa chambers, pre-departure briefs, and scholarships for STEM graduate courses.",
    image: "🇺🇸",
    link: "https://t.me/wings_usa_ivy"
  }
];

const EVENTS_DATA: CommunityEvent[] = [
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

const INITIAL_POSTS: ForumPost[] = [
  {
    id: "post-1",
    author: "Arjun Sharma",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
    category: "Visa Timeline",
    question: "Do I need my physical degree certificate or will a provisional list work for UK CAS applications?",
    details: "I am graduating in July, and the physical university convocations are scheduled for November. Will UK universities issue CAS based on provisional transcripts?",
    upvotes: 24,
    userUpvoted: false,
    date: "1 day ago",
    replies: [
      {
        id: "rep-1",
        author: "Fiona Sterling",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
        role: "Expert Staff",
        content: "Yes, Arjun! Russell Group as well as regular UK universities readily accept official 'Provisional Degree Certificates' signed by the university controller alongside your 8th semester mark sheets to issue an unconditional offer and subsequently process CAS. Just make sure there are no typos on the provisional sheet.",
        date: "20 hours ago"
      }
    ]
  },
  {
    id: "post-2",
    author: "Zainab Malik",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800",
    category: "Scholarships",
    question: "Are there any hidden costs if we apply to Germany's €0 tuition public colleges?",
    details: "I heard that while tuition is completely free, there are administrative semesters, blocked accounts, and health insurance. Please estimate what the actual yearly balance sheet looks like.",
    upvotes: 41,
    userUpvoted: false,
    date: "2 days ago",
    replies: [
      {
        id: "rep-2",
        author: "Dr. Albert Voss",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120",
        role: "Expert Staff",
        content: "Correct, Zainab. The state education itself is €0. However, expect a semester fee of roughly €200 to €350 (which gets you a free regional public transit card!). You also need a blocked account (roughly €11,900 to safeguard your rent for 12 months), and student state insurance at about €120/month. So overall real living cost is roughly €800-€900 per month.",
        date: "1 day ago"
      }
    ]
  }
];

export default function CommunityPage({
  onBack,
  onBookCounselling,
  isAdminView: propIsAdminView,
  setIsAdminView: propSetIsAdminView
}: {
  onBack: () => void;
  onBookCounselling: (details: string) => void;
  isAdminView?: boolean;
  setIsAdminView?: (v: boolean) => void;
}) {
  const [localIsAdminView, setLocalIsAdminView] = useState(false);
  const isAdminView = propIsAdminView !== undefined ? propIsAdminView : localIsAdminView;
  const setIsAdminView = propSetIsAdminView !== undefined ? propSetIsAdminView : setLocalIsAdminView;

  // Admin login states to secure Database access
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    try {
      return sessionStorage.getItem("wings_admin_auth") === "true";
    } catch {
      return false;
    }
  });
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Support any standard credentials, default is simple 'admin' and 'admin123'
    if ((adminUsername.trim() === "admin" && adminPassword === "admin123") || 
        (adminUsername.trim() === "hafeezrahman452@gmail.com" && adminPassword === "admin123")) {
      setIsAdminLoggedIn(true);
      setAuthError("");
      try {
        sessionStorage.setItem("wings_admin_auth", "true");
      } catch (err) {
        console.error(err);
      }
    } else {
      setAuthError("Invalid Admin Username or Passcode. Please try again.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminUsername("");
    setAdminPassword("");
    try {
      sessionStorage.removeItem("wings_admin_auth");
    } catch (err) {
      console.error(err);
    }
  };

  const [groups, setGroups] = useState<CommunityGroup[]>(GROUPS_DATA);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [posts, setPosts] = useState<ForumPost[]>([]);

  // Real-time SQL system content synchronization
  const loadCommunityData = async () => {
    try {
      const pRes = await fetch("/api/posts");
      if (pRes.ok) {
        const pData = await pRes.json();
        setPosts(pData);
      }
      const eRes = await fetch("/api/events");
      if (eRes.ok) {
        const eData = await eRes.json();
        setEvents(eData);
      }
    } catch (e) {
      console.error("Failed to load forum posts and events from backend database", e);
    }
  };

  React.useEffect(() => {
    loadCommunityData();
  }, []);
  
  // States
  const [showInviteToast, setShowInviteToast] = useState<string | null>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newDetails, setNewDetails] = useState("");
  const [newCategory, setNewCategory] = useState("General Query");
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // New admin view and post author information fields
  const [newQuestionAuthor, setNewQuestionAuthor] = useState("");
  const [newQuestionEmail, setNewQuestionEmail] = useState("");
  const [newQuestionPhone, setNewQuestionPhone] = useState("");

  // Admin Appointments List State
  const [appointments, setAppointments] = useState<any[]>([]);

  // Admin Eligibility Checks (Verify Admission) List State
  const [eligibilityChecks, setEligibilityChecks] = useState<any[]>([]);

  // Admin Resumes List State
  const [resumesList, setResumesList] = useState<any[]>([]);

  const loadAdminLists = async () => {
    try {
      const aRes = await fetch("/api/appointments");
      if (aRes.ok) setAppointments(await aRes.json());

      const eCheckRes = await fetch("/api/eligibility");
      if (eCheckRes.ok) setEligibilityChecks(await eCheckRes.json());

      const rRes = await fetch("/api/resumes");
      if (rRes.ok) setResumesList(await rRes.json());
    } catch (e) {
      console.error("Failed to load admin lists from database", e);
    }
  };

  // Admin section collapsible toggle states
  const [forumLeadsCollapsed, setForumLeadsCollapsed] = useState(false);
  const [appointmentsCollapsed, setAppointmentsCollapsed] = useState(false);
  const [eligibilityCollapsed, setEligibilityCollapsed] = useState(false);
  const [resumesCollapsed, setResumesCollapsed] = useState(false);

  // Status mapping to track actions/comments with student leads securely
  const [contactStatuses, setContactStatuses] = useState<Record<string, string>>(() => {
    try {
      const cached = localStorage.getItem("wings_admin_contact_statuses");
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });

  const handleUpdateContactStatus = (id: string, status: string) => {
    const updated = { ...contactStatuses, [id]: status };
    setContactStatuses(updated);
    try {
      localStorage.setItem("wings_admin_contact_statuses", JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setShowInviteToast(`Lead status updated to: ${status}`);
    setTimeout(() => setShowInviteToast(null), 2000);
  };

  // Sync dashboard content dynamically when view toggle is activated
  React.useEffect(() => {
    if (isAdminView) {
      loadAdminLists();
    }
  }, [isAdminView]);

  const handleDeleteAppointment = async (apptId: string) => {
    try {
      const res = await fetch(`/api/appointments/${apptId}`, { method: "DELETE" });
      if (res.ok) {
        setAppointments(prev => prev.filter(a => a.id !== apptId));
        setShowInviteToast("Booking record deleted successfully.");
      }
    } catch (e) {
      console.error("Failed to sync deletion of appointment with backend: ", e);
    }
    setTimeout(() => setShowInviteToast(null), 3000);
  };

  const handleDeleteEligibilityCheck = async (recId: string) => {
    try {
      const res = await fetch(`/api/eligibility/${recId}`, { method: "DELETE" });
      if (res.ok) {
        setEligibilityChecks(prev => prev.filter(e => e.id !== recId));
        setShowInviteToast("Candidate eligibility profile deleted.");
      }
    } catch (e) {
      console.error("Failed to sync deletion of eligibility with backend: ", e);
    }
    setTimeout(() => setShowInviteToast(null), 3000);
  };

  const handleDeleteResume = async (resId: string) => {
    try {
      const res = await fetch(`/api/resumes/${resId}`, { method: "DELETE" });
      if (res.ok) {
        setResumesList(prev => prev.filter(r => r.id !== resId));
        setShowInviteToast("Submitted resume record removed.");
      }
    } catch (e) {
      console.error("Failed to sync deletion of resume with backend: ", e);
    }
    setTimeout(() => setShowInviteToast(null), 3000);
  };

  // Interactive Live Comment & Reply form states
  const [activeReplyToId, setActiveReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [replyPhone, setReplyPhone] = useState("");

  const clearReplyForm = () => {
    setReplyContent("");
    setReplyName("");
    setReplyEmail("");
    setReplyPhone("");
  };

  const handleSubmitReply = async (postId: string, targetId: string) => {
    if (!replyContent.trim() || !replyName.trim() || !replyEmail.trim() || !replyPhone.trim()) {
      setShowInviteToast("Please fill Name, Email, Contact & Comment fields to reply.");
      setTimeout(() => setShowInviteToast(null), 3000);
      return;
    }

    const payload = {
      parentId: targetId === postId ? null : targetId,
      author: replyName,
      content: replyContent,
      email: replyEmail,
      phone: replyPhone,
      role: "Student Peer"
    };

    try {
      const res = await fetch(`/api/posts/${postId}/replies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      
      if (res.ok) {
        await loadCommunityData();
        setShowInviteToast(`Successfully replied to thread. Thank you ${replyName}!`);
      }
    } catch (e) {
      console.error("Failed to post forum reply to backend DB: ", e);
    }

    // Avoid triggering full booking modal dialog when replying, keep user on forum page
    setTimeout(() => setShowInviteToast(null), 3000);
    setActiveReplyToId(null);
    clearReplyForm();
  };

  // Selector function to extract all leads with email/phone records (dynamic database compiling)
  const getLeads = () => {
    interface AdminLead {
      id: string;
      type: "Forum Post" | "Comment Reply";
      name: string;
      email: string;
      phone: string;
      message: string;
      reference: string;
      date: string;
    }
    const list: AdminLead[] = [];

    posts.forEach(post => {
      if (post.email || post.phone) {
        list.push({
          id: post.id,
          type: "Forum Post",
          name: post.author,
          email: post.email || "N/A",
          phone: post.phone || "N/A",
          message: post.question + (post.details ? ` - Context: ${post.details}` : ""),
          reference: post.category,
          date: post.date
        });
      }

      const processReplies = (reps: ForumReply[]) => {
        if (!reps) return;
        reps.forEach(reply => {
          if (reply.email || reply.phone) {
            list.push({
              id: reply.id,
              type: "Comment Reply",
              name: reply.author,
              email: reply.email || "N/A",
              phone: reply.phone || "N/A",
              message: reply.content,
              reference: `Reply on Thread: #${post.id && post.id.substring(0, 8)}`,
              date: reply.date
            });
          }
          if (reply.replies && reply.replies.length > 0) {
            processReplies(reply.replies);
          }
        });
      };

      processReplies(post.replies || []);
    });

    return list;
  };

  // Safe handler to delete/clear lead records dynamically
  const handleDeleteLead = (leadId: string) => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === leadId) {
          const { email, phone, ...rest } = post;
          return rest as ForumPost;
        }

        const removeLeadsFromReplies = (repliesList: ForumReply[]): ForumReply[] => {
          return repliesList.map(rep => {
            if (rep.id === leadId) {
              const { email, phone, ...restRep } = rep;
              return { 
                ...restRep, 
                replies: rep.replies ? removeLeadsFromReplies(rep.replies) : [] 
              } as ForumReply;
            }
            return {
              ...rep,
              replies: rep.replies ? removeLeadsFromReplies(rep.replies) : []
            };
          });
        };

        return {
          ...post,
          replies: removeLeadsFromReplies(post.replies || [])
        };
      });
    });

    setShowInviteToast("Lead deleted from secure database table.");
    setTimeout(() => setShowInviteToast(null), 3000);
  };

  const handleRegisterEvent = async (id: string) => {
    const event = events.find(e => e.id === id);
    if (!event) return;
    
    // Toggle registry flag
    const targetState = !event.registered;
    setEvents(prev => 
      prev.map(evt => evt.id === id ? { ...evt, registered: targetState } : evt)
    );
    
    try {
      await fetch(`/api/events/${id}/register`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registered: targetState })
      });
    } catch (e) {
      console.error("Failed to update event registration state", e);
    }

    if (targetState) {
      setShowInviteToast(`Confirmed registration for: "${event.title}". Link has been sent.`);
      setTimeout(() => setShowInviteToast(null), 4000);
    }
  };

  const handleUpvote = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    const targetUpvotes = post.userUpvoted ? post.upvotes - 1 : post.upvotes + 1;
    const targetUserUpvoted = !post.userUpvoted;

    setPosts(prev => 
      prev.map(p => {
        if (p.id === postId) {
          return {
            ...p,
            upvotes: targetUpvotes,
            userUpvoted: targetUserUpvoted
          };
        }
        return p;
      })
    );

    try {
      await fetch(`/api/posts/${postId}/upvote`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          upvotes: targetUpvotes,
          userUpvoted: targetUserUpvoted
        })
      });
    } catch (e) {
      console.error("Failed to commit upvote value", e);
    }
  };

  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newQuestionAuthor.trim() || !newQuestionEmail.trim() || !newQuestionPhone.trim()) {
      setShowInviteToast("Please fill out your Name, Email, and Contact Number to publish.");
      setTimeout(() => setShowInviteToast(null), 3000);
      return;
    }

    const customId = `custom-${Date.now()}`;
    const added = {
      id: customId,
      author: newQuestionAuthor.trim(),
      category: newCategory,
      question: newQuestion,
      details: newDetails,
      upvotes: 1,
      userUpvoted: true,
      email: newQuestionEmail.trim(),
      phone: newQuestionPhone.trim(),
    };

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(added)
      });
      
      if (res.ok) {
        // Build and add the automatic expert comment:
        await fetch(`/api/posts/${customId}/replies`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            author: "Career Wings AI Core",
            avatar: "/src/assets/images/student_wings_1780483711157.png",
            role: "Expert Staff",
            content: "Thank you for submission! Our senior study advisors will review your community question within 2 hours. Meanwhile, we have automatically dispatched free assessment triggers to match your GPA."
          })
        });

        await loadCommunityData();
      }
    } catch (e) {
      console.error("Failed to submit and seed new question: ", e);
    }

    setNewQuestion("");
    setNewDetails("");
    setNewQuestionAuthor("");
    setNewQuestionEmail("");
    setNewQuestionPhone("");
    setIsQuestionModalOpen(false);
    setShowInviteToast("Your forum question post has been publicized! Expert answers queued.");
    setTimeout(() => setShowInviteToast(null), 4000);
  };

  const handleJoinGroup = (group: CommunityGroup) => {
    setShowInviteToast(`Opening [${group.country}] channel via ${group.platform}...`);
    setTimeout(() => {
      setShowInviteToast(null);
      const targetUrl = group.link || (group.platform === "WhatsApp" ? "https://wa.me/447700900077" : "https://t.me/wings_global");
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }, 1200);
  };

  // Helper to render reply input form inline
  const renderReplyFormMarkup = (postId: string, targetId: string, targetAuthor: string) => {
    return (
      <div className="mt-3 p-4 bg-white dark:bg-slate-900 border border-blue-105 dark:border-slate-800 rounded-2xl space-y-4 shadow-lg pl-5 border-l-4 border-l-[#0047AB]">
        <div className="flex items-center justify-between border-b pb-2 border-gray-150 dark:border-slate-800">
          <span className="text-[11px] font-black tracking-wide text-gray-500 dark:text-slate-400 uppercase flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4 text-[#0047AB]" />
            Write Reply to <span className="text-[#0047AB] dark:text-blue-400 font-extrabold">{targetAuthor}</span>
          </span>
          <button 
            type="button"
            onClick={() => {
              setActiveReplyToId(null);
              clearReplyForm();
            }}
            className="text-gray-400 hover:text-gray-600 rounded-lg p-0.5"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          {/* Main Comment Textarea */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-gray-450 uppercase">Your Reply / Comment</label>
            <textarea
              placeholder="Give detailed advice or comments..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={3}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white font-medium"
              required
            />
          </div>

          {/* Lead capture fields: Name, Email, Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-450 uppercase">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sen"
                value={replyName}
                onChange={(e) => setReplyName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-450 uppercase">Email Address</label>
              <input
                type="email"
                placeholder="rahul@example.com"
                value={replyEmail}
                onChange={(e) => setReplyEmail(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-450 uppercase">Contact No</label>
              <input
                type="tel"
                placeholder="e.g. +91 98765 43210"
                value={replyPhone}
                onChange={(e) => setReplyPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setActiveReplyToId(null);
                clearReplyForm();
              }}
              className="text-gray-500 hover:text-gray-705 font-bold text-xs bg-slate-100 dark:bg-slate-850 px-4 py-2 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmitReply(postId, targetId)}
              className="bg-[#0047AB] hover:bg-blue-700 text-white font-black text-xs px-5 py-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              Post Reply <Send className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Recursive rendering function for nested replies
  const renderReplyNode = (rep: ForumReply, postId: string, depth: number = 1): React.ReactNode => {
    const isExpert = rep.role === "Expert Staff";
    const avatarUrl = rep.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120";

    return (
      <div 
        key={rep.id} 
        className="space-y-2 mt-3 w-full"
        style={{ paddingLeft: depth > 1 ? "1.5rem" : "0px" }}
      >
        <div 
          onClick={() => {
            // "comment ko click karay to field open hona"
            setActiveReplyToId(rep.id);
            clearReplyForm();
          }}
          className={`group/rep hover:border-[#0047AB]/50 dark:hover:border-blue-500/50 transition-all border-l-2 p-4 rounded-r-2xl space-y-2 mt-2 shadow-xs cursor-pointer ${
            isExpert 
              ? "border-[#0047AB] dark:border-blue-600 bg-white/95 dark:bg-slate-900/90" 
              : "border-amber-400 dark:border-amber-500 bg-slate-50/80 dark:bg-slate-950/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src={avatarUrl} 
                alt={rep.author}
                className="h-6 w-6 rounded-full border border-gray-200/50 object-cover" 
              />
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <span className="text-xs font-black text-slate-800 dark:text-slate-100">{rep.author}</span>
                <div className="flex items-center gap-1">
                  {isExpert ? (
                    <span className="text-[8px] bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400 font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                      {rep.role}
                    </span>
                  ) : (
                    <span className="text-[8px] bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                      Student Peer
                    </span>
                  )}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">{rep.date}</span>
          </div>
          
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-semibold whitespace-pre-line">
            {rep.content}
          </p>

          <div className="flex items-center justify-between pt-1 border-t border-gray-150/40 dark:border-slate-800/10">
            <span className="text-[10px] font-bold text-gray-450 group-hover/rep:text-[#0047AB] transition-colors flex items-center gap-1">
              <MessageSquare className="h-3 w-3 text-[#0047AB]" /> Click this comment to reply
            </span>
            {rep.email && (
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold">
                By: {rep.email}
              </span>
            )}
          </div>
        </div>

        {/* Reply form rendered exactly inline if selected */}
        {activeReplyToId === rep.id && (
          <div onClick={(e) => e.stopPropagation()}>
            {renderReplyFormMarkup(postId, rep.id, rep.author)}
          </div>
        )}

        {/* Embedded children replies ("comments per comments karskna") */}
        {rep.replies && rep.replies.length > 0 && (
          <div className="border-l-2 border-dashed border-gray-200 dark:border-slate-800/80 pl-1 ml-3 space-y-2">
            {rep.replies.map(subRep => renderReplyNode(subRep, postId, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="py-8 bg-slate-50 dark:bg-slate-950 transition-colors min-h-screen font-sans relative">
      
      {/* Toast Notification */}
      {showInviteToast && (
        <div className="fixed bottom-6 right-6 bg-[#0047AB] text-white font-extrabold text-sm px-6 py-4 rounded-2xl shadow-xl z-50 border border-blue-400/30 max-w-sm flex items-center gap-2 animate-bounce">
          <Sparkles className="h-5 w-5 text-amber-300" />
          <span>{showInviteToast}</span>
        </div>
      )}

      <div className="container mx-auto px-4 max-w-6xl space-y-8">
        
        {/* Top bar header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-250 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-[#0047AB] dark:text-slate-400 dark:hover:text-blue-400 transition-colors bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
            </button>
            <h1 className="text-3xl font-black text-gray-950 dark:text-white flex items-center gap-2 pt-2">
              <Users className="h-8 w-8 text-[#0047AB]" /> The Wings Global Community
            </h1>
            <p className="text-sm font-semibold text-gray-500 dark:text-slate-400">
              Connect with 8,000+ applicants, join high-value regional chat circles, register for mock webinars, and resolve your questions.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-row flex-nowrap shrink-0">
            <button
              onClick={() => setIsAdminView(!isAdminView)}
              className={`font-black px-7 py-3 rounded-xl text-xs flex items-center gap-2 cursor-pointer transition-all border whitespace-nowrap min-w-[170px] justify-center ${
                isAdminView
                  ? "bg-amber-500 border-amber-600 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20"
                  : "bg-amber-50/80 border-amber-200 hover:bg-amber-100 dark:bg-amber-950/20 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 dark:hover:bg-amber-950/40"
              }`}
            >
              <Database className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>{isAdminView ? "Back to Forum Feed" : "Admin 🛡️"}</span>
            </button>
            <button
              onClick={() => setIsQuestionModalOpen(true)}
              className="bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 hover:shadow text-white font-black px-7 py-3 rounded-xl text-xs flex items-center gap-2 cursor-pointer whitespace-nowrap justify-center min-w-[150px]"
            >
              <Plus className="h-4 w-4 shrink-0" /> <span>Ask Community</span>
            </button>
          </div>
        </div>

        {isAdminView ? (
          !isAdminLoggedIn ? (
            /* Secure Admin Login Portal */
            <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-8 sm:p-12 rounded-[32px] shadow-xl max-w-md mx-auto space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 bg-amber-50 dark:bg-amber-950/40 rounded-2xl flex items-center justify-center border border-amber-200 dark:border-amber-900/40">
                  <Lock className="h-6 w-6 text-amber-500 animate-pulse" />
                </div>
                <h2 className="text-xl font-black text-gray-950 dark:text-white">Admin Authentication Required</h2>
                <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                  Please authenticate with administrative credentials to access raw lead and verified admissions reports.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                {authError && (
                  <div className="bg-red-50 dark:bg-red-955/20 text-red-650 dark:text-red-400 border border-red-100 dark:border-red-900/50 p-3 rounded-xl text-xs font-bold text-center">
                    {authError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300">Admin Username</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter 'admin' or email"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-3.5 shadow-sm text-xs focus:ring-[#0047AB] font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-slate-300">Administrative Passcode</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter 'admin123' to unlock"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-3.5 shadow-sm text-xs focus:ring-[#0047AB] font-bold"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0047AB] text-white hover:bg-blue-700 font-extrabold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="h-4 w-4 shrink-0" />
                  <span>Unlock Admin</span>
                </button>
              </form>

              <div className="bg-amber-50/50 dark:bg-amber-950/15 border border-amber-100 dark:border-amber-900/30 p-4 rounded-2xl text-[11px] text-amber-900 dark:text-amber-300 space-y-1">
                <span className="font-extrabold block text-amber-800 dark:text-amber-400 uppercase tracking-wide">Developer Demo Mode Hint:</span>
                <p className="font-semibold leading-normal text-left">
                  User email matches: <strong className="select-all bg-white dark:bg-slate-950 px-1 py-0.5 rounded">hafeezrahman452@gmail.com</strong>
                </p>
                <p className="font-semibold leading-normal text-left">
                  Username matches: <strong className="select-all bg-white dark:bg-slate-950 px-1 py-0.5 rounded">admin</strong>
                </p>
                <p className="font-semibold leading-normal text-left">
                  Demo login password: <strong className="select-all bg-white dark:bg-slate-950 px-1 py-0.5 rounded">admin123</strong>
                </p>
              </div>
            </div>
          ) : (
            /* Admin Leads Panel/Table View with customized high-light warm background */
            <div className="bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800/80 p-6 sm:p-8 rounded-[32px] shadow-xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 dark:border-slate-800 pb-5">
              <div className="space-y-1">
                <span className="text-[10px] bg-amber-100 text-amber-850 dark:bg-amber-950/40 dark:text-amber-400 font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wide flex items-center gap-1.5 w-max">
                  <Shield className="h-3.5 w-3.5 text-amber-500 animate-pulse" /> CONFIDENTIAL ADMINISTRATOR PANEL
                </span>
                <h2 className="text-2xl font-black text-gray-950 dark:text-white flex items-center gap-2">
                  <Database className="h-6 w-6 text-[#0047AB]" /> Managed Student Lead Databases
                </h2>
                <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                  Secure administration interface for verifying admissions counseling requests, appointments and forum leads.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const confirmAction = window.confirm("Are you sure you want to clear all verified admission eligibility profiles?");
                    if (confirmAction) {
                      eligibilityChecks.forEach(async (e) => {
                        await fetch(`/api/eligibility/${e.id}`, { method: "DELETE" });
                      });
                      setEligibilityChecks([]);
                      setShowInviteToast("All candidate eligibility records cleared from database.");
                      setTimeout(() => setShowInviteToast(null), 3000);
                    }
                  }}
                  className="text-indigo-700 hover:text-white border border-indigo-200 dark:border-indigo-805 hover:bg-indigo-600 font-bold text-[11px] bg-indigo-50/50 dark:bg-indigo-950/20 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear Admission Verifications
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const confirmAction = window.confirm("Are you sure you want to clear all appointment bookings from memory?");
                    if (confirmAction) {
                      appointments.forEach(async (appt) => {
                        await fetch(`/api/appointments/${appt.id}`, { method: "DELETE" });
                      });
                      setAppointments([]);
                      setShowInviteToast("All appointment bookings cleared from database.");
                      setTimeout(() => setShowInviteToast(null), 3000);
                    }
                  }}
                  className="text-amber-700 hover:text-white border border-amber-200 dark:border-amber-800 hover:bg-amber-600 font-bold text-[11px] bg-amber-50/50 dark:bg-amber-950/20 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Clear Appointment Bookings
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const confirmAction = window.confirm("Are you sure you want to restore default posts and clear custom leads data in SQL database?");
                    if (confirmAction) {
                      fetch("/api/admin/reset", { method: "POST" })
                        .then(() => {
                          loadCommunityData();
                          loadAdminLists();
                          setShowInviteToast("Database structures seeded with clean defaults!");
                        });
                    }
                  }}
                  className="text-red-650 hover:text-white border border-red-200 dark:border-red-900 hover:bg-red-600 font-bold text-[11px] bg-red-50/50 dark:bg-red-950/20 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Reset Forum Posts &amp; Leads
                </button>

                <button
                  type="button"
                  onClick={handleAdminLogout}
                  className="text-gray-700 dark:text-gray-200 hover:text-white border border-gray-350 dark:border-slate-700 hover:bg-gray-800 font-extrabold text-[11px] bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Lock className="h-3.5 w-3.5 text-red-500" /> Log Out 🔒
                </button>
              </div>
            </div>

            {/* SECTION 1: Student Community Leads Database */}
            <div className="bg-blue-50/20 dark:bg-blue-950/10 border-2 border-blue-200/80 dark:border-blue-900/40 p-5 rounded-[28px] shadow-md transition-all space-y-4">
              <button
                type="button"
                onClick={() => setForumLeadsCollapsed(!forumLeadsCollapsed)}
                className="w-full text-left flex items-center justify-between p-3 rounded-2xl bg-blue-100/40 hover:bg-blue-100/60 dark:bg-blue-900/15 dark:hover:bg-blue-900/25 border border-blue-200/50 dark:border-blue-900/25 transition-all font-black text-gray-905 dark:text-white cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center h-7 w-7 rounded-xl bg-blue-600 text-white text-xs font-black shadow-sm">1</span>
                  <span className="text-sm font-black uppercase text-blue-900 dark:text-blue-300 tracking-wider flex items-center gap-1.5">
                    Forum Q&amp;A Leads ({getLeads().length})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-800 dark:text-blue-400">
                  <span className="bg-blue-200/60 dark:bg-blue-950 px-2 py-0.5 rounded text-[10px]">
                    {forumLeadsCollapsed ? "EXPAND 📂" : "COLLAPSE 📁"}
                  </span>
                  {forumLeadsCollapsed ? <ChevronDown className="h-4.5 w-4.5" /> : <ChevronUp className="h-4.5 w-4.5" />}
                </div>
              </button>

              {!forumLeadsCollapsed && (
                <div className="space-y-4 pt-2">
                  {getLeads().length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-blue-200/50 dark:border-slate-800 rounded-3xl space-y-2 bg-blue-50/10 dark:bg-slate-950/15">
                      <h4 className="font-extrabold text-xs text-blue-600 dark:text-slate-350">No Community Forum Leads Found</h4>
                      <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
                        Verify that custom students post or reply questions utilizing verification input metrics.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-blue-100 dark:border-slate-800/80 shadow-inner">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-blue-50/50 dark:bg-slate-950 text-blue-900 dark:text-slate-300 text-[10px] uppercase font-black tracking-wider border-b border-blue-100 dark:border-slate-800">
                            <th className="px-5 py-4">Submission Form</th>
                            <th className="px-5 py-4">Student Name</th>
                            <th className="px-5 py-4">Email Address</th>
                            <th className="px-5 py-4">Contact Number</th>
                            <th className="px-5 py-4">Submitted Inquiry</th>
                            <th className="px-5 py-4">Contact Tracker Status</th>
                            <th className="px-5 py-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-blue-50/40 dark:divide-slate-805 text-xs text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-900">
                          {getLeads().map((lead) => (
                            <tr 
                              key={lead.id}
                              className="hover:bg-blue-50/10 dark:hover:bg-slate-950/20 transition-all font-semibold animate-fade-in"
                            >
                              <td className="px-5 py-4">
                                <span className={`inline-block px-2.5 py-1 rounded-md text-[9px] font-black uppercase ${
                                  lead.type === "Forum Post" 
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
                                    : "bg-[#0047AB]/10 text-[#0047AB] dark:bg-[#0047AB]/20"
                                }`}>
                                  {lead.type}
                                </span>
                              </td>
                              <td className="px-5 py-4 font-black text-gray-900 dark:text-slate-100">
                                {lead.name}
                              </td>
                              <td className="px-5 py-4 text-[#0047AB] dark:text-blue-400 font-bold select-all">
                                {lead.email}
                              </td>
                              <td className="px-5 py-4 font-bold text-gray-750 dark:text-slate-200 select-all">
                                {lead.phone}
                              </td>
                              <td className="px-5 py-4 max-w-sm">
                                <p className="font-semibold text-gray-800 dark:text-slate-200 line-clamp-3 leading-relaxed">
                                  {lead.message}
                                </p>
                                <span className="text-[9px] text-[#0047AB] dark:text-blue-450 font-extrabold uppercase tracking-wider block mt-1">
                                  Ref/Category: {lead.reference}
                                </span>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-1 flex-wrap min-w-[210px]">
                                  {[
                                    { value: "Pending", label: "🔴 New" },
                                    { value: "Called", label: "📞 Call" },
                                    { value: "Emailed", label: "✉️ Email" },
                                    { value: "Done", label: "✅ Done" }
                                  ].map((opt) => {
                                    const isSelected = (contactStatuses[lead.id] || "Pending") === opt.value;
                                    return (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleUpdateContactStatus(lead.id, opt.value)}
                                        className={`px-2 py-1 rounded-md text-[10px] font-black border transition-all cursor-pointer ${
                                          isSelected 
                                            ? "bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500 font-extrabold shadow-sm"
                                            : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-gray-600 dark:text-slate-350 border-gray-250 dark:border-slate-800"
                                        }`}
                                      >
                                        {opt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="bg-red-50 text-red-650 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Forum Inquiry lead"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SECTION 2: Appointments / Counseling Bookings Database */}
            <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border-2 border-emerald-200/80 dark:border-emerald-900/40 p-5 rounded-[28px] shadow-md transition-all space-y-4">
              <button
                type="button"
                onClick={() => setAppointmentsCollapsed(!appointmentsCollapsed)}
                className="w-full text-left flex items-center justify-between p-3 rounded-2xl bg-emerald-100/40 hover:bg-emerald-100/60 dark:bg-emerald-900/15 dark:hover:bg-emerald-900/25 border border-emerald-200/50 dark:border-emerald-900/25 transition-all font-black text-gray-905 dark:text-white cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center h-7 w-7 rounded-xl bg-emerald-650 text-white text-xs font-black shadow-sm">2</span>
                  <span className="text-sm font-black uppercase text-emerald-900 dark:text-emerald-300 tracking-wider flex items-center gap-1.5">
                    Appointment Bookings ({appointments.length})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400">
                  <span className="bg-emerald-200/60 dark:bg-emerald-950 px-2 py-0.5 rounded text-[10px]">
                    {appointmentsCollapsed ? "EXPAND 📂" : "COLLAPSE 📁"}
                  </span>
                  {appointmentsCollapsed ? <ChevronDown className="h-4.5 w-4.5" /> : <ChevronUp className="h-4.5 w-4.5" />}
                </div>
              </button>

              {!appointmentsCollapsed && (
                <div className="space-y-4 pt-2">
                  {appointments.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-emerald-200 dark:border-slate-805 rounded-3xl space-y-2 bg-emerald-50/10 dark:bg-slate-950/15">
                      <h4 className="font-extrabold text-xs text-emerald-600 dark:text-slate-400">No Free Appointment Form Submissions Found</h4>
                      <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
                        Provide credentials via 'Book 1-on-1 Consultation' or 'Avail Free Appointment' triggers to populate this database live.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-inner">
                      <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                          <tr className="bg-emerald-50/50 dark:bg-slate-950 text-emerald-900 dark:text-slate-300 text-[10px] uppercase font-black tracking-wider border-b border-emerald-100 dark:border-slate-800">
                            <th className="px-5 py-4">Student Candidate</th>
                            <th className="px-5 py-4">Communication Metrics</th>
                            <th className="px-5 py-4">Target Country</th>
                            <th className="px-5 py-4">Intake Semester</th>
                            <th className="px-5 py-4">Session Mode &amp; Funding</th>
                            <th className="px-5 py-4">Logged At</th>
                            <th className="px-5 py-4">Contact Tracker Status</th>
                            <th className="px-5 py-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50/40 dark:divide-slate-805 text-xs text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-900">
                          {appointments.map((appt) => (
                            <tr 
                              key={appt.id}
                              className="hover:bg-emerald-50/10 dark:hover:bg-slate-950/20 transition-all font-semibold animate-fade-in"
                            >
                              <td className="px-5 py-4 font-black text-gray-900 dark:text-slate-100">
                                {appt.name}
                              </td>
                              <td className="px-5 py-3">
                                <p className="text-[#0047AB] dark:text-blue-400 font-bold select-all">{appt.email}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5 select-all">{appt.phone}</p>
                              </td>
                              <td className="px-5 py-4">
                                <span className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-wide">
                                  {appt.country}
                                </span>
                              </td>
                              <td className="px-5 py-4 font-bold text-gray-800 dark:text-slate-100">
                                {appt.startDate || "N/A"}
                              </td>
                              <td className="px-5 py-3">
                                <p className="text-gray-905 dark:text-slate-205 font-semibold text-[11px]">{appt.mode || "N/A"}</p>
                                <p className="text-[9px] text-amber-600 dark:text-amber-400 font-medium tracking-wide">Source: {appt.funding || "Family Saved Funds"}</p>
                              </td>
                              <td className="px-5 py-3 text-gray-450 dark:text-slate-400 font-bold text-[10px]">
                                <p>{appt.date}</p>
                                <p className="text-[9px] text-gray-400 mt-0.5">{appt.time}</p>
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-1 flex-wrap min-w-[210px]">
                                  {[
                                    { value: "Pending", label: "🔴 New" },
                                    { value: "Called", label: "📞 Call" },
                                    { value: "Emailed", label: "✉️ Email" },
                                    { value: "Done", label: "✅ Done" }
                                  ].map((opt) => {
                                    const isSelected = (contactStatuses[appt.id] || "Pending") === opt.value;
                                    return (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleUpdateContactStatus(appt.id, opt.value)}
                                        className={`px-2 py-1 rounded-md text-[10px] font-black border transition-all cursor-pointer ${
                                          isSelected 
                                            ? "bg-emerald-600 border-emerald-600 text-white dark:bg-emerald-500 dark:border-emerald-500 font-extrabold shadow-sm"
                                            : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-gray-600 dark:text-slate-350 border-gray-250 dark:border-slate-800"
                                        }`}
                                      >
                                        {opt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteAppointment(appt.id)}
                                  className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Appointment lead details"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SECTION 3: Verify Admission (Eligibility Profiles Database) */}
            <div className="bg-purple-50/20 dark:bg-purple-950/10 border-2 border-purple-200/80 dark:border-purple-900/40 p-5 rounded-[28px] shadow-md transition-all space-y-4">
              <button
                type="button"
                onClick={() => setEligibilityCollapsed(!eligibilityCollapsed)}
                className="w-full text-left flex items-center justify-between p-3 rounded-2xl bg-purple-100/40 hover:bg-purple-100/60 dark:bg-purple-900/15 dark:hover:bg-purple-900/25 border border-purple-200/50 dark:border-purple-900/25 transition-all font-black text-gray-905 dark:text-white cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center h-7 w-7 rounded-xl bg-purple-600 text-white text-xs font-black shadow-sm">3</span>
                  <span className="text-sm font-black uppercase text-purple-900 dark:text-purple-300 tracking-wider flex items-center gap-1.5">
                    Candidate Eligibility Profiles ({eligibilityChecks.length})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-purple-800 dark:text-purple-400">
                  <span className="bg-purple-200/60 dark:bg-purple-950 px-2 py-0.5 rounded text-[10px]">
                    {eligibilityCollapsed ? "EXPAND 📂" : "COLLAPSE 📁"}
                  </span>
                  {eligibilityCollapsed ? <ChevronDown className="h-4.5 w-4.5" /> : <ChevronUp className="h-4.5 w-4.5" />}
                </div>
              </button>

              {!eligibilityCollapsed && (
                <div className="space-y-4 pt-2 animate-fade-in">
                  {eligibilityChecks.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-indigo-200 dark:border-slate-800 rounded-3xl space-y-2 bg-indigo-50/10 dark:bg-slate-950/15">
                      <h4 className="font-extrabold text-xs text-indigo-600 dark:text-slate-400">No Verified Admission Profiles Found</h4>
                      <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
                        Submit candidate profile parameters inside the 'Check Eligibility' form tool to populate this database live.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-indigo-100 dark:border-slate-800 shadow-inner">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="bg-indigo-50/50 dark:bg-slate-950 text-indigo-900 dark:text-slate-300 text-[10px] uppercase font-black tracking-wider border-b border-indigo-100 dark:border-slate-800">
                            <th className="px-5 py-4">Student Candidate</th>
                            <th className="px-5 py-4">Communication Metrics</th>
                            <th className="px-5 py-4">Academic Level Required / GPA</th>
                            <th className="px-5 py-4">Language Score Status</th>
                            <th className="px-5 py-4">Target Course &amp; Budget</th>
                            <th className="px-5 py-4">Calculated Eligibility</th>
                            <th className="px-5 py-4">Logged At</th>
                            <th className="px-5 py-4">Contact Tracker Status</th>
                            <th className="px-5 py-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-indigo-50/40 dark:divide-slate-805 text-xs text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-900">
                          {eligibilityChecks.map((candidate) => (
                            <tr 
                              key={candidate.id}
                              className="hover:bg-indigo-50/10 dark:hover:bg-slate-950/20 transition-all font-semibold animate-fade-in"
                            >
                              <td className="px-5 py-4 font-black text-gray-950 dark:text-slate-105 bg-amber-500/5 dark:bg-amber-400/5 border-r border-gray-100 dark:border-slate-850">
                                <p className="text-sm font-black text-gray-900 dark:text-white">{candidate.name}</p>
                                <span className="text-[9px] bg-amber-100/60 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 px-1.5 py-0.5 rounded uppercase font-black font-mono tracking-wide mt-1 inline-block">Registered Student 🎓</span>
                              </td>
                              <td className="px-5 py-3">
                                <p className="text-[#0047AB] dark:text-blue-400 font-bold select-all">{candidate.email}</p>
                                <p className="text-[10px] text-gray-450 mt-0.5 select-all">{candidate.phone}</p>
                              </td>
                              <td className="px-5 py-4">
                                <p className="font-bold text-gray-800 dark:text-slate-100">{candidate.studyLevel}</p>
                                <p className="text-[10px] text-gray-405 mt-0.5 font-medium">GPA Scale: {candidate.gpa}</p>
                              </td>
                              <td className="px-5 py-4 font-extrabold text-blue-600 dark:text-blue-300">
                                {candidate.englishScore || "N/A"}
                              </td>
                              <td className="px-5 py-3">
                                <p className="text-gray-950 dark:text-white font-semibold">Country: {candidate.targetCountry || "All"}</p>
                                <p className="text-[9px] text-[#0047AB] dark:text-blue-405 font-bold">Budget: {candidate.budget}</p>
                              </td>
                              <td className="px-5 py-3">
                                <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wide ${
                                  candidate.rating === "95%" 
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                                    : candidate.rating === "85%"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                                    : candidate.rating === "70%"
                                    ? "bg-amber-100 text-amber-800 dark:bg-amber-955/40 dark:text-amber-450"
                                    : "bg-red-50 text-red-750 dark:bg-red-950/40 dark:text-red-400"
                                }`}>
                                  {candidate.status} ({candidate.rating || "N/A"})
                                </span>
                              </td>
                              <td className="px-5 py-3 text-gray-450 dark:text-slate-400 font-bold text-[10px]">
                                <p>{candidate.date}</p>
                                <p className="text-[9px] text-gray-400 mt-0.5">{candidate.time}</p>
                              </td>
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-1 flex-wrap min-w-[210px]">
                                  {[
                                    { value: "Pending", label: "🔴 New" },
                                    { value: "Called", label: "📞 Call" },
                                    { value: "Emailed", label: "✉️ Email" },
                                    { value: "Done", label: "✅ Done" }
                                  ].map((opt) => {
                                    const isSelected = (contactStatuses[candidate.id] || "Pending") === opt.value;
                                    return (
                                      <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleUpdateContactStatus(candidate.id, opt.value)}
                                        className={`px-2 py-1 rounded-md text-[10px] font-black border transition-all cursor-pointer ${
                                          isSelected 
                                            ? "bg-indigo-600 border-indigo-600 text-white dark:bg-indigo-500 dark:border-indigo-500 font-extrabold shadow-sm"
                                            : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-gray-600 dark:text-slate-350 border-gray-250 dark:border-slate-800"
                                        }`}
                                      >
                                        {opt.label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteEligibilityCheck(candidate.id)}
                                  className="bg-red-50 text-red-650 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
                                  title="Delete candidate eligibility logs"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SECTION 4: Posted Resumes Dispatch Database */}
            <div className="bg-emerald-50/20 dark:bg-emerald-950/10 border-2 border-emerald-200/80 dark:border-emerald-900/40 p-5 rounded-[28px] shadow-md transition-all space-y-4">
              <button
                type="button"
                onClick={() => setResumesCollapsed(!resumesCollapsed)}
                className="w-full text-left flex items-center justify-between p-3 rounded-2xl bg-emerald-100/40 hover:bg-emerald-100/60 dark:bg-emerald-900/15 dark:hover:bg-emerald-900/25 border border-emerald-200/50 dark:border-emerald-900/25 transition-all font-black text-gray-905 dark:text-white cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center h-7 w-7 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-sm">4</span>
                  <span className="text-sm font-black uppercase text-emerald-900 dark:text-emerald-300 tracking-wider flex items-center gap-1.5">
                    ATS Resume Submissions Database ({resumesList.length})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-400">
                  <span className="bg-emerald-200/60 dark:bg-emerald-950 px-2 py-0.5 rounded text-[10px]">
                    {resumesCollapsed ? "EXPAND 📂" : "COLLAPSE 📁"}
                  </span>
                  {resumesCollapsed ? <ChevronDown className="h-4.5 w-4.5" /> : <ChevronUp className="h-4.5 w-4.5" />}
                </div>
              </button>

              {!resumesCollapsed && (
                <div className="space-y-4 pt-2 animate-fade-in">
                  {resumesList.length === 0 ? (
                    <div className="text-center py-10 border border-dashed border-emerald-200 dark:border-slate-800 rounded-3xl space-y-2 bg-emerald-50/10 dark:bg-slate-950/15">
                      <h4 className="font-extrabold text-xs text-emerald-600 dark:text-slate-400">No Resume Dispatches Logged Yet</h4>
                      <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
                        Submit a student bio and file inside the "Post Resume" portal to populate this interactive ATS analyzer ledger.
                      </p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto rounded-2xl border border-emerald-100 dark:border-slate-800 shadow-inner">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="bg-emerald-50/50 dark:bg-slate-950 text-emerald-900 dark:text-slate-300 text-[10px] uppercase font-black tracking-wider border-b border-emerald-100 dark:border-slate-800">
                            <th className="px-5 py-4">Professional Candidate</th>
                            <th className="px-5 py-4">Email &amp; Phone Contact</th>
                            <th className="px-5 py-4">Prior Tenure &amp; Degree</th>
                            <th className="px-5 py-4">Specialization Track</th>
                            <th className="px-5 py-4">Target Country</th>
                            <th className="px-5 py-4">Calculated ATS Score</th>
                            <th className="px-5 py-4">Loaded Resume File</th>
                            <th className="px-5 py-4">Dispatched At</th>
                            <th className="px-5 py-4 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-emerald-50/40 dark:divide-slate-805 text-xs text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-900">
                          {resumesList.map((res) => (
                            <tr key={res.id} className="hover:bg-emerald-50/10 dark:hover:bg-slate-950/20 transition-all font-semibold">
                              <td className="px-5 py-4 font-black text-gray-900 dark:text-white">
                                <p className="text-sm font-black">{res.name}</p>
                                <span className="text-[9px] bg-emerald-100/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 px-1.5 py-0.5 rounded uppercase font-black font-mono tracking-wide mt-1 inline-block font-mono">
                                  {res.status || "Profile Logged"}
                                </span>
                              </td>
                              <td className="px-5 py-3 select-all">
                                <p className="text-[#0047AB] dark:text-blue-400 font-bold">{res.email}</p>
                                <p className="text-[10px] text-gray-450 mt-0.5">{res.phone}</p>
                              </td>
                              <td className="px-5 py-4">
                                <p className="font-bold text-gray-800 dark:text-slate-100">{res.qualification}</p>
                                <p className="text-[10px] text-gray-450 mt-0.5 font-semibold">Tenure: {res.experience}</p>
                              </td>
                              <td className="px-5 py-4 font-extrabold text-[#0047AB] dark:text-blue-350">
                                {res.interestMajor}
                              </td>
                              <td className="px-5 py-4 font-black">
                                {res.targetCountry || "Any"}
                              </td>
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-1.5">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-black ${
                                    res.score >= 85 
                                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                                      : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400"
                                  }`}>
                                    {res.score}%
                                  </span>
                                </div>
                              </td>
                              <td className="px-5 py-3 text-[10px] text-slate-500 font-mono">
                                <p className="font-bold text-slate-700 dark:text-slate-300 select-all truncate max-w-[130px]" title={res.fileName}>
                                  📄 {res.fileName}
                                </p>
                                <p className="text-[9px] text-gray-400">Size: {res.fileSize || "N/A"}</p>
                              </td>
                              <td className="px-5 py-3 text-gray-450 dark:text-slate-400 font-bold text-[10px]">
                                <p>{res.date}</p>
                                <p className="text-[9px] text-gray-400 mt-0.5">{res.time}</p>
                              </td>
                              <td className="px-5 py-4 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteResume(res.id)}
                                  className="bg-red-50 text-red-650 hover:bg-red-600 hover:text-white p-2 rounded-lg transition-colors cursor-pointer"
                                  title="Delete resume submission log"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 border border-gray-150 dark:border-slate-805">
              <span className="text-[11px] font-semibold text-gray-500 dark:text-slate-400 flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-emerald-500 animate-pulse" /> Compliance Note: Emails, telephone metrics and appointment requirements are secure under verification guidelines.
              </span>
              <button
                type="button"
                onClick={() => setIsAdminView(false)}
                className="bg-[#0047AB] hover:bg-blue-700 text-white font-extrabold text-xs px-5 py-2.5 rounded-xl shadow cursor-pointer transition-colors"
              >
                Close Admin Panel
              </button>
            </div>
          </div>
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Groups & Events (span 5) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Chat Circles section */}
              <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-6 rounded-[24px] shadow-sm space-y-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-emerald-500" /> Active Regional Chapters
                  </h3>
                  <p className="text-xs font-semibold text-gray-400">Official monitored groups with verified admissions helpers.</p>
                </div>

                <div className="space-y-3">
                  {groups.map(grp => (
                    <div 
                      key={grp.id}
                      className="p-4 bg-slate-50 dark:bg-slate-950 border border-gray-200/50 dark:border-slate-800 rounded-2xl flex items-center gap-4 hover:border-gray-300 dark:hover:border-slate-700 transition-all"
                    >
                      <div className="h-12 w-12 bg-white dark:bg-slate-850 font-black text-2xl flex items-center justify-center rounded-xl shadow-xs">
                        {grp.image}
                      </div>
                      
                      <div className="flex-grow space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wide">{grp.country}</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-1">
                            <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" /> {grp.activeNow}
                          </span>
                        </div>
                        
                        <h4 className="text-xs sm:text-sm font-black text-gray-950 dark:text-white leading-tight">
                          {grp.name}
                        </h4>
                        
                        <p className="text-[11px] text-gray-500 dark:text-slate-350 leading-relaxed font-semibold">
                          {grp.description}
                        </p>

                        <div className="flex items-center justify-between pt-1.5">
                          <span className="text-[10px] font-bold text-gray-400">{grp.membersCount}</span>
                          <button
                            onClick={() => handleJoinGroup(grp)}
                            className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] sm:text-xs font-extrabold px-3 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 transition-all"
                          >
                            <Send className="h-3 w-3" /> Connect ({grp.platform})
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Virtual Webinars section */}
              <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-6 rounded-[24px] shadow-sm space-y-5">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-500" /> Upcoming Digital Workshops
                  </h3>
                  <p className="text-xs font-semibold text-gray-400">Save slots for immersive, mock embassy and SOP lectures.</p>
                </div>

                <div className="space-y-3">
                  {events.map(evt => (
                    <div 
                      key={evt.id}
                      className="p-4 bg-blue-50/50 dark:bg-slate-950 border border-blue-100/40 dark:border-slate-800 rounded-2xl space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black uppercase tracking-wide bg-[#0047AB]/10 text-[#0047AB] py-1 px-2 rounded-md">
                          {evt.platform}
                        </span>
                        <span className="text-xs font-extrabold text-[#0047AB]">{evt.time}</span>
                      </div>

                      <div className="space-y-1">
                        <h4 className="text-sm font-black text-gray-900 dark:text-white leading-tight">
                          {evt.title}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-slate-400 font-medium leading-relaxed">
                          Presented by <strong className="text-gray-700 dark:text-slate-350">{evt.speaker}</strong> ({evt.role})
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-850/60 pt-3">
                        <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> {evt.date}
                        </span>
                        
                        <button
                          onClick={() => handleRegisterEvent(evt.id)}
                          className={`text-xs font-extrabold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all ${
                            evt.registered 
                              ? "bg-slate-200 text-gray-700 cursor-not-allowed" 
                              : "bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                          disabled={evt.registered}
                        >
                          {evt.registered ? (
                            <>
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" /> Registered
                            </>
                          ) : (
                            "Register Slot"
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Dynamic Q&A Thread Forum (span 7) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-850 p-6 rounded-[28px] shadow-sm space-y-6">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
                      <MessageSquare className="h-6 w-6 text-[#0047AB]" /> Student Q&amp;A Forum Feed
                    </h3>
                    <p className="text-xs font-semibold text-gray-400">Read verified answers from our ICCRC and study visa advisors.</p>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-gray-800 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Forum Thread Loop */}
                <div className="space-y-5">
                  {posts.filter(p => p.question.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase())).map(post => (
                    <div 
                      key={post.id}
                      className="p-5 border border-gray-150 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 rounded-2xl space-y-4 hover:bg-slate-50 dark:hover:bg-slate-950/70 transition-all"
                    >
                      {/* Thread Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img 
                            src={post.avatar} 
                            alt={post.author}
                            className="h-8 w-8 rounded-full border border-gray-200 object-cover" 
                          />
                          <div>
                            <h5 className="text-xs font-extrabold text-gray-800 dark:text-white">{post.author}</h5>
                            <span className="text-[10px] text-gray-400 font-semibold">{post.date}</span>
                          </div>
                        </div>

                        <span className="bg-blue-100/70 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-extrabold px-3 py-1 rounded-md">
                          {post.category}
                        </span>
                      </div>

                      {/* Question Content */}
                      <div className="space-y-1.5">
                        <h4 className="text-sm sm:text-base font-black text-gray-900 dark:text-white leading-snug">
                          {post.question}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-slate-350 leading-relaxed font-semibold">
                          {post.details}
                        </p>
                      </div>

                       {/* Likes & Upvotes bar */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpvote(post.id)}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                            post.userUpvoted 
                              ? "bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-950/20 dark:border-blue-900" 
                              : "bg-white border-gray-200 text-gray-500 dark:bg-slate-900 dark:border-slate-800"
                          }`}
                        >
                          <ChevronUp className="h-4.5 w-4.5" />
                          <span>Upvote ({post.upvotes})</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveReplyToId(post.id);
                            clearReplyForm();
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-black bg-[#0047AB]/5 dark:bg-blue-950/25 text-[#0047AB] dark:text-blue-450 border border-[#0047AB]/10 dark:border-blue-905/40 hover:bg-[#0047AB]/10 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="h-3.5 w-3.5" />
                          <span>Add Comment</span>
                        </button>
                      </div>

                      {/* Inline reply form for adding a comment to the main post */}
                      {activeReplyToId === post.id && renderReplyFormMarkup(post.id, post.id, post.author)}

                      {/* Threaded / Recursive Replies list */}
                      {(post.replies || []).length > 0 && (
                        <div className="space-y-2 mt-4 pt-4 border-t border-gray-150/80 dark:border-slate-805">
                          <span className="text-[10px] font-black uppercase text-gray-400 block tracking-wider">Comment Thread:</span>
                          {post.replies.map(rep => renderReplyNode(rep, post.id))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        )}

        {/* Dynamic callout to speak to counselors */}
        <div className="bg-white dark:bg-slate-900 border border-gray-150 dark:border-slate-800 rounded-[30px] p-8 text-center space-y-4 max-w-4xl mx-auto">
          <h4 className="text-xl sm:text-2xl font-black text-gray-950 dark:text-white">Couldn&apos;t find the specific answers to your case profile?</h4>
          <p className="text-sm font-semibold text-gray-500 dark:text-slate-350 max-w-xl mx-auto leading-relaxed">
            Get an instant evaluation from an expert with direct experience matching your grades. No wait, no fees.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onBookCounselling("Connecting from direct community dashboard evaluation link")}
              className="bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-700 hover:shadow text-white font-extrabold px-8 py-3 rounded-xl text-xs cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="h-4.5 w-4.5 text-amber-300" /> Start Free Counselor Connect
            </button>
          </div>
        </div>

      </div>

      {/* Ask Question Popup Dialog/Modal */}
      {isQuestionModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[28px] max-w-lg w-full border border-gray-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            
            <div className="p-6 bg-[#0047AB] text-white flex items-center justify-between">
              <h4 className="text-base font-black flex items-center gap-2">
                <MessageSquare className="h-5 w-5" /> Ask the Career Wings Forum
              </h4>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="text-white hover:opacity-80 rounded-full"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddQuestion} className="p-6 space-y-4">
              
              <div className="space-y-1">
                <label className="text-[11px] font-black text-gray-450 uppercase">Topic Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-bold"
                >
                  <option value="Visa Timeline">Visa Timeline &amp; IRCC</option>
                  <option value="Scholarships">Scholarships &amp; Waivers</option>
                  <option value="Universities">Universities Advice</option>
                  <option value="IELTS / Prep">IELTS / Test Prep Advice</option>
                  <option value="General Query">General Query</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black text-gray-450 uppercase">Your Question Header</label>
                <input
                  type="text"
                  placeholder="e.g. Can we submit GIC payments before attestation letters?"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-black text-gray-800 dark:text-white"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-black text-gray-450 uppercase">Additional Context / GPA / Scores</label>
                <textarea
                  placeholder="Provide GPA, target country, field/industry, English score if possible so counselors can match answers perfectly."
                  value={newDetails}
                  onChange={(e) => setNewDetails(e.target.value)}
                  rows={4}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-805 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-blue-500 font-medium text-gray-700 dark:text-slate-200"
                />
              </div>

              {/* Personal Contact Details Fields for Lead Capture (Hidden in public view, visible in Admin Panel) */}
              <div className="p-4 bg-blue-50/40 dark:bg-slate-950/60 rounded-2xl border border-blue-100/60 dark:border-slate-800 space-y-3">
                <span className="text-[10px] font-black text-[#0047AB] dark:text-blue-450 uppercase tracking-wider block">
                  🛡️ Secure Verification Details (Will not show publicly)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-450 uppercase">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sen"
                      value={newQuestionAuthor}
                      onChange={(e) => setNewQuestionAuthor(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-450 uppercase">Email Address</label>
                    <input
                      type="email"
                      placeholder="rahul@example.com"
                      value={newQuestionEmail}
                      onChange={(e) => setNewQuestionEmail(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-450 uppercase">Contact No</label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={newQuestionPhone}
                      onChange={(e) => setNewQuestionPhone(e.target.value)}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700 font-bold text-xs px-4"
                >
                  Dismiss
                </button>
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-605 text-white font-black text-xs px-6 py-2.5 rounded-xl flex items-center gap-1 shadow-md hover:shadow-lg transition-all"
                >
                  Post to Community Group <Plus className="h-4 w-4" />
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
