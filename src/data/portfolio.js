// Single source of truth for the Charge Frontier demo report.
//
// NOTE: This is a PORTFOLIO / DESIGN DEMO. Every name, number, company, and
// data point below is FICTIONAL and was invented to showcase the front-end.
// "Voltway Networks" is a made-up EV fast-charging operator and is not
// affiliated with any real company. Nothing here reflects real market data.

export const site = {
  brand: 'Charge Frontier',
  shortName: 'Charge',
  tagline: 'Charge Frontier · 2026',
  report: 'Charge Frontier — Interactive Strategy Report',
  subject: 'Voltway Networks',
  email: 'hello@example.com',
  linkedin: 'https://example.com',
  window: 'Q1 – Q2 2026',
  team: 'Network Strategy',
  teamRole: 'Market Expansion Planning',
  dataset: 'Fictional sample dataset',
  locations: 'Sample data · not affiliated with any real company'
};

export const chapters = [
  {
    number: '01',
    id: 'top',
    title: 'The Question',
    blurb: 'Where should Voltway add fast-charging hubs next, and why?',
    accent: 'orange'
  },
  {
    number: '02',
    id: 'thesis',
    title: 'The Thesis',
    blurb: 'Dwell time is destiny. The Sunbelt is open road.',
    accent: 'navy'
  },
  {
    number: '03',
    id: 'findings',
    title: 'The Findings',
    blurb: 'Four signals from 60 metros and the ChargeIQ demand panel.',
    accent: 'volt'
  },
  {
    number: '04',
    id: 'work',
    title: 'The Core 5',
    blurb: 'Phoenix · DFW · Houston · Atlanta · Tampa.',
    accent: 'orange-deep'
  },
  {
    number: '05',
    id: 'field-log',
    title: 'The Field Log',
    blurb: 'Ten weeks of network planning, drafted live.',
    accent: 'orange'
  },
  {
    number: '06',
    id: 'recommendations',
    title: 'The Recommendation',
    blurb: 'Fix Texas. Win the Southeast. Build the network.',
    accent: 'orange-deep'
  },
  {
    number: '07',
    id: 'atlas',
    title: 'The Atlas',
    blurb: '17 metros, 10 hubs, four regions, two maps.',
    accent: 'teal'
  },
  {
    number: '08',
    id: 'about',
    title: 'The Analyst',
    blurb: 'A design + data demo. Fictional sample data throughout.',
    accent: 'amber'
  }
];

export const thesis = {
  eyebrow: '02 · The Thesis',
  statement: {
    parts: [
      { text: 'The next 10 years of fast charging sits ', tone: 'ink' },
      { text: 'along the Sunbelt', tone: 'orange' },
      { text: ' and ', tone: 'ink' },
      { text: 'east of I-35.', tone: 'volt' }
    ]
  },
  paragraphs: [
    'Dwell time is destiny in charging. People move south, EV adoption follows, and the current hub footprint becomes the strategy question.',
    'The South region is 45% of projected DC fast-charging demand, holds the lowest network coverage (28.6 index share), and is growing fastest year over year (+5.1%). Four of the five Core 5 metros — DFW, Houston, Atlanta, Tampa — sit in this region. Phoenix is the only Core 5 outside it, and the only one where the network posts positive utilization today.',
    'The argument of this report: where demand is going is not where the hubs are. Closing that gap is the next decade of the network.'
  ],
  stats: [
    { value: '50', label: 'Top US metros analyzed', source: 'Census MSA estimates 2010–2024' },
    { value: '60', label: 'Metro markets reviewed', source: 'ChargeIQ Q1 2026 demand pull' },
    { value: '6', label: 'Analytical lenses', source: 'Composite scoring framework' },
    { value: '45%', label: 'South share of US demand', source: 'ChargeIQ Q1 2026 regional' },
    { value: '49', label: 'Houston Coverage Index', source: 'Lowest of any major market' },
    { value: '+118.0%', label: 'Atlanta fleet sessions YoY', source: 'Custom fleet dataset' }
  ]
};

