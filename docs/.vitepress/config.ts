import { defineConfig } from 'vitepress'
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  title: "MyElement",
  description: "A VitePress Site",
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        css: {
          additionalData: `@import './styles/sidebar.css';`
        }
      }
    }
  },
  themeConfig: {
    docFooter: {
      prev: '上一组件',
      next: '下一组件'
    },
    nav: [
      { text: '指南', link: '/' },
      { text: '组件', link: '/components/button' }
    ],
    sidebar: [
      {
        text: '组件',
        collapsed: false, // 保持分组展开
        items: [
          { text: '按钮 Button', link: '/components/button'},
          { text: '布局容器 Container', link: '/components/container'},
          { text: '链接 Link', link: '/components/link'},
          { text: '折叠面板 Collapse', link: '/components/collapse'},
          { text: '图标 Icon', link: '/components/icon'},
          {text: '计时器 Timer', link: '/components/timer'},
        ]
      },
      {
        text: '反馈',
        collapsed: false, // 保持分组展开
        items: [
          { text: '反馈 Alert', link: '/components/alert'},
          { text: '消息提示 Message', link: '/components/message'},
          { text: '消息弹出框 MessageBox', link: '/components/messagebox'},
          { text: '文字提示 Tooltip', link: '/components/tooltip'},
          { text: '下拉菜单 Dropdown', link: '/components/dropdown'}
        ]
      },
      {
        text: '数据输入',
        collapsed: false, // 保持分组展开
        items: [
          { text: '开关 Switch', link: '/components/switch'},
          { text: '评分 Rate', link: '/components/rate'},
          { text: '输入框 Input', link: '/components/input'},
          { text: '选择框 Select', link: '/components/select'},
          { text: '表单 Form', link: '/components/form'},          
          { text: '日期选择器 DatePicker', link: '/components/datepicker'},
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  markdown: {
    config(md) {
      md.use(containerPreview)
      md.use(componentPreview)
    }
  },
  base: '/my-element/',
  head: [
    ['link', { rel: 'icon', href: '/element2.svg', type: "image/svg+xml" }]
  ]
})