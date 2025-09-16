import React, { useState, useEffect } from 'react';
import { Activity, Calendar, Book, Settings, Trophy } from 'lucide-react';
import ExerciseLibrary from './components/ExerciseLibrary';
import WorkoutPlan from './components/WorkoutPlan';
import WorkoutRecord from './components/WorkoutRecord';
import Dashboard from './components/Dashboard';
import { getWorkoutStats } from './utils/storage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({});

  useEffect(() => {
    // 加载统计数据
    const loadStats = () => {
      const workoutStats = getWorkoutStats();
      setStats(workoutStats);
    };

    loadStats();
    
    // 每分钟更新一次统计数据
    const interval = setInterval(loadStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: 'dashboard', name: '首页', icon: Activity },
    { id: 'plan', name: '运动计划', icon: Calendar },
    { id: 'record', name: '运动记录', icon: Trophy },
    { id: 'library', name: '运动库', icon: Book }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} onStatsUpdate={setStats} onTabChange={setActiveTab} />;
      case 'plan':
        return <WorkoutPlan onStatsUpdate={() => setStats(getWorkoutStats())} />;
      case 'record':
        return <WorkoutRecord />;
      case 'library':
        return <ExerciseLibrary />;
      default:
        return <Dashboard stats={stats} onStatsUpdate={setStats} onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>💪 运动APP</h1>
        <p>让运动成为习惯，让健康伴随一生</p>
      </header>

      <div className="tab-container">
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent size={16} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      <main className="main-content">
        {renderTabContent()}
      </main>

      <footer className="app-footer">
        <p>坚持运动，健康生活 🌟</p>
      </footer>
    </div>
  );
}

export default App;