export const metros = [
  {
    id: 'phoenix',
    rank: 1,
    city: 'Phoenix',
    state: 'AZ',
    tagline: 'Highest quality — only Core 5 with positive utilization YoY.',
    population: '5.10M',
    populationCagr: '+1.82%',
    region: 'West',
    zone: 'WEST · Region A',
    ae: 'Hub Team · West',
    distributor: 'Desert Power Co · regional grid',
    dmaSize: '21.7 GWh/yr',
    dmaGmi: '+2.8%',
    gmiIndex: 110,
    plYoY: '+3%',
    growth10yr: '+22 to 26%',
    millDistance: 'West Hub — 370 mi',
    transport: 'On-site 350 kW (best in book)',
    insight:
      'Best-served Core 5 metro. The local team wins against a tough Western demand curve. Phoenix is the model of what an integrated hub-distance + site-host win looks like.',
    accent: 'navy',
    category: 'true5'
  },
  {
    id: 'dfw',
    rank: 2,
    city: 'Dallas–Fort Worth',
    state: 'TX',
    tagline: 'Highest stakes — biggest market × biggest current bleed.',
    population: '8.10M',
    populationCagr: '+1.74%',
    region: 'South',
    zone: 'WEST · Region A',
    ae: 'Hub Team · Central',
    distributor: 'Lone Star Sites, Metroplex Power',
    dmaSize: '49.8 GWh/yr',
    dmaGmi: '+5.3%',
    gmiIndex: 65,
    plYoY: '-12%',
    growth10yr: '+18 to 22%',
    millDistance: 'Central Hub — 462 mi',
    transport: 'Grid tie → Arlington site',
    insight:
      'Lone Star Sites -38% YoY, Metroplex Power -36% — the two biggest utilization losses in the entire network. Metro demand is +5.3% and DFW fleet sessions are +49.4%, so the market is healthy. The issue is two partners, not the market.',
    accent: 'orange-deep',
    category: 'true5'
  },
  {
    id: 'houston',
    rank: 3,
    city: 'Houston',
    state: 'TX',
    tagline: 'Biggest gap — largest under-indexed market in the country.',
    population: '7.51M',
    populationCagr: '+1.42%',
    region: 'South',
    zone: 'WEST · Region A',
    ae: 'Hub Team · Central',
    distributor: 'Gulf Sites, Bayou Power',
    dmaSize: '60.3 GWh/yr',
    dmaGmi: '+1.5%',
    gmiIndex: 49,
    plYoY: '-4%',
    growth10yr: '+15 to 19%',
    millDistance: 'Central Hub — 702 mi',
    transport: 'Substation + 150 kW',
    insight:
      'Coverage Index 49 — the lowest of any major market in the United States. Houston is a 60.3 GWh/yr demand market the network barely serves. Reaching parity (index 100) is on the order of 8 to 9 GWh of additional annual throughput from this single metro.',
    accent: 'teal',
    category: 'true5'
  },
  {
    id: 'atlanta',
    rank: 4,
    city: 'Atlanta',
    state: 'GA',
    tagline: 'Strategic build — biggest cold spot, fleet already exploding.',
    population: '6.30M',
    populationCagr: '+1.28%',
    region: 'South',
    zone: 'EAST · Region B',
    ae: 'Hub Team · East',
    distributor: 'Peachtree Sites, Southern Grid',
    dmaSize: '36.8 GWh/yr',
    dmaGmi: '+2.1%',
    gmiIndex: 79,
    plYoY: '-6%',
    growth10yr: '+14 to 18%',
    millDistance: 'Central Hub — 798 mi',
    transport: 'Long-haul interconnect',
    insight:
      'No Voltway hub within 500 mi — the biggest cold spot in the network. But Atlanta fleet sessions are up +118% YoY while the broader Atlanta market declined -1.9%. The corridor deepening play is already running at 2.2× market velocity.',
    accent: 'pink-deep',
    category: 'true5'
  },
  {
    id: 'tampa',
    rank: 5,
    city: 'Tampa–St. Pete',
    state: 'FL',
    tagline: 'Long-term play — right region, wrong power supply.',
    population: '3.34M',
    populationCagr: '+1.51%',
    region: 'South',
    zone: 'EAST · Region B',
    ae: 'Hub Team · East',
    distributor: 'Bay Sites, Gulf Coast Power',
    dmaSize: '34.5 GWh/yr',
    dmaGmi: '+13.9%',
    gmiIndex: 77,
    plYoY: '-8%',
    growth10yr: '+19 to 23%',
    millDistance: 'East Hub — 1,001 mi',
    transport: 'Long-haul interconnect — 2.2× cost',
    insight:
      'Most expensive metro to serve. Tampa demand is growing +13.9% YoY — the fastest of the Core 5. A modular hub with a local utility partner is the right late-horizon move to escape long-haul power-delivery cost.',
    accent: 'butter',
    category: 'true5'
  }
];

