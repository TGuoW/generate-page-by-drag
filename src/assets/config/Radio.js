export default {
  baseConfig: {
    name: 'Button',
    desc: '按钮',
    options: [
      {
        name: 'type',
        desc: '按钮类型',
        type: 'select',
        selectArr: [
          {value: '', label: '默认按钮'},
          {value: 'primary', label: '主要按钮'},
          {value: 'success', label: '成功按钮'},
          {value: 'info', label: '信息按钮'},
          {value: 'warning', label: '警告按钮'},
          {value: 'danger', label: '危险按钮'},
          {value: 'text', label: '文字按钮'}
        ]
      },
      {
        name: 'innerText',
        desc: '按钮文字',
        type: 'input'
      },
      {
        name: 'plain',
        desc: '朴素按钮',
        type: 'switch'
      },
      {
        name: 'round',
        desc: '圆角',
        type: 'switch'
      },
      {
        name: 'circle',
        desc: '圆形',
        type: 'switch'
      },
      {
        name: 'disabled',
        desc: '禁用',
        type: 'switch'
      },
      {
        name: 'autofocus',
        desc: '默认聚焦',
        type: 'switch'
      }
    ]
  },
  formValue: {
    type: '',
    plain: false,
    round: false,
    circle: false,
    disabled: false,
    autofocus: false
  }
}