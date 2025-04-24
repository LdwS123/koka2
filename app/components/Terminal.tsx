'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface Command {
  input: string;
  output: string | React.ReactNode;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  content: string;
  category: string;
  isPrivate: boolean;
}

interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
}

interface TypewriterState {
  text: string;
  isComplete: boolean;
}

// Déplacer le hook en dehors du composant Terminal
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let i = 0;
    setIsComplete(false);
    setDisplayText('');
    
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev: string) => prev + text.charAt(i));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);
  
  return { displayText, isComplete };
};

// Composant pour afficher la réponse avec l'effet machine à écrire
const TypewriterResponse = ({ text }: { text: string }) => {
  const { displayText, isComplete } = useTypewriter(text);
  
  return (
    <div className="text-[#e4e4e4] font-mono leading-relaxed whitespace-pre-wrap">
      {displayText}
      {!isComplete && (
        <span className="inline-block w-2 h-4 bg-[#2ecc71] animate-pulse ml-1">▊</span>
      )}
    </div>
  );
};

const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const projects = [
    {
      name: 'PredicTagAI',
      description: 'AI-driven dynamic pricing tool for US retailers',
      results: 'Boosted client sales by 10–12%',
      role: 'Go-to-market strategy, partnerships, VC pitching',
    },
    {
      name: 'Hivenet',
      description: 'Tokenized infrastructure designed to scale to 100M users',
      role: 'Defined GTM strategy, incentive model, and growth architecture',
    },
    {
      name: 'Stancer',
      description: 'Next-gen payment infrastructure provider',
      results: '+15% growth, 8+ B2B clients acquired',
      role: 'Fintech Sales Intern: Sales pipeline automation, predictive analytics',
    },
    {
      name: 'Finka',
      description: 'Peer-to-Peer Lending App',
      results: 'MVP tested by 100+ users',
      role: 'Founder & Project Lead: Microfinance solutions for students',
    },
  ];

  const interviewQuestions: InterviewQuestion[] = [
    {
      id: "1",
      question: "Why are you passionate about fintech and blockchain?",
      answer: `Fintech and blockchain are more than buzzwords to me — they represent freedom, access, and the future of global empowerment. I came to France as a political refugee at age 11, and I saw first-hand how access to financial tools can change someone's life trajectory. That's why I'm obsessed with building infrastructure that's not only efficient but inclusive.

Fintech gives us a chance to rewire broken systems, and blockchain adds the transparency and accountability those systems often lack. I'm especially fascinated by how we can use these technologies to reimagine credit scoring, make cross-border payments seamless, or create decentralized ecosystems that reward users fairly — like what I've worked on with HiveNet.

What drives me is the idea that I can contribute to building financial systems that work for everyone — not just those born into the right zip code. And the best part? This space evolves so fast that there's always a new challenge, a new opportunity to learn and push the limits of what's possible.`
    },
    {
      id: "2",
      question: "How do you approach complex problem-solving?",
      answer: `I approach complex problems like puzzles — the messier they look at first, the more excited I get. My method always starts with clarity: I break the problem down into its simplest components and map out all the dependencies, data, or human behaviors involved. From there, I challenge assumptions and run quick experiments to test ideas early.

For example, when building an AI assistant to automate job applications, I first defined the full user journey, identified where people were wasting time, and then used no-code tools and OpenAI APIs to automate those points. The key is rapid prototyping — I don't wait for perfect solutions. I validate hypotheses fast and iterate based on real feedback.

But beyond the technical side, I never tackle problems in isolation. I believe in cross-functional brainstorming. Whether it's UX, data, or business strategy, I always try to bring diverse perspectives into the process.

To me, complex problem-solving is about being both a strategist and a builder — someone who sees the full picture and gets their hands dirty in the details.`
    },
    {
      id: "3",
      question: "What's your vision for the future of banking?",
      answer: `I believe the future of banking will be invisible, intelligent, and deeply integrated into our daily lives. Traditional banks are losing relevance because they're too slow to adapt, while neobanks are showing what's possible when you combine great design, automation, and personalized services.

My vision is one where your financial tools don't just react to you — they anticipate your needs. Imagine an AI that understands your spending habits and proactively offers smarter budgeting, real-time alerts, or even auto-investment opportunities based on your goals. Or a blockchain-powered credit system that evaluates you based on behavior and community validation, not just outdated credit scores.

I also see embedded finance playing a big role — banking becoming a layer in every app, whether it's for ride-sharing, education, or e-commerce.

Finally, I think ethics and transparency will define the next decade of finance. People want control and clarity, and that's where blockchain and open banking APIs can offer a huge competitive edge.

Banking won't be a place you go — it'll be something that happens seamlessly around you. I want to be one of the people who helps build that reality.`
    },
    {
      id: "4",
      question: "How do you stay updated with industry trends?",
      answer: `Staying ahead in fintech and AI means never getting too comfortable. I have a daily habit of reading industry newsletters like Fintech Today, The Generalist, and CB Insights to catch up on new deals, product launches, and M&A moves. I also follow thought leaders on X (formerly Twitter), from fintech founders to engineers working on cutting-edge blockchain protocols.

But beyond passive reading, I stay updated by building and engaging. I test new APIs the day they launch. I try out neobank apps from different countries. I reverse-engineer what makes some products intuitive or addictive. I also use platforms like Product Hunt and Indie Hackers to see what builders are experimenting with.

One thing I really believe in is learning in public. I often post insights, questions, or product breakdowns on LinkedIn — not just to share, but to spark discussions that expand my own thinking.

And whenever I get the chance, I talk to people — whether it's engineers, product managers, or founders. Trends are cool, but conversations give you context. That's what helps me stay sharp and move faster than the news cycle.`
    }
  ];

  const CommandLink = ({ command, children }: { command: string; children: React.ReactNode }) => (
    <div
      onClick={() => handleCommand(command)}
      className="cursor-pointer hover:underline hover:text-[#00ffff] transition-colors block"
    >
      {children}
    </div>
  );

  const AvailableCommands = () => (
    <div className="space-y-2">
      <CommandLink command="projects">📁 projects  → Explore my projects (PredicTagAI, Hivenet, etc.)</CommandLink>
      <CommandLink command="about">👤 about    → Learn more about me</CommandLink>
      <CommandLink command="resume">📄 resume   → View my full resume</CommandLink>
      <CommandLink command="video">🎥 video    → Watch my introduction video</CommandLink>
      <CommandLink command="blog">📝 blog     → Read my blog posts</CommandLink>
      <CommandLink command="contact">📬 contact  → Get in touch</CommandLink>
      <CommandLink command="help">❓ help     → Show help menu</CommandLink>
      <CommandLink command="clear">🧹 clear    → Clear screen</CommandLink>
    </div>
  );

  const WelcomeMessage = () => (
    <div className="space-y-4">
      <p>🌟 Welcome to Konstantine Gugunava&apos;s Terminal Portfolio! 🌟</p>
      <p>I&apos;m a Business & Tech Generalist passionate about fintech, AI, and blockchain.</p>
      <p>Available commands:</p>
      <div className="ml-4">
        <CommandLink command="projects">📁 projects  → Explore my projects (PredicTagAI, Hivenet, etc.)</CommandLink>
        <CommandLink command="about">👤 about    → Learn more about me</CommandLink>
        <CommandLink command="resume">📄 resume   → View my full resume</CommandLink>
        <CommandLink command="interview">🎤 interview → Ask me a question</CommandLink>
        <CommandLink command="video">🎥 video    → Watch my introduction video</CommandLink>
        <CommandLink command="blog">📝 blog     → Read my blog posts</CommandLink>
        <CommandLink command="contact">📬 contact  → Get in touch</CommandLink>
        <CommandLink command="help">❓ help     → Show help menu</CommandLink>
        <CommandLink command="clear">🧹 clear    → Clear screen</CommandLink>
      </div>
      <p className="text-[#666666]">Click any command above or type it</p>
    </div>
  );

  useEffect(() => {
    setHistory([{ input: 'welcome', output: <WelcomeMessage /> }]);
  }, []);

  const handleCommand = async (command: string) => {
    setIsLoading(true);
    let output: string | React.ReactNode = '';

    switch (command.toLowerCase()) {
      case 'video':
        output = (
          <div className="space-y-4">
            <div className="border-b border-[#64ffda] pb-4">
              <p className="text-[#64ffda] text-xl">🎥 My Introduction Video</p>
              <div className="mt-4 bg-[#1f2937] p-4 rounded-lg">
                <div className="aspect-w-16 aspect-h-9 bg-[#0d1117] rounded-lg flex items-center justify-center">
                  <p className="text-center text-[#8b949e]">
                    Video coming soon...
                    <br />
                    <span className="text-sm">A 1-minute presentation about me will be added here.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
        break;

      case 'help':
        output = (
          <div className="space-y-4">
            <p className="text-[#00ffff]">🔍 AVAILABLE COMMANDS GUIDE 🔍</p>
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
        break;

      case 'projects':
        output = (
          <div className="space-y-4">
            <p className="text-[#00ffff]">🚀 Featured Projects 🚀</p>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="border border-[#00ffff] p-4 rounded-lg"
              >
                <h3 className="text-[#00ffff] font-bold">{project.name}</h3>
                <p className="text-[#00ff00]">{project.description}</p>
                <p className="text-[#666666]">{project.results}</p>
                <p className="text-[#666666]">{project.role}</p>
              </motion.div>
            ))}
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
        break;

      case 'about':
        output = (
          <div className="space-y-4">
            <div>
              <p>👋 ABOUT ME 👋</p>
              <p>I&apos;m Konstantine — a Business & Tech Generalist with a global mindset.</p>
              <p>🎯 Mission: Scale impactful tech at the intersection of fintech, innovation, and automation.</p>
              <p>💼 Professional Summary:</p>
              <ul className="ml-4">
                <li>• Multidisciplinary business profile with international experience</li>
                <li>• Skilled in sales, strategy, and technology-driven growth</li>
                <li>• Experience in launching MVPs, closing deals, and automating sales funnels</li>
                <li>• Worked with clients from startups to institutions</li>
              </ul>
              <p>🌐 Languages:</p>
              <ul className="ml-4">
                <li>   🇬🇪 Georgian (Native)</li>
                <li>   🇫🇷 French (Native)</li>
                <li>   🇺🇸 English (Fluent)</li>
                <li>   🇷🇺 Russian (Conversational)</li>
                <li>   🇪🇸 Spanish (Basic)</li>
              </ul>
              <p>📍 Location: Paris & Bay Area</p>
              <p>✅ J-1 Visa Sponsored – Ready for US internships or startup roles</p>
            </div>
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
        break;

      case 'resume':
        output = (
          <div className="space-y-4">
            <div className="whitespace-pre-wrap">
              {`📄 KONSTANTINE GUGUNAVA - RESUME 📄

👤 CONTACT INFORMATION
• Email: kgugunava2001@berkeley.edu
• US: +1 (510) 779-2020
• France: +33 7 78 12 43 05
• LinkedIn: linkedin.com/in/konstantinegugunava

🎓 EDUCATION
University of California, Berkeley (2024-2025)
• Start-up Semester at SCET & MSc Entrepreneurship
• Key coursework: Technology Entrepreneurship, Challenge Lab, Growth Marketing
• Developed PredicTagAI, pitched to Silicon Valley VCs

SKEMA Business School (2023-2025)
• Master in Management & MSc Entrepreneurship
• Dual-degree with UC Berkeley
• Key coursework: Corporate Finance, Strategy, Venture Capital, AI Applications

Université Paris 1 Panthéon-Sorbonne
• Bachelor&apos;s Degree in Economics
• Research focus: Neobank Business Models and Fintech Profitability Analysis

💼 PROFESSIONAL EXPERIENCE

Hivenet (2025-Present) - Strategic Consultant
• Defined go-to-market strategy for tokenized cloud service
• Designed pricing and contribution model to scale to 100M users
• Aligned user incentives to drive exponential growth

Stancer (2022-2023) - Fintech Sales & Business Development Intern
• Expanded regional client portfolio by 15%, acquiring 8+ high-value accounts
• Collaborated with VP of Sales to refine B2B fintech payment solutions
• Designed data-driven sales pipeline automation, increasing conversion rates by 10%

PKF Kaizen (2021) - Audit Assistant
• Conducted financial audits and created reports for SMEs
• Managed financial documentation for 40+ clients
• Ensured compliance with IFRS, GAAP, and audit protocols

🚀 ENTREPRENEURIAL EXPERIENCE

PredicTagAI (2024-2025)
• Led go-to-market and commercial strategy for AI pricing tool
• Improved sales by 10-12% for U.S. retail clients
• Initiated and closed partnership with Pricer&apos;s VP of Sales

Finka (2019-2020)
• Developed MVP for peer-to-peer lending app
• Validated by 100+ beta users
• Offered microfinance solutions for students

🛠 SKILLS & EXPERTISE

Sales & Growth:
• B2B Outreach, CRM Automation, Predictive Lead Scoring
• Product-Market Fit, Cold Emailing, Copywriting
• Sales Pipeline Optimization, Client Acquisition

Tech & Data:
• Python (Pandas, NumPy), R, Ethereum, APIs
• AI in Fintech, Data Analysis, Financial Modeling
• Risk Assessment, Predictive Analytics

Blockchain & DeFi:
• Ethereum Smart Contracts, Solidity
• Bitcoin Protocols, DeFi Applications
• Token Economics, Smart Contract Development

Tools & Platforms:
• Salesforce, Google Analytics, Bloomberg Terminal
• Zapier, Make, Orange, AWS
• Financial Analysis Tools, CRM Systems

📚 CERTIFICATIONS
• Bloomberg Market Concepts
• Fintech Foundations (Wharton)
• Software in Finance (Stanford)

🌐 LANGUAGES
• Georgian (Native)
• French (Native)
• English (Fluent)
• Russian (Conversational)
• Spanish (Basic)`}
            </div>
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[#00ffff]">📬 CONTACT ME 📬</p>
              <p>📧 Email: kgugunava2001@berkeley.edu</p>
              <p>📞 US: +1 (510) 779-2020</p>
              <p>📞 France: +33 7 78 12 43 05</p>
              <div className="flex space-x-4 mt-4">
                <a href="https://linkedin.com/in/konstantinegugunava" target="_blank" rel="noopener noreferrer" className="text-[#00ffff] hover:text-[#ff00ff]">
                  <FaLinkedin size={24} />
                </a>
                <a href="mailto:kgugunava2001@berkeley.edu" className="text-[#00ffff] hover:text-[#ff00ff]">
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setIsLoading(false);
        return;

      case 'welcome':
        output = <WelcomeMessage />;
        break;

      case 'blog':
        output = (
          <div className="space-y-4">
            <div className="border-b border-[#64ffda] pb-4">
              <p className="text-[#64ffda] text-xl">📝 Blog Section Coming Soon</p>
              <p className="text-[#8b949e] mt-2">This section is under development.</p>
            </div>
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
        break;

      case 'interview':
        output = (
          <div className="space-y-4">
            <div className="border-b border-[#64ffda] pb-4">
              <p className="text-[#64ffda] text-xl">🎤 Interview - Ask me a question</p>
              <p className="text-[#8b949e] mt-2">Click a question to see my response typed out:</p>
              <div className="mt-6 grid gap-4">
                {interviewQuestions.map((q) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: parseInt(q.id) * 0.1 }}
                    onClick={() => {
                      handleCommand(`interview ${q.id}`);
                    }}
                    className="bg-[#1c2128]/90 backdrop-blur-sm border border-[#30363d] rounded-lg p-4 hover:border-[#2ecc71] transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-[#2ecc71] font-mono text-sm">{`>`}</span>
                        <h3 className="text-[#e4e4e4] group-hover:text-[#64ffda] transition-colors">{q.question}</h3>
                      </div>
                      <div className="text-[#666] group-hover:text-[#2ecc71] transition-colors">▶</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
        break;

      case command.match(/^interview \d+$/)?.input:
        const questionId = command.split(' ')[1];
        const question = interviewQuestions.find(q => q.id === questionId);
        if (question) {
          output = (
            <div className="space-y-4">
              <div className="border-b border-[#64ffda] pb-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1c2128]/90 backdrop-blur-sm border border-[#30363d] rounded-lg p-6"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-[#2ecc71] font-mono">{`>`}</span>
                    <h2 className="text-[#64ffda] text-lg">{question.question}</h2>
                  </div>
                  <div className="bg-[#1a1f2b] rounded-lg p-4 border border-[#30363d] min-h-[200px] relative">
                    <TypewriterResponse text={question.answer} />
                  </div>
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <span className="text-[#666]">Type &apos;interview&apos; to see other questions</span>
                    <div className="flex items-center space-x-4">
                      {parseInt(question.id) > 1 && (
                        <CommandLink command={`interview ${parseInt(question.id) - 1}`}>
                          <span className="text-[#3498db] hover:text-[#2ecc71] transition-colors">← Previous</span>
                        </CommandLink>
                      )}
                      {parseInt(question.id) < interviewQuestions.length && (
                        <CommandLink command={`interview ${parseInt(question.id) + 1}`}>
                          <span className="text-[#3498db] hover:text-[#2ecc71] transition-colors">Next →</span>
                        </CommandLink>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="ml-4">
                <AvailableCommands />
              </div>
            </div>
          );
        }
        break;

      default:
        output = (
          <div className="space-y-4">
            <p>❌ Command not found: {command}</p>
            <div className="ml-4">
              <AvailableCommands />
            </div>
          </div>
        );
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    setHistory(prev => [...prev, { input: command, output }]);
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input.trim());
      setInput('');
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0e17] to-[#1a1f2b] text-[#e4e4e4] p-4 font-mono relative overflow-hidden">
      {/* Matrix-like Rain Effect */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMC41IiBmaWxsPSJyZ2JhKDQ2LCAyMDQsIDExMywgMC4xKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      {/* Scanning Line Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#2ecc71] to-transparent absolute top-0 animate-scan"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Glowing Header */}
        <div className="bg-[#1c2128]/90 backdrop-blur-sm border-b border-[#30363d] p-3 mb-6 rounded-t-lg shadow-lg relative overflow-hidden">
          {/* Header Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2ecc71]/5 via-[#3498db]/5 to-[#2ecc71]/5 animate-glow"></div>
          
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="text-[#2ecc71] font-bold text-xl tracking-wider animate-pulse">KOKA</span>
                <div className="absolute -inset-1 bg-[#2ecc71]/20 blur-sm rounded-full animate-pulse"></div>
              </div>
              <span className="text-[#666]">|</span>
              <div className="relative group">
                <span className="text-[#3498db] font-bold group-hover:text-[#2ecc71] transition-colors duration-300">
                  TERMINAL <span className="text-xs">v2.1</span>
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2ecc71] group-hover:w-full transition-all duration-300"></div>
              </div>
              <div className="flex items-center space-x-1">
                <div className="h-2 w-2 rounded-full bg-[#2ecc71] animate-ping"></div>
                <div className="h-2 w-2 rounded-full bg-[#3498db] animate-ping" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 rounded-full bg-[#e74c3c] animate-ping" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative group">
                <div className="flex items-center space-x-2 bg-[#2d333b] px-3 py-1 rounded-full border border-[#30363d] group-hover:border-[#2ecc71] transition-colors">
                  <div className="h-2 w-2 rounded-full bg-[#2ecc71] group-hover:animate-ping"></div>
                  <span className="text-[#2ecc71] text-sm">SYSTEM ACTIVE</span>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2ecc71] to-[#3498db] rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
              </div>
              <div className="bg-[#2d333b] px-3 py-1 rounded-full border border-[#30363d] text-sm">
                <span className="text-[#3498db] font-mono">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Terminal Window with Holographic Effect */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#2ecc71] via-[#3498db] to-[#2ecc71] rounded-lg blur opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="relative bg-[#1c2128]/90 backdrop-blur-sm border border-[#30363d] rounded-lg shadow-2xl">
            {/* Holographic Lines */}
            <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
              <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3Atb3BhY2l0eT0iMCIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLW9wYWNpdHk9Ii4wNSIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1vcGFjaXR5PSIwIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==')] animate-scan"></div>
            </div>

            {/* Terminal Output */}
            <div className="p-6 space-y-4">
              {history.map((cmd, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2 group"
                >
                  {cmd.input !== 'welcome' && (
                    <div className="flex items-center group relative">
                      <div className="flex-shrink-0 w-20 text-xs text-[#666] border-r border-[#30363d] pr-2">
                        {new Date().toLocaleTimeString()}
                      </div>
                      <div className="flex-grow flex items-center bg-[#2d333b] ml-2 p-2 rounded-md border-l-4 border-[#2ecc71] group-hover:border-[#3498db] transition-colors relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2ecc71]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="text-[#2ecc71] group-hover:text-[#3498db] transition-colors relative">$</span>
                        <span className="ml-2 relative">{cmd.input}</span>
                      </div>
                    </div>
                  )}
                  <div className="ml-20 pl-2 relative">
                    <div className="relative">
                      {cmd.output}
                      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#2ecc71]/0 via-[#2ecc71]/10 to-[#2ecc71]/0 group-hover:via-[#3498db]/10"></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Command Input with Enhanced Effects */}
            <motion.form 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit} 
              className="relative m-4 mt-0 group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#2ecc71] to-[#3498db] rounded-lg blur opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-[#2d333b] p-4 rounded-lg border border-[#30363d] shadow-lg group-hover:border-[#2ecc71] transition-colors">
                <div className="flex-shrink-0 w-20 text-xs text-[#666] border-r border-[#30363d] pr-2 group-hover:text-[#3498db] transition-colors">
                  {new Date().toLocaleTimeString()}
                </div>
                <span className="text-[#2ecc71] ml-2 group-hover:text-[#3498db] transition-colors">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="ml-2 bg-transparent border-none outline-none flex-1 text-[#e4e4e4] placeholder-[#666] focus:placeholder-[#3498db] transition-colors"
                  placeholder="Enter command (type 'help' for commands)"
                />
                {isLoading && (
                  <div className="flex items-center space-x-1">
                    <div className="h-2 w-2 rounded-full bg-[#2ecc71] animate-ping"></div>
                    <div className="h-2 w-2 rounded-full bg-[#2ecc71] animate-ping" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 rounded-full bg-[#2ecc71] animate-ping" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                )}
              </div>
            </motion.form>
          </div>
        </div>

        {/* Enhanced Footer Stats Bar */}
        <div className="mt-4 bg-[#1c2128]/90 backdrop-blur-sm border-t border-[#30363d] p-3 rounded-b-lg text-sm">
          <div className="flex justify-between items-center relative">
            <div className="flex items-center space-x-6">
              <div className="group relative">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-[#2ecc71] group-hover:animate-ping"></div>
                  <span className="text-[#2ecc71] group-hover:text-[#3498db] transition-colors">SYSTEM</span>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2ecc71] group-hover:w-full transition-all duration-300"></div>
              </div>
              <div className="group relative">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-[#3498db] group-hover:animate-ping"></div>
                  <span className="text-[#3498db] group-hover:text-[#2ecc71] transition-colors">NETWORK</span>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#3498db] group-hover:w-full transition-all duration-300"></div>
              </div>
              <div className="group relative">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 rounded-full bg-[#e74c3c] group-hover:animate-ping"></div>
                  <span className="text-[#e74c3c] group-hover:text-[#2ecc71] transition-colors">SECURITY</span>
                </div>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#e74c3c] group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-1 bg-[#2d333b] rounded-full border border-[#30363d]">
                <span className="text-[#666]">MEM:</span>
                <span className="text-[#3498db]">32MB</span>
                <div className="w-16 h-1 bg-[#1c2128] rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-[#3498db] animate-pulse"></div>
                </div>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-[#2d333b] rounded-full border border-[#30363d]">
                <span className="text-[#666]">CPU:</span>
                <span className="text-[#2ecc71]">2%</span>
                <div className="w-16 h-1 bg-[#1c2128] rounded-full overflow-hidden">
                  <div className="w-1/12 h-full bg-[#2ecc71] animate-pulse"></div>
                </div>
              </div>
              <div className="relative group">
                <span className="text-[#2ecc71] group-hover:text-[#3498db] transition-colors">READY</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2ecc71] group-hover:w-full transition-all duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
