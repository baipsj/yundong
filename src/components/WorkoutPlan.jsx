import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Play, Clock, RotateCcw, CheckCircle } from 'lucide-react';
import { defaultExercises } from '../data/exercises';
import { getUserExercises, addUserExercise, updateUserExercise, deleteUserExercise, addWorkoutRecord } from '../utils/storage';

const WorkoutPlan = ({ onStatsUpdate }) => {
  const [userExercises, setUserExercises] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExercise, setEditingExercise] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '自定义',
    reps: 10,
    sets: 3,
    duration: 0,
    notes: ''
  });

  useEffect(() => {
    loadUserExercises();
  }, []);

  const loadUserExercises = () => {
    const exercises = getUserExercises();
    setUserExercises(exercises);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (editingExercise) {
      // 更新现有运动
      const success = updateUserExercise(editingExercise.id, {
        ...formData,
        reps: parseInt(formData.reps),
        sets: parseInt(formData.sets),
        duration: parseInt(formData.duration)
      });
      
      if (success) {
        loadUserExercises();
        resetForm();
        alert('运动项目更新成功！');
      } else {
        alert('更新失败，请重试');
      }
    } else {
      // 添加新运动
      const newExercise = addUserExercise({
        ...formData,
        reps: parseInt(formData.reps),
        sets: parseInt(formData.sets),
        duration: parseInt(formData.duration),
        type: 'custom'
      });
      
      if (newExercise) {
        loadUserExercises();
        resetForm();
        alert('运动项目添加成功！');
      } else {
        alert('添加失败，请重试');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      category: '自定义',
      reps: 10,
      sets: 3,
      duration: 0,
      notes: ''
    });
    setShowAddForm(false);
    setEditingExercise(null);
  };

  const handleEdit = (exercise) => {
    setEditingExercise(exercise);
    setFormData({
      name: exercise.name,
      description: exercise.description || '',
      category: exercise.category,
      reps: exercise.reps || exercise.defaultReps || 10,
      sets: exercise.sets || exercise.defaultSets || 3,
      duration: exercise.duration || exercise.defaultDuration || 0,
      notes: exercise.notes || ''
    });
    setShowAddForm(true);
  };

  const handleDelete = (exerciseId) => {
    if (window.confirm('确定要删除这个运动项目吗？')) {
      const success = deleteUserExercise(exerciseId);
      if (success) {
        loadUserExercises();
        alert('删除成功！');
      } else {
        alert('删除失败，请重试');
      }
    }
  };

  const startWorkout = (exercise) => {
    setActiveWorkout({
      ...exercise,
      startTime: Date.now(),
      completed: false
    });
  };

  const completeWorkout = () => {
    if (activeWorkout) {
      const duration = Math.round((Date.now() - activeWorkout.startTime) / 1000);
      
      const record = addWorkoutRecord({
        exerciseId: activeWorkout.id,
        exerciseName: activeWorkout.name,
        reps: activeWorkout.reps || activeWorkout.defaultReps,
        sets: activeWorkout.sets || activeWorkout.defaultSets,
        duration: duration,
        targetDuration: activeWorkout.duration || activeWorkout.defaultDuration,
        category: activeWorkout.category,
        notes: `完成时间: ${duration}秒`
      });

      if (record) {
        setActiveWorkout(null);
        onStatsUpdate?.();
        alert(`🎉 运动完成！用时 ${duration} 秒`);
      }
    }
  };

  const renderWorkoutTimer = () => {
    if (!activeWorkout) return null;

    return (
      <div className="workout-timer card">
        <div className="timer-header">
          <h3>🏃‍♂️ 正在运动: {activeWorkout.name}</h3>
          <button 
            className="button complete-button"
            onClick={completeWorkout}
          >
            <CheckCircle size={16} />
            完成运动
          </button>
        </div>
        
        <div className="timer-info">
          {activeWorkout.duration > 0 ? (
            <p>目标时间: {activeWorkout.duration}秒</p>
          ) : (
            <p>目标: {activeWorkout.reps || activeWorkout.defaultReps}次 × {activeWorkout.sets || activeWorkout.defaultSets}组</p>
          )}
        </div>
      </div>
    );
  };

  const renderAddForm = () => {
    if (!showAddForm) return null;

    return (
      <div className="add-form card">
        <h3>{editingExercise ? '编辑运动' : '添加新运动'}</h3>
        
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>运动名称 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="input"
              required
              placeholder="输入运动名称"
            />
          </div>

          <div className="form-group">
            <label>描述</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="input"
              placeholder="简单描述这个运动"
            />
          </div>

          <div className="form-group">
            <label>分类</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="input"
            >
              <option value="自定义">自定义</option>
              <option value="胸部">胸部</option>
              <option value="腿部">腿部</option>
              <option value="核心">核心</option>
              <option value="有氧">有氧</option>
              <option value="全身">全身</option>
              <option value="背部">背部</option>
              <option value="手臂">手臂</option>
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>次数</label>
              <input
                type="number"
                value={formData.reps}
                onChange={(e) => setFormData({...formData, reps: e.target.value})}
                className="input"
                min="0"
              />
            </div>

            <div className="form-group">
              <label>组数</label>
              <input
                type="number"
                value={formData.sets}
                onChange={(e) => setFormData({...formData, sets: e.target.value})}
                className="input"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>时长(秒)</label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="input"
                min="0"
                placeholder="0表示以次数计算"
              />
            </div>
          </div>

          <div className="form-group">
            <label>备注</label>
            <input
              type="text"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              className="input"
              placeholder="添加一些注意事项或备注"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="button primary">
              {editingExercise ? '保存修改' : '添加运动'}
            </button>
            <button type="button" className="button secondary" onClick={resetForm}>
              取消
            </button>
          </div>
        </form>
      </div>
    );
  };

  const allExercises = [...defaultExercises, ...userExercises];

  return (
    <div className="workout-plan">
      <div className="plan-header">
        <h2>📅 运动计划</h2>
        <button 
          className="button primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus size={16} />
          添加运动
        </button>
      </div>

      {renderWorkoutTimer()}
      {renderAddForm()}

      <div className="exercises-section">
        <h3>🏋️‍♂️ 我的运动项目</h3>
        
        {allExercises.length === 0 ? (
          <div className="empty-state card">
            <p>还没有运动项目，点击上方按钮添加吧！</p>
          </div>
        ) : (
          <div className="exercises-list">
            {allExercises.map(exercise => (
              <div key={exercise.id} className="exercise-item card">
                <div className="exercise-header">
                  <div className="exercise-info">
                    <h4>{exercise.name}</h4>
                    <p className="exercise-category">{exercise.category}</p>
                    {exercise.description && (
                      <p className="exercise-desc">{exercise.description}</p>
                    )}
                  </div>
                  
                  <div className="exercise-actions">
                    <button 
                      className="button primary small"
                      onClick={() => startWorkout(exercise)}
                      disabled={activeWorkout !== null}
                    >
                      <Play size={14} />
                      开始
                    </button>
                    
                    {exercise.isCustom && (
                      <>
                        <button 
                          className="button secondary small"
                          onClick={() => handleEdit(exercise)}
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          className="button danger small"
                          onClick={() => handleDelete(exercise.id)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="exercise-details">
                  {exercise.duration > 0 || exercise.defaultDuration > 0 ? (
                    <div className="detail-item">
                      <Clock size={16} />
                      <span>{exercise.duration || exercise.defaultDuration}秒</span>
                    </div>
                  ) : (
                    <div className="detail-item">
                      <RotateCcw size={16} />
                      <span>
                        {exercise.reps || exercise.defaultReps}次 × 
                        {exercise.sets || exercise.defaultSets}组
                      </span>
                    </div>
                  )}
                </div>

                {exercise.notes && (
                  <div className="exercise-notes">
                    💡 {exercise.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .workout-plan {
          max-width: 800px;
          margin: 0 auto;
        }

        .plan-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .plan-header h2 {
          margin: 0;
          font-size: 1.8rem;
        }

        .workout-timer {
          background: linear-gradient(45deg, #667eea, #764ba2);
          margin-bottom: 25px;
        }

        .timer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .timer-header h3 {
          margin: 0;
          color: white;
        }

        .complete-button {
          background: rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: white;
        }

        .timer-info {
          color: rgba(255, 255, 255, 0.9);
        }

        .add-form {
          margin-bottom: 30px;
        }

        .add-form h3 {
          margin-bottom: 20px;
          text-align: center;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 25px;
        }

        .exercises-section h3 {
          margin-bottom: 20px;
          color: white;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: rgba(255, 255, 255, 0.7);
        }

        .exercises-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .exercise-item {
          transition: transform 0.3s ease;
        }

        .exercise-item:hover {
          transform: translateY(-2px);
        }

        .exercise-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .exercise-info h4 {
          margin: 0 0 5px 0;
          color: white;
          font-size: 1.2rem;
        }

        .exercise-category {
          color: #667eea;
          font-size: 12px;
          font-weight: 500;
          margin: 0 0 5px 0;
        }

        .exercise-desc {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          margin: 0;
        }

        .exercise-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .button.small {
          padding: 6px 12px;
          font-size: 12px;
          min-width: auto;
        }

        .button.danger {
          background: rgba(255, 107, 107, 0.8);
          border-color: rgba(255, 107, 107, 0.5);
        }

        .button.danger:hover {
          background: rgba(255, 107, 107, 1);
        }

        .exercise-details {
          display: flex;
          gap: 20px;
          margin-bottom: 10px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
        }

        .exercise-notes {
          background: rgba(255, 255, 255, 0.05);
          padding: 10px;
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 13px;
          border-left: 3px solid #667eea;
        }

        @media (max-width: 768px) {
          .plan-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .timer-header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }
          
          .exercise-header {
            flex-direction: column;
            gap: 15px;
          }
          
          .exercise-actions {
            justify-content: center;
          }
          
          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default WorkoutPlan;