export default [
  {
    "name": "basic",
    "desc": "基础组件",
    "children": [
      {
        "name": "Button",
        "desc": "按钮",
        "componentName": "el-button",
        "innerText": "默认按钮"
      }
    ]
  },
  {
    "name": "form",
    "desc": "表单类组件",
    "children": [
      {
        "name": "Radio",
        "desc": "单选框",
        "componentName": "el-radio-group",
        "childComponentName": "el-radio",
        "childComponentArr": [
          { label: '备选项1', disabled: false },
          { label: '备选项2', disabled: false }
        ],
        "innerText": "备选项",
        "rules": []
      },
      {
        "name": "Checkbox",
        "desc": "复选框",
        "componentName": "el-checkbox-group",
        "childComponentName": "el-checkbox",
        "componentNumber": 2,
        "childComponentArr": [
          { label: '备选项1', disabled: false },
          { label: '备选项2', disabled: false }
        ],
        "value": [],
        "rules": []
      },
      {
        "name": "Input",
        "desc": "输入框",
        "componentName": "el-input",
        "rules": []
      },
      {
        "name": "InputNumber",
        "desc": "计数器",
        "componentName": "el-input-number",
        "value": 0,
        "rules": []
      },
      {
        "name": "Select",
        "desc": "选择器",
        "componentName": "el-select",
        "childComponentName": "el-option",
        "childComponentArr": [
          { label: '备选项1', value: 'test1', disabled: false },
          { label: '备选项2', value: 'test2', disabled: false }
        ],
        "value": '',
        "rules": []
      },
      {
        "name": "Cascader",
        "desc": "级联选择器",
        "componentName": "el-cascader",
        "value": [],
        "rules": [],
        "options": [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
      },
      {
        "name": "Switch",
        "desc": "开关",
        "componentName": "el-switch",
        "rules": []
      },
      {
        "name": "Slider",
        "desc": "滑块",
        "componentName": "el-slider",
        "rules": []
      },
      {
        "name": "TimePicker",
        "desc": "时间选择器",
        "componentName": "el-time-picker",
        "rules": []
      },
      {
        "name": "DatePicker",
        "desc": "日期选择器",
        "componentName": "el-date-picker",
        "rules": []
      },
  //     {
  //       "name": "DateTimePicker",
  //       "desc": "时间日期选择器",
  //       "componentName": "el-date-picker"
  //     },
      // {
      //   "name": "Upload",
      //   "desc": "上传",
      //   "componentName": "el-upload",
      //   "action": ""
      // },
      {
        "name": "Rate",
        "desc": "评分",
        "componentName": "el-rate",
        "rules": []
      },
      {
        "name": "ColorPicker",
        "desc": "颜色选择器",
        "componentName": "el-color-picker",
        "rules": []
      },
      {
        "name": "Transfer",
        "desc": "穿梭框",
        "componentName": "el-transfer",
        "value": [],
        "data": [
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
        ],
        "rules": []
      },
  //     {
  //       "name": "Form",
  //       "desc": "表单",
  //       "componentName": "el-form"
  //     }
    ]
  },
  // {
  //   "name": "Data",
  //   "desc": "数据类组件",
  //   "children": [
  //     {
  //       "name": "Table",
  //       "desc": "表格",
  //       "componentName": "el-table"
  //     },
  //     {
  //       "name": "Tag",
  //       "desc": "标签",
  //       "componentName": "el-tag"
  //     },
  //     {
  //       "name": "Progress",
  //       "desc": "进度条",
  //       "componentName": "el-progress"
  //     },
  //     {
  //       "name": "Tree",
  //       "desc": "树形控件",
  //       "componentName": "el-tree"
  //     },
  //     {
  //       "name": "Pagination",
  //       "desc": "分页",
  //       "componentName": "el-pagination"
  //     },
  //     {
  //       "name": "Badge",
  //       "desc": "标记",
  //       "componentName": "el-badge"
  //     }
  //   ]
  // },
  // {
  //   "name": "Notice",
  //   "desc": "提示类组件",
  //   "children": [
  //     {
  //       "name": "Alert",
  //       "desc": "警告",
  //       "componentName": "el-alert"
  //     }
  //   ]
  // },
  // {
  //   "name": "Navigation",
  //   "desc": "导航类组件",
  //   "children": [
  //     {
  //       "name": "NavMenu",
  //       "desc": "导航菜单",
  //       "componentName": "el-menu"
  //     },
  //     {
  //       "name": "Tabs",
  //       "desc": "标签页",
  //       "componentName": "el-tabs"
  //     },
  //     {
  //       "name": "Breadcrumb",
  //       "desc": "面包屑",
  //       "componentName": "el-breadcrumb"
  //     },
  //     {
  //       "name": "Dropdown",
  //       "desc": "下拉菜单",
  //       "componentName": "el-dropdown"
  //     },
  //     {
  //       "name": "Steps",
  //       "desc": "步骤条",
  //       "componentName": "el-steps"
  //     }
  //   ]
  // },
  // {
  //   "name": "Others",
  //   "desc": "其它组件",
  //   "children": [
  //     {
  //       "name": "Dialog",
  //       "desc": "对话框",
  //       "componentName": "el-dialog"
  //     },
  //     {
  //       "name": "Tooltip",
  //       "desc": "文字提示",
  //       "componentName": "el-tooltip"
  //     },
  //     {
  //       "name": "Popover",
  //       "desc": "弹出框",
  //       "componentName": "el-popover"
  //     },
  //     {
  //       "name": "Card",
  //       "desc": "卡片",
  //       "componentName": "el-card"
  //     },
  //     {
  //       "name": "Carousel",
  //       "desc": "走马灯",
  //       "componentName": "el-carousel"
  //     },
  //     {
  //       "name": "Collapse",
  //       "desc": "折叠面板",
  //       "componentName": "el-collapse"
  //     }
  //   ]
  // }
]