export const findings = [
  {
    id: 'south-frontier',
    number: '01',
    title: 'The South region is the open frontier.',
    body:
      'ChargeIQ data shows the South region accounting for 45% of US fast-charging demand at 794 GWh/yr, with the lowest network coverage (28.6 index share) and positive growth (+5.1% YoY). Largest market, lowest coverage, fastest growth.',
    accent: 'orange',
    category: 'finding'
  },
  {
    id: 'houston-gap',
    number: '02',
    title: 'Houston is the biggest underserved market.',
    body:
      'Houston posts a Coverage Index of 49 against an industry baseline of 100, the lowest of any major market in the United States. Houston is a 60.3 GWh/yr demand market the network barely serves.',
    accent: 'teal',
    category: 'finding'
  },
  {
    id: 'atlanta-fleet',
    number: '03',
    title: 'Atlanta fleet sessions are growing 118% YoY.',
    body:
      'Atlanta fleet charging is up +118% YoY while the broader Atlanta market declined -1.9%. The single strongest signal in the data that the corridor deepening play in Recommendation 2 is not theoretical — it is the live trajectory.',
    accent: 'volt',
    category: 'finding'
  },
  {
    id: 'texas-partners',
    number: '04',
    title: 'Texas is two partners, not a market.',
    body:
      'Lone Star Sites is down 38% YoY and Metroplex Power is down 36%, both top-five utilization losses in the entire network. DFW demand is +5.3% YoY and DFW fleet sessions are +49.4%. The market is healthy. Two partner relationships are not.',
    accent: 'orange-deep',
    category: 'finding'
  }
];

export const recommendations = [
  {
    id: 'phase-1',
    horizon: '0 – 90 days',
    phase: 'Phase 01',
    title: 'Stabilize Texas.',
    body:
      'A three-week root-cause sprint on Lone Star Sites and Metroplex Power. Quantify competitive loss vs site uptime vs partner consolidation. Stabilize the five biggest utilization losses by end of Q2.',
    owners: 'Network Strategy · Central Team',
    metric: 'YoY utilization decline cut in half by end of Q2.'
  },
  {
    id: 'phase-2',
    horizon: '3 – 9 months',
    phase: 'Phase 02',
    title: 'Win in the Southeast.',
    body:
      'Three parallel plays. Atlanta fleet deepening (building on the +118% trajectory). Tampa site-host reset with a local utility. Phoenix Playbook replication using the on-site 350 kW model.',
    owners: 'Regional Teams · East + West',
    metric: 'Atlanta coverage through fleet sustained above +50% YoY.'
  },
  {
    id: 'phase-3',
    horizon: 'Year 1 – 3',
    phase: 'Phase 03',
    title: 'Build the network.',
    body:
      'Use the DFW–Atlanta–Tampa corridor as the test bed for a more disciplined siting and power-cost strategy. Cost-to-serve case for a Southeast hub. Modular-hub feasibility in Florida or the Carolinas to escape long-haul interconnect cost.',
    owners: 'Network Strategy + Power',
    metric: 'Validated cost per kWh delivered for the southern corridor.'
  },
  {
    id: 'phase-4',
    horizon: 'Year 3 – 10',
    phase: 'Phase 04',
    title: 'Earn the right to add capacity.',
    body:
      'Not a recommendation to build a flagship hub. A recommendation to do the work that justifies the conversation. Re-score every three years. Shift capex evaluation toward the Sunbelt only after sustained demand, cleaner site uptime, and better power economics in the Core 5 are proven.',
    owners: 'Network leadership',
    metric: 'Capacity decision backed by updated demand, coverage, and power-cost evidence.'
  }
];

