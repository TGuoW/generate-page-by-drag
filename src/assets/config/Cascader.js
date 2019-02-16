export default {
  baseConfig: {
    name: 'Cascader',
    desc: '级联选择器',
    options: [
      {
        name: 'placeholder',
        desc: '默认文字',
        type: 'input'
      },
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
        name: 'separator',
        desc: '选项分隔符',
        type: 'input'
      },
      {
        name: 'options',
        desc: '菜单配置',
        type: 'tree'
      },
      {
        name: 'expand-trigger',
        desc: '展开方式',
        type: 'select',
        selectArr: [
          {value: 'click', label: 'click'},
          {value: 'hover', label: 'hover'}
        ]
      },
      {
        name: 'show-all-levels',
        desc: '显示完整路径',
        type: 'switch'
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
    size: '',
    options: [],
    placeholder: '请选择',
    separator: '/',
    value: [],
    type: '',
    'expand-trigger': 'click',
    'show-all-levels': true,
    clearable: false,
    disabled: false
  }
}