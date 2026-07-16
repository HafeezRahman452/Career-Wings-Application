import React, { useState } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Building, 
  ArrowLeft,
  Send,
  CheckCircle,
  Calendar,
  User,
  Compass,
  AlertCircle
} from "lucide-react";

interface OfficeLocationsPageProps {
  onBack: () => void;
  onBookCounselling: (details: string) => void;
}

export default function OfficeLocationsPage({ onBack, onBookCounselling }: OfficeLocationsPageProps) {
  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    country: "Australia",
    intake: "Fall 2026",
    message: ""
  });
  
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<any>(null);

  // Form Onchange handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error
    if (errors[name]) {
      setErrors(prev => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // Form Validation and Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    // Basic validation in Roman English format response
    if (!formData.name.trim()) {
      newErrors.name = "Aapka poora naam likhna zaroori hai";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number likhna zaroori hai";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(formData.phone.trim())) {
      newErrors.phone = "Kripya ek sahi 10-12 digit ka phone number likhein";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email id likhna zaroori hai";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Kripya ek valid email address enter karein";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit with simulated delay
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubmittedData({ ...formData, ticketId: "CW-HYD-" + Math.floor(10000 + Math.random() * 90000) });
      
      // Trigger parent callback 
      onBookCounselling(`Form Contact Inquiry: student ${formData.name} seeking counsel for ${formData.country} in ${formData.intake}`);
    }, 1500);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      country: "Australia",
      intake: "Fall 2026",
      message: ""
    });
    setSubmitSuccess(false);
    setSubmittedData(null);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950/20 min-h-screen py-10 transition-colors font-sans antialiased">
      <div className="container mx-auto px-4 max-w-7xl space-y-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <button 
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-extrabold text-[#0047AB] dark:text-blue-400 hover:underline cursor-pointer"
          >
            <ArrowLeft className="h-4.5 w-4.5" /> Dashboard Par Wapas Jayein
          </button>
          <span className="text-xs font-black uppercase text-slate-800 dark:text-slate-300 tracking-wider">
            Our Main Head Office
          </span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#0047AB] bg-blue-100/60 dark:bg-blue-950/55 px-4 py-2 rounded-full inline-flex items-center gap-1.5 border border-blue-300/40">
            <Building className="h-4 w-4 text-[#0047AB]" /> Hyderabad Corporate Head Office
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none block">
            Hamare Chaitanyapuri Office Visit Karein
          </h1>
          <p className="text-slate-700 dark:text-slate-200 text-sm sm:text-base font-semibold leading-relaxed max-w-2xl mx-auto">
            Senior Experts ke sath face-to-face academic evaluation, student VISA profile appraisal, aur solid IELTS/PTE preparation counselling bilkul free book karein.
          </p>
        </div>

        {/* 2-Column Grid of Office Info, Map, and Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          
          {/* LEFT COLUMN: Head Office Details, Status & Address Info (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-md">
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-emerald-100 dark:bg-emerald-950/30 px-4 py-2.5 rounded-2xl border border-emerald-300">
                <span className="text-xs sm:text-sm font-extrabold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                  OFFICE KHULA HAI & COUNSELLING CHALU HAI
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-black dark:text-white tracking-tight">
                    Career Wings Consultants
                  </h3>
                  <p className="text-sm text-slate-950 dark:text-slate-100 font-black">
                    Hyderabad Corporate Head Office & Special Study Visa Hub
                  </p>
                </div>

                {/* Physical Address */}
                <div className="flex items-start gap-4 bg-slate-50 dark:bg-slate-950/40 p-5 rounded-2xl border border-slate-400 dark:border-slate-700">
                  <MapPin className="h-6 w-6 text-[#002288] shrink-0 mt-1" />
                  <div className="space-y-1.5">
                    <span className="text-xs font-black text-[#002288] dark:text-blue-300 uppercase tracking-widest block">Office Address (Pata)</span>
                    <p className="text-sm text-black dark:text-white font-black leading-relaxed">
                      Metro Pillar No: 1568, Room No: 509, 5th Floor, Chaithyana Chambers, Chaitanyapuri, Dilsukhnagar, Hyderabad - 500060, Telangana, India.
                    </p>
                  </div>
                </div>

                {/* Landmark info */}
                <div className="flex items-start gap-4 bg-orange-100/60 dark:bg-orange-950/20 p-5 rounded-2xl border border-orange-400 dark:border-orange-950/30">
                  <Compass className="h-6 w-6 text-orange-850 shrink-0 mt-1" />
                  <div className="space-y-1.5">
                    <span className="text-xs font-black text-orange-900 dark:text-orange-300 uppercase tracking-widest block">Landmark (Pehchan)</span>
                    <p className="text-sm text-black dark:text-white font-black leading-relaxed">
                      Dilsukhnagar <strong className="font-extrabold text-orange-950 dark:text-orange-400">Chaitanyapuri Metro Station</strong> ke bilkul barabar mein (Direct station exit, Metro Pillar No: 1568).
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Helper Details */}
              <div className="space-y-4 pt-4 text-sm font-bold divide-y divide-slate-300 dark:divide-slate-800">
                <div className="flex items-center gap-3.5 py-3">
                  <Phone className="h-5.5 w-5.5 text-emerald-700 shrink-0" />
                  <div>
                    <span className="text-xs text-black dark:text-slate-100 font-black uppercase tracking-wider block">Kuch Sawaal Hai? Direct Call Karein:</span>
                    <a href="tel:+919000119072" className="text-[#002288] dark:text-blue-300 hover:underline text-xl font-black">+91 90001 19072</a>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 pt-4">
                  <Mail className="h-5.5 w-5.5 text-orange-700 shrink-0" />
                  <div>
                    <span className="text-xs text-black dark:text-slate-100 font-black uppercase tracking-wider block">Admissions Email Support:</span>
                    <a href="mailto:info@careerwingsconsultants.com" className="text-black dark:text-white hover:underline text-base font-black">info@careerwingsconsultants.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5 pt-4">
                  <Clock className="h-5.5 w-5.5 text-blue-650 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-black dark:text-slate-100 font-black uppercase tracking-wider block">Office Khulne Ka Waqt:</span>
                    <span className="text-black dark:text-white text-base font-black">09:30 AM se 06:30 PM <span className="font-black text-slate-900 dark:text-slate-350 text-sm">(Peer - Hafta / Mon - Sat)</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action helper note */}
            <div className="bg-blue-100/50 dark:bg-blue-950/20 rounded-2xl border border-blue-200 dark:border-blue-900/30 p-5 mt-4">
              <p className="text-sm text-blue-900 dark:text-blue-300 font-bold leading-relaxed">
                Direct help chahiye? Bas right side par diye gaye callback form ko fill karein aur humari senior team aapko sirf 15 minute ke andar call back karegi!
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Map & Contact Form (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6">
            
            {/* GOOGLE MAPS BLOCK */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] overflow-hidden p-3 shadow-md flex-1 min-h-[320px]">
              <div className="rounded-[24px] overflow-hidden relative w-full h-full min-h-[300px] border border-slate-200 dark:border-slate-800">
                <iframe 
                  src="https://maps.google.com/maps?q=Chaithyana%20Chambers,%20Chaitanyapuri,%20Dilsukhnagar,%20Hyderabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Career Wings Consultants Corporate Office Map"
                ></iframe>
              </div>
            </div>

            {/* SECURE DIRECT CALL BACK & INQUIRY FORM */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] p-6 sm:p-8 shadow-md">
              {!submitSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1.5">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                      <Send className="h-5.5 w-5.5 text-[#0047AB]" /> Turant Call Back Aur Counselling Request Karein
                    </h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                      Neeche diye gaye simple form mein apni information bharein. Hamare expert Study Abroad Advisor sirf 15 minute ke andar call back karenge.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* User Full name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Aapka Poora Name (Full Name)</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <input 
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jaise: Hafeez Rahman"
                          className={`w-full bg-slate-50 dark:bg-slate-950/40 border ${errors.name ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} text-slate-900 dark:text-white rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0047AB] focus:bg-white`}
                        />
                      </div>
                      {errors.name && <p className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1"><AlertCircle className="h-4.5 w-4.5" /> {errors.name}</p>}
                    </div>

                    {/* Phone number */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Mobile Number (WhatsApp Enabled)</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Jaise: +91 90001 19072"
                          className={`w-full bg-slate-50 dark:bg-slate-950/40 border ${errors.phone ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} text-slate-900 dark:text-white rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0047AB] focus:bg-white`}
                        />
                      </div>
                      {errors.phone && <p className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1"><AlertCircle className="h-4.5 w-4.5" /> {errors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email address */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Aapka Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Jaise: student@example.com"
                          className={`w-full bg-slate-50 dark:bg-slate-950/40 border ${errors.email ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} text-slate-900 dark:text-white rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0047AB] focus:bg-white`}
                        />
                      </div>
                      {errors.email && <p className="text-xs text-red-500 font-bold flex items-center gap-1 mt-1"><AlertCircle className="h-4.5 w-4.5" /> {errors.email}</p>}
                    </div>

                    {/* Target country of interest */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Jis Desh Mein Padhna Hai (Target Country)</label>
                      <div className="relative">
                        <Compass className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <select 
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0047AB] focus:bg-white appearance-none cursor-pointer"
                        >
                          <option value="Australia">Australia 🇦🇺</option>
                          <option value="United Kingdom">United Kingdom (UK) 🇬🇧</option>
                          <option value="United States">United States (USA) 🇺🇸</option>
                          <option value="New Zealand">New Zealand 🇳🇿</option>
                          <option value="Ireland">Ireland 🇮🇪</option>
                          <option value="Canada">Canada 🇨🇦</option>
                          <option value="Europe">Schengen Europe study VISA 🇪🇺</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Target Intake intake */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Admission Session (Select Intake)</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
                        <select 
                          name="intake"
                          value={formData.intake}
                          onChange={handleChange}
                          className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 pl-10 pr-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0047AB] focus:bg-white appearance-none cursor-pointer"
                        >
                          <option value="Fall 2026">Fall 2026 (Aug - Oct admission)</option>
                          <option value="Spring 2027">Spring 2027 (Jan - Mar admission)</option>
                          <option value="Summer 2027">Summer 2027 (May - Jun admission)</option>
                          <option value="Fall 2027">Fall 2027 (Aug - Oct admission)</option>
                        </select>
                      </div>
                    </div>

                    {/* Specific queries / message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-extrabold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">Khas Sawaal Ya Koi Pareshani (Optional)</label>
                      <input 
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Jaise: Gap hai, Low percentage, Backlogs, Funds"
                        className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-300 hover:border-slate-400 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl py-3 px-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#0047AB] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#0047AB] hover:bg-blue-700 disabled:bg-[#0047AB]/60 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Counselling Slot Book Ho Raha Hai...
                        </>
                      ) : (
                        <>
                          <Send className="h-4.5 w-4.5 shrink-0" /> Counselling Request Submit Karein
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6 text-center py-6 animate-fade-in">
                  <div className="inline-flex items-center justify-center bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 rounded-full p-4 mb-2 shadow-sm">
                    <CheckCircle className="h-12 w-12 shrink-0" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-emerald-900 dark:text-emerald-400 tracking-tight">
                      Aapka Counselling Inquiry Register Ho Gaya Hai!
                    </h3>
                    <p className="text-sm text-slate-800 dark:text-slate-300 font-bold max-w-md mx-auto leading-relaxed">
                      Bahut Shukriya, <strong className="text-[#0047AB] dark:text-blue-400 font-extrabold">{submittedData.name}</strong>. Aapki details hamare database mein safe hain. Ticket ID hai: <span className="bg-[#0047AB]/10 text-[#0047AB] dark:bg-blue-400/10 dark:text-blue-400 px-3 py-1 rounded font-mono font-black text-sm">{submittedData.ticketId}</span>. Hum 15 minute ke andar aapse rabta karenge.
                    </p>
                  </div>

                  {/* Summary receipt of submissions */}
                  <div className="bg-slate-50 dark:bg-slate-950/40 border border-slate-300 dark:border-slate-800 rounded-2xl p-5 max-w-md mx-auto text-left text-sm text-slate-800 dark:text-slate-200 font-bold space-y-3">
                    <p className="text-xs text-[#0047AB] dark:text-blue-400 uppercase tracking-widest font-black border-b border-slate-200 dark:border-slate-800 pb-2">Aapki Entry Ki Details</p>
                    <div className="grid grid-cols-3 gap-2 py-0.5">
                      <span className="text-slate-500">Chuninda Desh (Country):</span>
                      <span className="col-span-2 text-slate-900 dark:text-white font-black">{submittedData.country}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-0.5">
                      <span className="text-slate-500">Intake / Session:</span>
                      <span className="col-span-2 text-slate-900 dark:text-white font-black">{submittedData.intake}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 py-0.5">
                      <span className="text-slate-500">Mobile Number:</span>
                      <span className="col-span-2 text-slate-900 dark:text-white font-black">{submittedData.phone}</span>
                    </div>
                    {submittedData.message && (
                      <div className="grid grid-cols-3 gap-2 py-0.5">
                        <span className="text-slate-500">Aapka Sawaal:</span>
                        <span className="col-span-2 text-slate-700 dark:text-slate-300 font-medium italic">"{submittedData.message}"</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-[#0047AB] dark:text-blue-400 hover:underline hover:text-blue-700 transition-colors font-extrabold text-sm cursor-pointer"
                    >
                      ← Ek aur sawal submit karein ya details update karein
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Support disclaimer banner */}
        <div className="bg-amber-500/10 dark:bg-amber-500/5 rounded-2xl border border-amber-550 p-5 flex items-start gap-4 max-w-4xl mx-auto">
          <span className="text-amber-600 text-2xl shrink-0">💡</span>
          <div className="space-y-1">
            <h5 className="text-sm font-extrabold text-amber-800 dark:text-amber-400">Important Advisory Note / Zaroori Baat!</h5>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-300 font-bold leading-relaxed">
              Humari vocabulary diagnostics, listening aur reading tests ko aap online directly <strong className="font-extrabold text-[#0047AB] dark:text-blue-400">Test Preparation</strong> section mein bilkul free hal kar sakte hain. Agar aap Hyderabad ke bahar rehte hain toh dynamic online mock test dena zyada behtar hai.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
