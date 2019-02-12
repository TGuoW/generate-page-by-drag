export default {
  baseConfig: {
    name: 'Switch',
    desc: '开关',
    options: [
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
        name: 'active-text',
        desc: '默认文字',
        type: 'input'
      },
      {
        name: 'inactive-text',
        desc: '默认文字',
        type: 'input'
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