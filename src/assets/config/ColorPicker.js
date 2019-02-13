export default {
  baseConfig: {
    name: 'Switch',
    desc: '开关',
    options: [
      {
        name: 'width',
        desc: '宽度',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'active-text',
        desc: '开启text',
        type: 'input'
      },
      {
        name: 'inactive-text',
        desc: '关闭text',
        type: 'input'
      },
      {
        name: 'activeValue',
        desc: '开启value',
        type: 'input'
      },
      {
        name: 'inactiveValue',
        desc: '关闭value',
        type: 'input'
      },
      {
        name: 'active-color',
        desc: '开启color',
        type: 'color'
      },
      {
        name: 'inactive-color',
        desc: '关闭color',
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
    width: 40,
    'active-text': '',
    'inactive-text': '',
    'activeValue': '',
    'inactiveValue': '',
    'active-color': '#409EFF',
    'inactive-color': '#909399',
    value: '',
    disabled: false
  }
}