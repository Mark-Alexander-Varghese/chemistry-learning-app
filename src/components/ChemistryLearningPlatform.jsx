
// src/components/ChemistryLearningPlatform.jsx
import React, { useState } from 'react';
import { Atom, Beaker, BookOpen, Brain, ChevronDown, ChevronRight, Award, BarChart, BookText, HelpCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import TextbookLibrary from './TextbookLibrary';
import InteractiveQuiz from './InteractiveQuiz';
import './ChemistryLearningPlatform.css';

const ChemistryLearningPlatform = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [expandedTopics, setExpandedTopics] = useState({});
  const [selectedChapter, setSelectedChapter] = useState('lech101');

  const toggleTopic = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const chemistryTopics = [
    {
      id: 'organic',
      title: 'Organic Chemistry',
      icon: <Atom />,
      description: 'Study of carbon compounds and their reactions',
      subtopics: [
        { id: 'functional-groups', title: 'Functional Groups', difficulty: 'Medium' },
        { id: 'isomerism', title: 'Isomerism', difficulty: 'Hard' },
        { id: 'reaction-mechanisms', title: 'Reaction Mechanisms', difficulty: 'Hard' },
        { id: 'polymers', title: 'Polymers', difficulty: 'Medium' }
      ]
    },
    {
      id: 'physical',
      title: 'Physical Chemistry',
      icon: <Beaker />,
      description: 'Study of macroscopic properties and processes in chemical systems',
      subtopics: [
        { id: 'thermodynamics', title: 'Thermodynamics', difficulty: 'Hard' },
        { id: 'chemical-equilibrium', title: 'Chemical Equilibrium', difficulty: 'Medium' },
        { id: 'electrochemistry', title: 'Electrochemistry', difficulty: 'Medium' },
        { id: 'reaction-kinetics', title: 'Reaction Kinetics', difficulty: 'Hard' }
      ]
    },
    {
      id: 'inorganic',
      title: 'Inorganic Chemistry',
      icon: <Atom />,
      description: 'Study of non-carbon compounds, including metals and minerals',
      subtopics: [
        { id: 'periodic-trends', title: 'Periodic Trends', difficulty: 'Medium' },
        { id: 'coordination-compounds', title: 'Coordination Compounds', difficulty: 'Hard' },
        { id: 'acids-bases', title: 'Acids and Bases', difficulty: 'Medium' },
        { id: 'metallurgy', title: 'Metallurgy', difficulty: 'Medium' }
      ]
    }
    ];
  
  const renderDashboard = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome to AI Chemistry Learning</h2>
      
      <div className="dashboard-cards">
        <DashboardCard 
          title="Progress" 
          icon={<BarChart className="icon text-blue" />}
          value="42%" 
          description="Course completion" 
        />
        <DashboardCard 
          title="Mastery Score" 
          icon={<Award className="icon text-yellow" />}
          value="B+" 
          description="Overall performance" 
        />
        <DashboardCard 
          title="Next Quiz" 
          icon={<BookOpen className="icon text-green" />}
          value="Friday" 
          description="Organic Chemistry" 
        />
      </div>

      <h3 className="text-xl font-semibold mb-4">Continue Learning</h3>
      <div className="bg-white rounded-lg shadow p-4 mb-8">
        <div className="continue-module">
          <Atom className="icon text-purple" />
          <div>
            <h4 className="module-title">Reaction Mechanisms</h4>
            <p className="text-gray">You're 60% through this module</p>
          </div>
          <button className="button-purple" onClick={() => {
            setActiveTab('textbook');
            setSelectedChapter('lech103');
          }}>
            Continue
          </button>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: '60%' }}></div>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-4">Recommended for You</h3>
      <div className="recommendations">
        <RecommendationCard 
          title="Interactive Lab: Titration" 
          description="Practice virtual titration with real-time feedback"
          difficulty="Medium"
          onClick={() => setActiveTab('lab')}
        />
        <RecommendationCard 
          title="Quiz: Atomic Structure" 
          description="Test your knowledge on atoms and electrons"
          difficulty="Easy"
          onClick={() => {
            setActiveTab('quiz');
            setSelectedChapter('lech102');
          }}
        />
      </div>
    </div>
  );

  const renderTopics = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Chemistry Topics</h2>
      
      <div className="topics-list">
        {chemistryTopics.map(topic => (
          <div key={topic.id} className="topic-card">
            <div 
              className="topic-header"
              onClick={() => toggleTopic(topic.id)}
            >
              <div className="topic-icon">
                {topic.icon}
              </div>
              <div>
                <h3 className="topic-title">{topic.title}</h3>
                <p className="topic-description">{topic.description}</p>
              </div>
              <div className="topic-chevron">
                {expandedTopics[topic.id] ? 
                  <ChevronDown className="icon-sm" /> : 
                  <ChevronRight className="icon-sm" />
                }
              </div>
            </div>
            
            {expandedTopics[topic.id] && (
              <div className="subtopics">
                <ul className="subtopic-list">
                  {topic.subtopics.map(subtopic => (
                    <li key={subtopic.id} className="subtopic-item">
                      <span>{subtopic.title}</span>
                      <span className={`difficulty-badge ${
                        subtopic.difficulty === 'Easy' ? 'easy' :
                        subtopic.difficulty === 'Medium' ? 'medium' :
                        'hard'
                      }`}>
                        {subtopic.difficulty}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderInteractiveLab = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Interactive Laboratory</h2>
      
      <div className="lab-section">
        <h3 className="text-xl font-semibold mb-4">Virtual Chemistry Experiments</h3>
        <p className="text-gray mb-4">
          Select an experiment below to enter our virtual lab environment. 
          Conduct experiments, observe reactions, and learn chemistry principles hands-on.
        </p>
        
        <div className="experiments-grid">
          <ExperimentCard 
            title="Acid-Base Titration" 
            description="Determine the concentration of an unknown acid or base"
            time="25 mins"
          />
          <ExperimentCard 
            title="Redox Reactions" 
            description="Observe electron transfer in chemical reactions"
            time="30 mins"
          />
          <ExperimentCard 
            title="Gas Laws" 
            description="Explore the relationship between pressure, volume, and temperature"
            time="20 mins"
          />
          <ExperimentCard 
            title="Organic Synthesis" 
            description="Create organic compounds through reaction simulations"
            time="40 mins"
          />
        </div>
      </div>
      
      <div className="lab-section mt-6">
        <h3 className="text-xl font-semibold mb-4">3D Molecular Viewer</h3>
        <p className="text-gray mb-4">
          Explore molecular structures in 3D. Visualize bonding, geometry, and atomic arrangements.
        </p>
        <div className="molecule-viewer">
          <p className="placeholder-text">Interactive 3D molecule viewer would appear here</p>
        </div>
      </div>
    </div>
  );

  const renderAITutor = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">AI Chemistry Tutor</h2>
      
      <div className="chat-container">
        <div className="chat-header">
          <h3 className="chat-title">Ask Your Chemistry Questions</h3>
        </div>
        <div className="chat-messages">
          <div className="user-message">
            <p>How do I calculate pH from hydrogen ion concentration?</p>
          </div>
          <div className="ai-message">
            <p>The pH is calculated using the formula: pH = -log[H⁺]</p>
            <p className="mt-2">For example, if [H⁺] = 0.001 mol/L:</p>
            <p className="mt-1">pH = -log(0.001) = 3</p>
            <p className="mt-2">Would you like me to walk through another example?</p>
          </div>
        </div>
        <div className="chat-input">
          <input 
            type="text" 
            placeholder="Type your chemistry question here..." 
            className="input-field"
          />
          <button className="button-blue">
            Ask
          </button>
        </div>
      </div>
      
      <div className="tutor-features">
        <div className="feature-card">
          <div className="feature-header">
            <Brain className="icon text-purple" />
            <h3 className="feature-title">Personalized Learning</h3>
          </div>
          <p className="feature-description">
            Our AI adapts to your learning style and identifies areas where you need more practice.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-header">
            <BookOpen className="icon text-green" />
            <h3 className="feature-title">Homework Help</h3>
          </div>
          <p className="feature-description">
            Upload your chemistry homework problems for step-by-step guidance.
          </p>
        </div>
      </div>
    </div>
  );
  
  const renderTextbook = () => (
    <div className="textbook-tab">
      <TextbookLibrary />
    </div>
  );
  
  const renderQuiz = () => (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Knowledge Check</h2>
      <InteractiveQuiz chapterId={selectedChapter} />
    </div>
  );

  // Helper components
  const DashboardCard = ({ title, icon, value, description }) => (
    <div className="dashboard-card">
      <div className="card-header">
        {icon}
        <h3 className="card-title">{title}</h3>
      </div>
      <p className="card-value">{value}</p>
      <p className="card-description">{description}</p>
    </div>
  );

  const RecommendationCard = ({ title, description, difficulty, onClick }) => (
    <div className="recommendation-card">
      <h4 className="rec-title">{title}</h4>
      <p className="rec-description">{description}</p>
      <div className="rec-footer">
        <span className={`difficulty-badge ${
          difficulty === 'Easy' ? 'easy' :
          difficulty === 'Medium' ? 'medium' :
          'hard'
        }`}>
          {difficulty}
        </span>
        <button className="text-blue start-button" onClick={onClick}>Start →</button>
      </div>
    </div>
  );

  const ExperimentCard = ({ title, description, time }) => (
    <div className="experiment-card">
      <h4 className="exp-title">{title}</h4>
      <p className="exp-description">{description}</p>
      <div className="exp-footer">
        <span className="exp-time">⏱️ {time}</span>
        <button className="button-green">
          Launch
        </button>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="app-title">ChemAI Learn</h1>
          <p className="app-subtitle">AI-powered chemistry learning</p>
        </div>
        <nav className="sidebar-nav">
          <ul className="nav-list">
            <NavItem 
              id="dashboard" 
              label="Dashboard" 
              icon={<BarChart className="nav-icon" />} 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')} 
            />
            <NavItem 
              id="topics" 
              label="Topics" 
              icon={<BookOpen className="nav-icon" />} 
              active={activeTab === 'topics'} 
              onClick={() => setActiveTab('topics')} 
            />
            <NavItem 
              id="textbook" 
              label="Textbook" 
              icon={<BookText className="nav-icon" />} 
              active={activeTab === 'textbook'} 
              onClick={() => setActiveTab('textbook')} 
            />
            <NavItem 
              id="quiz" 
              label="Quiz" 
              icon={<HelpCircle className="nav-icon" />} 
              active={activeTab === 'quiz'} 
              onClick={() => setActiveTab('quiz')} 
            />
            <NavItem 
              id="lab" 
              label="Interactive Lab" 
              icon={<Beaker className="nav-icon" />} 
              active={activeTab === 'lab'} 
              onClick={() => setActiveTab('lab')} 
            />
            <NavItem 
              id="tutor" 
              label="AI Tutor" 
              icon={<Brain className="nav-icon" />} 
              active={activeTab === 'tutor'} 
              onClick={() => setActiveTab('tutor')} 
            />
          </ul>
        </nav>
      </div>
      
      {/* Main content */}
      <div className="main-content">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'topics' && renderTopics()}
        {activeTab === 'textbook' && renderTextbook()}
        {activeTab === 'quiz' && renderQuiz()}
        {activeTab === 'lab' && renderInteractiveLab()}
        {activeTab === 'tutor' && renderAITutor()}
      </div>
    </div>
  );
};

const NavItem = ({ id, label, icon, active, onClick }) => (
  <li>
    <button
      onClick={onClick}
      className={`nav-item ${active ? 'active' : ''}`}
    >
      <span className="nav-icon-container">{icon}</span>
      {label}
    </button>
  </li>
);

export default ChemistryLearningPlatform;