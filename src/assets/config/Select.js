export default {
  baseConfig: {
    name: 'Select',
    desc: '下拉框',
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
          { label: '备选项1' },
          { label: '备选项2' }
        ]
      },
      // {
      //   name: 'multiple',
      //   desc: '是否多选',
      //   type: 'switch'
      // },
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
        name: 'clearable',
        desc: '是否可清空',
        type: 'switch'
      },
      {
        name: 'placeholder',
        desc: '默认文字',
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
    componentNumber: 2,
    childComponentArr: [
      {label: '备选项1' },
      {label: '备选项2' }
    ],
    value: '',
    multiple: false,
    size: '',
    border: false,
    disabled: false
  }
}