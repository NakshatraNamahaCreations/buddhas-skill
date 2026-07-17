export const brand = {
  name: "Buddha's Skill Academy",
  tagline: "Skills That Matter",
  promise: "We don't just teach. We transform your career.",
  // `phone` is the primary tel: target. `phones` lists all published numbers
  // so the Footer can render each as its own tap-to-call link.
  phone: "9886643333",
  phones: ["9886643333"],
  whatsapp: "919886643333",
  email: "info@buddhasskill.com",
  website: "ethnotech.in",
  address: "1/19, SK Arena Building, 2nd Floor, BDA Link Rd, Channasandra, Banashankari 5th Stage, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098",
  socials: { instagram: "https://www.instagram.com/buddhaskillacademy/", linkedin: "https://www.linkedin.com/company/buddhas-skill-academy", facebook: "https://www.facebook.com/buddhaskillacademy/" },
};

export const nav = {
  links: [
    { label: "About",      href: "/about" },
    { label: "Programs",   href: "/programs" },
    { label: "Why us",     href: "/why-us" },
    { label: "Journey",    href: "/journey" },
    { label: "Placements", href: "/placements" },
    { label: "Contact",    href: "/contact" },
  ],
  cta: { label: "Enroll Now", href: "/contact" },
};

export const hero = {
  eyebrow: "Buddha's Skill Academy",
  titleTop: "Skills that matter.",
  titleAccent: "Careers that follow.",
  sub: "Industry-ready training in code, data, and security, built on live projects, real mentorship, and placement support that doesn't quit.",
  ctaPrimary: { label: "Explore Programs", href: "#programs" },
  ctaGhost:   { label: "Talk to a Mentor", href: "#contact" },
};

// Hero code panel — auto-cycles through short, real-looking snippets, one per
// track. Each line is an array of [tokenClass, text] tuples. Token classes:
//   cm = comment · kw = keyword · ty = type · fn = function · st = string · pn = plain
// Kept short (≤8 lines) so each fully-typed snippet fits in the panel body
// without scrolling. Add or edit here — the Hero component renders whatever is here.
export const heroCode = [
  {
    tab: 'OrderController.java',
    lang: 'Java · Spring Boot',
    lines: [
      [['cm', '# Program 01 · Java Full Stack']],
      [['kw', '@RestController']],
      [['kw', '@RequestMapping'], ['pn', '('], ['st', '"/api/orders"'], ['pn', ')']],
      [['kw', 'public class'], ['pn', ' '], ['ty', 'OrderController'], ['pn', ' {']],
      [['pn', '  '], ['kw', '@GetMapping']],
      [['pn', '  '], ['kw', 'public'], ['pn', ' '], ['ty', 'List<Order>'], ['pn', ' all() {']],
      [['pn', '    '], ['kw', 'return'], ['pn', ' repo.'], ['fn', 'findAll'], ['pn', '();']],
      [['pn', '  }']],
      [['pn', '}']],
    ],
  },
  {
    tab: 'placements.py',
    lang: 'Python · Pandas',
    lines: [
      [['cm', '# Program 03 · Data Science, AI & Analytics']],
      [['kw', 'import'], ['pn', ' pandas '], ['kw', 'as'], ['pn', ' pd']],
      [['pn', '']],
      [['pn', 'df = pd.'], ['fn', 'read_csv'], ['pn', '('], ['st', '"cohorts.csv"'], ['pn', ')']],
      [['pn', 'placed = df[df.offer > 0]']],
      [['pn', '']],
      [['fn', 'print'], ['pn', '(f'], ['st', '"{'], ['pn', 'len(placed)'], ['st', '} learners placed"'], ['pn', ')']],
    ],
  },
  {
    tab: 'discover.py',
    lang: 'Python · Scapy',
    lines: [
      [['cm', '# Program 04 · Cyber Security & Ethical Hacking']],
      [['kw', 'from'], ['pn', ' scapy.all '], ['kw', 'import'], ['pn', ' ARP, Ether, srp']],
      [['pn', '']],
      [['pn', 'target = '], ['st', '"192.168.1.0/24"']],
      [['pn', 'pkt = '], ['fn', 'Ether'], ['pn', '() / '], ['fn', 'ARP'], ['pn', '(pdst=target)']],
      [['pn', 'hosts = '], ['fn', 'srp'], ['pn', '(pkt, timeout=2)[0]']],
      [['fn', 'print'], ['pn', '(f'], ['st', '"{'], ['pn', 'len(hosts)'], ['st', '} hosts up"'], ['pn', ')']],
    ],
  },
  {
    tab: 'CheckoutTest.java',
    lang: 'Java · Selenium',
    lines: [
      [['cm', '# Program 05 · Software Testing & Automation']],
      [['kw', '@Test']],
      [['kw', 'void'], ['pn', ' '], ['fn', 'checkoutFlow'], ['pn', '() {']],
      [['pn', '  driver.'], ['fn', 'get'], ['pn', '('], ['st', '"https://shop.test"'], ['pn', ');']],
      [['pn', '  driver.'], ['fn', 'findElement'], ['pn', '(By.'], ['fn', 'id'], ['pn', '('], ['st', '"cart"'], ['pn', ')).'], ['fn', 'click'], ['pn', '();']],
      [['fn', 'assertTrue'], ['pn', '(page.'], ['fn', 'isVisible'], ['pn', '('], ['st', '"#confirm"'], ['pn', '));']],
      [['pn', '}']],
    ],
  },
];

