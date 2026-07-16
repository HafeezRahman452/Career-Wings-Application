import React, { useState } from "react";
import { CounsellingFormInput } from "../types";
import { CheckCircle2, Sparkles, Loader2, Calendar, Phone, Mail, User } from "lucide-react";

interface CounsellingFormProps {
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
}

export default function CounsellingForm({
  onSuccess,
  title = "Get a Free Appointment Today!",
  subtitle = "Enter your details and our global advisor will reach out to you within 24 hours to map your educational journey. Our consulting services are 100% free!",
}: CounsellingFormProps) {
  const [formData, setFormData] = useState<CounsellingFormInput>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "australia",
    startDate: "Fall 2026",
    mode: "Virtual Video Session",
    funding: "Family Support",
    agreeTerms: false,
    contactConsent: false,
    marketingConsent: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please present a valid academic email";
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = "Provide a valid mobile number with area code";
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to privacy guidelines";
    if (!formData.contactConsent) newErrors.contactConsent = "Consent to contact is required for advisors";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Submit lead and save to SQL server database for Admin Panel access
    try {
      const newAppt = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        startDate: formData.startDate,
        mode: formData.mode,
        funding: formData.funding,
        date: new Date().toLocaleDateString('en-GB'),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppt)
      });
    } catch (err) {
      console.error("Backend SQL DB booking insertion error: ", err);
    }

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 3000);
      }
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (success) {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800/50 p-8 md:p-12 rounded-3xl text-center flex flex-col items-center justify-center space-y-4 shadow-sm animate-fade-in">
        <div className="bg-emerald-500 text-white rounded-full p-4 shadow-lg shadow-emerald-200 dark:shadow-none animate-bounce">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-emerald-900 dark:text-emerald-400">
          Application Submitted Successfully!
        </h3>
        <p className="text-gray-600 dark:text-emerald-300 max-w-md text-sm md:text-base leading-relaxed">
          Congratulations, <strong>{formData.firstName}</strong>! We have assigned you to our Senior Advisor specialized in <strong>{formData.country.toUpperCase()}</strong>.
        </p>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl w-full max-w-sm border border-emerald-100/30 text-left text-xs text-gray-500 dark:text-slate-400 space-y-2.5">
          <p className="flex items-center gap-2">
            <span className="font-semibold text-emerald-600">Assigned Expert:</span> Dr. Elizabeth Moore (Study Director)
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-emerald-600">Preferred Mode:</span> {formData.mode}
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold text-emerald-600">Target Intake:</span> {formData.startDate}
          </p>
          <p className="text-[11px] text-orange-600 dark:text-orange-400 font-medium">
            * An calendar invite and confirmation SMS have been dispatched to {formData.phone}.
          </p>
        </div>
        <button
          onClick={() => {
            setSuccess(false);
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              country: "australia",
              startDate: "Fall 2026",
              mode: "Virtual Video Session",
              funding: "Family Support",
              agreeTerms: false,
              contactConsent: false,
              marketingConsent: false,
            });
          }}
          className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 underline hover:text-emerald-800"
        >
          Book another slot
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7FF] dark:bg-slate-800 p-6 md:p-10 rounded-3xl shadow-md border border-blue-50/50 dark:border-slate-700/50 relative overflow-hidden">
      {/* Decorative vector shape */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/50 dark:bg-slate-700 rounded-bl-full pointer-events-none" />

      <h3 className="text-2xl md:text-3xl font-extrabold text-[#0047AB] dark:text-blue-400 mb-2 flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-amber-500 animate-pulse" />
        {title}
      </h3>
      <div className="w-16 h-1 bg-orange-400 mb-6 rounded-full" />
      <p className="text-sm text-gray-600 dark:text-slate-300 mb-8 leading-relaxed">
        {subtitle}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300" htmlFor="firstName">First name*</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Jane"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`w-full border ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500'} bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 pl-10 pr-4 shadow-sm text-sm`}
              />
            </div>
            {errors.firstName && <p className="text-xs text-red-500 font-semibold">{errors.firstName}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300" htmlFor="lastName">Last name*</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`w-full border ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-slate-700 focus:ring-blue-500' } bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 pl-10 pr-4 shadow-sm text-sm`}
              />
            </div>
            {errors.lastName && <p className="text-xs text-red-500 font-semibold">{errors.lastName}</p>}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300" htmlFor="email">Email address*</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane.doe@university.com"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-slate-700 focus:ring-blue-500'} bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 pl-10 pr-4 shadow-sm text-sm`}
            />
          </div>
          {errors.email && <p className="text-xs text-red-500 font-semibold">{errors.email}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300" htmlFor="phone">Mobile number*</label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 012-3456"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full border ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 dark:border-slate-700 focus:ring-blue-500'} bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 pl-10 pr-4 shadow-sm text-sm`}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-500 font-semibold">{errors.phone}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300" htmlFor="country">Target Destination*</label>
            <select
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-4 shadow-sm text-sm focus:ring-[#0047AB] focus:border-[#0047AB]"
            >
              <option value="australia">Australia</option>
              <option value="uk">United Kingdom</option>
              <option value="usa">United States</option>
              <option value="canada">Canada</option>
              <option value="newzealand">New Zealand</option>
              <option value="ireland">Ireland</option>
              <option value="europe">Europe</option>
              <option value="germany">Germany</option>
              <option value="france">France</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300" htmlFor="startDate">Desired Intake*</label>
            <select
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-4 shadow-sm text-sm focus:ring-[#0047AB] focus:border-[#0047AB]"
            >
              <option value="Fall 2026">Fall 2026 (Aug - Sep)</option>
              <option value="Winter 2027">Winter 2027 (Jan - Feb)</option>
              <option value="Summer 2027">Summer 2027 (May - Jun)</option>
              <option value="Later">Later / Deciding</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300" htmlFor="mode">Meeting Preference*</label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleInputChange}
              className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
            >
              <option value="Virtual Video Session">Virtual Video Session</option>
              <option value="In-Person Office visit">In-Person Office Visit</option>
              <option value="Phone Call Discussion">Phone Call Discussion</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[13px] font-bold text-gray-700 dark:text-slate-300" htmlFor="funding">How will you fund?*</label>
            <select
              id="funding"
              name="funding"
              value={formData.funding}
              onChange={handleInputChange}
              className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white rounded-xl py-2.5 px-4 shadow-sm text-sm focus:ring-[#0047AB]"
            >
              <option value="Self-Funded">Self-Funded (Personal Saving)</option>
              <option value="Family Support">Family Financial Support</option>
              <option value="Bank Loan">Seeking Student Education Loan</option>
              <option value="Scholarship Seeking">Must secure Scholarship support</option>
            </select>
          </div>
        </div>

        <div className="space-y-3.5 pt-2">
          <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
            <input
              name="agreeTerms"
              type="checkbox"
              checked={formData.agreeTerms}
              onChange={handleInputChange}
              className="mt-1 rounded border-gray-300 text-[#0047AB] focus:ring-[#0047AB] cursor-pointer"
            />
            <span className="text-gray-600 dark:text-slate-400">
              I agree to Career Wings Consultants'{" "}
              <a href="#" className="text-[#0047AB] dark:text-blue-400 font-semibold hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#0047AB] dark:text-blue-400 font-semibold hover:underline">
                Privacy Policy
              </a>
              . *
            </span>
          </label>
          {errors.agreeTerms && <p className="text-xs text-red-500 font-semibold pl-7">{errors.agreeTerms}</p>}

          <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
            <input
              name="contactConsent"
              type="checkbox"
              checked={formData.contactConsent}
              onChange={handleInputChange}
              className="mt-1 rounded border-gray-300 text-[#0047AB] focus:ring-[#0047AB] cursor-pointer"
            />
            <span className="text-gray-600 dark:text-slate-400">
              I authorize verified CWC study counselors to call, SMS or email me regarding custom academic selections. *
            </span>
          </label>
          {errors.contactConsent && <p className="text-xs text-red-500 font-semibold pl-7">{errors.contactConsent}</p>}

          <label className="flex items-start gap-3 cursor-pointer text-xs select-none">
            <input
              name="marketingConsent"
              type="checkbox"
              checked={formData.marketingConsent}
              onChange={handleInputChange}
              className="mt-1 rounded border-gray-300 text-[#0047AB] focus:ring-[#0047AB] cursor-pointer"
            />
            <span className="text-gray-600 dark:text-slate-400">
              Keep me updated about global scholarships, pre-departure seminars, and university direct-admissions events. (Optional)
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0047AB] dark:bg-blue-600 hover:bg-blue-800 dark:hover:bg-blue-500 text-white font-extrabold py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm md:text-base mt-2 disabled:opacity-75"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying & Booking Advisors...
            </>
          ) : (
            <>
              <Calendar className="h-5 w-5" />
              Avail Free Appointment
            </>
          )}
        </button>
      </form>
    </div>
  );
}
