// Initial seed data for SkillPulse

export const INITIAL_USER_PROFILE = {
  id: "usr-me",
  name: "Alex Rivera",
  username: "alex_rivera",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  title: "Full-Stack AI Builder & Systems Explorer",
  bio: "Passionate about combining Generative AI with high-performance Web apps. Currently mastering Vector Databases, Next.js 15, and WebAssembly to build intelligent peer tools.",
  location: "San Francisco, CA / Remote",
  level: 14,
  xp: 8450,
  nextLevelXp: 10000,
  targetRoleId: "fullstack-ai",
  openForPeers: true,
  socials: {
    github: "github.com/alexrivera",
    twitter: "@alex_builds",
    website: "alexrivera.dev"
  },
  skills: [
    { name: "Frontend Architecture", score: 88, category: "Frontend" },
    { name: "Backend & APIs", score: 76, category: "Backend" },
    { name: "AI/ML Integration", score: 82, category: "AI/ML" },
    { name: "System Design", score: 70, category: "Architecture" },
    { name: "Cloud & DevOps", score: 64, category: "DevOps" },
    { name: "UI/UX & Micro-interactions", score: 90, category: "Design" }
  ],
  projects: [
    {
      id: "proj-1",
      title: "NeuroMind AI - Real-time Peer Knowledge Graph",
      tagline: "An interactive visual engine connecting peer notes into collaborative LLM knowledge maps.",
      description: "Built with React, WebAssembly, and local vector embeddings. Enables peers to map out complex concepts collaboratively with zero server latency.",
      demoUrl: "https://example.com/neuromind",
      repoUrl: "https://github.com/alexrivera/neuromind",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      tags: ["React", "WebAssembly", "Vector DB", "TailwindCSS"],
      claps: 142,
      peerReviewsCount: 18,
      createdAt: "2 days ago"
    },
    {
      id: "proj-2",
      title: "PulseFlow - High-Speed WebSocket Canvas",
      tagline: "Collaborative canvas for designing system architecture diagrams live with peers.",
      description: "Implemented custom SVG canvas rendering engine supporting 1,000+ real-time concurrent diagram nodes with CRDT conflict resolution.",
      demoUrl: "https://example.com/pulseflow",
      repoUrl: "https://github.com/alexrivera/pulseflow",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      tags: ["TypeScript", "WebSockets", "Canvas API", "CRDT"],
      claps: 98,
      peerReviewsCount: 12,
      createdAt: "2 weeks ago"
    }
  ],
  endorsements: [
    {
      id: "end-1",
      authorName: "Maya Lin",
      authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
      authorTitle: "Cloud Architect @ TechScale",
      skill: "Frontend Architecture",
      text: "Alex's work on SVG canvas performance is world-class. He taught our study circle advanced memoization techniques."
    },
    {
      id: "end-2",
      authorName: "Liam Vance",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      authorTitle: "AI Researcher & Peer Lead",
      skill: "AI/ML Integration",
      text: "Pair built an LLM vector pipeline with Alex. Great problem solver with deep empathy for user UX."
    }
  ]
};

