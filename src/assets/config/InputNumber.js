export default {
  baseConfig: {
    name: 'InputNumber',
    desc: '计数器',
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
        desc: '计数器步长',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'precision',
        desc: '数值精度',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'size',
        desc: '尺寸',
        type: 'select',
        selectArr: [
          {value: 'large', label: 'large'},
          {value: 'small', label: 'small'}
        ]
      },
      {
        name: 'controls',
        desc: '显示控制按钮',
        type: 'switch'
      },
      {
        name: 'controls-position',
        desc: '控制按钮位置',
        type: 'select',
        selectArr: [
          {value: 'right', label: 'right'},
          {value: '', label: 'default'}
        ]
      },
      {
        name: 'disabled',
        desc: '禁用',
        type: 'switch'
      }
    ]
  },
  formValue: {
    innerText: '计数器',
    // min: '',
    // max: '',
    step: 1,
    // precision: '',
    size: '',
    controls: '',
    'controls-position': '',
    disabled: false
  }
}