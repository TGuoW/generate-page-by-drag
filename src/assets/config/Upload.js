export default {
  baseConfig: {
    name: 'Switch',
    desc: '开关',
    options: [
      {
        name: 'action',
        desc: '上传地址',
        type: 'input'
      },
      {
        name: 'multiple',
        desc: '支持多选',
        type: 'switch'
      },
      {
        name: 'with-credentials',
        desc: '发送cookie',
        type: 'switch'
      },
      {
        name: 'show-file-list',
        desc: '显示上传列表',
        type: 'switch'
      },
      {
        name: 'drag',
        desc: '拖曳上传',
        type: 'switch'
      },
      {
        name: '文件列表类型',
        desc: '颜色表示',
        type: 'select',
        selectArr: [
          {value: 'text', label: 'text'},
          {value: 'picture', label: 'picture'},
          {value: 'picture-card', label: 'picture-card'}
        ]
      },
      {
        name: 'auto-upload',
        desc: '选取立即上传',
        type: 'switch'
      },
      {
        name: 'limit',
        desc: '个数限制',
        type: 'input',
        nativeType: 'Number'
      },
      {
        name: 'disabled',
        desc: '是否禁用',
        type: 'switch'
      }
    ]
  },
  formValue: {
    action: 'http://expamle.com/upload',
    multiple: false,
    'with-credentials': false,
    'show-file-list': false,
    drag: false,
    'list-type': 'text',
    'auto-upload': false,
    value: '',
    disabled: false
  }
}