export const TARGET_ROLES = [
  {
    id: "fullstack-ai",
    title: "Full-Stack AI Engineer",
    description: "Build end-to-end intelligent web applications powered by modern LLMs, vector search, and reactive interfaces.",
    matchPercent: 84,
    marketSalaryTrend: "$140k - $190k",
    growthVelocity: "+42% demand in 2026",
    requiredSkillsCount: 8,
    masteredSkillsCount: 5,
    keyFocus: ["Vector DBs", "RAG Pipelines", "Next.js Server Actions", "TypeScript", "LangChain/LlamaIndex"]
  },
  {
    id: "cloud-architect",
    title: "Cloud Systems & DevOps Architect",
    description: "Design resilient distributed infrastructure, Kubernetes clusters, zero-trust security, and CI/CD automation.",
    matchPercent: 62,
    marketSalaryTrend: "$150k - $210k",
    growthVelocity: "+28% demand in 2026",
    requiredSkillsCount: 9,
    masteredSkillsCount: 3,
    keyFocus: ["Kubernetes", "Terraform", "Rust Infrastructure", "AWS/GCP Architecture", "eBPF Monitoring"]
  },
  {
    id: "frontend-ux",
    title: "UI/UX & Systems Frontend Specialist",
    description: "Master modern web performance, design tokens, web GL/canvas animation, and reactive state management.",
    matchPercent: 92,
    marketSalaryTrend: "$130k - $175k",
    growthVelocity: "+35% demand in 2026",
    requiredSkillsCount: 7,
    masteredSkillsCount: 6,
    keyFocus: ["Design Systems", "WebGPU/Canvas", "Micro-frontends", "A11y Accessibility", "Framer Motion"]
  }
];

export const SKILL_ROADMAPS = {
  "fullstack-ai": [
    {
      id: "node-1",
      title: "Modern React & Server Components",
      category: "Frontend Core",
      status: "mastered", // mastered, in-progress, next, locked
      level: 1,
      xp: 400,
      description: "Master React 19 Server Components, streaming SSR, and optimistic UI mutations.",
      whyIn2026: "Standard foundation for high-performance AI web applications.",
      resources: [
        { name: "React 19 Official Deep Dive", url: "https://react.dev", type: "Docs" },
        { name: "Server Actions & Streaming Patterns", url: "https://nextjs.org/docs", type: "Guide" }
      ],
      challenge: "Build a multi-step form with zero client JS overhead using Server Actions.",
      circleRecommendation: "Frontend & Next.js Guild"
    },
    {
      id: "node-2",
      title: "Vector Embeddings & Semantic Search",
      category: "AI Infrastructure",
      status: "mastered",
      level: 1,
      xp: 600,
      description: "Understand high-dimensional vector spaces, cosine similarity, Pinecone/pgvector, and hybrid search.",
      whyIn2026: "Essential for contextual retrieval and modern RAG application intelligence.",
      resources: [
        { name: "Vector Search Math & Practice", url: "https://pinecone.io/learn", type: "Interactive" },
        { name: "PGVector with PostgreSQL Cookbook", url: "https://github.com/pgvector/pgvector", type: "Code Repo" }
      ],
      challenge: "Implement a hybrid full-text + vector search API endpoint for markdown documents.",
      circleRecommendation: "Generative AI Crafters"
    },
    {
      id: "node-3",
      title: "RAG Pipelines & Agent Tool Calling",
      category: "AI Logic",
      status: "in-progress",
      level: 2,
      xp: 750,
      description: "Design autonomous AI agents capable of tool calls, structured outputs, and memory persistence.",
      whyIn2026: "Enables interactive tools that go far beyond standard static chat boxes.",
      resources: [
        { name: "Building AI Agents with LangChain", url: "https://python.langchain.com", type: "Course" },
        { name: "Vercel AI SDK 4.0 Walkthrough", url: "https://sdk.vercel.ai", type: "Tutorial" }
      ],
      challenge: "Build a coding assistant agent that can read git diffs and draft pull request summaries.",
      circleRecommendation: "Generative AI Crafters"
    },
    {
      id: "node-4",
      title: "WebAssembly & Client-side Model Execution",
      category: "Performance",
      status: "next",
      level: 2,
      xp: 800,
      description: "Run small LLMs and vector models directly inside the browser using ONNX Web & Wasm.",
      whyIn2026: "Zero server cost AI features with 100% user privacy.",
      resources: [
        { name: "Transformers.js Web Execution", url: "https://huggingface.co/docs/transformers.js", type: "Docs" },
        { name: "Rust to Wasm Compilation Guide", url: "https://rustwasm.github.io", type: "Guide" }
      ],
      challenge: "Compile a sentiment analysis model to Wasm and run inferences in under 10ms locally.",
      circleRecommendation: "System Architecture & Rust Circle"
    },
    {
      id: "node-5",
      title: "Distributed Rate Limiting & Queue Workers",
      category: "Backend Scale",
      status: "locked",
      level: 3,
      xp: 900,
      description: "Manage token usage limits, Redis sliding windows, and asynchronous background jobs for AI pipelines.",
      whyIn2026: "Prevents runaway API costs and ensures zero drop in web responsiveness under heavy load.",
      resources: [
        { name: "Upstash Redis Rate Limiting Patterns", url: "https://upstash.com", type: "Article" }
      ],
      challenge: "Construct a sliding window token bucket rate limiter with automatic exponential backoff.",
      circleRecommendation: "System Architecture & Rust Circle"
    }
  ]
};

