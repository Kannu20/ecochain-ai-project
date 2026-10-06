export const suppliers = [
  { id: 1, name: "GreenLeaf Textiles", country: "Bangladesh", rating: 4.7, cost: 12.40, delivery: 18, risk: "Low", certifications: ["GOTS", "Fair Trade", "ISO 14001"], emissions: 2.1, reliability: 96 },
  { id: 2, name: "EcoFab Industries", country: "Vietnam", rating: 4.5, cost: 10.80, delivery: 21, risk: "Low", certifications: ["OEKO-TEX", "BCI"], emissions: 2.8, reliability: 93 },
  { id: 3, name: "SolarThread Co.", country: "India", rating: 4.2, cost: 9.60, delivery: 24, risk: "Medium", certifications: ["GRS", "RCS"], emissions: 3.4, reliability: 88 },
  { id: 4, name: "NordicSustain AB", country: "Sweden", rating: 4.9, cost: 18.20, delivery: 12, risk: "Very Low", certifications: ["EU Ecolabel", "Cradle to Cradle", "B Corp"], emissions: 1.2, reliability: 99 },
  { id: 5, name: "Pacific Eco Mills", country: "Indonesia", rating: 3.8, cost: 8.50, delivery: 28, risk: "Medium", certifications: ["SBTi"], emissions: 4.1, reliability: 82 },
  { id: 6, name: "TerraFiber Corp", country: "Portugal", rating: 4.6, cost: 16.30, delivery: 10, risk: "Low", certifications: ["GOTS", "B Corp", "ISO 14001", "EU Ecolabel"], emissions: 1.8, reliability: 97 },
];

export const carbonData = [
  { month: "Jan", actual: 4.2, target: 3.5, industry: 7.8 },
  { month: "Feb", actual: 3.9, target: 3.4, industry: 7.6 },
  { month: "Mar", actual: 3.6, target: 3.3, industry: 7.5 },
  { month: "Apr", actual: 3.2, target: 3.2, industry: 7.3 },
  { month: "May", actual: 2.9, target: 3.1, industry: 7.1 },
  { month: "Jun", actual: 2.6, target: 3.0, industry: 7.0 },
  { month: "Jul", actual: 2.3, target: 2.9, industry: 6.8 },
  { month: "Aug", actual: 2.1, target: 2.8, industry: 6.7 },
];

export const profitData = [
  { month: "Jan", revenue: 48000, cost: 31200, profit: 16800 },
  { month: "Feb", revenue: 52000, cost: 32500, profit: 19500 },
  { month: "Mar", revenue: 61000, cost: 35000, profit: 26000 },
  { month: "Apr", revenue: 58000, cost: 33800, profit: 24200 },
  { month: "May", revenue: 67000, cost: 37200, profit: 29800 },
  { month: "Jun", revenue: 74000, cost: 39500, profit: 34500 },
  { month: "Jul", revenue: 82000, cost: 43000, profit: 39000 },
  { month: "Aug", revenue: 91000, cost: 46800, profit: 44200 },
];

export const riskData = [
  { category: "Supply Chain", score: 28, benchmark: 45 },
  { category: "Geopolitical", score: 42, benchmark: 55 },
  { category: "Climate", score: 35, benchmark: 60 },
  { category: "Regulatory", score: 20, benchmark: 40 },
  { category: "Financial", score: 18, benchmark: 35 },
  { category: "Reputational", score: 15, benchmark: 30 },
];

export const supplierComparison = [
  { name: "GreenLeaf", sustainability: 88, cost: 72, delivery: 82, quality: 94 },
  { name: "EcoFab", sustainability: 82, cost: 80, delivery: 76, quality: 90 },
  { name: "SolarThread", sustainability: 74, cost: 86, delivery: 70, quality: 84 },
  { name: "NordicSustain", sustainability: 96, cost: 58, delivery: 94, quality: 98 },
  { name: "TerraFiber", sustainability: 91, cost: 64, delivery: 88, quality: 92 },
];

