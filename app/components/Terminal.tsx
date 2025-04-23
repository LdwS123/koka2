'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface Command {
  input: string;
  output: string | React.ReactNode;
}

const Terminal = () => {
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

  const CommandLink = ({ command, children }: { command: string; children: React.ReactNode }) => (
    <div
      onClick={() => handleCommand(command)}
      className="cursor-pointer transition-all duration-200 hover:bg-[#1a1f2c] hover:text-[#64ffda] p-2 rounded-md border border-transparent hover:border-[#64ffda] hover:shadow-glow"
    >
      {children}
    </div>
  );

  const AvailableCommands = () => (
    <div className="space-y-1 bg-[#0d1117] p-4 rounded-lg border border-[#1f2937] shadow-lg">
      <CommandLink command="projects">📁 projects  → Explore my projects (PredicTagAI, Hivenet, etc.)</CommandLink>
      <CommandLink command="about">👤 about    → Learn more about me</CommandLink>
      <CommandLink command="resume">📄 resume   → View my full resume</CommandLink>
      <CommandLink command="contact">📬 contact  → Get in touch</CommandLink>
      <CommandLink command="help">❓ help     → Show help menu</CommandLink>
      <CommandLink command="clear">🧹 clear    → Clear screen</CommandLink>
    </div>
  );

  const WelcomeMessage = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-[#0d1117] to-[#1f2937] p-6 rounded-lg border border-[#64ffda] shadow-lg"
      >
        <h2 className="text-2xl font-bold text-[#64ffda] mb-4">🌟 Welcome to Konstantine Gugunava's Terminal Portfolio! 🌟</h2>
        <p className="text-[#8b949e] mb-4">I'm a Business & Tech Generalist passionate about fintech, AI, and blockchain.</p>
        <p className="text-[#64ffda] mb-2">Available commands:</p>
        <div className="ml-4">
          <AvailableCommands />
        </div>
      </motion.div>
    </div>
  );

  useEffect(() => {
    setHistory([{ input: 'welcome', output: <WelcomeMessage /> }]);
  }, []);

  const handleCommand = async (command: string) => {
    setIsLoading(true);
    let output: string | React.ReactNode = '';

    switch (command.toLowerCase()) {
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
          <div className="space-y-6">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-2xl font-bold text-[#64ffda]"
            >
              🚀 Featured Projects
            </motion.h2>
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-[#1f2937] p-6 rounded-lg border border-[#64ffda] shadow-lg hover:shadow-glow transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-[#64ffda] mb-2">{project.name}</h3>
                <p className="text-[#8b949e] mb-2">{project.description}</p>
                <p className="text-[#58a6ff]">{project.results}</p>
                <p className="text-[#8b949e]">{project.role}</p>
              </motion.div>
            ))}
            <div className="mt-6">
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
              <p>I'm Konstantine — a Business & Tech Generalist with a global mindset.</p>
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
• Bachelor's Degree in Economics
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
• Initiated and closed partnership with Pricer's VP of Sales

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
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-6 font-mono">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {history.map((cmd, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              {cmd.input !== 'welcome' && (
                <div className="flex items-center bg-[#1f2937] p-2 rounded-md">
                  <span className="text-[#64ffda]">$</span>
                  <span className="ml-2">{cmd.input}</span>
                </div>
              )}
              <div className="ml-4">{cmd.output}</div>
            </motion.div>
          ))}
        </div>

        <motion.form 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onSubmit={handleSubmit} 
          className="mt-6 flex items-center bg-[#1f2937] p-3 rounded-lg border border-[#64ffda] shadow-lg"
        >
          <span className="text-[#64ffda]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-2 bg-transparent border-none outline-none flex-1 text-[#c9d1d9] placeholder-[#8b949e]"
            placeholder="Type a command..."
          />
          {isLoading && <span className="animate-pulse text-[#64ffda]">...</span>}
        </motion.form>
      </div>
    </div>
  );
};

export default Terminal;