export const MARKET_TRENDS = [
  {
    id: "tr-1",
    skill: "Vector Databases & RAG",
    category: "AI/ML",
    demandGrowth: "+58%",
    status: "Hot Market Skill",
    description: "Companies building internal AI tools need engineers proficient in vector indexing and hybrid search.",
    topRoles: ["AI Engineer", "Full-Stack Developer", "Data Architect"],
    trendScore: 96
  },
  {
    id: "tr-2",
    skill: "Rust & WebAssembly Systems",
    category: "Systems & Web",
    demandGrowth: "+41%",
    status: "Rising Rapidly",
    description: "High performance web tools are migrating computational bottlenecks from JS to Rust Wasm modules.",
    topRoles: ["Systems Developer", "Web Architect", "Security Engineer"],
    trendScore: 89
  },
  {
    id: "tr-3",
    skill: "Next.js 15 & React Server Components",
    category: "Frontend",
    demandGrowth: "+34%",
    status: "Industry Standard",
    description: "Dominant web stack for production scale applications with server-side streaming.",
    topRoles: ["Frontend Engineer", "Full-Stack Dev"],
    trendScore: 92
  },
  {
    id: "tr-4",
    skill: "eBPF & Cloud Native Observability",
    category: "DevOps",
    demandGrowth: "+27%",
    status: "High Value Specialty",
    description: "Deep kernel-level telemetry and security monitoring without intrusive agent injection.",
    topRoles: ["DevOps Engineer", "Site Reliability Engineer"],
    trendScore: 81
  }
];

export const GROWTH_CIRCLES = [
  {
    id: "circle-1",
    name: "Generative AI & Agent Crafters",
    tagline: "Exploring autonomous agents, local LLMs, and vector architecture together.",
    membersCount: 428,
    activeSprint: "Sprint #14: Build a Local Browser-Based RAG App",
    tags: ["LLMs", "Vector Search", "Python", "Wasm"],
    icon: "BrainCircuit",
    isJoined: true,
    weeklyChallenge: "Implement function-calling using JSON Schema validation in your app.",
    discussions: [
      {
        id: "disc-1",
        author: "Maya Lin",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
        title: "Benchmark results: ONNX Web vs WebGPU for local embeddings",
        repliesCount: 14,
        time: "3 hours ago"
      },
      {
        id: "disc-2",
        author: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        title: "Sharing my starter code for hybrid BM25 + Vector ranking algorithm",
        repliesCount: 9,
        time: "1 day ago"
      }
    ]
  },
  {
    id: "circle-2",
    name: "System Architecture & Rust Circle",
    tagline: "Mastering memory safety, concurrency patterns, and microservice optimization.",
    membersCount: 312,
    activeSprint: "Sprint #9: Zero-Copy Async I/O Web Server in Rust",
    tags: ["Rust", "Systems", "Tokio", "Performance"],
    icon: "Cpu",
    isJoined: false,
    weeklyChallenge: "Refactor a synchronous file reader into a multi-threaded async worker queue.",
    discussions: [
      {
        id: "disc-3",
        author: "Devon Cole",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
        title: "Understanding Tokio task cancellation safety rules",
        repliesCount: 22,
        time: "5 hours ago"
      }
    ]
  },
  {
    id: "circle-3",
    name: "UI Micro-Interactions & Motion Lab",
    tagline: "Building fluid UI animations, glassmorphism design systems, and Canvas visualizers.",
    membersCount: 560,
    activeSprint: "Sprint #21: Interactive Data Visualizer with Canvas API",
    tags: ["CSS Motion", "Framer Motion", "Canvas", "Design Tokens"],
    icon: "Sparkles",
    isJoined: true,
    weeklyChallenge: "Create a 60fps particle background that responds to mouse hover velocity.",
    discussions: [
      {
        id: "disc-4",
        author: "Liam Vance",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        title: "Why cubic-bezier easing curves make your UI feel 10x more reactive",
        repliesCount: 19,
        time: "6 hours ago"
      }
    ]
  }
];

