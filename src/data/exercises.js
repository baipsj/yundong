// 内置运动项目数据
export const defaultExercises = [
  {
    id: 'pushup',
    name: '俯卧撑',
    type: 'strength',
    category: '胸部',
    description: '经典上肢力量训练动作',
    instructions: [
      '双手撑地，与肩同宽，身体保持一条直线',
      '慢慢下降身体，直到胸部接近地面',
      '用力推起身体，回到起始位置',
      '保持核心收紧，呼吸均匀'
    ],
    tips: [
      '初学者可以膝盖着地降低难度',
      '保持背部挺直，避免塌腰',
      '动作要缓慢控制，不要急躁'
    ],
    defaultReps: 15,
    defaultSets: 3,
    defaultDuration: 0 // 0表示以次数计算
  },
  {
    id: 'squat',
    name: '深蹲',
    type: 'strength',
    category: '腿部',
    description: '全身最佳力量训练动作之一',
    instructions: [
      '双脚分开与肩同宽，脚尖略向外',
      '保持上身挺直，慢慢下蹲',
      '大腿与地面平行时停顿',
      '用力站起，回到起始位置'
    ],
    tips: [
      '膝盖不要超过脚尖',
      '重心放在脚跟上',
      '下蹲时吸气，起立时呼气'
    ],
    defaultReps: 20,
    defaultSets: 3,
    defaultDuration: 0
  },
  {
    id: 'plank',
    name: '平板支撑',
    type: 'core',
    category: '核心',
    description: '最有效的核心力量训练',
    instructions: [
      '俯卧，用前臂和脚尖支撑身体',
      '身体保持一条直线',
      '收紧腹部和臀部',
      '保持自然呼吸'
    ],
    tips: [
      '不要憋气',
      '臀部不要翘起或下沉',
      '从30秒开始，逐渐增加时间'
    ],
    defaultReps: 0,
    defaultSets: 3,
    defaultDuration: 60 // 60秒
  },
  {
    id: 'jumping_jacks',
    name: '开合跳',
    type: 'cardio',
    category: '有氧',
    description: '全身有氧运动，提高心肺功能',
    instructions: [
      '站立，双脚并拢，双手自然下垂',
      '跳起时双脚分开，双手向上击掌',
      '跳回起始位置',
      '保持节奏感，连续进行'
    ],
    tips: [
      '落地时用前脚掌着地',
      '保持轻快的节奏',
      '根据体能调整速度'
    ],
    defaultReps: 30,
    defaultSets: 3,
    defaultDuration: 0
  },
  {
    id: 'burpee',
    name: 'Burpee',
    type: 'full_body',
    category: '全身',
    description: '高强度全身训练动作',
    instructions: [
      '站立位开始',
      '下蹲，双手撑地',
      '跳回成俯卧撑姿势',
      '完成一个俯卧撑',
      '跳回深蹲位',
      '向上跳起，双手举过头顶'
    ],
    tips: [
      '动作连贯，不要停顿',
      '初学者可以省略俯卧撑',
      '量力而行，逐渐增加强度'
    ],
    defaultReps: 10,
    defaultSets: 3,
    defaultDuration: 0
  },
  {
    id: 'mountain_climber',
    name: '登山者',
    type: 'cardio',
    category: '有氧',
    description: '高强度有氧运动，锻炼全身',
    instructions: [
      '俯卧撑起始位置',
      '快速交替将膝盖拉向胸部',
      '保持双手支撑稳定',
      '保持快速节奏'
    ],
    tips: [
      '保持背部平直',
      '核心始终收紧',
      '呼吸要跟上节奏'
    ],
    defaultReps: 20,
    defaultSets: 3,
    defaultDuration: 0
  },
  {
    id: 'wall_sit',
    name: '靠墙静蹲',
    type: 'strength',
    category: '腿部',
    description: '增强腿部肌肉耐力',
    instructions: [
      '背部贴墙站立',
      '慢慢下滑直到大腿与地面平行',
      '膝盖呈90度角',
      '保持这个姿势'
    ],
    tips: [
      '大腿要与地面平行',
      '膝盖不要超过脚尖',
      '保持均匀呼吸'
    ],
    defaultReps: 0,
    defaultSets: 3,
    defaultDuration: 45
  },
  {
    id: 'high_knees',
    name: '高抬腿',
    type: 'cardio',
    category: '有氧',
    description: '提高心率和腿部力量',
    instructions: [
      '原地站立',
      '快速交替抬起膝盖',
      '膝盖要尽量抬到腰部高度',
      '保持快速节奏'
    ],
    tips: [
      '保持上身挺直',
      '用前脚掌着地',
      '摆臂配合腿部动作'
    ],
    defaultReps: 30,
    defaultSets: 3,
    defaultDuration: 0
  },
  {
    id: 'leg_raises',
    name: '仰卧抬腿',
    type: 'core',
    category: '核心',
    description: '针对下腹部的核心训练',
    instructions: [
      '仰卧在地面上，双手放在身体两侧',
      '双腿伸直并拢，保持脚尖向上',
      '慢慢抬起双腿至垂直地面',
      '缓慢放下双腿，但不要完全触地'
    ],
    tips: [
      '保持下背部贴地，避免拱背',
      '动作要缓慢控制，感受腹部发力',
      '如果太难可以微屈膝盖'
    ],
    defaultReps: 15,
    defaultSets: 3,
    defaultDuration: 0
  },
  {
    id: 'crunches',
    name: '简易卷腹',
    type: 'core',
    category: '核心',
    description: '经典的腹部训练动作',
    instructions: [
      '仰卧，双膝弯曲，脚掌平放地面',
      '双手轻放头后，不要用力拉头',
      '用腹部力量卷起上身，肩胛骨离地',
      '缓慢放下，但不要完全躺平'
    ],
    tips: [
      '下巴与胸部保持一拳距离',
      '呼气时卷起，吸气时放下',
      '感受腹部肌肉的收缩'
    ],
    defaultReps: 20,
    defaultSets: 3,
    defaultDuration: 0
  },
  {
    id: 'russian_twist',
    name: '俄罗斯转体',
    type: 'core',
    category: '核心',
    description: '锻炼腹斜肌和核心稳定性',
    instructions: [
      '坐在地面上，膝盖弯曲，脚掌抬起',
      '身体略微后倾，保持背部挺直',
      '双手合十在胸前',
      '左右转动躯干，双手触碰地面两侧'
    ],
    tips: [
      '保持核心收紧，避免用惯性',
      '转动时保持均匀呼吸',
      '初学者可以脚掌着地降低难度'
    ],
    defaultReps: 30,
    defaultSets: 3,
    defaultDuration: 0
  }
];

// 运动类型配置
export const exerciseTypes = {
  strength: '力量训练',
  cardio: '有氧运动',
  core: '核心训练',
  full_body: '全身训练',
  flexibility: '柔韧性训练'
};

// 运动分类配置
export const exerciseCategories = {
  '胸部': '#FF6B6B',
  '腿部': '#4ECDC4',
  '核心': '#45B7D1',
  '有氧': '#96CEB4',
  '全身': '#FECA57',
  '背部': '#FF9FF3',
  '手臂': '#54A0FF'
};