export const aboutUs = {
  eyebrow: "About the academy",
  title: "Rooted in craft.\nBuilt for careers.",
  titleAccent: "careers.",
  body:
    "Buddha's Skill Academy prepares learners for careers in Java Full Stack, Python Full Stack, Data Science, Cyber Security, and Software Testing. Every batch builds live projects under mentors who've shipped real production code, and works with our placement team through to the signed offer letter.",
  since: { value: "12+", label: "Years of shaping careers" },
  promise: "We don't just train. We transform your career.",
  values: [
    { key: "craft",     label: "Craft",      body: "Deep skills through live projects, not slide decks." },
    { key: "community", label: "Community",  body: "Cohorts that lift each other into offers." },
    { key: "careers",   label: "Careers",    body: "Dedicated support until you're placed." },
  ],
  image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&q=80&auto=format&fit=crop",
};

// 
// About page — content for the dedicated /about route.
// The homepage `aboutUs` block above stays as-is (short teaser).
// This block powers the full page: hero, mission/vision, story,
// values, and milestones. Team + CTA are reused from elsewhere.
// 

export const aboutPage = {
  hero: {
    eyebrow: "About us",
    title: "This is how careers get built.",
    titleAccent: "built.",
    lede:
      "A decade of turning ambitious learners into industry ready professionals.",
    image:
      "/images/abt-img.png",
    tag: "Skills that matter · Careers that follow",
  },
  mission: {
    label: "Mission",
    text:
      "Turn ambitious learners into industry ready professionals by teaching skills hiring managers actually pay for.",
  },
  vision: {
    label: "Vision",
    text:
      "To be every hiring manager's first choice for job ready graduates.",
  },
  story: {
    eyebrow: "Our story",
    title: "Twelve years of turning learners into professionals.",
    titleAccent: "professionals.",
    paragraphs: [
      "Twelve years in, we've trained thousands of learners across five programs code, data, security, testing. Every one placed into a company that hires ambitious people.",
      "Today we run 410+ placement drives a year, a 373+ hiring partner network, and a career support team that stays on the call until the offer letter is signed.",
    ],
  },
  valuesHeader: {
    eyebrow: "What we stand for",
    title: "Four things we don't compromise on.",
    titleAccent: "compromise on.",
    lede:
      "The reason graduates recommend us and employers return to hire again.",
  },
  values: [
    {
      key: "craft",
      label: "Craft",
      body: "Deep skills through live projects,Every module ends with a portfolio worthy build, reviewed by a mentor.",
    },
    {
      key: "community",
      label: "Community",
      body: "Cohorts that lift each other into offers. Study groups, peer reviews, and a demo day culture from day one.",
    },
    {
      key: "careers",
      label: "Careers",
      body: "Dedicated support until you are placed. Mock interviews, salary negotiation prep, and a warm introduction to hiring managers.",
    },
    {
      key: "excellence",
      label: "Excellence",
      body: "Our mentors bring years of industry experience, and our corporate grade curriculum is constantly refined as each batch progresses.",
    },
  ],
  milestonesHeader: {
    eyebrow: "The road so far",
    title: "Milestones that shaped us.",
    titleAccent: "shaped us.",
  },
  milestones: [
    {
      year: "2015",
      title: "Founded",
      body:
        "Opened our first classroom with a single program curriculum built with hiring managers, not textbooks.",
    },
    {
      year: "2017",
      title: "First 100 placements",
      body:
        "Reached the milestone that made corporate partners take us seriously. One hundred verified offers.",
    },
    {
      year: "2019",
      title: "Multi-program expansion",
      body:
        "Grew from a single Java program to five full-stack disciplines including Data Science and Cyber Security.",
    },
    {
      year: "2022",
      title: "300+ hiring partners",
      body:
        "Scaled the hiring network to 300+ companies actively hiring our graduates across India.",
    },
    {
      year: "2025",
      title: "1200+ candidates placed",
      body:
        "Passed 1200+ verified placements, with 200+ of them at 8+ LPA. Every one backed by a signed offer letter.",
    },
  ],
};