export const PEER_FEED_POSTS = [
  {
    id: "post-1",
    authorName: "Maya Lin",
    authorHandle: "mayalin_cloud",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    authorTitle: "Cloud Architect",
    category: "Project Showcase",
    timeAgo: "2 hours ago",
    content: "🚀 Just published my peer project: **KubePulse** - an open-source visual dashboard for monitoring microservice health using eBPF telemetry! Looking for peer feedback on the topology graph view.",
    tags: ["Kubernetes", "eBPF", "React", "Go"],
    link: { title: "KubePulse GitHub Repo", url: "https://github.com/mayalin/kubepulse" },
    claps: 34,
    hasClapped: false,
    comments: [
      {
        id: "c-1",
        author: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        text: "The topology render speed is amazing! How are you handling node re-layout when microservices scale up?",
        timeAgo: "1 hour ago"
      }
    ]
  },
  {
    id: "post-2",
    authorName: "Devon Cole",
    authorHandle: "devon_rust",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    authorTitle: "Systems & Rust Developer",
    category: "Skill Milestone",
    timeAgo: "5 hours ago",
    content: "Leveling up in the **Full-Stack AI Path**! Just passed the 'Vector Search Math & Hybrid Ranking' node. Check out my benchmark notebook comparing HNSW vs IVF indexing.",
    tags: ["Skill Milestone", "Vector Search", "Rust"],
    claps: 52,
    hasClapped: true,
    comments: []
  },
  {
    id: "post-3",
    authorName: "Sophia Tanaka",
    authorHandle: "sophia_ui",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
    authorTitle: "UX Engineer",
    category: "Peer Match Request",
    timeAgo: "1 day ago",
    content: "💡 **Peer Collaboration Wanted**: Building an open-source accessibility contrast analyzer for Figma tokens. I have the UI/UX designed and need a Frontend/Wasm peer to help optimize the color matrix calculations!",
    tags: ["Pair Learning", "UI/UX", "Wasm"],
    claps: 29,
    hasClapped: false,
    comments: []
  }
];

export const PEER_LIST = [
  {
    id: "peer-1",
    name: "Maya Lin",
    title: "Cloud Architect & Infrastructure Dev",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
    level: 16,
    strongSkills: ["Kubernetes", "Rust", "System Architecture", "eBPF"],
    seekingSkills: ["AI Integration", "React Server Components"],
    compatibility: "94% Match for Pair Building"
  },
  {
    id: "peer-2",
    name: "Liam Vance",
    title: "AI Researcher & ML Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
    level: 15,
    strongSkills: ["PyTorch", "RAG Pipelines", "Vector Search"],
    seekingSkills: ["System Design", "UI/UX Micro-interactions"],
    compatibility: "91% Match for Pair Building"
  },
  {
    id: "peer-3",
    name: "Devon Cole",
    title: "Rust Systems Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
    level: 13,
    strongSkills: ["Rust", "WebAssembly", "Async I/O"],
    seekingSkills: ["Frontend UI", "Vector Databases"],
    compatibility: "88% Match for Pair Building"
  }
];
