import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Filter, Award, Clock } from 'lucide-react';
import { getWorkoutRecords, getRecordsByDateRange, getTodayRecords } from '../utils/storage';

const WorkoutRecord = () => {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    loadRecords();
  }, []);

  useEffect(() => {
    filterRecords();
  }, [records, selectedPeriod, selectedCategory]);

  const loadRecords = () => {
    const allRecords = getWorkoutRecords();
    setRecords(allRecords);
  };

  const filterRecords = () => {
    let filtered = [...records];

    // 按时间筛选
    const now = new Date();
    let startDate;

    switch (selectedPeriod) {
      case 'today':
        startDate = new Date().toISOString().split('T')[0];
        filtered = filtered.filter(record => record.date === startDate);
        break;
      case 'week':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        filtered = getRecordsByDateRange(startDate.toISOString().split('T')[0], now.toISOString().split('T')[0]);
        break;
      case 'month':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        filtered = getRecordsByDateRange(startDate.toISOString().split('T')[0], now.toISOString().split('T')[0]);
        break;
      case 'all':
      default:
        // 不筛选时间
        break;
    }

    // 按分类筛选
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(record => record.category === selectedCategory);
    }

    setFilteredRecords(filtered);
  };

  const getRecordStats = () => {
    const totalWorkouts = filteredRecords.length;
    const totalDuration = filteredRecords.reduce((sum, record) => sum + (record.duration || 0), 0);
    const averageDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts) : 0;
    
    // 按分类统计
    const categoryStats = {};
    filteredRecords.forEach(record => {
      if (!categoryStats[record.category]) {
        categoryStats[record.category] = 0;
      }
      categoryStats[record.category]++;
    });

    // 按日期统计
    const dateStats = {};
    filteredRecords.forEach(record => {
      if (!dateStats[record.date]) {
        dateStats[record.date] = 0;
      }
      dateStats[record.date]++;
    });

    return {
      totalWorkouts,
      totalDuration,
      averageDuration,
      categoryStats,
      dateStats,
      uniqueDays: Object.keys(dateStats).length
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return '今天';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return '昨天';
    } else {
      return date.toLocaleDateString('zh-CN', { 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
      });
    }
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) {
      return `${seconds}秒`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}分${secs}秒`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}时${minutes}分`;
    }
  };

  const stats = getRecordStats();
  const categories = ['all', ...new Set(records.map(r => r.category))];

  const groupedRecords = filteredRecords.reduce((groups, record) => {
    const date = record.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {});

  return (
    <div className="workout-record">
      <div className="record-header">
        <h2>🏆 运动记录</h2>
        <p>记录你的运动成就，见证进步的每一步</p>
      </div>

      {/* 筛选控件 */}
      <div className="filters-section card">
        <div className="filter-group">
          <label>时间范围</label>
          <div className="filter-buttons">
            {[
              { value: 'today', label: '今天' },
              { value: 'week', label: '近7天' },
              { value: 'month', label: '近30天' },
              { value: 'all', label: '全部' }
            ].map(period => (
              <button
                key={period.value}
                className={`filter-button ${selectedPeriod === period.value ? 'active' : ''}`}
                onClick={() => setSelectedPeriod(period.value)}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <label>运动分类</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">全部分类</option>
            {categories.filter(c => c !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="stats-overview">
        <div className="stat-card card">
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-content">
            <h3>总运动次数</h3>
            <p className="stat-number">{stats.totalWorkouts}</p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>总运动时长</h3>
            <p className="stat-number">{formatDuration(stats.totalDuration)}</p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <h3>平均时长</h3>
            <p className="stat-number">{formatDuration(stats.averageDuration)}</p>
          </div>
        </div>

        <div className="stat-card card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-content">
            <h3>运动天数</h3>
            <p className="stat-number">{stats.uniqueDays}</p>
          </div>
        </div>
      </div>

      {/* 分类统计 */}
      {Object.keys(stats.categoryStats).length > 0 && (
        <div className="category-stats card">
          <h3>📊 分类统计</h3>
          <div className="category-chart">
            {Object.entries(stats.categoryStats).map(([category, count]) => {
              const percentage = ((count / stats.totalWorkouts) * 100).toFixed(1);
              return (
                <div key={category} className="category-bar">
                  <div className="category-info">
                    <span className="category-name">{category}</span>
                    <span className="category-count">{count}次 ({percentage}%)</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 记录列表 */}
      <div className="records-section">
        <h3>📝 详细记录</h3>
        
        {filteredRecords.length === 0 ? (
          <div className="empty-records card">
            <p>😊 这个时间段还没有运动记录</p>
            <p>赶快去运动吧！</p>
          </div>
        ) : (
          <div className="records-list">
            {Object.entries(groupedRecords)
              .sort(([a], [b]) => new Date(b) - new Date(a))
              .map(([date, dayRecords]) => (
                <div key={date} className="date-group">
                  <div className="date-header">
                    <h4>{formatDate(date)}</h4>
                    <span className="date-count">{dayRecords.length}次运动</span>
                  </div>
                  
                  <div className="day-records">
                    {dayRecords.map(record => (
                      <div key={record.id} className="record-item card">
                        <div className="record-header">
                          <h5>{record.exerciseName}</h5>
                          <span className="record-category">{record.category}</span>
                        </div>
                        
                        <div className="record-details">
                          {record.targetDuration > 0 ? (
                            <div className="detail-item">
                              <Clock size={14} />
                              <span>时长: {formatDuration(record.duration)}</span>
                            </div>
                          ) : (
                            <div className="detail-item">
                              <Award size={14} />
                              <span>{record.reps}次 × {record.sets}组</span>
                            </div>
                          )}
                          
                          <div className="detail-item">
                            <Calendar size={14} />
                            <span>{new Date(record.timestamp).toLocaleTimeString('zh-CN', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}</span>
                          </div>
                        </div>

                        {record.notes && (
                          <div className="record-notes">
                            💭 {record.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .workout-record {
          max-width: 900px;
          margin: 0 auto;
        }

        .record-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .record-header h2 {
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .record-header p {
          color: rgba(255, 255, 255, 0.8);
        }

        .filters-section {
          display: flex;
          gap: 30px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .filter-group {
          flex: 1;
          min-width: 200px;
        }

        .filter-group label {
          display: block;
          margin-bottom: 10px;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .filter-button {
          padding: 8px 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 13px;
        }

        .filter-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .filter-button.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border-color: transparent;
        }

        .filter-select {
          width: 100%;
          padding: 10px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .stats-overview {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 20px;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-3px);
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-content h3 {
          margin: 0 0 5px 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .stat-number {
          margin: 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: white;
        }

        .category-stats {
          margin-bottom: 30px;
        }

        .category-stats h3 {
          margin-bottom: 20px;
          text-align: center;
        }

        .category-chart {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .category-bar {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .category-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .category-name {
          color: white;
          font-weight: 500;
        }

        .category-count {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .records-section h3 {
          margin-bottom: 20px;
          color: white;
        }

        .empty-records {
          text-align: center;
          padding: 40px;
          color: rgba(255, 255, 255, 0.7);
        }

        .date-group {
          margin-bottom: 25px;
        }

        .date-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding: 0 10px;
        }

        .date-header h4 {
          margin: 0;
          color: white;
          font-size: 1.1rem;
        }

        .date-count {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .day-records {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .record-item {
          transition: transform 0.3s ease;
        }

        .record-item:hover {
          transform: translateX(5px);
        }

        .record-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .record-header h5 {
          margin: 0;
          color: white;
          font-size: 1rem;
        }

        .record-category {
          background: rgba(102, 126, 234, 0.3);
          color: #667eea;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .record-details {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
        }

        .record-notes {
          background: rgba(255, 255, 255, 0.05);
          padding: 10px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          border-left: 3px solid #667eea;
        }

        @media (max-width: 768px) {
          .filters-section {
            flex-direction: column;
          }
          
          .stats-overview {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .filter-buttons {
            justify-content: center;
          }
          
          .record-header {
            flex-direction: column;
            gap: 8px;
            text-align: center;
          }
          
          .record-details {
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
};

export default WorkoutRecord;