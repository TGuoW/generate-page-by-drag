export default {
  baseConfig: {
    name: 'Switch',
    desc: '开关',
    options: [
      {
        name: 'size',
        desc: '尺寸',
        type: 'select',
        selectArr: [
          {value: 'medium', label: 'medium'},
          {value: 'small', label: 'small'},
          {value: 'mini', label: 'mini'}
        ]
      },
      {
        name: 'show-alpha',
        desc: '透明度选择',
        type: 'switch'
      },
      {
        name: 'color-format',
        desc: '颜色表示',
        type: 'select',
        selectArr: [
          {value: 'hsl', label: 'hsl'},
          {value: 'hsv', label: 'hsv'},
          {value: 'hex', label: 'hex'},
          {value: 'rgb', label: 'rgb'}
        ]
      },
      {
        name: 'predefine',
        desc: '预定义颜色',
        type: 'colorArr'
      },
      {
        name: 'disabled',
        desc: '是否禁用',
        type: 'switch'
      }
    ]
  },
  formValue: {
    size: '',
    'show-alpha': false,
    'color-format': 'hex',
    value: '',
    disabled: false
  }
}