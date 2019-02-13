export default {
  baseConfig: {
    name: 'Slider',
    desc: '滑块',
    options: [
      {
        name: 'min',
        desc: '最小值',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'max',
        desc: '最大值',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'step',
        desc: '步长',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'show-input',
        desc: '显示输入框',
        type: 'switch'
      },
      {
        name: 'show-input-controls',
        desc: '显示控制',
        type: 'switch'
      },
      {
        name: 'input-size',
        desc: '输入框尺寸',
        type: 'select',
        selectArr: [
          {value: 'large', label: 'large'},
          {value: 'medium', label: 'medium'},
          {value: 'small', label: 'small'},
          {value: 'mini', label: 'mini'}
        ]
      },
      {
        name: 'show-stops',
        desc: '显示间断点',
        type: 'switch'
      },
      {
        name: 'show-tooltip',
        desc: '显示tooltip',
        type: 'switch'
      },
      {
        name: 'range',
        desc: '范围显示',
        type: 'switch'
      },
      {
        name: 'vertical',
        desc: '竖向显示',
        type: 'switch'
      },
      {
        name: 'height',
        desc: '高度(加单位)',
        type: 'input'
      },
      {
        name: 'disabled',
        desc: '是否禁用',
        type: 'switch'
      }
    ]
  },
  formValue: {
    step: 1,
    height: '200px',
    'show-input-controls': true,
    value: '',
    disabled: false
  }
}