export const recommendations = [
  { id: 1, priority: "High", category: "Packaging", title: "Switch to Recycled Paper Packaging", description: "Replace current plastic packaging with FSC-certified recycled paper. Estimated CO₂ reduction: 1.2kg per unit.", impact: "+15% Sustainability", savings: "$2,400/mo", icon: "📦" },
  { id: 2, priority: "High", category: "Shipping", title: "Transition Air → Sea Freight", description: "For non-urgent shipments, switching from air to sea freight reduces carbon emissions by 95% per tonne-km.", impact: "-68% Emissions", savings: "$8,100/mo", icon: "🚢" },
  { id: 3, priority: "Medium", category: "Material", title: "Source Organic Cotton", description: "Partner with NordicSustain for GOTS-certified organic cotton. Reduces pesticide use by 98% and water by 91%.", impact: "+22% Rating", savings: "$1,200/mo", icon: "🌿" },
  { id: 4, priority: "Medium", category: "Energy", title: "Renewable Energy Sourcing", description: "Mandate suppliers to use minimum 60% renewable energy in production processes.", impact: "-45% Scope 3", savings: "$3,800/mo", icon: "⚡" },
  { id: 5, priority: "Low", category: "Logistics", title: "Regional Distribution Hub", description: "Establish a regional distribution center in Lisbon to reduce last-mile delivery distances by 40%.", impact: "-30% Last-mile", savings: "$5,600/mo", icon: "🏭" },
];

export const agentLogs = {
  manager: [
    { time: "09:42:11", msg: "Analysis request received for: Organic Cotton T-Shirt" },
    { time: "09:42:12", msg: "Delegating tasks to 5 specialized agents" },
    { time: "09:43:18", msg: "All agents completed. Aggregating responses" },
    { time: "09:43:21", msg: "Final sustainability score computed: 78/100" },
    { time: "09:43:22", msg: "Dashboard generation triggered" },
  ],
  supplier: [
    { time: "09:42:13", msg: "Querying supplier database for: Clothing category" },
    { time: "09:42:15", msg: "Found 47 potential suppliers in target regions" },
    { time: "09:42:38", msg: "Filtered to top 6 by sustainability score" },
    { time: "09:42:41", msg: "Certification validation complete for all suppliers" },
    { time: "09:42:50", msg: "Supplier scoring matrix finalized" },
  ],
  carbon: [
    { time: "09:42:13", msg: "Fetching emission factors from EPA database" },
    { time: "09:42:24", msg: "Calculating Scope 1, 2, and 3 emissions" },
    { time: "09:42:55", msg: "Air freight baseline: 8.4 kg CO₂e/unit" },
    { time: "09:43:02", msg: "Sea freight alternative: 0.6 kg CO₂e/unit" },
    { time: "09:43:05", msg: "Total carbon footprint: 2.1 kg CO₂e/unit" },
  ],
  risk: [
    { time: "09:42:14", msg: "Analyzing geopolitical stability: 6 supplier countries" },
    { time: "09:42:44", msg: "Cross-referencing MSCI ESG risk database" },
    { time: "09:42:58", msg: "Climate risk assessment: LOW (RCP 2.6 scenario)" },
    { time: "09:43:08", msg: "Regulatory compliance: 94% score across markets" },
    { time: "09:43:12", msg: "Overall supply chain risk score: 28/100 (LOW)" },
  ],
  recommendation: [
    { time: "09:43:10", msg: "Processing optimization opportunities" },
    { time: "09:43:13", msg: "Packaging swap analysis: $2,400/mo savings identified" },
    { time: "09:43:15", msg: "Shipping mode comparison: 68% emission reduction available" },
    { time: "09:43:17", msg: "Material sourcing optimization: 5 alternatives ranked" },
    { time: "09:43:18", msg: "Generated 5 high-priority recommendations" },
  ],
  analytics: [
    { time: "09:43:19", msg: "Compiling dashboard metrics" },
    { time: "09:43:20", msg: "Generating carbon trend projections (12 months)" },
    { time: "09:43:21", msg: "Building supplier comparison matrix" },
    { time: "09:43:21", msg: "Profit impact analysis complete" },
    { time: "09:43:22", msg: "All charts and metrics ready for render" },
  ],
};
