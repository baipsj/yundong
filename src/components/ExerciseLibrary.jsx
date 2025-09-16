import React, { useState } from 'react';
import { Search, Clock, RotateCcw, Play, BookOpen } from 'lucide-react';
import { defaultExercises, exerciseTypes, exerciseCategories } from '../data/exercises';

const ExerciseLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const categories = ['all', ...Object.keys(exerciseCategories)];

  const filteredExercises = defaultExercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderExerciseDetail = () => {
    if (!selectedExercise) return null;

    return (
      <div className="exercise-detail card">
        <div className="detail-header">
          <button 
            className="back-button"
            onClick={() => setSelectedExercise(null)}
          >
            ← 返回
          </button>
          <div className="exercise-category" style={{ backgroundColor: exerciseCategories[selectedExercise.category] }}>
            {selectedExercise.category}
          </div>
        </div>

        <h2 className="exercise-title">{selectedExercise.name}</h2>
        <p className="exercise-description">{selectedExercise.description}</p>

        <div className="exercise-info">
          <div className="info-item">
            <span className="info-label">类型:</span>
            <span className="info-value">{exerciseTypes[selectedExercise.type]}</span>
          </div>
          
          {selectedExercise.defaultDuration > 0 ? (
            <div className="info-item">
              <span className="info-label">建议时长:</span>
              <span className="info-value">{selectedExercise.defaultDuration}秒</span>
            </div>
          ) : (
            <>
              <div className="info-item">
                <span className="info-label">建议次数:</span>
                <span className="info-value">{selectedExercise.defaultReps}次</span>
              </div>
              <div className="info-item">
                <span className="info-label">建议组数:</span>
                <span className="info-value">{selectedExercise.defaultSets}组</span>
              </div>
            </>
          )}
        </div>

        <div className="instructions-section">
          <h3><BookOpen size={20} /> 动作要领</h3>
          <ol className="instructions-list">
            {selectedExercise.instructions.map((instruction, index) => (
              <li key={index} className="instruction-item">
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        <div className="tips-section">
          <h3>💡 注意事项</h3>
          <ul className="tips-list">
            {selectedExercise.tips.map((tip, index) => (
              <li key={index} className="tip-item">
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="action-buttons">
          <button className="button primary">
            <Play size={16} />
            开始运动
          </button>
          <button className="button secondary">
            添加到计划
          </button>
        </div>
      </div>
    );
  };

  const renderExerciseList = () => {
    return (
      <>
        <div className="library-header">
          <h2>🏃‍♂️ 运动库</h2>
          <p>选择你喜欢的运动，查看详细的动作要领</p>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="搜索运动..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? '全部' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="exercises-grid">
          {filteredExercises.map(exercise => (
            <div
              key={exercise.id}
              className="exercise-card"
              onClick={() => setSelectedExercise(exercise)}
            >
              <div className="exercise-card-header">
                <h3 className="exercise-name">{exercise.name}</h3>
                <div 
                  className="exercise-badge"
                  style={{ backgroundColor: exerciseCategories[exercise.category] }}
                >
                  {exercise.category}
                </div>
              </div>
              
              <p className="exercise-desc">{exercise.description}</p>
              
              <div className="exercise-meta">
                {exercise.defaultDuration > 0 ? (
                  <div className="meta-item">
                    <Clock size={14} />
                    <span>{exercise.defaultDuration}秒</span>
                  </div>
                ) : (
                  <div className="meta-item">
                    <RotateCcw size={14} />
                    <span>{exercise.defaultReps}次 × {exercise.defaultSets}组</span>
                  </div>
                )}
              </div>
              
              <div className="exercise-type">
                {exerciseTypes[exercise.type]}
              </div>
            </div>
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="no-results">
            <p>😅 没有找到相关运动，试试其他关键词吧</p>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="exercise-library">
      {selectedExercise ? renderExerciseDetail() : renderExerciseList()}

      <style jsx>{`
        .exercise-library {
          max-width: 1000px;
          margin: 0 auto;
        }

        .library-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .library-header h2 {
          margin-bottom: 10px;
          font-size: 1.8rem;
        }

        .library-header p {
          color: rgba(255, 255, 255, 0.8);
        }

        .search-section {
          margin-bottom: 30px;
        }

        .search-bar {
          position: relative;
          margin-bottom: 20px;
        }

        .search-icon {
          position: absolute;
          left: 15px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.6);
        }

        .search-input {
          width: 100%;
          padding: 12px 15px 12px 45px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.1);
          color: white;
          font-size: 14px;
        }

        .category-filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .category-button {
          padding: 8px 16px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 13px;
        }

        .category-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .category-button.active {
          background: linear-gradient(45deg, #667eea, #764ba2);
          color: white;
          border-color: transparent;
        }

        .exercises-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .exercise-card {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 15px;
          padding: 20px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .exercise-card:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        }

        .exercise-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .exercise-name {
          font-size: 1.2rem;
          margin: 0;
          color: white;
        }

        .exercise-badge {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 12px;
          color: white;
          font-weight: 500;
        }

        .exercise-desc {
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 15px;
          line-height: 1.5;
        }

        .exercise-meta {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
        }

        .exercise-type {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          text-align: right;
        }

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Exercise Detail Styles */
        .exercise-detail {
          max-width: 700px;
          margin: 0 auto;
        }

        .detail-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 15px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }

        .exercise-category {
          padding: 6px 12px;
          border-radius: 15px;
          color: white;
          font-size: 12px;
          font-weight: 500;
        }

        .exercise-title {
          font-size: 2rem;
          margin-bottom: 10px;
          text-align: center;
        }

        .exercise-description {
          text-align: center;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 25px;
          font-size: 1.1rem;
        }

        .exercise-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }

        .info-item {
          background: rgba(255, 255, 255, 0.05);
          padding: 15px;
          border-radius: 10px;
          text-align: center;
        }

        .info-label {
          display: block;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          margin-bottom: 5px;
        }

        .info-value {
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .instructions-section,
        .tips-section {
          margin-bottom: 30px;
        }

        .instructions-section h3,
        .tips-section h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 15px;
          color: white;
        }

        .instructions-list,
        .tips-list {
          padding-left: 0;
        }

        .instruction-item,
        .tip-item {
          background: rgba(255, 255, 255, 0.05);
          margin: 10px 0;
          padding: 15px;
          border-radius: 10px;
          border-left: 4px solid #667eea;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.5;
        }

        .action-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 30px;
        }

        .button.primary {
          background: linear-gradient(45deg, #667eea, #764ba2);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .button.secondary {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
          .exercises-grid {
            grid-template-columns: 1fr;
          }
          
          .exercise-info {
            grid-template-columns: 1fr;
          }
          
          .action-buttons {
            flex-direction: column;
          }
          
          .exercise-title {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ExerciseLibrary;