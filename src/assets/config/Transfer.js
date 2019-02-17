export default {
  baseConfig: {
    name: 'Transfer',
    desc: '穿梭框',
    options: [
      {
        name: 'componentNumber',
        desc: '数据源数量',
        type: 'input'
      },
      {
        name: 'data',
        desc: '数据源',
        type: 'inputArr',
        inputArr: [
          {
            key: 0,
            label: `备选项1`,
            disabled: false
          },
          {
            key: 1,
            label: `备选项2`,
            disabled: false
          }
        ]
      },
      {
        name: 'filterable',
        desc: '是否可搜索',
        type: 'switch'
      },
      {
        name: 'filter-placeholder',
        desc: '搜索占位符',
        type: 'input'
      },
      {
        name: 'target-order',
        desc: '排序策略',
        type: 'select',
        selectArr: [
          {value: 'original', label: 'original'},
          {value: 'push', label: 'push'},
          {value: 'unshift', label: 'unshift'}
        ]
      }
    ]
  },
  formValue: {
    componentNumber: 2,
    data: [],
    filterable: false,
    'filter-placeholder': '请输入搜索内容',
    'target-order': 'original',
    titles: [],
    'button-texts': [],
    value: ''
  }
}