//
// Placements page — content for the dedicated /placements route.
// The Placements bento section on the homepage keeps its own copy;
// this block powers the page hero and lede. Downstream sections
// (Placements bento, StudentLifeCycle, HiringPartners, Testimonials)
// are reused from elsewhere.
//
//
// Contact page — content for the dedicated /contact route.
// The `channels` list drives the hero grid. Values (phone number,
// email, WhatsApp, address) still come from `brand` so there's a
// single source of truth for the actual contact details.
//
export const contactPage = {
  hero: {
    eyebrow: "Contact",
    title: "Let's start the conversation.",
    titleAccent: "conversation.",
    lede:
      "Whether you're picking a program, booking a campus visit, or just weighing your options: we're a call, message, or email away.",
  },
  channels: [
    {
      key: "call",
      label: "Call the admissions team",
      hint: "Mon to Sat · 9am to 7pm IST",
      icon: "phone",
    },
    {
      key: "whatsapp",
      label: "Chat on WhatsApp",
      hint: "Fastest way to reach a mentor",
      icon: "whatsapp",
    },
    {
      key: "email",
      label: "Email us",
      hint: "Detailed enquiries and partnerships",
      icon: "mail",
    },
    {
      key: "visit",
      label: "Visit the Office",
      hint: "Book a walk-in tour with your cohort mentor",
      icon: "pin",
    },
  ],
};

export const placementsPage = {
  hero: {
    eyebrow: "Placements",
    title: "Where our learners get hired.",
    titleAccent: "hired.",
    lede:
      "72,000+ candidates placed since inception, 373+ hiring partners, and a placement team that stays on the call until the CTC is signed.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=80",
    tag: "72,000+ placed · 373+ hiring partners",
    stats: [
      { value: "72000", suffix: "+", label: "Candidates placed" },
      { value: "373",   suffix: "+", label: "Hiring partners" },
      { value: "150",   suffix: "+", label: "8+ LPA offers" },
    ],
  },
};

export const statsHeader = {
  eyebrow: "By the numbers",
  title: "Real outcomes. On the record.",
};

// Stats sourced from the 07/16/26 briefing note. Every number is an
// "overall stat" the academy publishes — all must show, so the
// StatsBand renders whatever length this array is.
export const stats = [
  { value: 1600,  suffix: "+", label: "Corporate Tie-Ups" },
  { value: 373,   suffix: "+", label: "Hiring Companies" },
  { value: 72000, suffix: "+", label: "Candidates Placed" },
  { value: 1341,  suffix: "+", label: "Placed in Last 6 Months" },
  { value: 410,   suffix: "+", label: "Placement Drives" },
  { value: 150,   suffix: "+", label: "8+ LPA Offers" },
];

export const positioning = {
  eyebrow: "The method",
  titleTop: "Build skills.",
  titleAccent: "Build confidence.",
  readAlong:
    "We don't just build skills. We build the confidence to use them. Live projects, mentors who've shipped real products, and a placement team that stays on the call until your offer letter is signed.",
  pillars: [
    { label: "Curriculum", body: "Industry-curated programs that map straight to job roles." },
    { label: "Mentors",    body: "Corporate-certified trainers with live project experience." },
    { label: "Placement",  body: "Dedicated support until you're hired, not just til graduation." },
  ],
};

