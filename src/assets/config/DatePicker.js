export default {
  baseConfig: {
    name: 'DatePicker',
    desc: '日期选择器',
    options: [
      {
        name: 'type',
        desc: '类型',
        type: 'select',
        selectArr: [
          {value: 'year', label: 'year'},
          {value: 'month', label: 'month'},
          {value: 'date', label: 'date'},
          {value: 'dates', label: 'dates'},
          {value: 'week', label: 'week'},
          {value: 'datetime', label: 'datetime'},
          {value: 'datetimerange', label: 'datetimerange'},
          {value: 'daterange', label: 'daterange'}
        ]
      },
      {
        name: 'readonly',
        desc: '完全只读',
        type: 'switch'
      },
      {
        name: 'editable',
        desc: '文本框输入',
        type: 'switch'
      },
      {
        name: 'clearable',
        desc: '是否可清除',
        type: 'switch'
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
        name: 'placeholder',
        desc: '占位符',
        type: 'input'
      },
      {
        name: 'start-placeholder',
        desc: '开始占位符',
        type: 'input'
      },
      {
        name: 'end-placeholder',
        desc: '结束占位符',
        type: 'input'
      },
      {
        name: 'is-range',
        desc: '范围选择',
        type: 'switch'
      },
      {
        name: 'arrow-control',
        desc: '箭头选择',
        type: 'switch'
      },
      {
        name: 'align',
        desc: '对齐方式',
        type: 'select',
        selectArr: [
          {value: 'left', label: 'left'},
          {value: 'center', label: 'center'},
          {value: 'right', label: 'right'}
        ]
      },
      {
        name: 'range-separator',
        desc: '范围分隔符',
        type: 'input'
      },
      {
        name: 'value-format',
        desc: '值的格式',
        type: 'select',
        selectArr: [
          {value: 'left', label: 'left'},
          {value: 'center', label: 'center'},
          {value: 'right', label: 'right'}
        ]
      },
      {
        name: 'default-value',
        desc: '默认时间',
        type: 'date'
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
    readonly: false,
    editable: true,
    clearable: true,
    placeholder: '',
    'start-placeholder': '',
    'end-placeholder': '',
    'is-range': true,
    'arrow-control': false,
    align: 'left',
    'range-separator': '-',
    'value-format': '',
    value: [],
    disabled: false
  }
}