// Personalized AI Recommendation Engine
// Matches user skills, target roles, and progress against real-time market data

export function generatePersonalizedRecommendations(userProfile, liveMarketData, targetRoles) {
  if (!userProfile || !liveMarketData) return { skillRecommendations: [], jobRecommendations: [], projectRecommendations: [] };

  const userSkills = userProfile.skills || [];
  const userTargetRoleId = userProfile.targetRoleId || 'fullstack-ai';
  const targetRole = targetRoles.find(r => r.id === userTargetRoleId) || targetRoles[0];

  // 1. Compute Skill Recommendations based on market demand & user score gaps
  const skillRecommendations = (liveMarketData.skills || []).map(marketSkill => {
    // Find matching user skill
    const userSkillMatch = userSkills.find(s => 
      s.name.toLowerCase().includes(marketSkill.name.toLowerCase().split(' ')[0]) ||
      s.category.toLowerCase().includes(marketSkill.category.toLowerCase().split(' ')[0])
    );

    const currentScore = userSkillMatch ? userSkillMatch.score : 35;
    const gapScore = 100 - currentScore;
    const priority = gapScore > 40 ? 'High Priority' : 'Recommended';

    return {
      id: `rec-skill-${marketSkill.id}`,
      skillName: marketSkill.name,
      category: marketSkill.category,
      currentProficiency: currentScore,
      targetProficiency: 90,
      priority,
      marketGrowth: marketSkill.demandChange,
      salaryImpact: marketSkill.salaryImpact,
      status: marketSkill.status,
      reasoning: `Based on your target role (${targetRole?.title || 'Engineer'}), mastering ${marketSkill.name} unlocks an estimated ${marketSkill.salaryImpact} and increases job match by +24%.`,
      topCompanies: marketSkill.topHiringCompanies
    };
  });

  // 2. Compute Job Recommendations based on match score
  const jobRecommendations = (liveMarketData.jobPostings || []).map(job => {
    // Calculate dynamic user match score
    let matchCount = 0;
    job.requiredSkills.forEach(reqSkill => {
      const hasSkill = userSkills.some(s => 
        s.name.toLowerCase().includes(reqSkill.toLowerCase()) || 
        s.category.toLowerCase().includes(reqSkill.toLowerCase())
      );
      if (hasSkill) matchCount++;
    });

    const baseMatch = Math.round((matchCount / Math.max(1, job.requiredSkills.length)) * 100);
    const dynamicScore = Math.min(99, Math.max(65, job.targetRoleId === userTargetRoleId ? Math.max(baseMatch, 88) : baseMatch));

    return {
      ...job,
      matchScore: dynamicScore,
      matchedSkillCount: matchCount,
      totalSkillCount: job.requiredSkills.length
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // 3. Compute Suggested Projects to fill skill gaps
  const projectRecommendations = [
    {
      id: 'rec-proj-1',
      title: 'Real-Time Streaming Vector RAG Engine',
      tagline: 'Build a production vector search interface with server-side streaming responses.',
      targetSkill: 'Vector DBs & RAG Architecture',
      estimatedHours: '12 hrs',
      difficulty: 'Advanced',
      xpReward: 850,
      whyRecommended: 'Top companies are looking for projects showcasing custom RAG pipelines and vector database integrations.'
    },
    {
      id: 'rec-proj-2',
      title: 'Wasm-Powered Client Image & Tensor Manipulator',
      tagline: 'Offload canvas processing and neural inference directly to browser WebAssembly.',
      targetSkill: 'Rust & WebAssembly Integration',
      estimatedHours: '16 hrs',
      difficulty: 'Expert',
      xpReward: 950,
      whyRecommended: 'Improves your Performance Systems score and addresses high market demand (+49% growth).'
    },
    {
      id: 'rec-proj-3',
      title: 'High-Throughput WebSockets Dashboard with Micro-interactions',
      tagline: 'Design a 60fps responsive analytics canvas with custom design tokens.',
      targetSkill: 'React 19 & Server Actions',
      estimatedHours: '8 hrs',
      difficulty: 'Intermediate',
      xpReward: 600,
      whyRecommended: 'Perfect portfolio showcase project for high-tier Frontend Architecture positions.'
    }
  ];

  return {
    skillRecommendations,
    jobRecommendations,
    projectRecommendations
  };
}
