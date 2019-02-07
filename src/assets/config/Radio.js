export default {
  baseConfig: {
    name: 'Radio',
    desc: '输入框',
    options: [
      {
        name: 'componentNumber',
        desc: '组件数量',
        type: 'input'
      },
      {
        name: 'childComponentArr',
        desc: '组件选项',
        type: 'inputArr',
        inputArr: [
          {label: '备选项1' },
          {label: '备选项2' }
        ]
      },
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
        name: 'border',
        desc: '是否有边框',
        type: 'switch'
      },
      {
        name: 'disabled',
        desc: '是否禁用',
        type: 'switch'
      }
    ]
  },
  formValue: {
    componentNumber: 2,
    childComponentArr: [
      {label: '备选项1' },
      {label: '备选项2' }
    ],
    value: '',
    size: '',
    border: false,
    disabled: false
  }
}