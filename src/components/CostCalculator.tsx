import React, { useState, useEffect } from "react";
import { DollarSign, Building2, Utensils, Compass, Coffee, Wifi, Lightbulb, TrendingUp, AlertCircle } from "lucide-react";

interface CountryConfig {
  name: string;
  currency: string;
  multiplierToUSD: number; // Conversion rate to USD
  rentDefault: number;
  foodDefault: number;
  transitDefault: number;
  leisureDefault: number;
  utilitiesDefault: number;
  tips: string[];
}

const COUNTRY_PRESETS: Record<string, CountryConfig> = {
  australia: {
    name: "Australia",
    currency: "AUD ($)",
    multiplierToUSD: 0.65,
    rentDefault: 850,
    foodDefault: 400,
    transitDefault: 150,
    leisureDefault: 200,
    utilitiesDefault: 120,
    tips: [
      "International students can work part-time up to 48 hours per fortnight during semesters.",
      "Consider buying a secondhand bike or looking for suburbs connected by the Free Tram Zone in Melbourne.",
      "Rent is often quoted weekly. Monthly rent is calculated as (Weekly Rent × 52) ÷ 12."
    ]
  },
  uk: {
    name: "United Kingdom",
    currency: "GBP (£)",
    multiplierToUSD: 1.25,
    rentDefault: 600,
    foodDefault: 250,
    transitDefault: 90,
    leisureDefault: 150,
    utilitiesDefault: 95,
    tips: [
      "Living outside London (e.g., Manchester, Sheffield) reduces rent expenses by up to 45%.",
      "Get a '16-25 Railcard' or '18+ Student Oyster photocard' for 30% off standard transit fares.",
      "Most UK supermarkets offer bulk discounts—try shopping at Aldi, Lidl, or Asda."
    ]
  },
  usa: {
    name: "United States",
    currency: "USD ($)",
    multiplierToUSD: 1.0,
    rentDefault: 950,
    foodDefault: 380,
    transitDefault: 110,
    leisureDefault: 220,
    utilitiesDefault: 130,
    tips: [
      "ON-CAMPUS jobs allow up to 20 hours per week of work during active terms.",
      "Mandatory student health insurance is usually bundled with fees—compare plans before buying separate policies.",
      "Shared accommodation (dorm flatmates) saves up to $500 monthly over single studio apartments."
    ]
  },
  canada: {
    name: "Canada",
    currency: "CAD ($)",
    multiplierToUSD: 0.74,
    rentDefault: 750,
    foodDefault: 320,
    transitDefault: 120,
    leisureDefault: 170,
    utilitiesDefault: 110,
    tips: [
      "Eligible students can work off-campus up to 24 hours per week during academic sessions.",
      "Use student identification (ISIC card) for food, computing, and rail travel discounts across Canada.",
      "Winters require heating expenses—confirm if heating utilities are included in your rent tenancy contract."
    ]
  },
  newzealand: {
    name: "New Zealand",
    currency: "NZD ($)",
    multiplierToUSD: 0.61,
    rentDefault: 700,
    foodDefault: 350,
    transitDefault: 130,
    leisureDefault: 180,
    utilitiesDefault: 90,
    tips: [
      "Many Kiwi cities offer half-price fares on public transport for registered full-time students.",
      "Take advantage of flatting (shared housing) in Wellington or Auckland to split energy and internet bills.",
      "Secondary employment is standard—students typically earn around $23 NZD minimum wage per hour."
    ]
  },
  ireland: {
    name: "Ireland",
    currency: "EUR (€)",
    multiplierToUSD: 1.08,
    rentDefault: 700,
    foodDefault: 290,
    transitDefault: 100,
    leisureDefault: 160,
    utilitiesDefault: 105,
    tips: [
      "Apply for Dublin Bus student Leap Card to enjoy flat €1.00 single fares across public transits.",
      "Look for accommodation early—places around Cork or Galway are slightly easier to find than Dublin center.",
      "Part-time work is allowed up to 20 hours weekly during semesters, and full-time during summer holidays."
    ]
  },
  europe: {
    name: "Europe",
    currency: "EUR (€)",
    multiplierToUSD: 1.08,
    rentDefault: 500,
    foodDefault: 250,
    transitDefault: 60,
    leisureDefault: 120,
    utilitiesDefault: 80,
    tips: [
      "Many European nations (like Germany, France) offer low or zero tuition fees for public universities.",
      "Get a student transport pass or rely on extremely efficient public train and cycling infrastructure.",
      "Look for student housing early—booking through university student unions (like Studierendenwerk) saves up to 40%."
    ]
  }
};