export const tracksHeader = {
  eyebrow: "Programs",
  title: "Five programs. One career focused outcome.",
  titleAccent: "focused outcome.",
  lede: "Each program is a full stack: curriculum, mentorship, live projects, mock interviews, and dedicated placement support. Pick the one that maps to the career you want.",
};

export const tracks = [
  {
    id: "java-fullstack",
    index: "01",
    title: "Java Full Stack Development",
    promise: "Master front-end and back-end technologies with hands on projects.",
    badge: "Full Stack",
    learn: ["Java Programming", "HTML, CSS & JavaScript", "React JS", "Spring Boot", "MySQL Database", "APIs & Deployment"],
    careers: ["Java Developer", "Full Stack Developer", "Software Engineer"],
    stats: [
      { value: "6 Months", label: "Duration" },
      { value: "20+", label: "Live Projects" },
      { value: "1-1", label: "Mentorship" },
    ],
    image: "/images/jva.png",
  },
  {
    id: "python-fullstack",
    index: "02",
    title: "Python Full Stack Development",
    promise: "Become a skilled Python developer through real world, project based training.",
    badge: "Full Stack",
    learn: ["Python Programming", "HTML, CSS & JavaScript", "Django Framework", "React JS", "Database Management", "REST APIs", "Data Structures"],
    careers: ["Python Developer", "Web Developer", "Backend Developer"],
    stats: [
      { value: "6 Months", label: "Duration" },
      { value: "15+", label: "Live Projects" },
      { value: "1-1", label: "Mentorship" },
    ],
    image: "/images/python.png",
  },
  {
    id: "data-science-ai",
    index: "03",
    title: "Data Science, AI & Analytics",
    promise: "Learn how to analyze data and build intelligent solutions.",
    badge: "Analytics",
    learn: ["Python for Data Science", "Data Analysis & Visualization", "Machine Learning", "Artificial Intelligence", "Pandas & NumPy", "Power BI / Tableau", "Excel & SQL"],
    careers: ["Data Analyst", "Data Scientist", "AI Engineer"],
    stats: [
      { value: "5 Months", label: "Duration" },
      { value: "12+", label: "Datasets" },
      { value: "1-1", label: "Mentorship" },
    ],
    image: "/images/data-analytics.png",
  },
  {
    id: "cyber-security",
    index: "04",
    title: "Cyber Security & Ethical Hacking",
    promise: "Gain expertise in securing systems and networks against modern cyber threats.",
    badge: "Security",
    learn: ["Ethical Hacking", "Network Security", "Cyber Threat Analysis", "Security Tools & Techniques", "Real-Time Security Projects"],
    careers: ["Cyber Security Analyst", "Ethical Hacker", "Security Engineer"],
    stats: [
      { value: "5 Months", label: "Duration" },
      { value: "Live", label: "Pen-Test Labs" },
      { value: "1-1", label: "Mentorship" },
    ],
    image: "/images/cyber.png",
  },
  {
    id: "software-testing",
    index: "05",
    title: "Software Testing & Automation",
    promise: "Become an expert in software testing and automation.",
    badge: "Quality",
    learn: ["Manual Testing", "Core Java", "Selenium", "Cucumber", "Cypress", "SQL", "Agile & Jira", "TestNG"],
    careers: ["QA Engineer", "Test Engineer", "Automation Tester"],
    stats: [
      { value: "4 Months", label: "Duration" },
      { value: "10+", label: "Test Suites" },
      { value: "1-1", label: "Mentorship" },
    ],
    image: "/images/testing.png",
  },
];

export const whyChooseHeader = {
  eyebrow: "How we deliver",
  title: "The method behind the outcomes.",
  lede: "The commitments we don't compromise on. Each one earns your career the hard way.",
};

export const whyChoose = [
  { index: "01", title: "Industry Curated Curriculum",     body: "Approved and affiliated by industry leaders." },
  { index: "02", title: "Corporate Certified Trainers",    body: "Learn from certified professionals with real time experience." },
  { index: "03", title: "Live Projects & Hands-On Training", body: "Learn by building real world applications." },
  { index: "04", title: "Placement Assistance",            body: "A dedicated support unit. Get placed within 1 year." },
  { index: "05", title: "Mock Interviews",                 body: "Get interview ready with expert guidance." },
  { index: "06", title: "World Class Infrastructure",      body: "Learn in a comfortable, advanced environment." },
  { index: "07", title: "Certification on Completion",     body: "Industry recognized certificate to boost your career." },
];