export const weeks = [
  {
    week: 'Week 01',
    range: 'May 18 – 22',
    title: 'Kickoff, onboarding, network mapping.',
    body:
      'Project kickoff with the network strategy team. Established the Charge Frontier charter and the core question. Mapped the existing hub footprint and the available data sources.',
    status: 'Complete'
  },
  {
    week: 'Week 02',
    range: 'May 25 – 29',
    title: 'Foundation in motion.',
    body:
      'Building the analytical foundation: pairwise hub-distance matrix for 11 sites × 50 metros, the six-lens scoring framework, and the workbook structure. Lens 01 substantially built; Lens 02 mid-flight.',
    status: 'In progress'
  },
  {
    week: 'Week 03',
    range: 'Jun 1 – 5',
    title: 'Texas diagnostic sprint.',
    body:
      'Planned deep dive into the Lone Star Sites and Metroplex Power declines. Working sessions scheduled to categorize root cause as competitive loss, site uptime, or partner consolidation.',
    status: 'Planned'
  },
  {
    week: 'Week 04',
    range: 'Jun 8 – 12',
    title: 'Demand validation.',
    body:
      'Validate the scoring model against ChargeIQ regional and metro-level demand data. Expected to surface the South as the largest, least-covered region and Houston as the largest under-indexed market.',
    status: 'Planned'
  },
  {
    week: 'Week 05',
    range: 'Jun 15 – 19',
    title: 'Mid-project checkpoint + tooling.',
    body:
      'Deliver a five-slide status brief to the planning leads. Build internal helpers for onboarding, weekly prep, and site-brief generation.',
    status: 'Planned'
  },
  {
    week: 'Week 06',
    range: 'Jun 22 – 26',
    title: 'Atlanta cold-spot analysis.',
    body:
      'Atlanta is the biggest supply mismatch in the network — no hub within 500 miles. Workshop on the fleet corridor deepening proposal.',
    status: 'Planned'
  },
  {
    week: 'Week 07',
    range: 'Jun 29 – Jul 3',
    title: 'Florida modular hub + partner synthesis.',
    body:
      'Tampa is the most expensive metro to serve at 1,001 miles from the nearest hub. Modular-hub feasibility analysis. Cross-regional site-host synthesis using ChargeIQ data.',
    status: 'Planned'
  },
  {
    week: 'Week 08',
    range: 'Jul 6 – 10',
    title: 'Synthesis week.',
    body:
      'Lock the deck v1. Pressure-test with seven regional owners. Lock the workbook. Cross-check every recommendation against territory data.',
    status: 'Planned'
  },
  {
    week: 'Week 09',
    range: 'Jul 13 – 17',
    title: 'Practice and refinement.',
    body:
      'Three rounds of practice. Refine speaker notes. Submit deliverables. Lock the deck Thursday at noon.',
    status: 'Planned'
  },
  {
    week: 'Week 10',
    range: 'Jul 20 – 24',
    title: 'Final presentation week.',
    body:
      'Deliver the final presentation to the leadership panel on Friday. Send thank-you notes. Schedule the follow-up review for the following week.',
    status: 'Planned'
  }
];

