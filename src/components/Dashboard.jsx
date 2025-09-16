import React from 'react';
import { Calendar, Target, Award, Flame } from 'lucide-react';

const Dashboard = ({ stats, onStatsUpdate, onTabChange }) => {
  const {
    todayWorkouts = 0,
    weekWorkouts = 0,
    totalWorkouts = 0,
    consecutiveDays = 0,
    lastWorkoutDate = null
  } = stats;

  const isWorkoutToday = () => {
    const today = new Date().toISOString().split('T')[0];
    return lastWorkoutDate === today;
  };

  const getMotivationMessage = () => {
    if (isWorkoutToday()) {
      return "今天已经完成运动了！继续保持！ 💪";
    } else if (consecutiveDays > 0) {
      return `已连续运动${consecutiveDays}天，今天也要加油！ 🔥`;
    } else {
      return "新的一天，从运动开始！ ✨";
    }
  };

  const getProgressPercentage = () => {
    const dailyGoal = 3; // 假设每日目标是3次运动
    return Math.min((todayWorkouts / dailyGoal) * 100, 100);
  };

  return (
    <div className="dashboard">
      <div className="motivation-card card">
        <h2>💫 {getMotivationMessage()}</h2>
        <div 
          className="progress-ring" 
          onClick={() => onTabChange('plan')}
          style={{ cursor: 'pointer' }}
          title="点击开始运动"
        >
          <div 
            className="progress-fill" 
            style={{ '--progress': `${getProgressPercentage()}%` }}
          >
            <span className="progress-text">
              {todayWorkouts}/3
            </span>
          </div>
        </div>
        <p style={{ marginTop: '15px', color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
          💆‍♂️ 点击进度环开始运动
        </p>
      </div>

      <div className="stats-grid">
        <div className="stat-card card" onClick={() => onTabChange('plan')} style={{ cursor: 'pointer' }} title="点击开始运动">
          <div className="stat-icon today">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <h3>今日运动</h3>
            <p className="stat-number">{todayWorkouts}</p>
            <span className="stat-label">次</span>
          </div>
        </div>

        <div className="stat-card card" onClick={() => onTabChange('record')} style={{ cursor: 'pointer' }} title="查看本周记录">
          <div className="stat-icon week">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>本周运动</h3>
            <p className="stat-number">{weekWorkouts}</p>
            <span className="stat-label">次</span>
          </div>
        </div>

        <div className="stat-card card" onClick={() => onTabChange('record')} style={{ cursor: 'pointer' }} title="查看全部记录">
          <div className="stat-icon total">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>总运动数</h3>
            <p className="stat-number">{totalWorkouts}</p>
            <span className="stat-label">次</span>
          </div>
        </div>

        <div className="stat-card card" onClick={() => onTabChange('record')} style={{ cursor: 'pointer' }} title="查看运动记录">
          <div className="stat-icon streak">
            <Flame size={24} />
          </div>
          <div className="stat-content">
            <h3>连续天数</h3>
            <p className="stat-number">{consecutiveDays}</p>
            <span className="stat-label">天</span>
          </div>
        </div>
      </div>

      <div className="quick-actions card">
        <h3>🚀 快速开始</h3>
        <div className="action-buttons">
          <button className="action-button" onClick={() => onTabChange('plan')}>
            <span>💪</span>
            <span>开始运动</span>
          </button>
          <button className="action-button" onClick={() => onTabChange('plan')}>
            <span>📅</span>
            <span>制定计划</span>
          </button>
          <button className="action-button" onClick={() => onTabChange('record')}>
            <span>📊</span>
            <span>查看记录</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .dashboard {
          max-width: 800px;
          margin: 0 auto;
        }

        .motivation-card {
          text-align: center;
          margin-bottom: 30px;
          position: relative;
          overflow: hidden;
        }

        .motivation-card h2 {
          margin-bottom: 20px;
          font-size: 1.3rem;
        }

        .progress-ring {
          width: 120px;
          height: 120px;
          margin: 0 auto;
          position: relative;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #667eea var(--progress, 0%),
            rgba(255, 255, 255, 0.1) var(--progress, 0%)
          );
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .progress-ring:hover {
          transform: scale(1.05);
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
        }

        .progress-ring:active {
          transform: scale(0.98);
        }

        .progress-fill {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(5px);
        }

        .progress-text {
          font-size: 1.2rem;
          font-weight: bold;
          color: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 15px 35px rgba(102, 126, 234, 0.3);
        }

        .stat-card:active {
          transform: translateY(-4px) scale(1.01);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-icon.today { background: linear-gradient(45deg, #667eea, #764ba2); }
        .stat-icon.week { background: linear-gradient(45deg, #f093fb, #f5576c); }
        .stat-icon.total { background: linear-gradient(45deg, #4facfe, #00f2fe); }
        .stat-icon.streak { background: linear-gradient(45deg, #ffecd2, #fcb69f); }

        .stat-content h3 {
          margin: 0 0 5px 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .stat-number {
          margin: 0;
          font-size: 1.8rem;
          font-weight: bold;
          color: white;
        }

        .stat-label {
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .quick-actions h3 {
          text-align: center;
          margin-bottom: 20px;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 15px;
        }

        .action-button {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .action-button span:first-child {
          font-size: 1.5rem;
        }

        .action-button span:last-child {
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          
          .stat-card {
            padding: 15px;
          }
          
          .stat-icon {
            width: 40px;
            height: 40px;
          }
          
          .stat-number {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;