export default function CostCalculator() {
  const [selectedCountry, setSelectedCountry] = useState<string>("australia");
  const [rent, setRent] = useState<number>(850);
  const [food, setFood] = useState<number>(400);
  const [transit, setTransit] = useState<number>(150);
  const [leisure, setLeisure] = useState<number>(200);
  const [utilities, setUtilities] = useState<number>(120);

  const countryConfig = COUNTRY_PRESETS[selectedCountry];

  // Sync inputs on country change
  useEffect(() => {
    const config = COUNTRY_PRESETS[selectedCountry];
    setRent(config.rentDefault);
    setFood(config.foodDefault);
    setTransit(config.transitDefault);
    setLeisure(config.leisureDefault);
    setUtilities(config.utilitiesDefault);
  }, [selectedCountry]);

  // Calculate local currency sum and translated USD sum
  const totalLocal = rent + food + transit + leisure + utilities;
  const totalUSD = totalLocal * countryConfig.multiplierToUSD;

  // Percentage calculations
  const getPercentage = (value: number) => {
    return totalLocal > 0 ? Math.round((value / totalLocal) * 100) : 0;
  };

  return (
    <div className="py-10 bg-white dark:bg-slate-950 transition-colors min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl space-y-10">
        
        {/* Header Title */}
        <div className="text-center space-y-3">
          <span className="text-[#0047AB] dark:text-blue-400 font-extrabold tracking-widest text-xs uppercase block">COST OF LIVING CALCULATOR</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-950 dark:text-white">
            Plan Your International <span className="text-blue-600 dark:text-blue-400">Student Budget</span>
          </h2>
          <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Estimate monthly expenses based on student indexes from our top destinations. Slide the controls to match your lifestyle expectations and learn how to save.
          </p>
        </div>

        {/* Master Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls - takes 7 columns */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm space-y-6">
            
            {/* Country Selector */}
            <div className="space-y-2">
              <label className="text-sm font-extrabold text-gray-800 dark:text-slate-200 block">Select Target Destination</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.keys(COUNTRY_PRESETS).map((key) => {
                  const active = selectedCountry === key;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCountry(key)}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${
                        active
                          ? "bg-blue-50 border-blue-600 text-blue-600 dark:bg-slate-800 dark:border-blue-400 dark:text-blue-400"
                          : "border-gray-100 dark:border-slate-800 hover:bg-slate-50 text-gray-500 dark:text-slate-400"
                      }`}
                    >
                      {COUNTRY_PRESETS[key].name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Individual sliders with symbols */}
            <div className="space-y-6 pt-4 border-t border-gray-100 dark:border-slate-800">
              
              {/* Accommodation */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Building2 className="h-4.5 w-4.5 text-[#0047AB]" /> Accommodation &amp; Rent
                  </span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {rent} {countryConfig.currency}
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(countryConfig.rentDefault * 0.4)}
                  max={Math.round(countryConfig.rentDefault * 2.2)}
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#0047AB]"
                />
                <p className="text-[10px] text-gray-400">Default base index: {countryConfig.rentDefault} {countryConfig.currency}</p>
              </div>

              {/* Meals / Grocery */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Utensils className="h-4.5 w-4.5 text-green-600" /> Groceries &amp; Dining
                  </span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {food} {countryConfig.currency}
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(countryConfig.foodDefault * 0.4)}
                  max={Math.round(countryConfig.foodDefault * 2.2)}
                  value={food}
                  onChange={(e) => setFood(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <p className="text-[10px] text-gray-400">Default base index: {countryConfig.foodDefault} {countryConfig.currency}</p>
              </div>

              {/* Transport */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Compass className="h-4.5 w-4.5 text-zinc-500" /> Public Transit &amp; Travel
                  </span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {transit} {countryConfig.currency}
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(countryConfig.transitDefault * 0.3)}
                  max={Math.round(countryConfig.transitDefault * 2.5)}
                  value={transit}
                  onChange={(e) => setTransit(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-zinc-500"
                />
              </div>

              {/* Lifestyle / Leisure */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Coffee className="h-4.5 w-4.5 text-orange-500" /> Entertainment &amp; Coffee
                  </span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {leisure} {countryConfig.currency}
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(countryConfig.leisureDefault * 0.2)}
                  max={Math.round(countryConfig.leisureDefault * 2.5)}
                  value={leisure}
                  onChange={(e) => setLeisure(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
              </div>

              {/* Utilities */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="font-bold text-gray-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Wifi className="h-4.5 w-4.5 text-sky-500" /> Utility Bills, WiFi, Mobile
                  </span>
                  <span className="font-extrabold text-gray-900 dark:text-white">
                    {utilities} {countryConfig.currency}
                  </span>
                </div>
                <input
                  type="range"
                  min={Math.round(countryConfig.utilitiesDefault * 0.4)}
                  max={Math.round(countryConfig.utilitiesDefault * 2.2)}
                  value={utilities}
                  onChange={(e) => setUtilities(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

            </div>

          </div>

          {/* Core breakdown receipt panel - takes 5 columns */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Expense breakdown result CARD */}
            <div className="bg-gradient-to-br from-[#0047AB] to-blue-900 text-white p-6 md:p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="relative z-10 space-y-6">
                <p className="text-xs uppercase tracking-widest font-extrabold opacity-75">Estimated Total Monthly Expenses</p>
                
                <div>
                  <h4 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    {totalLocal.toLocaleString()} <span className="text-lg font-bold opacity-80">{countryConfig.currency.split(" ")[0]}</span>
                  </h4>
                  {selectedCountry !== "usa" && (
                    <p className="text-xs text-blue-200 mt-1 font-semibold flex items-center gap-1">
                      <TrendingUp className="h-3.5 w-3.5" /> Roughly equivalent to ~ ${Math.round(totalUSD).toLocaleString()} USD / month
                    </p>
                  )}
                </div>

                {/* Horizontal progress graphs */}
                <div className="space-y-3 pt-4 border-t border-white/20 text-xs">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Accommodation</span>
                      <span>{getPercentage(rent)}%</span>
                    </div>
                    <div className="w-full bg-white/15 h-1.5 rounded-full">
                      <div className="bg-white h-full rounded-full" style={{ width: `${getPercentage(rent)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Food &amp; Dining</span>
                      <span>{getPercentage(food)}%</span>
                    </div>
                    <div className="w-full bg-white/15 h-1.5 rounded-full">
                      <div className="bg-emerald-300 h-full rounded-full" style={{ width: `${getPercentage(food)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>Other parameters</span>
                      <span>{100 - getPercentage(rent) - getPercentage(food)}%</span>
                    </div>
                    <div className="w-full bg-white/15 h-1.5 rounded-full">
                      <div className="bg-orange-300 h-full rounded-full" style={{ width: `${100 - getPercentage(rent) - getPercentage(food)}%` }} />
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 p-3.5 rounded-xl border border-white/10 text-xs leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="h-4.5 w-4.5 text-amber-300 shrink-0 mt-0.5" />
                  <p className="opacity-90">
                    Calculations are based on average student survey results from 2025. Actual costs vary by city density and lifestyle choices.
                  </p>
                </div>
              </div>
            </div>

            {/* Country Saving Advice TIPS CARD */}
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-6 rounded-3xl shadow-sm space-y-4">
              <h4 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500 animate-pulse" />
                Study &amp; Saving Advisor Advice
              </h4>
              <ul className="space-y-3 text-xs leading-relaxed text-gray-600 dark:text-slate-300">
                {countryConfig.tips.map((tip, index) => (
                  <li key={index} className="flex gap-2.5 items-start">
                    <span className="text-amber-500 font-extrabold text-xs">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
