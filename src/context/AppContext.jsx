import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { fetchRealTimeMarketData } from '../services/realtimeDataService';
import { generatePersonalizedRecommendations } from '../services/recommendationEngine';
import {
  INITIAL_USER_PROFILE,
  TARGET_ROLES,
  SKILL_ROADMAPS,
  MARKET_TRENDS,
  GROWTH_CIRCLES,
  PEER_FEED_POSTS,
  PEER_LIST
} from '../data/initialData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Theme state with localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('skillpulse_theme') || 'peacock-blue';
  });

  // Auth state - DEFAULTS TO FALSE (Users MUST log in explicitly)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const authSaved = localStorage.getItem('skillpulse_auth');
    return authSaved ? JSON.parse(authSaved) : false;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState('portfolio');

  // User profile
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('skillpulse_user');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  // Target roles & selected role
  const [activeRoleId, setActiveRoleId] = useState(() => userProfile.targetRoleId || 'fullstack-ai');

  // Skill roadmaps state
  const [roadmaps, setRoadmaps] = useState(() => {
    const saved = localStorage.getItem('skillpulse_roadmaps');
    return saved ? JSON.parse(saved) : SKILL_ROADMAPS;
  });

  // Growth circles state
  const [circles, setCircles] = useState(() => {
    const saved = localStorage.getItem('skillpulse_circles');
    return saved ? JSON.parse(saved) : GROWTH_CIRCLES;
  });

  // Peer feed posts
  const [feedPosts, setFeedPosts] = useState(() => {
    const saved = localStorage.getItem('skillpulse_posts');
    return saved ? JSON.parse(saved) : PEER_FEED_POSTS;
  });

  // Toast Notifications
  const [toast, setToast] = useState(null);

  // Modals state
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  const [selectedSkillNode, setSelectedSkillNode] = useState(null);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isMatchmakerOpen, setIsMatchmakerOpen] = useState(false);

  // Real-time market data & recommendations state
  const [liveMarketData, setLiveMarketData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  // Fetch real-time market data
  const refreshLiveMarketData = async (silent = false) => {
    if (!silent) setIsSyncing(true);
    try {
      const data = await fetchRealTimeMarketData();
      setLiveMarketData(data);
      if (!silent) showToast('Live market data synced successfully!', 'success');
    } catch (err) {
      console.error('Failed to sync live market data:', err);
      if (!silent) showToast('Failed to sync market data', 'danger');
    } finally {
      if (!silent) setIsSyncing(false);
    }
  };

  // Initial fetch and auto-sync timer
  useEffect(() => {
    refreshLiveMarketData(true);
    let timer;
    if (autoSyncEnabled) {
      timer = setInterval(() => {
        refreshLiveMarketData(true);
      }, 30000); // Sync every 30 seconds
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoSyncEnabled]);

  // Compute live recommendations
  const recommendations = generatePersonalizedRecommendations(userProfile, liveMarketData, TARGET_ROLES);

  // Add a recommended skill directly to roadmap
  const addRecommendedSkillToRoadmap = (skillName, category) => {
    const roleId = activeRoleId || 'fullstack-ai';
    const roleNodes = roadmaps[roleId] || [];
    const exists = roleNodes.some(n => n.title.toLowerCase().includes(skillName.toLowerCase()));

    if (exists) {
      showToast(`"${skillName}" is already present in your active Skill Path!`, 'info');
      return;
    }

    const newNode = {
      id: `node-rec-${Date.now()}`,
      title: skillName,
      category: category || 'Market Recommendation',
      status: 'in-progress',
      level: 2,
      xp: 650,
      description: `Recommended real-time market skill added from AI insights.`,
      whyIn2026: `High market growth skill aligned with your target role.`,
      resources: [
        { name: `${skillName} Documentation & Guide`, url: 'https://github.com', type: 'Guide' }
      ],
      challenge: `Build a small proof-of-concept incorporating ${skillName}.`
    };

    setRoadmaps({
      ...roadmaps,
      [roleId]: [newNode, ...roleNodes]
    });

    showToast(`Added "${skillName}" to your active Skill Roadmap!`, 'success');
  };

  // Sync theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('skillpulse_theme', theme);
  }, [theme]);

  // Persist auth status
  useEffect(() => {
    localStorage.setItem('skillpulse_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  // Persist user profile
  useEffect(() => {
    localStorage.setItem('skillpulse_user', JSON.stringify(userProfile));
  }, [userProfile]);

  // Persist roadmaps
  useEffect(() => {
    localStorage.setItem('skillpulse_roadmaps', JSON.stringify(roadmaps));
  }, [roadmaps]);

  // Persist circles
  useEffect(() => {
    localStorage.setItem('skillpulse_circles', JSON.stringify(circles));
  }, [circles]);

  // Persist feed posts
  useEffect(() => {
    localStorage.setItem('skillpulse_posts', JSON.stringify(feedPosts));
  }, [feedPosts]);

  // Toast message launcher
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Auth Methods
  const login = (credentials) => {
    setIsAuthenticated(true);
  };

  const signup = (newUserData) => {
    const freshUser = {
      id: `usr-${Date.now()}`,
      name: newUserData.name,
      username: newUserData.username,
      avatar: newUserData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
      coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      title: newUserData.title,
      bio: newUserData.bio,
      location: "San Francisco / Remote",
      level: 1,
      xp: 250,
      nextLevelXp: 1000,
      targetRoleId: newUserData.targetRoleId,
      openForPeers: true,
      socials: {
        github: `github.com/${newUserData.username}`,
        twitter: `@${newUserData.username}`,
        website: `${newUserData.username}.dev`
      },
      skills: [
        { name: "Frontend Architecture", score: 60, category: "Frontend" },
        { name: "Backend & APIs", score: 55, category: "Backend" },
        { name: "AI/ML Integration", score: 40, category: "AI/ML" },
        { name: "System Design", score: 50, category: "Architecture" },
        { name: "Cloud & DevOps", score: 45, category: "DevOps" },
        { name: "UI/UX & Micro-interactions", score: 65, category: "Design" }
      ],
      projects: [],
      endorsements: []
    };

    setUserProfile(freshUser);
    setActiveRoleId(newUserData.targetRoleId);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('skillpulse_auth', JSON.stringify(false));
    showToast('Logged out of SkillPulse', 'info');
  };

  const switchAccount = (profileId) => {
    if (profileId === 'usr-me') {
      setUserProfile(INITIAL_USER_PROFILE);
    } else {
      const peer = PEER_LIST.find(p => p.id === profileId);
      if (peer) {
        setUserProfile({
          ...INITIAL_USER_PROFILE,
          id: peer.id,
          name: peer.name,
          username: peer.name.toLowerCase().replace(/\s+/g, '_'),
          avatar: peer.avatar,
          title: peer.title,
          level: peer.level
        });
      }
    }
    setIsAuthenticated(true);
  };

  // Complete a skill node in the roadmap
  const completeSkillNode = (roleId, nodeId) => {
    const roleNodes = roadmaps[roleId] || [];
    const targetNode = roleNodes.find(n => n.id === nodeId);
    if (!targetNode || targetNode.status === 'mastered') return;

    // Celebration confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const updatedRoleNodes = roleNodes.map(node => {
      if (node.id === nodeId) {
        return { ...node, status: 'mastered' };
      }
      return node;
    });

    setRoadmaps({
      ...roadmaps,
      [roleId]: updatedRoleNodes
    });

    const gainedXp = targetNode.xp || 500;
    const newXp = userProfile.xp + gainedXp;
    let newLevel = userProfile.level;
    if (newXp >= userProfile.nextLevelXp) {
      newLevel += 1;
      showToast(`🎉 Level Up! You reached Level ${newLevel}!`, 'success');
    }

    const updatedSkills = userProfile.skills.map(s => {
      if (s.category.toLowerCase().includes(targetNode.category.toLowerCase()) || targetNode.title.toLowerCase().includes(s.name.toLowerCase())) {
        return { ...s, score: Math.min(100, s.score + 8) };
      }
      return s;
    });

    setUserProfile({
      ...userProfile,
      xp: newXp,
      level: newLevel,
      skills: updatedSkills
    });

    showToast(`Mastered "${targetNode.title}"! +${gainedXp} XP added to your portfolio!`, 'success');

    const milestonePost = {
      id: `post-${Date.now()}`,
      authorName: userProfile.name,
      authorHandle: userProfile.username,
      authorAvatar: userProfile.avatar,
      authorTitle: userProfile.title,
      category: "Skill Milestone",
      timeAgo: "Just now",
      content: `⚡ Just completed the skill node **${targetNode.title}** in the **${TARGET_ROLES.find(r => r.id === roleId)?.title || 'Skill Path'}** roadmap! Gained +${gainedXp} XP!`,
      tags: ["Skill Milestone", targetNode.category],
      claps: 1,
      hasClapped: true,
      comments: []
    };

    setFeedPosts([milestonePost, ...feedPosts]);
  };

  // Add a project to portfolio
  const addProject = (projectData) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      claps: 0,
      hasClapped: false,
      peerReviewsCount: 0,
      createdAt: 'Just now',
      image: projectData.image || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80",
      ...projectData
    };

    setUserProfile({
      ...userProfile,
      projects: [newProj, ...userProfile.projects]
    });

    const projPost = {
      id: `post-${Date.now()}`,
      authorName: userProfile.name,
      authorHandle: userProfile.username,
      authorAvatar: userProfile.avatar,
      authorTitle: userProfile.title,
      category: "Project Showcase",
      timeAgo: "Just now",
      content: `🚀 Showcasing new project on my portfolio: **${newProj.title}** - ${newProj.tagline}`,
      tags: ["Project Showcase", ...(newProj.tags || [])],
      link: { title: `${newProj.title} Demo`, url: newProj.demoUrl },
      claps: 1,
      hasClapped: true,
      comments: []
    };

    setFeedPosts([projPost, ...feedPosts]);
    showToast('Project published to your portfolio showcase & peer feed!', 'success');
  };

  // Clap a project - STRICTLY 1 KUDOS PER USER ENFORCED
  const clapProject = (projectId) => {
    const updatedProjects = userProfile.projects.map(p => {
      if (p.id === projectId) {
        const nextHasClapped = !p.hasClapped;
        const newClaps = nextHasClapped ? p.claps + 1 : Math.max(0, p.claps - 1);
        showToast(nextHasClapped ? 'Sent +1 Peer Kudo!' : 'Removed Peer Kudo', 'info');
        return { 
          ...p, 
          hasClapped: nextHasClapped,
          claps: newClaps 
        };
      }
      return p;
    });

    setUserProfile({ ...userProfile, projects: updatedProjects });

    // Also update selectedProject if currently viewing modal
    if (selectedProject && selectedProject.id === projectId) {
      const nextHasClapped = !selectedProject.hasClapped;
      setSelectedProject({
        ...selectedProject,
        hasClapped: nextHasClapped,
        claps: nextHasClapped ? selectedProject.claps + 1 : Math.max(0, selectedProject.claps - 1)
      });
    }
  };

  // Toggle join circle
  const toggleJoinCircle = (circleId) => {
    setCircles(circles.map(c => {
      if (c.id === circleId) {
        const nextJoined = !c.isJoined;
        showToast(nextJoined ? `Joined "${c.name}" circle!` : `Left "${c.name}" circle`, 'info');
        return {
          ...c,
          isJoined: nextJoined,
          membersCount: nextJoined ? c.membersCount + 1 : c.membersCount - 1
        };
      }
      return c;
    }));
  };

  // Clap feed post - STRICTLY 1 KUDOS PER USER ENFORCED
  const clapPost = (postId) => {
    setFeedPosts(feedPosts.map(post => {
      if (post.id === postId) {
        const hasClapped = !post.hasClapped;
        showToast(hasClapped ? 'Sent +1 Peer Kudo!' : 'Removed Peer Kudo', 'info');
        return {
          ...post,
          hasClapped,
          claps: hasClapped ? post.claps + 1 : Math.max(0, post.claps - 1)
        };
      }
      return post;
    }));
  };

  // Add comment to feed post
  const addComment = (postId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: userProfile.name,
      avatar: userProfile.avatar,
      text: text.trim(),
      timeAgo: 'Just now'
    };

    setFeedPosts(feedPosts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    }));

    showToast('Comment posted!', 'success');
  };

  // Create new post
  const createFeedPost = (postData) => {
    const newPost = {
      id: `post-${Date.now()}`,
      authorName: userProfile.name,
      authorHandle: userProfile.username,
      authorAvatar: userProfile.avatar,
      authorTitle: userProfile.title,
      timeAgo: "Just now",
      claps: 0,
      hasClapped: false,
      comments: [],
      ...postData
    };

    setFeedPosts([newPost, ...feedPosts]);
    showToast('Post shared with peer network!', 'success');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isAuthenticated,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        signup,
        logout,
        switchAccount,
        activeTab,
        setActiveTab,
        userProfile,
        setUserProfile,
        targetRoles: TARGET_ROLES,
        activeRoleId,
        setActiveRoleId,
        roadmaps,
        completeSkillNode,
        marketTrends: MARKET_TRENDS,
        circles,
        toggleJoinCircle,
        feedPosts,
        createFeedPost,
        clapPost,
        addComment,
        addProject,
        clapProject,
        peers: PEER_LIST,
        toast,
        showToast,
        selectedProject,
        setSelectedProject,
        isAddProjectOpen,
        setIsAddProjectOpen,
        selectedSkillNode,
        setSelectedSkillNode,
        isEditProfileOpen,
        setIsEditProfileOpen,
        isMatchmakerOpen,
        setIsMatchmakerOpen,
        liveMarketData,
        isSyncing,
        autoSyncEnabled,
        setAutoSyncEnabled,
        refreshLiveMarketData,
        recommendations,
        addRecommendedSkillToRoadmap
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
