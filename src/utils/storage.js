// 本地存储工具函数

// 存储键名
const STORAGE_KEYS = {
  USER_EXERCISES: 'fitness_app_user_exercises',
  WORKOUT_RECORDS: 'fitness_app_workout_records',
  USER_SETTINGS: 'fitness_app_user_settings'
};

// 获取用户自定义运动项目
export const getUserExercises = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_EXERCISES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('获取用户运动项目失败:', error);
    return [];
  }
};

// 保存用户自定义运动项目
export const saveUserExercises = (exercises) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_EXERCISES, JSON.stringify(exercises));
    return true;
  } catch (error) {
    console.error('保存用户运动项目失败:', error);
    return false;
  }
};

// 添加新的用户运动项目
export const addUserExercise = (exercise) => {
  const exercises = getUserExercises();
  const newExercise = {
    ...exercise,
    id: `user_${Date.now()}`,
    isCustom: true,
    createdAt: new Date().toISOString()
  };
  exercises.push(newExercise);
  return saveUserExercises(exercises) ? newExercise : null;
};

// 更新用户运动项目
export const updateUserExercise = (exerciseId, updates) => {
  const exercises = getUserExercises();
  const index = exercises.findIndex(ex => ex.id === exerciseId);
  
  if (index !== -1) {
    exercises[index] = {
      ...exercises[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return saveUserExercises(exercises);
  }
  return false;
};

// 删除用户运动项目
export const deleteUserExercise = (exerciseId) => {
  const exercises = getUserExercises();
  const filteredExercises = exercises.filter(ex => ex.id !== exerciseId);
  return saveUserExercises(filteredExercises);
};

// 获取运动记录
export const getWorkoutRecords = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WORKOUT_RECORDS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('获取运动记录失败:', error);
    return [];
  }
};

// 保存运动记录
export const saveWorkoutRecords = (records) => {
  try {
    localStorage.setItem(STORAGE_KEYS.WORKOUT_RECORDS, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error('保存运动记录失败:', error);
    return false;
  }
};

// 添加运动记录
export const addWorkoutRecord = (record) => {
  const records = getWorkoutRecords();
  const newRecord = {
    ...record,
    id: `record_${Date.now()}`,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    timestamp: new Date().toISOString()
  };
  records.unshift(newRecord); // 最新记录在前
  return saveWorkoutRecords(records) ? newRecord : null;
};

// 获取今日运动记录
export const getTodayRecords = () => {
  const today = new Date().toISOString().split('T')[0];
  const records = getWorkoutRecords();
  return records.filter(record => record.date === today);
};

// 获取指定日期范围的运动记录
export const getRecordsByDateRange = (startDate, endDate) => {
  const records = getWorkoutRecords();
  return records.filter(record => {
    return record.date >= startDate && record.date <= endDate;
  });
};

// 获取运动统计数据
export const getWorkoutStats = () => {
  const records = getWorkoutRecords();
  const today = new Date().toISOString().split('T')[0];
  
  // 今日完成的运动
  const todayRecords = records.filter(record => record.date === today);
  
  // 本周完成的运动
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const weekStartStr = weekStart.toISOString().split('T')[0];
  const weekRecords = records.filter(record => record.date >= weekStartStr);
  
  // 总运动次数
  const totalWorkouts = records.length;
  
  // 连续运动天数
  let consecutiveDays = 0;
  const uniqueDates = [...new Set(records.map(r => r.date))].sort().reverse();
  
  for (let i = 0; i < uniqueDates.length; i++) {
    const date = new Date(uniqueDates[i]);
    const expectedDate = new Date();
    expectedDate.setDate(expectedDate.getDate() - i);
    const expectedDateStr = expectedDate.toISOString().split('T')[0];
    
    if (uniqueDates[i] === expectedDateStr) {
      consecutiveDays++;
    } else {
      break;
    }
  }
  
  return {
    todayWorkouts: todayRecords.length,
    weekWorkouts: weekRecords.length,
    totalWorkouts,
    consecutiveDays,
    lastWorkoutDate: records.length > 0 ? records[0].date : null
  };
};

// 获取用户设置
export const getUserSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_SETTINGS);
    return data ? JSON.parse(data) : {
      dailyGoal: 3, // 每日运动目标次数
      reminderEnabled: true,
      reminderTime: '08:00'
    };
  } catch (error) {
    console.error('获取用户设置失败:', error);
    return {
      dailyGoal: 3,
      reminderEnabled: true,
      reminderTime: '08:00'
    };
  }
};

// 保存用户设置
export const saveUserSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SETTINGS, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('保存用户设置失败:', error);
    return false;
  }
};

// 清除所有数据（重置应用）
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('清除数据失败:', error);
    return false;
  }
};