// [PLACEHOLDER] — swap the strings for real client-approved partner logos (SVGs
// dropped into public/partners/) before launch. Marquee will treat each entry
// as an item to render — a string renders as a wordmark chip, an object could
// carry { name, src } once real logos land.
export const hiringPartners = {
  eyebrow: "Where our learners land",
  title: "Trusted by teams that ship.",
  partners: [
    "Northlane", "Stellar Tech", "Vertex Labs", "Prisma Group",
    "Vector AI", "Halcyon", "Meridian", "Cortex Studio",
    "Kernel Digital", "Beacon Software", "Aperture", "Foundry",
    "Northrock", "Constellation", "Ironclad", "Silverline",
  ],
};

export const journeyHeader = {
  eyebrow: "The path to placed",
  title: "The shortest path from you to hired.",
  titleAccent: "hired.",
  lede: "A focused, step by step journey that takes you from your first class all the way to your first job offer.",
};

export const journey = [
  { step: "01", title: "Enroll",            body: "Pick your program and lock your batch." },
  { step: "02", title: "Learn by building", body: "Concepts taught through code, not slides." },
  { step: "03", title: "Live projects",     body: "Ship real applications with mentor review." },
  { step: "04", title: "Mock interviews",   body: "Get interview ready with expert guidance." },
  { step: "05", title: "Get placed",        body: "Dedicated placement support until you're hired." },
];

// Full arc of a student's time at the academy — surfaced in the
// StudentLifeCycle section under the Placements block. Each icon key maps
// to a react-icons component inside StudentLifeCycle.js (ICON_MAP).
export const studentLifeCycleHeader = {
  eyebrow: "Student life cycle",
  title: "From day one to signed offer.",
  titleAccent: "signed offer.",
  lede:
    "Every phase, every milestone, mapped out. Here's what your months at Buddha's Skill Academy actually look like, week by week.",
};

export const studentLifeCycle = [
  {
    phase: "01",
    duration: "Week 1",
    title: "Enrollment",
    body:
      "Choose your program, meet your assigned mentor, and lock your batch. Onboarding gets you set up with tools, the learning platform, and your cohort community.",
    icon: "userPlus",
  },
  {
    phase: "02",
    duration: "Weeks 2 to 8",
    title: "Foundation",
    body:
      "Bootcamp style deep dives on the core skills your program demands: daily coding labs, weekly assignments, and one on one mentor check ins.",
    icon: "book",
  },
  {
    phase: "03",
    duration: "Weeks 9 to 18",
    title: "Live Projects",
    body:
      "Ship real applications with mentor code review. Build a portfolio that answers the exact questions hiring managers ask in interviews.",
    icon: "code",
  },
  {
    phase: "04",
    duration: "Weeks 19 to 22",
    title: "Mock Interviews",
    body:
      "Corporate simulated technical and HR interview rounds with detailed feedback. Practice until interview day nerves become muscle memory.",
    icon: "message",
  },
  {
    phase: "05",
    duration: "Weeks 23+",
    title: "Placement Drives",
    body:
      "On campus interview drives with 300+ hiring partners. Multiple companies. Multiple offers. Multiple career paths to choose from.",
    icon: "briefcase",
  },
  {
    phase: "06",
    duration: "Post-offer",
    title: "Offer & Onboarding",
    body:
      "Signed offer letter, joining prep, salary negotiation guidance, and ongoing career support. The placement team stays with you.",
    icon: "award",
  },
];

export const testimonialsHeader = {
  eyebrow: "Voices from the cohort",
  title: "Placed, not just certified.",
  lede: "Real graduates, real offers. Names and companies confirmed at launch.",
};

