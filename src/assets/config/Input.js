export default {
  baseConfig: {
    name: 'Input',
    desc: '输入框',
    options: [
      {
        name: 'size',
        desc: '尺寸',
        type: 'select',
        selectArr: [
          {value: '', label: 'default'},
          {value: 'medium', label: 'medium'},
          {value: 'small', label: 'small'},
          {value: 'mini', label: 'mini'}
        ]
      },
      {
        name: 'placeholder',
        desc: '默认文字',
        type: 'input'
      },
      {
        name: 'clearable',
        desc: '是否可清空',
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
    innerText: '输入框',
    placeholder: '',
    value: '',
    type: '',
    clearable: false,
    disabled: false
  }
}