export const deliverables = [
  {
    id: 'deck',
    tag: 'Deliverable · Deck',
    title: 'Final Presentation Deck (5 slides).',
    body:
      'Five-slide executive deck for the leadership panel. Every slide currently outlined; full design and pressure-testing in Weeks 8 – 10.',
    meta: 'Outlined · v0.2',
    href: '#deck',
    accent: 'navy',
    category: 'deliverable'
  },
  {
    id: 'workbook',
    tag: 'Deliverable · Workbook',
    title: 'Charge Frontier Analysis Workbook.',
    body:
      'Distance matrix, lens scoring, ChargeIQ regional + metro, fleet overlay, sensitivity. Built Weeks 1 – 2, extended through Week 8.',
    meta: 'In progress',
    href: '#workbook',
    accent: 'orange',
    category: 'deliverable'
  },
  {
    id: 'exec-summary',
    tag: 'Deliverable · PDF',
    title: 'Executive Summary (1-pager).',
    body:
      'One-page printable summary. Drafting in Weeks 8 – 9 in parallel with deck lock.',
    meta: 'Planned',
    href: '#exec-summary',
    accent: 'volt',
    category: 'deliverable'
  },
  {
    id: 'national-map',
    tag: 'Map Dossier',
    title: 'National Market View.',
    body:
      '17 metros, 10 hubs, 4 regions. Hover for stats, click for the full brief on every metro.',
    meta: 'Leaflet · live',
    href: '#national',
    accent: 'teal',
    category: 'map'
  },
  {
    id: 'southeast-map',
    tag: 'Map Dossier',
    title: 'Southeast Corridor.',
    body:
      'DFW → Atlanta → Tampa: where 4 of 5 Core 5 metros sit and the distance question comes into focus.',
    meta: 'Leaflet · live',
    href: '#southeast',
    accent: 'pink-deep',
    category: 'map'
  }
];

export const filterChips = [
  { id: 'all', label: 'All work', count: metros.length + findings.length + deliverables.length },
  { id: 'true5', label: 'Core 5 Metros', count: metros.length },
  { id: 'finding', label: 'Findings', count: findings.length },
  { id: 'deliverable', label: 'Deliverables', count: deliverables.filter((d) => d.category === 'deliverable').length },
  { id: 'map', label: 'Maps', count: deliverables.filter((d) => d.category === 'map').length }
];

export const navLinks = [
  { to: '/thesis', label: 'Thesis' },
  { to: '/case-studies', label: 'Case Studies' },
  { to: '/case-studies#field-log', label: 'Field Log', matchPath: '/case-studies' },
  { to: '/about', label: 'About' }
];

export const sitemap = [
  {
    title: 'The Report',
    links: [
      { label: '01 · The Question', to: '/' },
      { label: '02 · The Thesis', to: '/thesis' },
      { label: '03 · The Findings', to: '/thesis#findings' },
      { label: '04 · The Core 5', to: '/case-studies' },
      { label: '05 · The Field Log', to: '/case-studies#field-log' },
      { label: '06 · The Recommendation', to: '/case-studies#recommendations' },
      { label: '07 · The Atlas', to: '/case-studies#atlas' },
      { label: '08 · The Analyst', to: '/about' }
    ]
  },
  {
    title: 'Core 5 Metros',
    links: metros.map((m) => ({ label: `#${m.rank} · ${m.city}`, to: `/case-studies#${m.id}` }))
  },
  {
    title: 'Field Log',
    links: weeks.map((w) => ({ label: `${w.week} · ${w.range}`, to: '/case-studies#field-log' }))
  },
  {
    title: 'Maps & Downloads',
    links: [
      { label: 'National Map', to: '/case-studies#national-map' },
      { label: 'Southeast Corridor', to: '/case-studies#southeast-map' },
      { label: 'Workbook (XLSX)', to: '/case-studies#workbook' },
      { label: 'Final Deck (PPTX)', to: '/case-studies#deck' },
      { label: 'Executive Summary (PDF)', to: '/case-studies#exec-summary' }
    ]
  },
  {
    title: 'About',
    links: [
      { label: 'About the demo', to: '/about' },
      { label: 'How it was built', to: '/about' },
      { label: 'Sample data note', to: '/about' }
    ]
  }
];
