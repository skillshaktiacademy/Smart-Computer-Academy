// ================================================================
//  courses-data.js  — Complete Course Catalogue
//  ALL courses from underOneYearComputerCourses + advancedCourses
//  Fields per course:
//    id, slug, title, category, level, durationMonths,
//    durationWeeks, fee, shortDescription, fullDescription,
//    skills[], technologies[], modules[], weeklyRoadmap[],
//    monthlyRoadmap[], reviews[], faqs[], image, rating,
//    enrolledStudents, badge, seo{ metaTitle, metaDescription, keywords[] }
// ================================================================

// ─── Shared Unsplash image bank by category ────────────────────
const IMG = {
  basic:    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
  office:   "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=600",
  account:  "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600",
  python:   "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600",
  java:     "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600",
  web:      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
  react:    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600",
  mobile:   "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600",
  ai:       "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600",
  cyber:    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600",
  cloud:    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600",
  network:  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
  database: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600",
  testing:  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600",
  uiux:     "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
  graphic:  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600",
  video:    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600",
  marketing:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
  ecom:     "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600",
  hardware: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
  diploma:  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600",
  freelance:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600",
  emerging: "https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600",
  seo:      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=600",
};

export const mockCoursesData = [

  // ══════════════════════════════════════════
  //  SECTION A — BASIC COMPUTER COURSES
  // ══════════════════════════════════════════

  {
    id: "bc-001", slug: "basic-computer-course",
    title: "Basic Computer Course",
    category: "Basic Computer", level: "Beginner",
    badge: "Most Popular",
    durationMonths: 3, durationWeeks: 12, fee: 3500,
    shortDescription: "Computer ki duniya mein pehla kadam – hardware se internet tak ek complete beginner course.",
    fullDescription: "Basic Computer Course mein aap sikhenge computer ke fundamentals, Windows OS, MS Office (Word, Excel, PowerPoint), internet use, email setup, aur online safety. Yeh course specially un logon ke liye design kiya gaya hai jo computer bilkul naye hain aur professional computer skills seekhna chahte hain.",
    skills: ["Computer Basics","Windows OS","MS Word","MS Excel","MS PowerPoint","Internet Browsing","Email"],
    technologies: ["Windows 11","MS Office","Google Chrome","Gmail"],
    modules: [
      { moduleTitle: "Computer Fundamentals", topics: ["What is Computer","Hardware vs Software","Input/Output Devices","Storage Devices"] },
      { moduleTitle: "Windows & File Management", topics: ["Windows Desktop","File Explorer","Settings","Control Panel"] },
      { moduleTitle: "MS Office Basics", topics: ["MS Word","MS Excel","MS PowerPoint"] },
      { moduleTitle: "Internet & Email", topics: ["Web Browsing","Email Setup","Online Safety","Digital Payments"] }
    ],
    weeklyRoadmap: [
      {week:1,topic:"Computer Introduction & Hardware"},{week:2,topic:"Windows OS & File Management"},
      {week:3,topic:"MS Word Basics"},{week:4,topic:"MS Word Advanced – Tables & Mail Merge"},
      {week:5,topic:"MS Excel Basics – Data Entry & Formulas"},{week:6,topic:"MS PowerPoint – Slides & Animations"},
      {week:7,topic:"Internet, Email & Online Safety"},{week:8,topic:"Revision & Practical Exam"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Computer Basics & Windows OS"},
      {month:2,topic:"MS Office Suite"},
      {month:3,topic:"Internet, Email & Practicals"}
    ],
    reviews: [{name:"Anjali Kumari",rating:5,comment:"Bahut achha course hai, sab kuch clearly sikhaya gaya."},{name:"Raju Prasad",rating:4,comment:"Trainer bahut helpful hain."}],
    faqs: [
      {question:"Kya is course ke liye koi prior knowledge chahiye?",answer:"Bilkul nahi, yeh complete beginner course hai."},
      {question:"Certificate milega?",answer:"Haan, course complete karne par institute ka certificate milega."}
    ],
    image: IMG.basic, rating: 4.5, enrolledStudents: 3200,
    seo: {
      metaTitle: "Basic Computer Course | Computer Fundamentals Training | Ranchi",
      metaDescription: "Basic Computer Course sikhein – MS Office, Internet, Email aur Windows OS. Beginners ke liye perfect 3-month course. Abhi enroll karein.",
      keywords: ["basic computer course","computer fundamentals","MS Office course","computer training Ranchi","beginner computer course"]
    }
  },

  {
    id: "bc-002", slug: "computer-fundamentals",
    title: "Computer Fundamentals",
    category: "Basic Computer", level: "Beginner",
    badge: null,
    durationMonths: 2, durationWeeks: 8, fee: 2500,
    shortDescription: "Computer ke andar kya hota hai – hardware, software, OS aur basic operations.",
    fullDescription: "Computer Fundamentals course mein aap sikhenge – computer ka history, generations, components, hardware types, software types, operating systems, aur basic computer operations. Yeh course students, job seekers aur housewives ke liye ideal hai.",
    skills: ["Computer History","Hardware Components","Software Types","OS Basics","Data Storage","Number Systems"],
    technologies: ["Windows","MS Office Basics"],
    modules: [
      {moduleTitle:"Introduction to Computers",topics:["History","Generations","Types of Computers","Applications"]},
      {moduleTitle:"Hardware & Software",topics:["CPU","RAM","ROM","Input Devices","Output Devices","Software Types"]},
      {moduleTitle:"Operating System & Storage",topics:["OS Functions","Windows Basics","Storage Units","Memory Types"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Computer History & Types"},{week:2,topic:"Hardware Components"},
      {week:3,topic:"Software & OS Basics"},{week:4,topic:"Storage & Memory"},
      {week:5,topic:"Number Systems & Data"},{week:6,topic:"Basic Computer Operations"},
      {week:7,topic:"Practical Sessions"},{week:8,topic:"Revision & Exam"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Computer Basics, Hardware & Software"},
      {month:2,topic:"OS, Storage, Number Systems & Practicals"}
    ],
    reviews: [],faqs: [],
    image: IMG.basic, rating: 4.3, enrolledStudents: 1800,
    seo: {
      metaTitle: "Computer Fundamentals Course | Hardware Software Training",
      metaDescription: "Computer Fundamentals sikhein – hardware, software, operating system aur storage. 2-month beginner course.",
      keywords: ["computer fundamentals","hardware software course","computer basics training","computer course Ranchi"]
    }
  },

  {
    id: "bc-003", slug: "ccc-course",
    title: "CCC Course (Course on Computer Concepts)",
    category: "Basic Computer", level: "Beginner",
    badge: "Government Job",
    durationMonths: 3, durationWeeks: 12, fee: 4000,
    shortDescription: "NIELIT ka official CCC certification – government jobs ke liye mandatory computer certificate.",
    fullDescription: "CCC (Course on Computer Concepts) NIELIT-approved certification course hai jo government job ke liye required hai. Is course mein sikhaya jata hai – computer basics, LibreOffice, internet, e-governance services, aur online communication. Course ke baad aap NIELIT exam de sakte hain.",
    skills: ["LibreOffice Writer","LibreOffice Calc","LibreOffice Impress","Internet","Email","e-Governance"],
    technologies: ["LibreOffice","Windows","Google Chrome"],
    modules: [
      {moduleTitle:"Computer Basics",topics:["Introduction","OS Basics","Input/Output","Storage"]},
      {moduleTitle:"LibreOffice Suite",topics:["Writer","Calc","Impress","Draw"]},
      {moduleTitle:"Internet & e-Governance",topics:["Internet Basics","Email","Online Banking","Government Portals"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Computer Introduction & Hardware"},{week:2,topic:"Windows & OS Basics"},
      {week:3,topic:"LibreOffice Writer"},{week:4,topic:"LibreOffice Calc"},
      {week:5,topic:"LibreOffice Impress"},{week:6,topic:"Internet & Email"},
      {week:7,topic:"e-Governance & Online Services"},{week:8,topic:"Mock Test & Exam Prep"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Computer Basics & LibreOffice"},
      {month:2,topic:"Internet, e-Governance & Exam Prep"},
      {month:3,topic:"Mock Tests & NIELIT Exam Preparation"}
    ],
    reviews: [{name:"Suman Devi",rating:5,comment:"CCC exam mein first attempt mein pass ho gayi. Thanks!"}],
    faqs: [
      {question:"CCC certificate kahan kaam aata hai?",answer:"Government jobs mein basic computer skill proof ke roop mein."},
      {question:"NIELIT exam ka fee kaun deta hai?",answer:"Student khud NIELIT portal par apply karta hai, institute guide karta hai."}
    ],
    image: IMG.basic, rating: 4.6, enrolledStudents: 4500,
    seo: {
      metaTitle: "CCC Course | NIELIT Certification | Government Job Computer Certificate",
      metaDescription: "CCC Course karein aur NIELIT certificate paayein. Government jobs ke liye computer certificate. 3-month course. Abhi enroll karein.",
      keywords: ["CCC course","NIELIT CCC","government job computer certificate","CCC Ranchi","CCC online exam"]
    }
  },

  {
    id: "bc-004", slug: "basic-it-skills",
    title: "Basic IT Skills",
    category: "Basic Computer", level: "Beginner",
    badge: null,
    durationMonths: 2, durationWeeks: 8, fee: 3000,
    shortDescription: "Office aur workplace ke liye zaroori basic IT skills ek course mein.",
    fullDescription: "Basic IT Skills course mein sikhein – computer operations, MS Office basics, email communication, internet use, file management, aur basic troubleshooting. Freshers aur job seekers ke liye most demanded skills.",
    skills: ["Computer Operations","MS Office Basics","Email Communication","Internet","File Management","Basic Troubleshooting"],
    technologies: ["Windows","MS Office","Gmail","Chrome"],
    modules: [
      {moduleTitle:"Computer Operations",topics:["Startup/Shutdown","File Management","Keyboard Shortcuts","Basic Troubleshooting"]},
      {moduleTitle:"Office Tools",topics:["MS Word","MS Excel Basics","PowerPoint Basics"]},
      {moduleTitle:"Communication & Internet",topics:["Email Etiquette","Internet Safety","Video Calls","Cloud Storage"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Computer Operations"},{week:2,topic:"File Management & Shortcuts"},
      {week:3,topic:"MS Word"},{week:4,topic:"MS Excel Basics"},
      {week:5,topic:"Email & Communication"},{week:6,topic:"Internet & Cloud"},
      {week:7,topic:"Basic Troubleshooting"},{week:8,topic:"Practical Revision"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Computer & Office Basics"},
      {month:2,topic:"Communication, Internet & Troubleshooting"}
    ],
    reviews: [],faqs: [],
    image: IMG.basic, rating: 4.4, enrolledStudents: 2100,
    seo: {
      metaTitle: "Basic IT Skills Course | Office Computer Training | Ranchi",
      metaDescription: "Basic IT Skills sikhein – MS Office, email, internet, file management. Job ke liye essential computer skills course.",
      keywords: ["basic IT skills","computer skills course","office computer training","IT skills Ranchi"]
    }
  },

  {
    id: "bc-005", slug: "digital-literacy",
    title: "Digital Literacy",
    category: "Basic Computer", level: "Beginner",
    badge: "Digital India",
    durationMonths: 2, durationWeeks: 8, fee: 2500,
    shortDescription: "Digital India ke saath chalo – smartphone, UPI, online services aur internet safety.",
    fullDescription: "Digital Literacy course mein aap sikhenge – smartphone ka sahi use, UPI payments, mobile banking, social media, government online services (DigiLocker, UMANG, Aadhaar), aur cyber fraud se bachav. Especially designed for rural areas and senior citizens.",
    skills: ["Smartphone Usage","UPI Payments","Mobile Banking","Social Media","DigiLocker","Cyber Safety"],
    technologies: ["Android/iOS","UPI Apps","WhatsApp","Google Pay","DigiLocker"],
    modules: [
      {moduleTitle:"Digital Devices",topics:["Smartphone Basics","App Installation","Internet Connection","WhatsApp"]},
      {moduleTitle:"Digital Finance",topics:["UPI","Mobile Banking","Online Shopping","Digital Wallet"]},
      {moduleTitle:"Government Services & Safety",topics:["DigiLocker","UMANG","Aadhaar Services","Cyber Fraud Awareness"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Smartphone Basics"},{week:2,topic:"Social Media & Communication"},
      {week:3,topic:"UPI & Digital Payments"},{week:4,topic:"Mobile Banking"},
      {week:5,topic:"Online Shopping Safety"},{week:6,topic:"Government Portals"},
      {week:7,topic:"Cyber Safety"},{week:8,topic:"Practical Revision"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Digital Devices & Financial Services"},
      {month:2,topic:"Government Services & Cyber Safety"}
    ],
    reviews: [],faqs: [],
    image: IMG.basic, rating: 4.4, enrolledStudents: 2100,
    seo: {
      metaTitle: "Digital Literacy Course | UPI Internet Safety Training | Ranchi",
      metaDescription: "Digital Literacy sikhein – UPI, mobile banking, online services aur cyber safety. Digital India mission course.",
      keywords: ["digital literacy course","UPI training","internet safety","digital India","digital payment training"]
    }
  },

  {
    id: "bc-006", slug: "typing-course",
    title: "Typing Course",
    category: "Basic Computer", level: "Beginner",
    badge: null,
    durationMonths: 2, durationWeeks: 8, fee: 2000,
    shortDescription: "Hindi & English typing master karein – 30–40 WPM speed guaranteed.",
    fullDescription: "Typing Course mein sikhein – proper finger placement, touch typing technique, speed building aur accuracy. Hindi (Mangal/Kruti Dev) aur English dono mein typing sikhein. Data entry aur government jobs ke liye essential.",
    skills: ["English Typing","Hindi Typing","Touch Typing","Speed Building","Accuracy"],
    technologies: ["MS Word","Notepad","Mangal Font","Kruti Dev"],
    modules: [
      {moduleTitle:"English Typing",topics:["Keyboard Layout","Finger Placement","Home Row","Speed Building"]},
      {moduleTitle:"Hindi Typing",topics:["Mangal Font","Kruti Dev","Devanagari Keyboard","Practice"]},
      {moduleTitle:"Speed & Accuracy",topics:["Typing Tests","Speed Drills","Error Correction","Government Exam Prep"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Keyboard Layout & Finger Placement"},{week:2,topic:"Home Row Practice"},
      {week:3,topic:"All Keys – English"},{week:4,topic:"Speed Building – English"},
      {week:5,topic:"Hindi Keyboard Layout"},{week:6,topic:"Hindi Typing Practice"},
      {week:7,topic:"Speed Tests"},{week:8,topic:"Final Typing Test"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"English Typing – Basics to Speed"},
      {month:2,topic:"Hindi Typing & Exam Preparation"}
    ],
    reviews: [],faqs: [],
    image: IMG.basic, rating: 4.3, enrolledStudents: 1500,
    seo: {
      metaTitle: "Typing Course | Hindi English Typing Training | Ranchi",
      metaDescription: "Hindi & English Typing Course – 30-40 WPM speed. Government exam ke liye typing training. Abhi enroll karein.",
      keywords: ["typing course","hindi typing","english typing","typing training Ranchi","typing speed course"]
    }
  },

  {
    id: "bc-007", slug: "internet-fundamentals",
    title: "Internet Fundamentals",
    category: "Basic Computer", level: "Beginner",
    badge: null,
    durationMonths: 1, durationWeeks: 4, fee: 1500,
    shortDescription: "Internet kya hai, kaise kaam karta hai – browsing, email, safety basics.",
    fullDescription: "Internet Fundamentals course mein sikhein – internet kaise kaam karta hai, web browsers, search engines, email, social media, online safety, aur basic networking concepts.",
    skills: ["Web Browsing","Google Search","Email","Social Media","Online Safety","Downloads"],
    technologies: ["Chrome","Gmail","YouTube","Google"],
    modules: [
      {moduleTitle:"Internet Basics",topics:["What is Internet","ISP","IP Address","URL","DNS"]},
      {moduleTitle:"Online Tools",topics:["Browsers","Search Engines","Email","Social Media"]},
      {moduleTitle:"Online Safety",topics:["Password Security","Phishing","Safe Browsing","Privacy"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Internet Basics & Browsers"},
      {week:2,topic:"Email & Social Media"},
      {week:3,topic:"Online Services & Shopping"},
      {week:4,topic:"Online Safety & Revision"}
    ],
    monthlyRoadmap: [{month:1,topic:"Internet Basics, Online Tools & Safety"}],
    reviews: [],faqs: [],
    image: IMG.basic, rating: 4.2, enrolledStudents: 1200,
    seo: {
      metaTitle: "Internet Fundamentals Course | Online Safety Training",
      metaDescription: "Internet Fundamentals sikhein – browsing, email, online safety. 1-month short course.",
      keywords: ["internet basics course","online safety training","internet fundamentals","web browsing course"]
    }
  },

  {
    id: "bc-008", slug: "computer-operator",
    title: "Computer Operator",
    category: "Basic Computer", level: "Beginner",
    badge: "Job Ready",
    durationMonths: 3, durationWeeks: 12, fee: 4500,
    shortDescription: "Computer operator job ke liye complete training – data entry, office tools aur printing.",
    fullDescription: "Computer Operator course mein sikhein – data entry, MS Office, email management, file handling, printer operation, scanning, internet use, aur basic troubleshooting. Office aur government department jobs ke liye ideal.",
    skills: ["Data Entry","MS Office","File Management","Printing & Scanning","Email Management","Basic Troubleshooting"],
    technologies: ["MS Office","Windows","Printer/Scanner","Email"],
    modules: [
      {moduleTitle:"Computer Operations",topics:["Computer Basics","File Management","Keyboard Skills","Printer/Scanner"]},
      {moduleTitle:"Office Tools",topics:["MS Word","MS Excel","MS PowerPoint","Email"]},
      {moduleTitle:"Data Entry & Practice",topics:["Typing Practice","Data Entry Projects","Office Simulation"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Computer & File Management"},{week:2,topic:"Typing & Keyboard Skills"},
      {week:3,topic:"MS Word"},{week:4,topic:"MS Excel"},
      {week:5,topic:"Email & Communication"},{week:6,topic:"Printer & Scanner"},
      {week:7,topic:"Data Entry Practice"},{week:8,topic:"Mock Office Simulation"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Computer Operations & Typing"},
      {month:2,topic:"MS Office Suite"},
      {month:3,topic:"Data Entry Practice & Job Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.basic, rating: 4.5, enrolledStudents: 2800,
    seo: {
      metaTitle: "Computer Operator Course | Data Entry Training | Job Ready Ranchi",
      metaDescription: "Computer Operator course – data entry, MS Office, printing. Office jobs ke liye complete training. Abhi enroll karein.",
      keywords: ["computer operator course","data entry training","office job preparation","computer operator Ranchi"]
    }
  },

  {
    id: "bc-009", slug: "office-automation",
    title: "Office Automation",
    category: "Basic Computer", level: "Beginner",
    badge: null,
    durationMonths: 3, durationWeeks: 12, fee: 5000,
    shortDescription: "Modern office tools se kaam ko automate karein – fast aur smart work.",
    fullDescription: "Office Automation course mein sikhein – MS Office advanced features, email automation, calendar management, Google Workspace, PDF tools, aur basic macros. Modern office work fast aur efficiently karein.",
    skills: ["MS Office Advanced","Email Automation","Calendar Management","Google Workspace","PDF Tools","Basic Macros"],
    technologies: ["MS Office 365","Google Workspace","Adobe Acrobat","Zoom"],
    modules: [
      {moduleTitle:"Advanced Office Tools",topics:["MS Word Advanced","Excel Automation","PowerPoint Master"]},
      {moduleTitle:"Cloud & Collaboration",topics:["Google Docs","Google Sheets","Google Drive","Google Meet"]},
      {moduleTitle:"Automation & PDF",topics:["Mail Merge","Basic Macros","PDF Creation","Digital Signatures"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"MS Word Advanced"},{week:2,topic:"Excel Automation"},
      {week:3,topic:"PowerPoint Master"},{week:4,topic:"Google Workspace"},
      {week:5,topic:"Email & Calendar Automation"},{week:6,topic:"PDF Tools"},
      {week:7,topic:"Basic Macros"},{week:8,topic:"Projects & Revision"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Advanced MS Office"},
      {month:2,topic:"Google Workspace & Cloud Tools"},
      {month:3,topic:"Automation, PDF & Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.office, rating: 4.5, enrolledStudents: 1700,
    seo: {
      metaTitle: "Office Automation Course | Google Workspace MS Office Training",
      metaDescription: "Office Automation sikhein – MS Office, Google Workspace, email automation. Smart office work ke liye best course.",
      keywords: ["office automation course","Google workspace training","MS Office advanced","office productivity course"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION B — MICROSOFT OFFICE COURSES
  // ══════════════════════════════════════════

  {
    id: "ms-001", slug: "microsoft-office-complete",
    title: "Microsoft Office Complete Course",
    category: "Microsoft Office", level: "Beginner",
    badge: "Most Popular",
    durationMonths: 3, durationWeeks: 12, fee: 5500,
    shortDescription: "MS Word, Excel, PowerPoint, Access aur Outlook – ek hi course mein complete training.",
    fullDescription: "Microsoft Office ka complete package sikhein. Word mein professional documents, Excel mein data analysis aur dashboards, PowerPoint mein impactful presentations, Outlook mein email management, aur Access mein databases. Office professionals ke liye must-have course.",
    skills: ["MS Word","MS Excel","MS PowerPoint","MS Outlook","MS Access","Data Management"],
    technologies: ["Microsoft Office 365","Windows"],
    modules: [
      {moduleTitle:"MS Word",topics:["Document Formatting","Tables","Mail Merge","Templates","Track Changes"]},
      {moduleTitle:"MS Excel",topics:["Formulas","Charts","Pivot Tables","VLOOKUP","Conditional Formatting"]},
      {moduleTitle:"MS PowerPoint",topics:["Slide Design","Animations","Transitions","Presenter View"]},
      {moduleTitle:"MS Outlook & Access",topics:["Email Management","Calendar","Contacts","Basic Database"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"MS Word Basics"},{week:2,topic:"MS Word Advanced – Mail Merge & Templates"},
      {week:3,topic:"MS Excel Basics"},{week:4,topic:"MS Excel Formulas & Functions"},
      {week:5,topic:"MS Excel Charts & Pivot Tables"},{week:6,topic:"MS PowerPoint – Design & Animation"},
      {week:7,topic:"MS Outlook & Calendar"},{week:8,topic:"MS Access & Final Revision"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"MS Word & Introduction to Excel"},
      {month:2,topic:"Advanced Excel & PowerPoint"},
      {month:3,topic:"Outlook, Access & Practicals"}
    ],
    reviews: [{name:"Priya Singh",rating:5,comment:"Sab kuch clearly sikhaya gaya, ab job ready feel kar rahi hoon."}],
    faqs: [
      {question:"Office 365 ya Office 2019 – kaunsa sikhaya jata hai?",answer:"Hum Office 365 sikhate hain jo most updated version hai."}
    ],
    image: IMG.office, rating: 4.7, enrolledStudents: 3800,
    seo: {
      metaTitle: "Microsoft Office Course | MS Word Excel PowerPoint Training Ranchi",
      metaDescription: "Microsoft Office complete course – Word, Excel, PowerPoint, Outlook sikhein. 3-month professional training. Abhi enroll karein.",
      keywords: ["microsoft office course","MS Word course","MS Excel training","PowerPoint training","office skills Ranchi"]
    }
  },

  {
    id: "ms-002", slug: "advanced-excel",
    title: "Advanced Excel",
    category: "Microsoft Office", level: "Intermediate",
    badge: "High Demand",
    durationMonths: 2, durationWeeks: 8, fee: 6000,
    shortDescription: "Excel ka advanced use – MIS reporting, Macros, VBA, Power Query aur dashboards.",
    fullDescription: "Advanced Excel course mein sikhein – complex formulas, Pivot Tables, Power Query, Macros, VBA automation, interactive dashboards, aur MIS reporting. Data professionals, accountants aur managers ke liye best career upgrade course.",
    skills: ["Advanced Formulas","VLOOKUP/XLOOKUP","Pivot Tables","Power Query","Macros","VBA","Dashboard"],
    technologies: ["MS Excel","Power BI (Basic)"],
    modules: [
      {moduleTitle:"Advanced Formulas",topics:["VLOOKUP","INDEX-MATCH","XLOOKUP","Array Formulas","IF Nesting"]},
      {moduleTitle:"Data Analysis",topics:["Pivot Tables","Power Query","Data Validation","Conditional Formatting"]},
      {moduleTitle:"Automation & Reporting",topics:["Macros","VBA Basics","MIS Dashboard","Dynamic Charts"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Advanced Lookup Formulas"},{week:2,topic:"IF, IFS & Nested Formulas"},
      {week:3,topic:"Pivot Tables & Charts"},{week:4,topic:"Power Query"},
      {week:5,topic:"Macros & Recording"},{week:6,topic:"VBA Programming Basics"},
      {week:7,topic:"MIS Dashboard Creation"},{week:8,topic:"Project & Final Exam"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Advanced Functions & Data Analysis"},
      {month:2,topic:"Automation, VBA & Dashboard Projects"}
    ],
    reviews: [{name:"Amit Kumar",rating:5,comment:"VBA aur Dashboard sikhke meri salary badh gayi!"}],
    faqs: [],
    image: IMG.office, rating: 4.8, enrolledStudents: 2700,
    seo: {
      metaTitle: "Advanced Excel Course | Macros VBA Dashboard MIS Training",
      metaDescription: "Advanced Excel sikhein – Macros, VBA, Pivot Tables, Power Query, MIS Dashboard. Data professionals ke liye best course.",
      keywords: ["advanced excel course","excel VBA","excel macros training","MIS reporting","excel dashboard"]
    }
  },

  {
    id: "ms-003", slug: "google-workspace",
    title: "Google Workspace",
    category: "Microsoft Office", level: "Beginner",
    badge: null,
    durationMonths: 1, durationWeeks: 4, fee: 3000,
    shortDescription: "Google Docs, Sheets, Slides, Drive aur Meet – cloud-based office suite mastery.",
    fullDescription: "Google Workspace course mein sikhein – Gmail advanced features, Google Docs, Sheets, Slides, Drive, Meet, aur Forms. Remote work aur collaboration ke liye essential skill.",
    skills: ["Google Docs","Google Sheets","Google Slides","Google Drive","Google Meet","Gmail Advanced"],
    technologies: ["Google Workspace","Chrome"],
    modules: [
      {moduleTitle:"Google Docs & Slides",topics:["Document Creation","Collaboration","Presentation Design"]},
      {moduleTitle:"Google Sheets",topics:["Formulas","Charts","Collaboration","Import/Export"]},
      {moduleTitle:"Drive, Meet & Forms",topics:["File Organization","Video Meetings","Form Creation","Responses"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Gmail & Google Docs"},{week:2,topic:"Google Sheets"},
      {week:3,topic:"Google Slides & Drive"},{week:4,topic:"Google Meet & Forms"}
    ],
    monthlyRoadmap: [{month:1,topic:"Complete Google Workspace Suite"}],
    reviews: [],faqs: [],
    image: IMG.office, rating: 4.4, enrolledStudents: 1400,
    seo: {
      metaTitle: "Google Workspace Course | Google Docs Sheets Slides Training",
      metaDescription: "Google Workspace sikhein – Docs, Sheets, Slides, Drive, Meet. Remote work ke liye essential course.",
      keywords: ["google workspace course","google docs training","google sheets","google slides","cloud office tools"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION C — ACCOUNTING COURSES
  // ══════════════════════════════════════════

  {
    id: "ac-001", slug: "tally-prime",
    title: "Tally Prime",
    category: "Accounting", level: "Beginner",
    badge: "Most Popular",
    durationMonths: 3, durationWeeks: 12, fee: 6500,
    shortDescription: "India ka #1 accounting software – Tally Prime mein GST, Payroll aur Inventory sikhein.",
    fullDescription: "Tally Prime India ka sabse popular business accounting software hai. Is course mein sikhein – company setup, ledger creation, voucher entries, GST returns (GSTR-1, GSTR-3B), inventory management, payroll, TDS, aur financial reports. Small business owners aur accountants ke liye must-have skill.",
    skills: ["Tally Prime","GST Returns","Payroll","Inventory Management","TDS","Financial Reports"],
    technologies: ["Tally Prime 4.0","MS Excel"],
    modules: [
      {moduleTitle:"Accounting Basics",topics:["Ledgers","Groups","Voucher Entry","Trial Balance","P&L"]},
      {moduleTitle:"GST in Tally",topics:["GST Setup","GSTR-1","GSTR-3B","E-way Bill","E-Invoice"]},
      {moduleTitle:"Advanced Features",topics:["Payroll","Inventory","TDS","Cost Centers","Reports"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Tally Introduction & Company Setup"},{week:2,topic:"Ledger & Group Creation"},
      {week:3,topic:"Voucher Entries – Sales/Purchase"},{week:4,topic:"GST Setup & Invoicing"},
      {week:5,topic:"GSTR-1 & GSTR-3B Filing"},{week:6,topic:"Inventory Management"},
      {week:7,topic:"Payroll & TDS"},{week:8,topic:"Reports & Final Project"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Accounting Basics & Tally Fundamentals"},
      {month:2,topic:"GST & Inventory Management"},
      {month:3,topic:"Payroll, TDS & Financial Reports"}
    ],
    reviews: [
      {name:"Rakesh Gupta",rating:5,comment:"Excellent course! Ab main apne business ka khud GST file karta hoon."},
      {name:"Sunita Devi",rating:5,comment:"Trainer ne bahut patiently sikhaya. Highly recommended!"}
    ],
    faqs: [
      {question:"Kya Tally Prime ka license milega?",answer:"Practice ke liye institute mein licensed Tally use karenge."},
      {question:"GST filing practice hogi?",answer:"Haan, demo GST portal par hands-on practice hogi."}
    ],
    image: IMG.account, rating: 4.8, enrolledStudents: 5200,
    seo: {
      metaTitle: "Tally Prime Course | GST Accounting Payroll Training Ranchi",
      metaDescription: "Tally Prime sikhein – GST returns, payroll, inventory, TDS. India #1 accounting course. 3-month training. Abhi enroll karein.",
      keywords: ["tally prime course","tally GST","accounting course Ranchi","tally training","GST accounting software"]
    }
  },

  {
    id: "ac-002", slug: "gst-accounting",
    title: "GST Accounting",
    category: "Accounting", level: "Intermediate",
    badge: "Tax Specialist",
    durationMonths: 2, durationWeeks: 8, fee: 5000,
    shortDescription: "GST returns expert banein – GSTR-1, GSTR-3B, e-invoicing aur ITC reconciliation.",
    fullDescription: "GST Accounting course mein sikhein – GST structure, registration, all types of returns (GSTR-1, 2A, 3B, 9, 9C), e-invoicing, RCM, ITC claim and reconciliation, TDS under GST, aur audit. CA firms aur accounts departments ke liye essential skill.",
    skills: ["GST Returns Filing","E-Invoicing","TDS under GST","ITC Reconciliation","RCM","GST Audit"],
    technologies: ["GST Portal","Tally","Excel","ClearTax"],
    modules: [
      {moduleTitle:"GST Fundamentals",topics:["GST Structure","CGST/SGST/IGST","Registration","Invoicing Rules","HSN Codes"]},
      {moduleTitle:"GST Returns",topics:["GSTR-1","GSTR-3B","GSTR-2A/2B","Annual Return GSTR-9"]},
      {moduleTitle:"Advanced GST",topics:["TDS","RCM","E-way Bill","ITC Reconciliation","GST Audit"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"GST Introduction & Structure"},{week:2,topic:"Registration & Invoicing"},
      {week:3,topic:"GSTR-1 Filing Practice"},{week:4,topic:"GSTR-3B Filing Practice"},
      {week:5,topic:"GSTR-2A/2B Reconciliation"},{week:6,topic:"Annual Return GSTR-9"},
      {week:7,topic:"TDS, RCM & E-way Bill"},{week:8,topic:"ITC Reconciliation & GST Audit"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"GST Basics, Registration & Returns"},
      {month:2,topic:"Advanced GST – TDS, ITC, Audit"}
    ],
    reviews: [],faqs: [],
    image: IMG.account, rating: 4.7, enrolledStudents: 3100,
    seo: {
      metaTitle: "GST Accounting Course | GST Returns Filing | Tax Training Ranchi",
      metaDescription: "GST Accounting course – GSTR-1, GSTR-3B, ITC reconciliation, e-invoicing. Tax professionals ke liye best course.",
      keywords: ["GST course","GST returns filing","tax accounting","GST training","GSTR-3B course Ranchi"]
    }
  },

  {
    id: "ac-003", slug: "sap-fico",
    title: "SAP FICO",
    category: "Accounting", level: "Advanced",
    badge: "MNC Job",
    durationMonths: 6, durationWeeks: 24, fee: 35000,
    shortDescription: "SAP Finance & Controlling – MNC aur corporate jobs ke liye industry-standard ERP skill.",
    fullDescription: "SAP FICO (Financial Accounting & Controlling) course mein sikhein – enterprise structure, GL accounting, accounts payable, accounts receivable, asset accounting, cost center accounting, profit center, internal orders, product costing, aur integration with MM/SD modules. Real project included.",
    skills: ["SAP FI","SAP CO","GL Accounting","AP/AR","Asset Management","Cost Center","Profit Center"],
    technologies: ["SAP ERP","SAP S/4HANA","MS Excel"],
    modules: [
      {moduleTitle:"SAP FI – Financial Accounting",topics:["Enterprise Structure","Chart of Accounts","GL","AP","AR","Asset Accounting","Bank Accounting"]},
      {moduleTitle:"SAP CO – Controlling",topics:["Cost Center","Profit Center","Internal Orders","Product Costing","Profitability Analysis"]},
      {moduleTitle:"Integration & Real Project",topics:["MM Integration","SD Integration","Real Time Project","Certification Prep"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"SAP Introduction & Navigation"},{week:2,topic:"Enterprise Structure Setup"},
      {week:3,topic:"General Ledger Accounting"},{week:4,topic:"Accounts Payable"},
      {week:5,topic:"Accounts Receivable"},{week:6,topic:"Asset Accounting"},
      {week:7,topic:"Bank Accounting & Reconciliation"},{week:8,topic:"CO – Cost Center Accounting"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"SAP Basics & FI Enterprise Structure"},
      {month:2,topic:"GL, AP, AR Accounting"},
      {month:3,topic:"Asset & Bank Accounting"},
      {month:4,topic:"SAP CO – Controlling"},
      {month:5,topic:"Integration with MM & SD"},
      {month:6,topic:"Real Project & Certification Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.account, rating: 4.7, enrolledStudents: 800,
    seo: {
      metaTitle: "SAP FICO Course | SAP Finance Accounting ERP Training Ranchi",
      metaDescription: "SAP FICO course sikhein – GL, AP, AR, Cost Center, Profit Center. MNC jobs ke liye best ERP training.",
      keywords: ["SAP FICO course","SAP finance training","ERP accounting","SAP CO","SAP FICO Ranchi"]
    }
  },

  {
    id: "ac-004", slug: "financial-accounting",
    title: "Financial Accounting",
    category: "Accounting", level: "Beginner",
    badge: null,
    durationMonths: 3, durationWeeks: 12, fee: 5500,
    shortDescription: "Accounting ke core principles sikhein – journal, ledger, trial balance aur financial statements.",
    fullDescription: "Financial Accounting course mein sikhein – double entry system, journal entries, ledger posting, trial balance, P&L account, balance sheet, aur cash flow statement. Commerce students aur aspiring accountants ke liye foundation course.",
    skills: ["Double Entry System","Journal Entries","Ledger Posting","Trial Balance","P&L","Balance Sheet"],
    technologies: ["Tally","MS Excel"],
    modules: [
      {moduleTitle:"Accounting Fundamentals",topics:["Double Entry System","Accounting Principles","Journal","Ledger"]},
      {moduleTitle:"Financial Statements",topics:["Trial Balance","P&L Account","Balance Sheet","Cash Flow"]},
      {moduleTitle:"Practical Accounting",topics:["Bank Reconciliation","Depreciation","Provision","Closing Entries"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Accounting Concepts & Principles"},{week:2,topic:"Journal Entries"},
      {week:3,topic:"Ledger Posting"},{week:4,topic:"Trial Balance"},
      {week:5,topic:"P&L Account"},{week:6,topic:"Balance Sheet"},
      {week:7,topic:"Bank Reconciliation"},{week:8,topic:"Practical Projects"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Fundamentals & Journal/Ledger"},
      {month:2,topic:"Financial Statements"},
      {month:3,topic:"Practical Accounting & Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.account, rating: 4.5, enrolledStudents: 2200,
    seo: {
      metaTitle: "Financial Accounting Course | Journal Ledger Balance Sheet Training",
      metaDescription: "Financial Accounting sikhein – journal entries, ledger, P&L, balance sheet. Commerce students ke liye foundation course.",
      keywords: ["financial accounting course","accounting training","journal ledger course","balance sheet training","accounting Ranchi"]
    }
  },

  {
    id: "ac-005", slug: "income-tax-filing",
    title: "Income Tax Filing",
    category: "Accounting", level: "Intermediate",
    badge: "Tax Expert",
    durationMonths: 2, durationWeeks: 8, fee: 5500,
    shortDescription: "ITR filing expert banein – salary, business, professional income sabka return file karein.",
    fullDescription: "Income Tax Filing course mein sikhein – income tax slabs, deductions (80C, 80D, HRA, etc.), ITR forms (ITR-1, 2, 3, 4), advance tax, TDS reconciliation, Form 16, aur tax planning. Tax consultants aur CA firms ke liye essential.",
    skills: ["ITR Filing","Tax Deductions","TDS Reconciliation","Advance Tax","Form 16","Tax Planning"],
    technologies: ["Income Tax Portal","Tally","MS Excel"],
    modules: [
      {moduleTitle:"Income Tax Basics",topics:["Tax Slabs","Income Heads","Deductions","Exemptions"]},
      {moduleTitle:"ITR Filing",topics:["ITR-1","ITR-2","ITR-3","ITR-4","Verification"]},
      {moduleTitle:"TDS & Tax Planning",topics:["TDS Basics","Form 16","26AS","Advance Tax","Tax Saving Tips"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Income Tax Basics & Slabs"},{week:2,topic:"Deductions & Exemptions"},
      {week:3,topic:"ITR-1 Filing (Salary)"},{week:4,topic:"ITR-4 (Business/Professional)"},
      {week:5,topic:"TDS & Form 16"},{week:6,topic:"26AS Reconciliation"},
      {week:7,topic:"Advance Tax"},{week:8,topic:"Tax Planning & Revision"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Income Tax Basics & ITR Filing"},
      {month:2,topic:"TDS, Advance Tax & Tax Planning"}
    ],
    reviews: [],faqs: [],
    image: IMG.account, rating: 4.6, enrolledStudents: 2500,
    seo: {
      metaTitle: "Income Tax Filing Course | ITR Filing Training | Tax Expert",
      metaDescription: "Income Tax Filing course – ITR-1, ITR-4, TDS, deductions. Tax expert banen. 2-month course.",
      keywords: ["income tax filing course","ITR filing training","tax consultant course","TDS training","income tax Ranchi"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION D — PROGRAMMING COURSES
  // ══════════════════════════════════════════

  {
    id: "pg-001", slug: "python-programming",
    title: "Python Programming",
    category: "Programming", level: "Beginner",
    badge: "Most Popular",
    durationMonths: 3, durationWeeks: 12, fee: 8000,
    shortDescription: "World ki most popular language sikhein – scripting, automation aur data science ki neev.",
    fullDescription: "Python Programming course mein sikhein – syntax, variables, data types, control flow, functions, OOP, file handling, modules, pip packages, aur libraries like NumPy, Pandas. AI, web development aur automation ke liye most demanded language.",
    skills: ["Python Syntax","OOP","File Handling","NumPy","Pandas","Regular Expressions","Modules"],
    technologies: ["Python 3.12","VS Code","Jupyter Notebook","PyCharm"],
    modules: [
      {moduleTitle:"Python Basics",topics:["Variables","Data Types","Operators","Control Flow","Loops"]},
      {moduleTitle:"Functions & OOP",topics:["Functions","Lambda","Classes","Objects","Inheritance","Polymorphism"]},
      {moduleTitle:"Python Ecosystem",topics:["File Handling","Modules","NumPy","Pandas","Mini Projects"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Python Introduction & Variables"},{week:2,topic:"Control Flow & Loops"},
      {week:3,topic:"Functions & Lambda"},{week:4,topic:"OOP – Classes & Objects"},
      {week:5,topic:"Inheritance & Polymorphism"},{week:6,topic:"File Handling & Modules"},
      {week:7,topic:"NumPy & Pandas"},{week:8,topic:"Mini Projects & Final Exam"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Python Fundamentals"},
      {month:2,topic:"OOP & File Handling"},
      {month:3,topic:"Libraries & Project Work"}
    ],
    reviews: [{name:"Vikash Kumar",rating:5,comment:"Python ke baad AI course join kar liya. Best decision!"}],
    faqs: [{question:"Kya Python ek achhi pehli language hai?",answer:"Haan, Python sabse easy aur powerful first language hai."}],
    image: IMG.python, rating: 4.8, enrolledStudents: 4200,
    seo: {
      metaTitle: "Python Programming Course | Learn Python | Ranchi",
      metaDescription: "Python Programming sikhein – basics se OOP, NumPy, Pandas tak. Beginners ke liye best 3-month Python course.",
      keywords: ["python programming course","learn python","python basics","python training Ranchi","python for beginners"]
    }
  },

  {
    id: "pg-002", slug: "c-programming",
    title: "C Programming",
    category: "Programming", level: "Beginner",
    badge: "Foundation",
    durationMonths: 2, durationWeeks: 8, fee: 5000,
    shortDescription: "Programming ki neev rakho – C language se sab kuch shuroot hota hai.",
    fullDescription: "C Programming course mein sikhein – variables, operators, control structures, arrays, strings, pointers, functions, structures, aur file handling. Sabse fundamental programming language jiske baad koi bhi language aasaan lagti hai.",
    skills: ["C Syntax","Pointers","Arrays","Strings","Functions","Structures","File Handling"],
    technologies: ["GCC Compiler","Code::Blocks","VS Code","Turbo C"],
    modules: [
      {moduleTitle:"C Fundamentals",topics:["Variables","Data Types","Operators","Control Structures","Loops"]},
      {moduleTitle:"Arrays, Pointers & Functions",topics:["1D/2D Arrays","Strings","Pointers","Functions","Recursion"]},
      {moduleTitle:"Advanced C",topics:["Structures","Unions","File Handling","Dynamic Memory","Preprocessor"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"C Introduction & Syntax"},{week:2,topic:"Control Structures & Loops"},
      {week:3,topic:"Functions & Recursion"},{week:4,topic:"Arrays & Strings"},
      {week:5,topic:"Pointers"},{week:6,topic:"Structures & Unions"},
      {week:7,topic:"File Handling"},{week:8,topic:"Projects & Exam"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"C Basics, Control Flow & Functions"},
      {month:2,topic:"Arrays, Pointers, Structures & Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.java, rating: 4.6, enrolledStudents: 2800,
    seo: {
      metaTitle: "C Programming Course | Learn C Language | Programming Basics Ranchi",
      metaDescription: "C Programming sikhein – pointers, arrays, functions, file handling. Programming fundamentals ke liye best course.",
      keywords: ["C programming course","learn C language","C language training","programming basics","C course Ranchi"]
    }
  },

  {
    id: "pg-003", slug: "core-java",
    title: "Core Java",
    category: "Programming", level: "Beginner",
    badge: "Job Ready",
    durationMonths: 3, durationWeeks: 12, fee: 9000,
    shortDescription: "Java programming ki foundation – OOP, Collections, Exception Handling aur JDBC.",
    fullDescription: "Core Java course mein sikhein – OOP concepts, Collections Framework, Generics, Exception Handling, Multithreading, JDBC, Java I/O, aur lambda expressions. Enterprise software development aur Android development ki foundation.",
    skills: ["Java OOP","Collections Framework","Exception Handling","Multithreading","JDBC","Lambda","Java I/O"],
    technologies: ["Java 17","Eclipse IDE","IntelliJ IDEA","MySQL"],
    modules: [
      {moduleTitle:"Java Fundamentals",topics:["Syntax","OOP","Classes","Inheritance","Polymorphism","Abstraction"]},
      {moduleTitle:"Core Java Advanced",topics:["Collections","Generics","Exception Handling","String Handling"]},
      {moduleTitle:"Java Ecosystem",topics:["Multithreading","JDBC","Java I/O","Lambda","Stream API"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Java Introduction & OOP"},{week:2,topic:"Inheritance & Polymorphism"},
      {week:3,topic:"Abstraction & Interfaces"},{week:4,topic:"Collections Framework"},
      {week:5,topic:"Exception Handling"},{week:6,topic:"Multithreading"},
      {week:7,topic:"JDBC & Database"},{week:8,topic:"Lambda, Streams & Projects"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Java Fundamentals & OOP"},
      {month:2,topic:"Collections, Exception & Multithreading"},
      {month:3,topic:"JDBC, Lambda & Real Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.java, rating: 4.7, enrolledStudents: 3600,
    seo: {
      metaTitle: "Core Java Course | Java Programming OOP Training Ranchi",
      metaDescription: "Core Java sikhein – OOP, Collections, Exception Handling, JDBC. Software development ke liye foundation course.",
      keywords: ["core java course","java programming","java OOP","java training Ranchi","core java certification"]
    }
  },

  {
    id: "pg-004", slug: "dsa-with-python",
    title: "DSA with Python",
    category: "Programming", level: "Intermediate",
    badge: "Interview Prep",
    durationMonths: 4, durationWeeks: 16, fee: 12000,
    shortDescription: "Data Structures & Algorithms – FAANG/product company interview ke liye complete preparation.",
    fullDescription: "DSA with Python course mein sikhein – Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Heaps, Sorting algorithms, Searching, Recursion, Dynamic Programming, Greedy, aur Backtracking. 200+ problems solve karo aur job-ready bano.",
    skills: ["Arrays","Linked Lists","Trees","Graphs","Sorting","Searching","Dynamic Programming","Recursion"],
    technologies: ["Python 3","LeetCode","HackerRank","VS Code"],
    modules: [
      {moduleTitle:"Linear Data Structures",topics:["Arrays","Linked Lists","Stack","Queue","Deque"]},
      {moduleTitle:"Non-Linear Structures",topics:["Binary Trees","BST","Graphs","Heaps","Tries"]},
      {moduleTitle:"Algorithms",topics:["Sorting","Searching","Recursion","DP","Greedy","Backtracking"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Complexity Analysis & Arrays"},{week:2,topic:"Linked Lists"},
      {week:3,topic:"Stack & Queue"},{week:4,topic:"Recursion & Backtracking"},
      {week:5,topic:"Binary Trees"},{week:6,topic:"Graphs & BFS/DFS"},
      {week:7,topic:"Sorting & Searching"},{week:8,topic:"Dynamic Programming"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Linear Data Structures"},
      {month:2,topic:"Trees & Graphs"},
      {month:3,topic:"Sorting, Searching & Recursion"},
      {month:4,topic:"Dynamic Programming & Interview Preparation"}
    ],
    reviews: [],faqs: [],
    image: IMG.python, rating: 4.9, enrolledStudents: 1900,
    seo: {
      metaTitle: "DSA with Python | Data Structures Algorithms | Interview Prep Course",
      metaDescription: "DSA with Python – Arrays, Trees, Graphs, Sorting, DP. FAANG interview preparation ke liye complete course.",
      keywords: ["DSA course","data structures algorithms","python DSA","interview preparation","competitive programming Ranchi"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION E — WEB DEVELOPMENT COURSES
  // ══════════════════════════════════════════

  {
    id: "wd-001", slug: "mern-stack-development",
    title: "MERN Stack Development",
    category: "Web Development", level: "Professional",
    badge: "🔥 Best Seller",
    durationMonths: 8, durationWeeks: 32, fee: 35000,
    shortDescription: "Full stack developer banein – MongoDB, Express, React, Node se production-ready apps banao.",
    fullDescription: "Master MongoDB, Express.js, React.js, and Node.js from beginner to advanced level. Learn frontend, backend, REST APIs, JWT authentication, Redux Toolkit, deployment on AWS/Vercel, Docker, and CI/CD. Real-world projects included. Get job-ready as a full stack developer.",
    skills: ["React.js","Node.js","MongoDB","Express.js","Redux Toolkit","REST APIs","JWT","Docker"],
    technologies: ["JavaScript","React","Node","MongoDB","Tailwind CSS","Docker","GitHub","AWS/Vercel"],
    modules: [
      {moduleTitle:"Frontend Development",topics:["HTML5","CSS3","Tailwind CSS","JavaScript ES6+","React.js","Redux Toolkit"]},
      {moduleTitle:"Backend Development",topics:["Node.js","Express.js","REST API Design","JWT Authentication","Role-Based Access"]},
      {moduleTitle:"Database & DevOps",topics:["MongoDB","Mongoose","Redis","Docker","AWS","CI/CD","GitHub Actions"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"HTML & CSS Fundamentals"},{week:2,topic:"JavaScript ES6+"},
      {week:3,topic:"React Basics – Components & Props"},{week:4,topic:"React Hooks & State Management"},
      {week:5,topic:"Redux Toolkit"},{week:6,topic:"React Router & API Integration"},
      {week:7,topic:"Node.js Fundamentals"},{week:8,topic:"Express.js & REST APIs"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Frontend – HTML, CSS, JavaScript"},
      {month:2,topic:"Advanced React & Redux"},
      {month:3,topic:"Node.js & Express Backend"},
      {month:4,topic:"MongoDB & Authentication"},
      {month:5,topic:"Full Stack Integration & Projects"},
      {month:6,topic:"Deployment, Docker & DevOps"},
      {month:7,topic:"Advanced Project Development"},
      {month:8,topic:"Portfolio, Resume & Job Prep"}
    ],
    reviews: [
      {name:"Rohit Sharma",rating:5,comment:"Best MERN course with real projects. Got job in 3 months!"},
      {name:"Priya Kumari",rating:5,comment:"Trainer bahut experienced hain. Sab concepts clearly samajh aaya."}
    ],
    faqs: [
      {question:"Is this course beginner friendly?",answer:"Yes, we start from HTML basics. No prior knowledge required."},
      {question:"Job placement support milega?",answer:"Haan, resume building, mock interviews aur job referrals provide kiye jaate hain."}
    ],
    image: IMG.react, rating: 4.9, enrolledStudents: 2400,
    seo: {
      metaTitle: "MERN Stack Development Course | Full Stack Training Ranchi",
      metaDescription: "MERN Stack Developer banein – React, Node, MongoDB, Express. 8-month professional training with real projects. Abhi enroll karein.",
      keywords: ["MERN stack course","full stack development","react node mongodb","MERN training Ranchi","web development course"]
    }
  },

  {
    id: "wd-002", slug: "frontend-development-react",
    title: "Frontend Development with React",
    category: "Web Development", level: "Advanced",
    badge: "High Demand",
    durationMonths: 5, durationWeeks: 20, fee: 22000,
    shortDescription: "Modern frontend banao – React.js, Tailwind CSS, Framer Motion aur API integration.",
    fullDescription: "Build responsive, animated, and scalable frontend applications using React.js, Tailwind CSS, Framer Motion, Redux Toolkit, React Router, and REST API integration. Build 5+ real-world projects for your portfolio.",
    skills: ["React.js","Tailwind CSS","Redux Toolkit","Framer Motion","React Router","API Integration"],
    technologies: ["HTML5","CSS3","JavaScript","React","Vite","Git"],
    modules: [
      {moduleTitle:"Web Fundamentals",topics:["HTML5","CSS3","Flexbox","Grid","Responsive Design"]},
      {moduleTitle:"JavaScript & React",topics:["ES6+","React Components","Hooks","State","Props"]},
      {moduleTitle:"Advanced Frontend",topics:["Redux","Framer Motion","API Calls","Authentication","Deployment"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"HTML & CSS"},{week:2,topic:"JavaScript ES6+"},
      {week:3,topic:"React Components"},{week:4,topic:"React Hooks"},
      {week:5,topic:"Redux Toolkit"},{week:6,topic:"Tailwind CSS & Framer Motion"},
      {week:7,topic:"API Integration"},{week:8,topic:"Projects & Deployment"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Web Fundamentals & JavaScript"},
      {month:2,topic:"React.js Fundamentals"},
      {month:3,topic:"Advanced React & Redux"},
      {month:4,topic:"API Integration & Animation"},
      {month:5,topic:"Projects, Portfolio & Deployment"}
    ],
    reviews: [],faqs: [],
    image: IMG.web, rating: 4.8, enrolledStudents: 1800,
    seo: {
      metaTitle: "Frontend Development with React | React.js Training Course Ranchi",
      metaDescription: "React.js Frontend Development course – Tailwind, Redux, Framer Motion. 5-month professional training. Portfolio ke saath job ready bano.",
      keywords: ["react js course","frontend development","react training Ranchi","tailwind CSS course","frontend developer course"]
    }
  },

  {
    id: "wd-003", slug: "python-full-stack-development",
    title: "Python Full Stack Development",
    category: "Web Development", level: "Professional",
    badge: null,
    durationMonths: 7, durationWeeks: 28, fee: 28000,
    shortDescription: "Python + Django se full stack web apps banao – APIs, deployment aur production-ready.",
    fullDescription: "Complete Python full stack course covering Python programming, Django REST Framework, frontend HTML/CSS/JS, PostgreSQL/MySQL, JWT authentication, Docker, and cloud deployment on AWS/Heroku.",
    skills: ["Python","Django","Django REST Framework","PostgreSQL","React.js (basic)","Docker","Deployment"],
    technologies: ["Python","Django","MySQL","PostgreSQL","HTML","CSS","JavaScript","Docker"],
    modules: [
      {moduleTitle:"Python Programming",topics:["Python Basics","OOP","File Handling","Exception Handling"]},
      {moduleTitle:"Django Backend",topics:["Django ORM","Views","Templates","REST Framework","JWT Auth"]},
      {moduleTitle:"Frontend & Deployment",topics:["HTML/CSS/JS","React Basics","Docker","AWS Deployment"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Python Basics"},{week:2,topic:"Python OOP & Advanced"},
      {week:3,topic:"Django Introduction"},{week:4,topic:"Django Models & ORM"},
      {week:5,topic:"Django Views & Templates"},{week:6,topic:"Django REST Framework"},
      {week:7,topic:"JWT Authentication"},{week:8,topic:"Frontend Integration"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Python Programming"},
      {month:2,topic:"Django Framework"},
      {month:3,topic:"REST APIs & Authentication"},
      {month:4,topic:"Frontend Integration"},
      {month:5,topic:"Docker & Deployment"},
      {month:6,topic:"Projects & Portfolio"},
      {month:7,topic:"Job Preparation & Interviews"}
    ],
    reviews: [],faqs: [],
    image: IMG.python, rating: 4.7, enrolledStudents: 1200,
    seo: {
      metaTitle: "Python Full Stack Development | Django React Course Ranchi",
      metaDescription: "Python Full Stack – Django REST APIs, React frontend, Docker deployment. 7-month professional course.",
      keywords: ["python full stack","django course","python web development","full stack python Ranchi","django REST"]
    }
  },

  {
    id: "wd-004", slug: "java-full-stack-development",
    title: "Java Full Stack Development",
    category: "Web Development", level: "Advanced",
    badge: "MNC Ready",
    durationMonths: 8, durationWeeks: 32, fee: 32000,
    shortDescription: "Java + Spring Boot + React – enterprise-level full stack development.",
    fullDescription: "Enterprise-level Java Full Stack course with Spring Boot backend, REST APIs, Microservices, React.js frontend, MySQL/PostgreSQL, Spring Security, JWT, Docker, and cloud deployment.",
    skills: ["Core Java","Spring Boot","Spring Security","React.js","REST APIs","Microservices","MySQL","Docker"],
    technologies: ["Java","Spring Boot","Hibernate","React","MySQL","Docker","GitHub"],
    modules: [
      {moduleTitle:"Java Fundamentals",topics:["Core Java","OOP","Collections","Multithreading","JDBC"]},
      {moduleTitle:"Spring Boot Backend",topics:["REST APIs","Spring Security","JWT","JPA/Hibernate","Microservices"]},
      {moduleTitle:"Frontend & DevOps",topics:["React.js","API Integration","Docker","CI/CD","AWS"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Core Java"},{week:2,topic:"Java OOP & Collections"},
      {week:3,topic:"Spring Boot Introduction"},{week:4,topic:"REST API Development"},
      {week:5,topic:"Spring Security & JWT"},{week:6,topic:"JPA & Hibernate"},
      {week:7,topic:"Microservices"},{week:8,topic:"React.js Basics"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Core Java"},
      {month:2,topic:"Spring Boot Backend"},
      {month:3,topic:"Security & Database"},
      {month:4,topic:"Microservices"},
      {month:5,topic:"React Frontend"},
      {month:6,topic:"Full Stack Integration"},
      {month:7,topic:"Docker & Deployment"},
      {month:8,topic:"Projects & Job Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.java, rating: 4.8, enrolledStudents: 1450,
    seo: {
      metaTitle: "Java Full Stack Course | Spring Boot React Training Ranchi",
      metaDescription: "Java Full Stack – Spring Boot, React, REST APIs, Microservices. 8-month MNC-ready training.",
      keywords: ["java full stack","spring boot course","java react","java full stack Ranchi","spring boot training"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION F — MOBILE APP DEVELOPMENT
  // ══════════════════════════════════════════

  {
    id: "mb-001", slug: "flutter-development",
    title: "Flutter Development",
    category: "Mobile App", level: "Intermediate",
    badge: "Cross Platform",
    durationMonths: 5, durationWeeks: 20, fee: 20000,
    shortDescription: "Ek codebase se Android aur iOS apps banao – Google ka Flutter framework.",
    fullDescription: "Flutter Development course mein sikhein – Dart language, Flutter widgets, state management (Provider, Riverpod, Bloc), REST API integration, Firebase, SQLite, push notifications, aur Google Play/App Store deployment.",
    skills: ["Dart","Flutter Widgets","State Management","REST API","Firebase","SQLite","App Deployment"],
    technologies: ["Flutter","Dart","Firebase","Android Studio","VS Code","Git"],
    modules: [
      {moduleTitle:"Flutter Basics",topics:["Dart Language","Widgets","Layouts","Navigation","Forms"]},
      {moduleTitle:"State & Data",topics:["Provider","Riverpod","REST APIs","SQLite","Firebase"]},
      {moduleTitle:"Advanced & Deployment",topics:["Push Notifications","Payment","Google Play","App Store"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Dart Language Basics"},{week:2,topic:"Flutter Widgets & Layout"},
      {week:3,topic:"Navigation & Forms"},{week:4,topic:"State Management – Provider"},
      {week:5,topic:"REST API Integration"},{week:6,topic:"Firebase Integration"},
      {week:7,topic:"SQLite & Local Storage"},{week:8,topic:"Push Notifications & Payments"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Dart & Flutter Fundamentals"},
      {month:2,topic:"UI Development & Navigation"},
      {month:3,topic:"State Management & APIs"},
      {month:4,topic:"Firebase & Local Database"},
      {month:5,topic:"Deployment & Real Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.mobile, rating: 4.8, enrolledStudents: 1600,
    seo: {
      metaTitle: "Flutter Development Course | Cross Platform App Training Ranchi",
      metaDescription: "Flutter sikhein – Android aur iOS apps ek codebase se. 5-month complete Flutter training with Firebase.",
      keywords: ["flutter course","flutter training","cross platform app development","flutter Ranchi","dart flutter"]
    }
  },

  {
    id: "mb-002", slug: "react-native-development",
    title: "React Native Development",
    category: "Mobile App", level: "Intermediate",
    badge: null,
    durationMonths: 4, durationWeeks: 16, fee: 18000,
    shortDescription: "JavaScript se Android + iOS apps banao – React Native ka power.",
    fullDescription: "React Native Development course mein sikhein – React Native components, navigation, state management, REST API integration, Firebase, Expo, aur app store deployment. JavaScript/React knowledge helpful but not required.",
    skills: ["React Native","JavaScript","Navigation","State Management","REST API","Firebase","Expo"],
    technologies: ["React Native","JavaScript","Expo","Firebase","Android Studio"],
    modules: [
      {moduleTitle:"React Native Basics",topics:["Components","StyleSheet","Navigation","Forms"]},
      {moduleTitle:"State & API",topics:["Redux","REST API","Firebase","AsyncStorage"]},
      {moduleTitle:"Advanced & Deployment",topics:["Camera","Location","Notifications","Expo Build","App Store"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"React Native Setup & Basics"},{week:2,topic:"Core Components & Styling"},
      {week:3,topic:"Navigation"},{week:4,topic:"State Management"},
      {week:5,topic:"REST API Integration"},{week:6,topic:"Firebase"},
      {week:7,topic:"Native Features"},{week:8,topic:"Build & Deployment"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"React Native Fundamentals"},
      {month:2,topic:"Navigation & State"},
      {month:3,topic:"APIs & Firebase"},
      {month:4,topic:"Advanced Features & Deployment"}
    ],
    reviews: [],faqs: [],
    image: IMG.mobile, rating: 4.7, enrolledStudents: 1100,
    seo: {
      metaTitle: "React Native Course | Mobile App Development Training Ranchi",
      metaDescription: "React Native sikhein – Android aur iOS apps JavaScript se. 4-month complete training.",
      keywords: ["react native course","mobile app development","react native training Ranchi","cross platform apps"]
    }
  },

  {
    id: "mb-003", slug: "android-development",
    title: "Android Development",
    category: "Mobile App", level: "Intermediate",
    badge: null,
    durationMonths: 5, durationWeeks: 20, fee: 18000,
    shortDescription: "Native Android apps banao – Kotlin, Jetpack Compose aur Google APIs.",
    fullDescription: "Android Development course mein sikhein – Kotlin language, Android SDK, Jetpack Compose, Activities, Fragments, Room Database, Retrofit, Firebase, MVVM architecture, aur Google Play deployment.",
    skills: ["Kotlin","Android SDK","Jetpack Compose","Room Database","Retrofit","Firebase","MVVM"],
    technologies: ["Android Studio","Kotlin","Firebase","Retrofit","Room"],
    modules: [
      {moduleTitle:"Android Fundamentals",topics:["Kotlin","Activities","Fragments","Intents","Layouts"]},
      {moduleTitle:"Data & API",topics:["Room Database","Retrofit","REST API","Firebase","ViewModel"]},
      {moduleTitle:"Advanced Android",topics:["MVVM","WorkManager","Notifications","Maps","Play Store"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Kotlin Basics"},{week:2,topic:"Android UI – Activities & Layouts"},
      {week:3,topic:"Fragments & Navigation"},{week:4,topic:"Room Database"},
      {week:5,topic:"Retrofit & REST APIs"},{week:6,topic:"Firebase Integration"},
      {week:7,topic:"MVVM Architecture"},{week:8,topic:"Advanced Features & Play Store"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Kotlin & Android Basics"},
      {month:2,topic:"UI Development"},
      {month:3,topic:"Database & APIs"},
      {month:4,topic:"Firebase & Architecture"},
      {month:5,topic:"Advanced Features & Deployment"}
    ],
    reviews: [],faqs: [],
    image: IMG.mobile, rating: 4.7, enrolledStudents: 1300,
    seo: {
      metaTitle: "Android Development Course | Kotlin Android Training Ranchi",
      metaDescription: "Android Development – Kotlin, Jetpack Compose, Firebase. 5-month native Android training.",
      keywords: ["android development course","kotlin android","android training Ranchi","android app development"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION G — AI & DATA SCIENCE
  // ══════════════════════════════════════════

  {
    id: "ai-001", slug: "data-science",
    title: "Data Science",
    category: "AI & Data Science", level: "Advanced",
    badge: "Highest Paid",
    durationMonths: 8, durationWeeks: 32, fee: 40000,
    shortDescription: "Data scientist banein – Python, ML, Statistics, Visualization aur Business Insights.",
    fullDescription: "Data Science course mein sikhein – Python, Statistics, Data Wrangling, Exploratory Data Analysis, Machine Learning, Deep Learning basics, Natural Language Processing, Data Visualization (Matplotlib, Seaborn, Plotly), aur Business Analytics. India's most demanded career.",
    skills: ["Python","Statistics","Pandas","NumPy","Scikit-learn","ML Algorithms","Data Visualization","SQL"],
    technologies: ["Python","Jupyter","Pandas","NumPy","Scikit-learn","Matplotlib","Power BI","SQL"],
    modules: [
      {moduleTitle:"Python for Data Science",topics:["Python Basics","NumPy","Pandas","Data Wrangling","EDA"]},
      {moduleTitle:"Machine Learning",topics:["Linear Regression","Classification","Clustering","Model Evaluation","Feature Engineering"]},
      {moduleTitle:"Advanced Topics",topics:["Deep Learning Basics","NLP","Time Series","Tableau/Power BI","Capstone Project"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Python & NumPy"},{week:2,topic:"Pandas & Data Wrangling"},
      {week:3,topic:"Exploratory Data Analysis"},{week:4,topic:"Statistics for DS"},
      {week:5,topic:"Linear & Logistic Regression"},{week:6,topic:"Decision Trees & Random Forest"},
      {week:7,topic:"Clustering Algorithms"},{week:8,topic:"Model Evaluation & Feature Engineering"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Python for Data Science"},
      {month:2,topic:"Statistics & EDA"},
      {month:3,topic:"Machine Learning – Supervised"},
      {month:4,topic:"Unsupervised & Ensemble"},
      {month:5,topic:"Deep Learning Basics"},
      {month:6,topic:"NLP & Computer Vision"},
      {month:7,topic:"Business Intelligence Tools"},
      {month:8,topic:"Capstone Project & Job Prep"}
    ],
    reviews: [{name:"Aryan Singh",rating:5,comment:"Data Scientist ki job mil gayi 3 lakh package ke saath!"}],
    faqs: [{question:"Kya math background chahiye?",answer:"Basic math enough hai, hum statistics scratch se padhate hain."}],
    image: IMG.ai, rating: 4.9, enrolledStudents: 2100,
    seo: {
      metaTitle: "Data Science Course | Machine Learning AI Training Ranchi",
      metaDescription: "Data Science sikhein – Python, ML, Deep Learning, NLP, Power BI. India's highest paid career. 8-month complete training.",
      keywords: ["data science course","machine learning training","data scientist course","AI course Ranchi","data science certification"]
    }
  },

  {
    id: "ai-002", slug: "machine-learning",
    title: "Machine Learning",
    category: "AI & Data Science", level: "Advanced",
    badge: "Future Tech",
    durationMonths: 6, durationWeeks: 24, fee: 30000,
    shortDescription: "ML algorithms master karein – supervised, unsupervised aur reinforcement learning.",
    fullDescription: "Machine Learning course mein sikhein – regression, classification, clustering, ensemble methods, SVM, neural networks, model optimization, deployment with Flask/FastAPI, aur MLflow. Production-ready ML models build karo.",
    skills: ["Supervised Learning","Unsupervised Learning","Neural Networks","Model Deployment","MLflow","Feature Engineering"],
    technologies: ["Python","Scikit-learn","TensorFlow","Keras","Flask","MLflow","Docker"],
    modules: [
      {moduleTitle:"ML Fundamentals",topics:["Regression","Classification","SVM","Decision Trees","Ensemble Methods"]},
      {moduleTitle:"Advanced ML",topics:["Neural Networks","Feature Engineering","Hyperparameter Tuning","Cross Validation"]},
      {moduleTitle:"ML in Production",topics:["Flask API","FastAPI","MLflow","Docker","CI/CD for ML"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"ML Introduction & Linear Regression"},{week:2,topic:"Logistic Regression & Classification"},
      {week:3,topic:"Decision Trees & Random Forest"},{week:4,topic:"SVM & Naive Bayes"},
      {week:5,topic:"Clustering – K-Means, DBSCAN"},{week:6,topic:"Ensemble Methods – Boosting"},
      {week:7,topic:"Neural Networks"},{week:8,topic:"Model Evaluation & Optimization"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Supervised Learning Algorithms"},
      {month:2,topic:"Unsupervised & Ensemble Methods"},
      {month:3,topic:"Neural Networks & Deep Learning Intro"},
      {month:4,topic:"Model Optimization & Feature Engineering"},
      {month:5,topic:"ML Deployment with APIs"},
      {month:6,topic:"Production ML & Real Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.ai, rating: 4.8, enrolledStudents: 1700,
    seo: {
      metaTitle: "Machine Learning Course | ML Training | AI Development Ranchi",
      metaDescription: "Machine Learning sikhein – regression, classification, neural networks, model deployment. Complete ML training.",
      keywords: ["machine learning course","ML training","AI course","scikit-learn course","machine learning Ranchi"]
    }
  },

  {
    id: "ai-003", slug: "generative-ai",
    title: "Generative AI",
    category: "AI & Data Science", level: "Intermediate",
    badge: "🔥 Trending",
    durationMonths: 3, durationWeeks: 12, fee: 18000,
    shortDescription: "GenAI tools aur development sikhein – ChatGPT, Claude, Stable Diffusion aur LLMs.",
    fullDescription: "Generative AI course mein sikhein – LLMs (GPT-4, Claude, Gemini), prompt engineering, LangChain, RAG (Retrieval Augmented Generation), fine-tuning, image generation (Stable Diffusion, DALL-E), aur AI app development.",
    skills: ["Prompt Engineering","LangChain","RAG","Fine-tuning","Image Generation","AI APIs","Python"],
    technologies: ["Python","OpenAI API","LangChain","Hugging Face","Stable Diffusion","Pinecone"],
    modules: [
      {moduleTitle:"GenAI Fundamentals",topics:["LLM Basics","Prompt Engineering","ChatGPT/Claude API","AI Ethics"]},
      {moduleTitle:"LangChain & RAG",topics:["LangChain Framework","Vector Databases","RAG Pipeline","Document QA"]},
      {moduleTitle:"Advanced GenAI",topics:["Fine-tuning LLMs","Image Generation","AI Agents","Real Projects"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"LLM Basics & Prompt Engineering"},{week:2,topic:"OpenAI & Claude APIs"},
      {week:3,topic:"LangChain Fundamentals"},{week:4,topic:"Vector Databases & RAG"},
      {week:5,topic:"Document QA System"},{week:6,topic:"Image Generation – SD/DALL-E"},
      {week:7,topic:"Fine-tuning LLMs"},{week:8,topic:"AI Agents & Real Projects"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"GenAI Fundamentals & LLM APIs"},
      {month:2,topic:"LangChain, RAG & Vector DB"},
      {month:3,topic:"Fine-tuning, Image Gen & Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.ai, rating: 4.9, enrolledStudents: 2800,
    seo: {
      metaTitle: "Generative AI Course | LangChain RAG LLM Training Ranchi",
      metaDescription: "Generative AI sikhein – ChatGPT, LangChain, RAG, Fine-tuning. Trending AI skills course. Abhi enroll karein.",
      keywords: ["generative AI course","LangChain training","RAG course","LLM training","AI development Ranchi"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION H — CYBER SECURITY
  // ══════════════════════════════════════════

  {
    id: "cs-001", slug: "ethical-hacking",
    title: "Ethical Hacking",
    category: "Cyber Security", level: "Advanced",
    badge: "High Demand",
    durationMonths: 6, durationWeeks: 24, fee: 28000,
    shortDescription: "Certified ethical hacker banein – penetration testing, vulnerability assessment aur security tools.",
    fullDescription: "Ethical Hacking course mein sikhein – network reconnaissance, scanning, enumeration, exploitation, post-exploitation, web application hacking (OWASP Top 10), wireless hacking, social engineering, aur reporting. CEH/OSCP exam preparation included.",
    skills: ["Network Scanning","Penetration Testing","Web App Hacking","Wireless Security","Exploitation","Kali Linux","Reporting"],
    technologies: ["Kali Linux","Metasploit","Nmap","Burp Suite","Wireshark","Nessus"],
    modules: [
      {moduleTitle:"Networking & Fundamentals",topics:["TCP/IP","Protocols","OSI Model","Network Tools"]},
      {moduleTitle:"Penetration Testing",topics:["Reconnaissance","Scanning","Enumeration","Exploitation","Post-Exploitation"]},
      {moduleTitle:"Specialized Attacks",topics:["Web App Hacking","OWASP Top 10","Wireless Hacking","Social Engineering","CTF Challenges"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Networking Fundamentals"},{week:2,topic:"Kali Linux & Security Tools"},
      {week:3,topic:"Reconnaissance Techniques"},{week:4,topic:"Network Scanning & Enumeration"},
      {week:5,topic:"Exploitation with Metasploit"},{week:6,topic:"Post Exploitation"},
      {week:7,topic:"Web Application Hacking"},{week:8,topic:"OWASP Top 10 Attacks"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Networking & Linux Fundamentals"},
      {month:2,topic:"Reconnaissance & Scanning"},
      {month:3,topic:"Exploitation Techniques"},
      {month:4,topic:"Web Application Security"},
      {month:5,topic:"Wireless & Advanced Attacks"},
      {month:6,topic:"CTF Practice & CEH Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.cyber, rating: 4.8, enrolledStudents: 1900,
    seo: {
      metaTitle: "Ethical Hacking Course | Penetration Testing CEH Training Ranchi",
      metaDescription: "Ethical Hacking sikhein – penetration testing, Kali Linux, OWASP, wireless security. CEH exam prep. 6-month course.",
      keywords: ["ethical hacking course","penetration testing","CEH training","kali linux course","cybersecurity Ranchi"]
    }
  },

  {
    id: "cs-002", slug: "cyber-security",
    title: "Cyber Security",
    category: "Cyber Security", level: "Intermediate",
    badge: "Career Booster",
    durationMonths: 5, durationWeeks: 20, fee: 22000,
    shortDescription: "Digital world ko secure karo – network security, cloud security aur SOC analyst skills.",
    fullDescription: "Cyber Security course mein sikhein – network security, firewall configuration, IDS/IPS, cloud security, identity management, incident response, digital forensics, SIEM tools, aur compliance. Entry-level security analyst ke liye complete training.",
    skills: ["Network Security","Firewall Config","Cloud Security","SIEM","Incident Response","Digital Forensics"],
    technologies: ["Splunk","Wireshark","Nessus","Microsoft Defender","AWS Security"],
    modules: [
      {moduleTitle:"Security Fundamentals",topics:["CIA Triad","Threats & Attacks","Cryptography","PKI"]},
      {moduleTitle:"Network & Cloud Security",topics:["Firewall","VPN","IDS/IPS","Cloud Security","Zero Trust"]},
      {moduleTitle:"SOC & Incident Response",topics:["SIEM Tools","Log Analysis","Incident Response","Digital Forensics"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Cybersecurity Basics"},{week:2,topic:"Cryptography"},
      {week:3,topic:"Network Security"},{week:4,topic:"Firewall & VPN"},
      {week:5,topic:"Cloud Security"},{week:6,topic:"Identity Management"},
      {week:7,topic:"SIEM & Log Analysis"},{week:8,topic:"Incident Response"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Security Fundamentals & Cryptography"},
      {month:2,topic:"Network & Cloud Security"},
      {month:3,topic:"SOC Operations"},
      {month:4,topic:"Incident Response & Forensics"},
      {month:5,topic:"Compliance & Real Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.cyber, rating: 4.7, enrolledStudents: 1500,
    seo: {
      metaTitle: "Cyber Security Course | SOC Analyst Network Security Training",
      metaDescription: "Cyber Security sikhein – network security, firewall, SIEM, cloud security. SOC analyst career ke liye.",
      keywords: ["cyber security course","SOC analyst training","network security","cybersecurity Ranchi","information security"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION I — CLOUD & DEVOPS
  // ══════════════════════════════════════════

  {
    id: "cd-001", slug: "aws-cloud",
    title: "AWS Cloud",
    category: "Cloud & DevOps", level: "Intermediate",
    badge: "High Paying",
    durationMonths: 4, durationWeeks: 16, fee: 20000,
    shortDescription: "Amazon Web Services master karein – EC2, S3, Lambda, RDS aur cloud architect skills.",
    fullDescription: "AWS Cloud course mein sikhein – EC2, S3, RDS, Lambda, VPC, IAM, CloudFormation, CloudWatch, ECS, EKS, aur AWS architecture patterns. AWS Solutions Architect aur Cloud Practitioner exam preparation included.",
    skills: ["EC2","S3","RDS","Lambda","VPC","IAM","CloudFormation","ECS/EKS","CloudWatch"],
    technologies: ["AWS Console","Terraform","Docker","Python (boto3)","CLI"],
    modules: [
      {moduleTitle:"AWS Fundamentals",topics:["IAM","EC2","S3","VPC","RDS","Route 53"]},
      {moduleTitle:"Serverless & Containers",topics:["Lambda","API Gateway","ECS","EKS","ECR"]},
      {moduleTitle:"DevOps on AWS",topics:["CloudFormation","CodePipeline","CloudWatch","Cost Optimization","Architecture"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"AWS Introduction & IAM"},{week:2,topic:"EC2 & VPC"},
      {week:3,topic:"S3 & Storage Services"},{week:4,topic:"RDS & Databases"},
      {week:5,topic:"Lambda & Serverless"},{week:6,topic:"ECS & Containers"},
      {week:7,topic:"CloudFormation & IaC"},{week:8,topic:"Architecture & Cost Optimization"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"AWS Core Services"},
      {month:2,topic:"Serverless & Containers"},
      {month:3,topic:"DevOps & Automation"},
      {month:4,topic:"Architecture, Security & Certification Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.cloud, rating: 4.8, enrolledStudents: 1800,
    seo: {
      metaTitle: "AWS Cloud Course | Amazon Web Services Training Ranchi",
      metaDescription: "AWS Cloud sikhein – EC2, S3, Lambda, RDS. Solutions Architect exam prep. 4-month cloud training.",
      keywords: ["AWS course","Amazon web services training","cloud computing","AWS certification","cloud course Ranchi"]
    }
  },

  {
    id: "cd-002", slug: "devops-engineering",
    title: "DevOps Engineering",
    category: "Cloud & DevOps", level: "Advanced",
    badge: "6-Figure Job",
    durationMonths: 6, durationWeeks: 24, fee: 30000,
    shortDescription: "DevOps engineer banein – Docker, Kubernetes, Jenkins, Terraform aur CI/CD pipelines.",
    fullDescription: "DevOps Engineering course mein sikhein – Linux, Docker, Kubernetes, Jenkins, Git/GitHub, Terraform, Ansible, CI/CD pipelines, monitoring with Prometheus/Grafana, aur AWS DevOps services. Industry-ready DevOps engineer bano.",
    skills: ["Docker","Kubernetes","Jenkins","Terraform","Ansible","CI/CD","Linux","Monitoring"],
    technologies: ["Docker","Kubernetes","Jenkins","Terraform","Ansible","AWS","Prometheus","Grafana"],
    modules: [
      {moduleTitle:"DevOps Foundation",topics:["Linux Admin","Git","Docker","Containerization"]},
      {moduleTitle:"Orchestration & IaC",topics:["Kubernetes","Helm","Terraform","Ansible","CloudFormation"]},
      {moduleTitle:"CI/CD & Monitoring",topics:["Jenkins","GitHub Actions","Prometheus","Grafana","ELK Stack"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Linux Administration"},{week:2,topic:"Git & GitHub"},
      {week:3,topic:"Docker & Containers"},{week:4,topic:"Kubernetes Basics"},
      {week:5,topic:"Kubernetes Advanced"},{week:6,topic:"Terraform & IaC"},
      {week:7,topic:"Ansible"},{week:8,topic:"Jenkins CI/CD"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Linux, Git & Docker"},
      {month:2,topic:"Kubernetes & Orchestration"},
      {month:3,topic:"Terraform & Ansible"},
      {month:4,topic:"CI/CD Pipelines"},
      {month:5,topic:"Monitoring & Logging"},
      {month:6,topic:"AWS DevOps & Real Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.cloud, rating: 4.8, enrolledStudents: 1200,
    seo: {
      metaTitle: "DevOps Engineering Course | Docker Kubernetes Jenkins Training",
      metaDescription: "DevOps sikhein – Docker, Kubernetes, Jenkins, Terraform, CI/CD. 6-month complete DevOps training.",
      keywords: ["devops course","docker kubernetes","jenkins training","CI/CD pipeline","devops Ranchi"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION J — NETWORKING
  // ══════════════════════════════════════════

  {
    id: "nt-001", slug: "ccna",
    title: "CCNA (Cisco Certified Network Associate)",
    category: "Networking", level: "Intermediate",
    badge: "Industry Cert",
    durationMonths: 4, durationWeeks: 16, fee: 18000,
    shortDescription: "Cisco CCNA certification ke liye complete preparation – routing, switching aur network config.",
    fullDescription: "CCNA course mein sikhein – OSI model, TCP/IP, routing protocols (OSPF, EIGRP, BGP), VLANs, STP, EtherChannel, ACLs, NAT, VPN, WAN technologies, aur wireless networking. Cisco CCNA 200-301 exam preparation included.",
    skills: ["Routing Protocols","Switching","VLANs","STP","ACLs","NAT","VPN","Wireless"],
    technologies: ["Cisco IOS","Packet Tracer","GNS3","Wireshark"],
    modules: [
      {moduleTitle:"Networking Fundamentals",topics:["OSI Model","TCP/IP","Subnetting","Network Devices"]},
      {moduleTitle:"Routing & Switching",topics:["OSPF","EIGRP","VLANs","STP","EtherChannel"]},
      {moduleTitle:"Security & WAN",topics:["ACLs","NAT","VPN","Wireless","SD-WAN Intro"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"OSI Model & TCP/IP"},{week:2,topic:"Subnetting & IP Addressing"},
      {week:3,topic:"Routing Basics & OSPF"},{week:4,topic:"EIGRP & BGP Intro"},
      {week:5,topic:"VLANs & STP"},{week:6,topic:"EtherChannel & Wireless"},
      {week:7,topic:"ACLs & NAT"},{week:8,topic:"VPN & WAN"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Networking Fundamentals & Subnetting"},
      {month:2,topic:"Routing Protocols"},
      {month:3,topic:"Switching & VLANs"},
      {month:4,topic:"Security, VPN & CCNA Exam Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.network, rating: 4.7, enrolledStudents: 1400,
    seo: {
      metaTitle: "CCNA Course | Cisco Networking Training | Network Engineer Ranchi",
      metaDescription: "CCNA certification course – routing, switching, VLANs, VPN. Cisco 200-301 exam prep. 4-month training.",
      keywords: ["CCNA course","cisco certification","network engineer","networking training Ranchi","CCNA 200-301"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION K — DATABASE
  // ══════════════════════════════════════════

  {
    id: "db-001", slug: "mysql-database",
    title: "MySQL Database",
    category: "Database", level: "Beginner",
    badge: null,
    durationMonths: 2, durationWeeks: 8, fee: 6000,
    shortDescription: "MySQL sikhein – SQL queries, database design, joins, stored procedures aur optimization.",
    fullDescription: "MySQL Database course mein sikhein – database concepts, DDL/DML/DCL commands, complex SQL queries, joins, subqueries, views, stored procedures, triggers, indexing, aur query optimization. Backend development aur data analysis ke liye essential.",
    skills: ["SQL Queries","DDL/DML","Joins","Subqueries","Stored Procedures","Triggers","Indexing"],
    technologies: ["MySQL 8","MySQL Workbench","phpMyAdmin"],
    modules: [
      {moduleTitle:"SQL Fundamentals",topics:["DDL","DML","SELECT","WHERE","ORDER BY","GROUP BY"]},
      {moduleTitle:"Advanced SQL",topics:["Joins","Subqueries","Views","Indexes","Normalization"]},
      {moduleTitle:"Programming Objects",topics:["Stored Procedures","Functions","Triggers","Transactions","Optimization"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Database Basics & DDL"},{week:2,topic:"DML – INSERT, UPDATE, DELETE"},
      {week:3,topic:"SELECT & Filtering"},{week:4,topic:"Joins – INNER, LEFT, RIGHT"},
      {week:5,topic:"Subqueries & Views"},{week:6,topic:"Stored Procedures & Functions"},
      {week:7,topic:"Triggers & Transactions"},{week:8,topic:"Optimization & Projects"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"SQL Basics & Advanced Queries"},
      {month:2,topic:"Stored Procedures, Optimization & Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.database, rating: 4.6, enrolledStudents: 2200,
    seo: {
      metaTitle: "MySQL Database Course | SQL Training | Database Developer Ranchi",
      metaDescription: "MySQL sikhein – SQL queries, joins, stored procedures, optimization. Database developer ke liye complete course.",
      keywords: ["MySQL course","SQL training","database course","MySQL training Ranchi","SQL developer course"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION L — SOFTWARE TESTING
  // ══════════════════════════════════════════

  {
    id: "st-001", slug: "software-testing-qa",
    title: "Software Testing & QA Automation",
    category: "Software Testing", level: "Intermediate",
    badge: "Job Ready",
    durationMonths: 4, durationWeeks: 16, fee: 16000,
    shortDescription: "Manual testing, Selenium automation, API testing aur QA engineer career launch.",
    fullDescription: "Comprehensive software testing course covering manual testing (test cases, bug reporting, STLC), automation testing with Selenium WebDriver and Java, API testing with Postman, CI/CD integration, and Agile/Scrum methodology.",
    skills: ["Manual Testing","Selenium WebDriver","API Testing","Test Cases","Bug Reporting","JUnit","TestNG"],
    technologies: ["Selenium","Postman","JIRA","TestNG","Maven","Git"],
    modules: [
      {moduleTitle:"Manual Testing",topics:["SDLC/STLC","Test Cases","Bug Reporting","JIRA","Agile Testing"]},
      {moduleTitle:"Automation Testing",topics:["Selenium WebDriver","Java Automation","Page Object Model","TestNG"]},
      {moduleTitle:"API & Performance Testing",topics:["Postman","REST API Testing","JMeter","CI/CD Integration"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Testing Fundamentals & SDLC"},{week:2,topic:"Test Case Writing"},
      {week:3,topic:"Bug Reporting & JIRA"},{week:4,topic:"Selenium Setup & Basics"},
      {week:5,topic:"Selenium Advanced – XPath & CSS"},{week:6,topic:"TestNG Framework"},
      {week:7,topic:"API Testing – Postman"},{week:8,topic:"JMeter & CI/CD"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Manual Testing"},
      {month:2,topic:"Selenium Automation"},
      {month:3,topic:"API & Performance Testing"},
      {month:4,topic:"Framework Design & Job Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.testing, rating: 4.5, enrolledStudents: 900,
    seo: {
      metaTitle: "Software Testing Course | Selenium QA Automation Training Ranchi",
      metaDescription: "Software Testing sikhein – manual testing, Selenium, API testing. QA engineer career ke liye complete course.",
      keywords: ["software testing course","selenium course","QA automation","testing training Ranchi","manual testing course"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION M — UI/UX DESIGN
  // ══════════════════════════════════════════

  {
    id: "ux-001", slug: "figma-design-uiux",
    title: "UI/UX Design with Figma",
    category: "UI/UX Design", level: "Intermediate",
    badge: "Creative Career",
    durationMonths: 4, durationWeeks: 16, fee: 16000,
    shortDescription: "Professional UI/UX designer banein – Figma se wireframe, prototype aur design systems.",
    fullDescription: "UI/UX Design course mein sikhein – design thinking, user research, wireframing, high-fidelity mockups, prototyping, design systems, component libraries, aur developer handoff using Figma. Build a strong portfolio.",
    skills: ["Figma","Wireframing","Prototyping","Design Systems","User Research","Accessibility","Design Thinking"],
    technologies: ["Figma","Adobe XD","Maze","Zeplin"],
    modules: [
      {moduleTitle:"Design Fundamentals",topics:["Design Thinking","Color Theory","Typography","Spacing","Grid Systems"]},
      {moduleTitle:"Figma Mastery",topics:["Figma Interface","Components","Auto Layout","Prototyping","Dev Handoff"]},
      {moduleTitle:"UX Research & Portfolio",topics:["User Research","Usability Testing","Case Studies","Portfolio Building"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Design Principles & Color Theory"},{week:2,topic:"Typography & Grids"},
      {week:3,topic:"Figma Basics"},{week:4,topic:"Wireframing"},
      {week:5,topic:"Components & Auto Layout"},{week:6,topic:"High-Fidelity Mockups"},
      {week:7,topic:"Prototyping & Animation"},{week:8,topic:"Design System & Portfolio"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Design Fundamentals"},
      {month:2,topic:"Figma Mastery"},
      {month:3,topic:"UX Research & Usability"},
      {month:4,topic:"Portfolio Projects & Job Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.uiux, rating: 4.7, enrolledStudents: 1300,
    seo: {
      metaTitle: "UI/UX Design Course Figma | User Experience Training Ranchi",
      metaDescription: "UI/UX Design with Figma – wireframing, prototyping, design systems. Creative career ke liye best course.",
      keywords: ["UI UX design course","figma course","UX training","product design","UI design Ranchi"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION N — GRAPHIC DESIGN
  // ══════════════════════════════════════════

  {
    id: "gd-001", slug: "graphic-designing",
    title: "Graphic Designing",
    category: "Graphic Design", level: "Beginner",
    badge: "Creative",
    durationMonths: 4, durationWeeks: 16, fee: 14000,
    shortDescription: "Photoshop, Illustrator, CorelDRAW aur Canva se professional designs banao.",
    fullDescription: "Graphic Designing course mein sikhein – Adobe Photoshop (photo editing, manipulation), Adobe Illustrator (vector art, logo design), CorelDRAW, Canva, color theory, typography, branding, aur social media design. Freelancing + job ke liye complete design training.",
    skills: ["Adobe Photoshop","Adobe Illustrator","CorelDRAW","Canva","Color Theory","Typography","Branding"],
    technologies: ["Adobe Photoshop","Adobe Illustrator","CorelDRAW","Canva"],
    modules: [
      {moduleTitle:"Design Principles",topics:["Color Theory","Typography","Layout","Composition","Branding"]},
      {moduleTitle:"Adobe Photoshop",topics:["Photo Editing","Layers","Masks","Retouching","Manipulation"]},
      {moduleTitle:"Illustrator & CorelDRAW",topics:["Vector Art","Logo Design","Print Design","Business Cards","Banners"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Design Principles & Color Theory"},{week:2,topic:"Typography & Layout"},
      {week:3,topic:"Photoshop Basics"},{week:4,topic:"Photoshop Advanced – Retouching"},
      {week:5,topic:"Illustrator Basics"},{week:6,topic:"Vector Art & Logo Design"},
      {week:7,topic:"CorelDRAW"},{week:8,topic:"Canva & Social Media Design"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Design Principles & Photoshop"},
      {month:2,topic:"Advanced Photoshop & Illustrator"},
      {month:3,topic:"CorelDRAW & Print Design"},
      {month:4,topic:"Canva, Branding & Portfolio"}
    ],
    reviews: [],faqs: [],
    image: IMG.graphic, rating: 4.6, enrolledStudents: 2400,
    seo: {
      metaTitle: "Graphic Designing Course | Photoshop Illustrator Training Ranchi",
      metaDescription: "Graphic Designing sikhein – Photoshop, Illustrator, CorelDRAW, Canva. Creative career ke liye complete training.",
      keywords: ["graphic design course","photoshop training","illustrator course","graphic designer Ranchi","design course"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION O — VIDEO EDITING & ANIMATION
  // ══════════════════════════════════════════

  {
    id: "ve-001", slug: "video-editing-premiere-pro",
    title: "Video Editing with Adobe Premiere Pro",
    category: "Video & Animation", level: "Beginner",
    badge: "YouTube Ready",
    durationMonths: 3, durationWeeks: 12, fee: 12000,
    shortDescription: "Professional video editor banein – YouTube, Instagram aur film editing master karein.",
    fullDescription: "Video Editing course mein sikhein – Adobe Premiere Pro basics to advanced, cut/trim/transitions, color grading, audio editing, motion graphics, YouTube/Instagram optimization, aur export settings. Content creators ke liye perfect.",
    skills: ["Adobe Premiere Pro","Video Cutting","Color Grading","Audio Editing","Transitions","Export Settings"],
    technologies: ["Adobe Premiere Pro","Adobe Audition","After Effects (basic)"],
    modules: [
      {moduleTitle:"Premiere Pro Basics",topics:["Interface","Import/Export","Timeline","Cuts & Transitions"]},
      {moduleTitle:"Advanced Editing",topics:["Color Grading","Audio Mixing","Text & Titles","B-Roll"]},
      {moduleTitle:"Content Creation",topics:["YouTube Optimization","Instagram Reels","Thumbnails","Client Projects"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Premiere Pro Interface & Setup"},{week:2,topic:"Timeline Editing & Cuts"},
      {week:3,topic:"Transitions & Effects"},{week:4,topic:"Color Grading"},
      {week:5,topic:"Audio Editing"},{week:6,topic:"Text, Titles & Graphics"},
      {week:7,topic:"YouTube & Instagram Optimization"},{week:8,topic:"Client Project & Portfolio"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Premiere Pro Fundamentals"},
      {month:2,topic:"Advanced Editing Techniques"},
      {month:3,topic:"Content Creation & Portfolio"}
    ],
    reviews: [],faqs: [],
    image: IMG.video, rating: 4.7, enrolledStudents: 1700,
    seo: {
      metaTitle: "Video Editing Course | Adobe Premiere Pro Training Ranchi",
      metaDescription: "Video Editing sikhein – Adobe Premiere Pro, color grading, audio editing. YouTube aur social media ke liye complete training.",
      keywords: ["video editing course","premiere pro training","youtube video editing","content creator course","video editing Ranchi"]
    }
  },

  {
    id: "ve-002", slug: "3d-animation-blender",
    title: "3D Animation with Blender",
    category: "Video & Animation", level: "Intermediate",
    badge: null,
    durationMonths: 5, durationWeeks: 20, fee: 18000,
    shortDescription: "Free aur powerful Blender se 3D modeling, animation aur VFX sikhein.",
    fullDescription: "3D Animation with Blender course mein sikhein – 3D modeling, rigging, character animation, VFX, particle systems, lighting, rendering, aur compositing. Blender ek free, open-source professional tool hai.",
    skills: ["3D Modeling","Rigging","Character Animation","VFX","Particle Systems","Rendering","Compositing"],
    technologies: ["Blender","Adobe Premiere Pro"],
    modules: [
      {moduleTitle:"Blender Basics",topics:["Interface","3D Modeling","Materials","Lighting"]},
      {moduleTitle:"Animation",topics:["Rigging","Keyframe Animation","Character Animation","Camera Work"]},
      {moduleTitle:"VFX & Rendering",topics:["Particle Systems","VFX","Cycles Rendering","Compositing"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Blender Interface & Basics"},{week:2,topic:"3D Modeling"},
      {week:3,topic:"Materials & Textures"},{week:4,topic:"Lighting & Rendering"},
      {week:5,topic:"Rigging"},{week:6,topic:"Character Animation"},
      {week:7,topic:"VFX & Particles"},{week:8,topic:"Compositing & Final Project"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"3D Modeling & Basics"},
      {month:2,topic:"Materials, Lighting & Rendering"},
      {month:3,topic:"Rigging & Animation"},
      {month:4,topic:"VFX & Particles"},
      {month:5,topic:"Compositing & Portfolio"}
    ],
    reviews: [],faqs: [],
    image: IMG.video, rating: 4.6, enrolledStudents: 900,
    seo: {
      metaTitle: "3D Animation Blender Course | VFX Training Ranchi",
      metaDescription: "Blender se 3D Animation aur VFX sikhein. Free tool, professional results. 5-month course.",
      keywords: ["blender course","3D animation course","VFX training","3D modeling","animation course Ranchi"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION P — DIGITAL MARKETING
  // ══════════════════════════════════════════

  {
    id: "dm-001", slug: "digital-marketing-mastery",
    title: "Digital Marketing Mastery",
    category: "Digital Marketing", level: "Professional",
    badge: "Most Popular",
    durationMonths: 6, durationWeeks: 24, fee: 18000,
    shortDescription: "SEO, Google Ads, Meta Ads, content marketing aur analytics – complete digital marketing.",
    fullDescription: "Professional Digital Marketing course covering – SEO (On-page, Off-page, Technical), Google Ads (Search, Display, Shopping), Meta Ads (Facebook/Instagram), YouTube Marketing, Content Marketing, Email Marketing, Analytics (GA4), aur Affiliate Marketing. Real campaign experience included.",
    skills: ["SEO","Google Ads","Meta Ads","YouTube Marketing","GA4 Analytics","Email Marketing","Content Marketing"],
    technologies: ["Google Analytics 4","Search Console","Meta Ads Manager","Canva","Mailchimp","SEMrush"],
    modules: [
      {moduleTitle:"SEO & Content Marketing",topics:["On-Page SEO","Off-Page SEO","Technical SEO","Keyword Research","Blog Writing"]},
      {moduleTitle:"Paid Advertising",topics:["Google Search Ads","Google Display","Meta Ads","YouTube Ads","Retargeting"]},
      {moduleTitle:"Analytics & Strategy",topics:["GA4","Search Console","A/B Testing","Email Marketing","Affiliate Marketing"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Digital Marketing Overview"},{week:2,topic:"Keyword Research & SEO Basics"},
      {week:3,topic:"On-Page SEO"},{week:4,topic:"Off-Page & Technical SEO"},
      {week:5,topic:"Google Ads – Search"},{week:6,topic:"Google Ads – Display & Shopping"},
      {week:7,topic:"Meta Ads – Facebook"},{week:8,topic:"Instagram & YouTube Ads"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"SEO Fundamentals"},
      {month:2,topic:"Advanced SEO & Content"},
      {month:3,topic:"Google Ads"},
      {month:4,topic:"Social Media Marketing"},
      {month:5,topic:"Analytics & Email Marketing"},
      {month:6,topic:"Real Campaigns & Agency Projects"}
    ],
    reviews: [{name:"Nisha Kumari",rating:5,comment:"Best digital marketing course! Real campaigns pe kaam kiya."}],
    faqs: [{question:"Kya certificate milega?",answer:"Haan, Google Ads aur Meta Blueprint certificates ke liye prepare karwaya jayega."}],
    image: IMG.marketing, rating: 4.6, enrolledStudents: 2100,
    seo: {
      metaTitle: "Digital Marketing Course | SEO Google Ads Meta Ads Training Ranchi",
      metaDescription: "Digital Marketing sikhein – SEO, Google Ads, Meta Ads, YouTube Marketing. 6-month professional course with real campaigns.",
      keywords: ["digital marketing course","SEO training","google ads course","meta ads","digital marketing Ranchi"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION Q — HARDWARE COURSES
  // ══════════════════════════════════════════

  {
    id: "hw-001", slug: "computer-hardware-networking",
    title: "Hardware & Networking",
    category: "Hardware", level: "Beginner",
    badge: "Job Ready",
    durationMonths: 6, durationWeeks: 24, fee: 18000,
    shortDescription: "Computer assembly, laptop repair, networking setup aur troubleshooting expert bano.",
    fullDescription: "Hardware & Networking course mein sikhein – computer assembly, motherboard components, RAM/CPU/storage upgrades, OS installation, network setup (LAN/WAN/WiFi), printer repair, aur basic troubleshooting. Hardware technician career ke liye.",
    skills: ["Computer Assembly","OS Installation","Network Setup","Laptop Repair","Printer Repair","Troubleshooting"],
    technologies: ["Windows","Linux","Cisco Packet Tracer","Network Tools"],
    modules: [
      {moduleTitle:"Computer Hardware",topics:["Components","Assembly","CPU/RAM Upgrade","OS Installation","BIOS"]},
      {moduleTitle:"Laptop & Printer Repair",topics:["Laptop Disassembly","Screen Replacement","Printer Repair","Maintenance"]},
      {moduleTitle:"Networking",topics:["LAN/WAN Setup","WiFi Configuration","IP Addressing","Troubleshooting","Crimping"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Computer Components & Assembly"},{week:2,topic:"OS Installation & BIOS"},
      {week:3,topic:"Troubleshooting Common Issues"},{week:4,topic:"RAM/HDD/SSD Upgrade"},
      {week:5,topic:"Laptop Disassembly & Repair"},{week:6,topic:"Printer Repair & Maintenance"},
      {week:7,topic:"Network Cables & Crimping"},{week:8,topic:"LAN/WiFi Setup"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Computer Assembly & OS"},
      {month:2,topic:"Hardware Repair & Upgrades"},
      {month:3,topic:"Laptop & Printer Repair"},
      {month:4,topic:"Networking Basics"},
      {month:5,topic:"Network Configuration"},
      {month:6,topic:"Advanced Troubleshooting & Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.hardware, rating: 4.5, enrolledStudents: 1800,
    seo: {
      metaTitle: "Hardware & Networking Course | Computer Repair Training Ranchi",
      metaDescription: "Hardware & Networking sikhein – computer assembly, laptop repair, network setup. Hardware technician course.",
      keywords: ["hardware networking course","computer repair","laptop repairing","hardware course Ranchi","network technician"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION R — PROFESSIONAL DIPLOMA
  // ══════════════════════════════════════════

  {
    id: "dp-001", slug: "diploma-computer-application",
    title: "Diploma in Computer Application (DCA)",
    category: "Professional Diploma", level: "Beginner",
    badge: "1 Year Diploma",
    durationMonths: 12, durationWeeks: 48, fee: 15000,
    shortDescription: "1-year comprehensive computer diploma – MS Office, Tally, Internet aur programming basics.",
    fullDescription: "Diploma in Computer Application (DCA) ek 1-year comprehensive diploma course hai jisme sikhaya jata hai – computer fundamentals, MS Office, Tally Prime, internet, basic programming (C/Python), web basics, aur project work. Government aur private jobs ke liye widely accepted diploma.",
    skills: ["Computer Fundamentals","MS Office","Tally Prime","Internet","C Programming Basics","Web Basics"],
    technologies: ["Windows","MS Office","Tally Prime","C Compiler","HTML"],
    modules: [
      {moduleTitle:"Semester 1 – Basics",topics:["Computer Fundamentals","OS","MS Word","MS Excel","MS PowerPoint"]},
      {moduleTitle:"Semester 2 – Professional",topics:["Tally Prime","C Programming Basics","Internet & Email","HTML Basics"]},
      {moduleTitle:"Practical & Project",topics:["Lab Work","Mini Projects","Viva","Certificate Exam"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Computer Basics"},{week:2,topic:"Windows OS"},
      {week:3,topic:"MS Word"},{week:4,topic:"MS Excel"},
      {week:5,topic:"MS PowerPoint"},{week:6,topic:"Internet & Email"},
      {week:7,topic:"Tally Prime Basics"},{week:8,topic:"GST in Tally"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Computer Fundamentals"},{month:2,topic:"MS Word & Excel"},
      {month:3,topic:"MS PowerPoint & Outlook"},{month:4,topic:"Tally Prime"},
      {month:5,topic:"Internet & Digital Skills"},{month:6,topic:"C Programming Basics"},
      {month:7,topic:"HTML Basics"},{month:8,topic:"Advanced Excel"},
      {month:9,topic:"Database Basics"},{month:10,topic:"Project Work"},
      {month:11,topic:"Revision & Practice"},{month:12,topic:"Exam & Certificate"}
    ],
    reviews: [],faqs: [],
    image: IMG.diploma, rating: 4.6, enrolledStudents: 3500,
    seo: {
      metaTitle: "DCA Diploma in Computer Application | 1 Year Computer Course Ranchi",
      metaDescription: "DCA course – 1 year diploma in computer application. MS Office, Tally, programming basics. Government job ke liye.",
      keywords: ["DCA course","diploma computer application","1 year computer diploma","DCA Ranchi","computer diploma course"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION S — FREELANCING & CAREER
  // ══════════════════════════════════════════

  {
    id: "fl-001", slug: "freelancing-mastery",
    title: "Freelancing Mastery",
    category: "Freelancing & Career", level: "Beginner",
    badge: "Earn from Home",
    durationMonths: 2, durationWeeks: 8, fee: 5000,
    shortDescription: "Ghar se paise kamao – Fiverr, Upwork, freelancing skills aur client management.",
    fullDescription: "Freelancing Mastery course mein sikhein – Fiverr aur Upwork profile setup, gig creation, proposal writing, client communication, project management, payment setup, aur income scaling. Apni skill se ghar se freelancing start karo.",
    skills: ["Fiverr Profile Setup","Upwork Bidding","Proposal Writing","Client Communication","Project Management","Payment Setup"],
    technologies: ["Fiverr","Upwork","Payoneer","PayPal","Zoom"],
    modules: [
      {moduleTitle:"Freelancing Fundamentals",topics:["Freelancing Platforms","Niche Selection","Profile Optimization"]},
      {moduleTitle:"Getting Clients",topics:["Gig Creation","Proposal Writing","Pricing Strategy","Client Onboarding"]},
      {moduleTitle:"Business Growth",topics:["Client Retention","Reviews","Income Scaling","Tax Basics"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Freelancing Basics & Platform Overview"},{week:2,topic:"Profile & Gig Setup"},
      {week:3,topic:"Proposal Writing & Bidding"},{week:4,topic:"First Client & Communication"},
      {week:5,topic:"Project Delivery & Reviews"},{week:6,topic:"Payment & Finance"},
      {week:7,topic:"Income Scaling Strategies"},{week:8,topic:"Advanced Client Management"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Freelancing Basics & Getting First Client"},
      {month:2,topic:"Growth, Scaling & Financial Management"}
    ],
    reviews: [],faqs: [],
    image: IMG.freelance, rating: 4.5, enrolledStudents: 2200,
    seo: {
      metaTitle: "Freelancing Course | Fiverr Upwork Training | Earn from Home",
      metaDescription: "Freelancing sikhein – Fiverr, Upwork, proposal writing, client management. Ghar se paise kamao. 2-month course.",
      keywords: ["freelancing course","fiverr training","upwork course","earn from home","freelancing Ranchi"]
    }
  },

  {
    id: "fl-002", slug: "git-github",
    title: "Git & GitHub",
    category: "Freelancing & Career", level: "Beginner",
    badge: "Must Have",
    durationMonths: 1, durationWeeks: 4, fee: 2500,
    shortDescription: "Every developer ke liye must-have skill – version control, collaboration aur open source.",
    fullDescription: "Git & GitHub course mein sikhein – Git basics, branching, merging, conflict resolution, pull requests, GitHub workflow, CI/CD with GitHub Actions, aur open source contribution. Every programmer ke liye essential skill.",
    skills: ["Git Basics","Branching & Merging","Pull Requests","GitHub Workflow","Conflict Resolution","GitHub Actions"],
    technologies: ["Git","GitHub","VS Code"],
    modules: [
      {moduleTitle:"Git Fundamentals",topics:["Version Control","init/add/commit","Branching","Merging","Rebasing"]},
      {moduleTitle:"GitHub",topics:["Remote Repos","Pull Requests","Code Review","Issues","GitHub Pages"]},
      {moduleTitle:"Advanced",topics:["GitHub Actions","CI/CD","Open Source","Git Flow"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Git Basics – init, add, commit, push"},
      {week:2,topic:"Branching, Merging & Conflict Resolution"},
      {week:3,topic:"GitHub – Pull Requests & Code Review"},
      {week:4,topic:"GitHub Actions & Open Source Contribution"}
    ],
    monthlyRoadmap: [{month:1,topic:"Complete Git & GitHub Workflow"}],
    reviews: [],faqs: [],
    image: IMG.freelance, rating: 4.7, enrolledStudents: 3100,
    seo: {
      metaTitle: "Git GitHub Course | Version Control Training | Developer Skills",
      metaDescription: "Git & GitHub sikhein – version control, branching, pull requests, GitHub Actions. Every developer ke liye must-have.",
      keywords: ["git course","github training","version control","git github Ranchi","developer tools course"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION T — EMERGING TECHNOLOGY
  // ══════════════════════════════════════════

  {
    id: "et-001", slug: "blockchain-development",
    title: "Blockchain Development",
    category: "Emerging Technology", level: "Advanced",
    badge: "Future Tech",
    durationMonths: 5, durationWeeks: 20, fee: 25000,
    shortDescription: "Blockchain, smart contracts, Solidity aur Web3 DApps development sikhein.",
    fullDescription: "Blockchain Development course mein sikhein – blockchain fundamentals, Ethereum, Solidity smart contracts, Web3.js, DApps development, NFTs, DeFi concepts, Hardhat, aur IPFS. Future of finance aur technology.",
    skills: ["Blockchain Fundamentals","Solidity","Smart Contracts","Web3.js","DApps","NFTs","Hardhat"],
    technologies: ["Ethereum","Solidity","Web3.js","Hardhat","Metamask","IPFS","React"],
    modules: [
      {moduleTitle:"Blockchain Basics",topics:["Blockchain Concepts","Consensus Mechanisms","Ethereum","Wallets"]},
      {moduleTitle:"Smart Contracts",topics:["Solidity Language","ERC-20","ERC-721 (NFT)","Hardhat","Testing"]},
      {moduleTitle:"Web3 DApps",topics:["Web3.js","Ethers.js","React DApp","DeFi Concepts","IPFS","Deployment"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Blockchain Fundamentals"},{week:2,topic:"Ethereum & Wallets"},
      {week:3,topic:"Solidity Basics"},{week:4,topic:"Smart Contract Development"},
      {week:5,topic:"ERC-20 Token"},{week:6,topic:"NFT – ERC-721"},
      {week:7,topic:"Web3.js & DApp Frontend"},{week:8,topic:"DeFi & IPFS Integration"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Blockchain Fundamentals"},
      {month:2,topic:"Solidity Smart Contracts"},
      {month:3,topic:"Token & NFT Development"},
      {month:4,topic:"Web3 DApp Development"},
      {month:5,topic:"DeFi & Real Project"}
    ],
    reviews: [],faqs: [],
    image: IMG.emerging, rating: 4.7, enrolledStudents: 700,
    seo: {
      metaTitle: "Blockchain Development Course | Solidity Smart Contracts Training",
      metaDescription: "Blockchain Development sikhein – Solidity, Smart Contracts, NFT, Web3 DApps. Future technology course.",
      keywords: ["blockchain course","solidity training","smart contracts","web3 development","blockchain Ranchi"]
    }
  },

  {
    id: "et-002", slug: "unity-game-development",
    title: "Unity Game Development",
    category: "Emerging Technology", level: "Intermediate",
    badge: "Trending",
    durationMonths: 6, durationWeeks: 24, fee: 22000,
    shortDescription: "Unity se 2D/3D games banao – mobile, PC aur web games development.",
    fullDescription: "Unity Game Development course mein sikhein – Unity interface, C# scripting, 2D game development, 3D game mechanics, physics engine, UI design, audio, animation, mobile game optimization, aur game publishing on Play Store/iOS.",
    skills: ["Unity Engine","C# Scripting","2D/3D Game Development","Physics Engine","Mobile Game Optimization","Game Publishing"],
    technologies: ["Unity","C#","Blender (basic)","Android Studio"],
    modules: [
      {moduleTitle:"Unity Fundamentals",topics:["Unity Interface","GameObjects","Components","Prefabs","Scenes"]},
      {moduleTitle:"C# & Game Mechanics",topics:["C# Basics","Player Movement","Collision","Physics","UI"]},
      {moduleTitle:"Complete Game Development",topics:["2D Game","3D Game","Audio","Animation","Mobile Build","Publishing"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Unity Interface & Setup"},{week:2,topic:"GameObjects & Components"},
      {week:3,topic:"C# Scripting Basics"},{week:4,topic:"Player Movement & Input"},
      {week:5,topic:"Collision & Physics"},{week:6,topic:"2D Game Development"},
      {week:7,topic:"3D Game Basics"},{week:8,topic:"UI & Audio"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Unity Fundamentals"},
      {month:2,topic:"C# & Game Mechanics"},
      {month:3,topic:"2D Game Project"},
      {month:4,topic:"3D Game Development"},
      {month:5,topic:"Mobile Optimization"},
      {month:6,topic:"Game Publishing & Portfolio"}
    ],
    reviews: [],faqs: [],
    image: IMG.emerging, rating: 4.7, enrolledStudents: 1100,
    seo: {
      metaTitle: "Unity Game Development Course | 2D 3D Game Making Training",
      metaDescription: "Unity Game Development sikhein – 2D/3D games, C# scripting, mobile games. Game developer career ke liye.",
      keywords: ["unity game development","game making course","Unity training","2D 3D games","game developer Ranchi"]
    }
  },

  // ══════════════════════════════════════════
  //  SECTION U — SEO SPECIALIST COURSES
  // ══════════════════════════════════════════

  {
    id: "sp-001", slug: "seo-specialist",
    title: "SEO Specialist",
    category: "Digital Marketing", level: "Advanced",
    badge: "High Demand",
    durationMonths: 3, durationWeeks: 12, fee: 10000,
    shortDescription: "Professional SEO specialist banein – technical SEO, link building aur rank tracking.",
    fullDescription: "SEO Specialist course mein sikhein – advanced keyword research, on-page optimization, technical SEO (Core Web Vitals, schema markup), link building strategies, local SEO, Google Search Console, SEMrush/Ahrefs, aur SEO reporting. Agencies aur freelancers ke liye premium course.",
    skills: ["Advanced Keyword Research","Technical SEO","Link Building","Local SEO","Schema Markup","Core Web Vitals","SEO Reporting"],
    technologies: ["Google Search Console","SEMrush","Ahrefs","Google Analytics 4","Screaming Frog"],
    modules: [
      {moduleTitle:"On-Page SEO",topics:["Keyword Research","Content Optimization","Meta Tags","Internal Linking","Schema Markup"]},
      {moduleTitle:"Technical SEO",topics:["Site Speed","Core Web Vitals","Crawlability","XML Sitemap","Robots.txt"]},
      {moduleTitle:"Off-Page & Local SEO",topics:["Link Building","Guest Posting","Local SEO","Google My Business","SEO Audit"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"SEO Fundamentals & Keyword Research"},{week:2,topic:"On-Page Optimization"},
      {week:3,topic:"Technical SEO Basics"},{week:4,topic:"Core Web Vitals & Site Speed"},
      {week:5,topic:"Link Building Strategies"},{week:6,topic:"Local SEO & GMB"},
      {week:7,topic:"SEMrush & Ahrefs"},{week:8,topic:"SEO Audit & Reporting"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"On-Page & Technical SEO"},
      {month:2,topic:"Off-Page & Link Building"},
      {month:3,topic:"Local SEO, Tools & Real Client Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.seo, rating: 4.7, enrolledStudents: 1800,
    seo: {
      metaTitle: "SEO Specialist Course | Advanced SEO Training Ranchi",
      metaDescription: "SEO Specialist banen – technical SEO, link building, local SEO, Core Web Vitals. Advanced SEO course.",
      keywords: ["SEO specialist course","advanced SEO training","technical SEO","link building course","SEO Ranchi"]
    }
  },

  {
    id: "sp-002", slug: "advanced-excel-with-vba",
    title: "Advanced Excel with VBA",
    category: "Microsoft Office", level: "Advanced",
    badge: "MIS Expert",
    durationMonths: 3, durationWeeks: 12, fee: 9000,
    shortDescription: "Excel automation expert banein – Macros, VBA programming, dashboard aur MIS reporting.",
    fullDescription: "Advanced Excel with VBA course mein sikhein – Macros recording, VBA programming (variables, loops, functions, UserForms), Excel automation, dynamic dashboards, MIS reports, aur Excel add-in development. Finance aur data professionals ke liye career upgrade.",
    skills: ["VBA Programming","Macros","UserForms","Dynamic Dashboards","MIS Reports","Excel Automation","Power Query"],
    technologies: ["MS Excel","VBA Editor","Power BI (basic)"],
    modules: [
      {moduleTitle:"VBA Basics",topics:["Macro Recording","VBA Editor","Variables","Loops","Conditions","Functions"]},
      {moduleTitle:"Advanced VBA",topics:["UserForms","Error Handling","File Automation","Email from Excel"]},
      {moduleTitle:"MIS & Dashboard",topics:["Dynamic Charts","Slicers","Power Query","MIS Report Templates","Real Projects"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Macro Recording & VBA Editor"},{week:2,topic:"VBA Variables & Data Types"},
      {week:3,topic:"Loops & Conditions in VBA"},{week:4,topic:"Functions & Subroutines"},
      {week:5,topic:"UserForms Development"},{week:6,topic:"File & Email Automation"},
      {week:7,topic:"Dynamic Dashboard"},{week:8,topic:"MIS Report & Real Projects"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"VBA Fundamentals"},
      {month:2,topic:"Advanced VBA & UserForms"},
      {month:3,topic:"Dashboard, MIS & Automation Projects"}
    ],
    reviews: [],faqs: [],
    image: IMG.office, rating: 4.8, enrolledStudents: 1500,
    seo: {
      metaTitle: "Advanced Excel VBA Course | Macros Dashboard MIS Training Ranchi",
      metaDescription: "Advanced Excel with VBA – Macros, UserForms, MIS Dashboard, automation. Finance professionals ke liye.",
      keywords: ["advanced excel VBA","excel macros course","MIS reporting","VBA training","excel automation Ranchi"]
    }
  },

  {
    id: "sp-003", slug: "data-analytics",
    title: "Data Analytics",
    category: "AI & Data Science", level: "Intermediate",
    badge: "High Demand",
    durationMonths: 4, durationWeeks: 16, fee: 18000,
    shortDescription: "Data se business insights nikalo – Excel, SQL, Power BI aur Python for analytics.",
    fullDescription: "Data Analytics course mein sikhein – Excel advanced analytics, SQL for data analysis, Power BI dashboards, Python (Pandas, NumPy, Matplotlib), statistical analysis, aur storytelling with data. Entry-level data analyst ke liye complete package.",
    skills: ["Excel Advanced","SQL Analytics","Power BI","Python Pandas","Statistical Analysis","Data Visualization"],
    technologies: ["MS Excel","SQL","Power BI","Python","Tableau (basic)"],
    modules: [
      {moduleTitle:"Data Manipulation",topics:["Advanced Excel","SQL for Analytics","Data Cleaning","Python Pandas"]},
      {moduleTitle:"Visualization & BI",topics:["Power BI Desktop","DAX","Dashboards","Tableau Basics"]},
      {moduleTitle:"Statistics & Reporting",topics:["Descriptive Statistics","Correlation","Regression","Business Reports"]}
    ],
    weeklyRoadmap: [
      {week:1,topic:"Excel Data Analytics"},{week:2,topic:"SQL for Data Analysis"},
      {week:3,topic:"Python – Pandas Basics"},{week:4,topic:"Data Cleaning & EDA"},
      {week:5,topic:"Power BI Introduction"},{week:6,topic:"DAX & Advanced Power BI"},
      {week:7,topic:"Statistics for Analytics"},{week:8,topic:"Capstone Project"}
    ],
    monthlyRoadmap: [
      {month:1,topic:"Excel & SQL Analytics"},
      {month:2,topic:"Python & Power BI"},
      {month:3,topic:"Statistics & Visualization"},
      {month:4,topic:"Capstone Project & Job Prep"}
    ],
    reviews: [],faqs: [],
    image: IMG.ai, rating: 4.8, enrolledStudents: 2000,
    seo: {
      metaTitle: "Data Analytics Course | Power BI SQL Python Training Ranchi",
      metaDescription: "Data Analytics sikhein – Excel, SQL, Power BI, Python. Business insights ke liye complete course.",
      keywords: ["data analytics course","power BI training","SQL analytics","data analyst course","analytics training Ranchi"]
    }
  }

];

// ─── Helper: Get courses by category ───────────────────────────
export const getCoursesByCategory = (category) =>
  mockCoursesData.filter(c => c.category === category);

// ─── Helper: Get course by slug ────────────────────────────────
export const getCourseBySlug = (slug) =>
  mockCoursesData.find(c => c.slug === slug);

// ─── Helper: Get featured courses (badge exists) ───────────────
export const getFeaturedCourses = () =>
  mockCoursesData.filter(c => c.badge);

// ─── Helper: Search courses ────────────────────────────────────
export const searchCourses = (query) => {
  const q = query.toLowerCase();
  return mockCoursesData.filter(c =>
    c.title.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.skills.some(s => s.toLowerCase().includes(q)) ||
    c.seo.keywords.some(k => k.includes(q))
  );
};

// ─── All unique categories ─────────────────────────────────────
export const allCategories = [...new Set(mockCoursesData.map(c => c.category))];

// ─── Course count by category ──────────────────────────────────
export const categoryCounts = allCategories.reduce((acc, cat) => {
  acc[cat] = mockCoursesData.filter(c => c.category === cat).length;
  return acc;
}, {});
