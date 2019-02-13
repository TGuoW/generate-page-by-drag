export default {
  baseConfig: {
    name: 'Switch',
    desc: '开关',
    options: [
      {
        name: 'max',
        desc: '最大分值',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'allow-half',
        desc: '允许半选',
        type: 'switch'
      },
      {
        name: 'low-threshold',
        desc: '低中界限值',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'high-threshold',
        desc: '中高界限值',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'void-color',
        desc: '未选中color',
        type: 'color'
      },
      {
        name: 'disabled-void-color',
        desc: '只读color',
        type: 'color'
      },
      {
        name: 'show-text',
        desc: '显示文字',
        type: 'switch'
      },
      {
        name: 'show-score',
        desc: '显示分数',
        type: 'switch'
      },
      {
        name: 'text-color',
        desc: '文字color',
        type: 'color'
      },
      {
        name: 'disabled',
        desc: '是否禁用',
        type: 'switch'
      }
    ]
  },
  formValue: {
    max: 5,
    'allow-half': false,
    'low-threshold': 2,
    'high-threshold': 4,
    'void-color': '	#C6D1DE',
    'disabled-void-color': '#EFF2F7',
    'show-text': false,
    'show-score': false,
    'text-color': '#1F2D3D',
    value: '',
    disabled: false
  }
}