// Placeholder-safe sample copy. Replace names, companies, and role details
// with real, permissioned graduate quotes before launch.
export const testimonials = [
  {
    name: "Rohit Kulkarni",
    track: "Java Full Stack Development",
    company: "Placed at Infosys",
    quote:
      "The Spring Boot + React project sprints were exactly what I was hiring managers asked about in interviews. I walked in knowing how to explain my code, not just recite it.",
    avatar: "https://i.pravatar.cc/240?img=12",
  },
  {
    name: "Ananya Reddy",
    track: "Data Science, AI & Analytics",
    company: "Placed at Tiger Analytics",
    quote:
      "Every module ended with a real dataset and a hard question. Mock interviews caught the gaps I couldn't see myself. Got two offers in the same week.",
    avatar: "https://i.pravatar.cc/240?img=47",
  },
  {
    name: "Vikram Shetty",
    track: "Cyber Security & Ethical Hacking",
    company: "Placed at Deloitte India",
    quote:
      "Penetration testing labs on live environments taught me more than a year of self-study. The placement team stayed on the call with me until the CTC was signed.",
    avatar: "https://i.pravatar.cc/240?img=15",
  },
  {
    name: "Meera Iyer",
    track: "Software Testing & Automation",
    company: "Placed at TCS",
    quote:
      "Selenium, Cypress, and TestNG on real product code. No toy examples. I moved from a non-tech background to a QA offer in seven months.",
    avatar: "https://i.pravatar.cc/240?img=48",
  },
];

// ------------------------------------------------------------
// Placed students — auto-scrolling marquee on the /placements
// page. Photo-only tiles (no overlaid meta). Each entry is a
// path under public/students/. Filenames with spaces are OK —
// the browser encodes them when the src is set.
// ------------------------------------------------------------
export const placedStudentsHeader = {
  eyebrow: "Faces of the outcome",
  title: "Meet a few of our placed students.",
  titleAccent: "placed students.",
  lede:
    "Real learners, real offer letters. A snapshot of the graduates now working across our hiring partner network.",
};

export const placedStudents = [
  "/students/student1.png",
  "/students/student2.png",
  "/students/student3.png",
  "/students/student4.png",
  "/students/student5.png",
  "/students/student6.png",
  "/students/student7.png",
  "/students/student8.png",
  "/students/student9.png",
  "/students/student10.png",
  "/students/student11.png",
  "/students/student12.png",
  "/students/student13.png",
  "/students/student14.png",
  "/students/student15.png",
  "/students/student16.png",
  "/students/student17.png",
];

// ------------------------------------------------------------
// Team — surfaced in the Team section (after Testimonials).
// Placeholder-safe sample copy. Replace names, photos, roles, and
// LinkedIn handles with real, permissioned team-member details.
// ------------------------------------------------------------
export const teamHeader = {
  eyebrow: "The team behind the outcomes",
  title: "Meet the mentors who get you placed.",
  titleAccent: "placed.",
  lede:
    "Corporate-certified trainers, industry veterans, and placement specialists. Every one of them has shipped real products before they taught them.",
};

export const team = [
  {
    name: "Rajesh Kumar",
    role: "Founder & Director",
    bio: "20+ years in enterprise software and career mentorship. Built Buddha's to bridge college syllabi and real hiring needs.",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=900&q=80&auto=format&fit=crop&crop=faces,center",
    linkedin: "#",
  },
  {
    name: "Priya Sharma",
    role: "Head of Placements",
    bio: "Builds the 300+ hiring partner network. Runs weekly interview drives and offer-negotiation coaching for every cohort.",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80&auto=format&fit=crop&crop=faces,center",
    linkedin: "#",
  },
  {
    name: "Arjun Nair",
    role: "Lead Mentor · Full Stack",
    bio: "Ex-product engineer. Teaches Java + Spring Boot + React with the same rigor he shipped production code with.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop&crop=faces,center",
    linkedin: "#",
  },
  {
    name: "Ananya Reddy",
    role: "Lead Mentor · Data & AI",
    bio: "PhD in ML. Guides learners through Python, Pandas, ML pipelines, and Power BI on real production datasets.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=80&auto=format&fit=crop&crop=faces,center",
    linkedin: "#",
  },
  {
    name: "Vikram Shetty",
    role: "Lead Mentor · Cyber Security",
    bio: "CEH-certified penetration tester. Runs ethical hacking labs on live network environments, not simulated toys.",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=900&q=80&auto=format&fit=crop&crop=faces,center",
    linkedin: "#",
  },
  {
    name: "Meera Iyer",
    role: "Lead Mentor · Testing",
    bio: "12 years automating QA at product companies. Teaches Selenium, Cypress, and TestNG on real product codebases.",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=900&q=80&auto=format&fit=crop&crop=faces,center",
    linkedin: "#",
  },
];

export const cta = {
  title: "Enroll today.\nStart your tech journey.",
  sub: "Talk to a mentor about the right program for you.",
  programs: tracks.map((t) => t.title),
};
