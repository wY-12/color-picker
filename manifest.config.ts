import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  host_permissions: [
    "https://*/*",
    "http://*/*"
  ],
  commands: {
    "activate-picker": {
      description: "启动拾色器功能",
      suggested_key: {
        default: 'Alt+Q',
        mac: "Command+Shift+Q"
      },
    },
  },
  icons: {
    16: 'public/logo.png',
    32: 'public/logo.png',
    48: 'public/logo.png',
  },
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    default_popup: 'src/popup/index.html',
  },
  content_scripts: [{
    js: ['src/content/content.ts'],
    matches: ['https://*/*', 'http://*/*'],
  }],
  permissions: [
    "scripting",
    "tabs",
    'storage',
    "commands",
    "activeTab",
  ],
  background: {
    service_worker: 'src/content/background.js',
    type: 'module',
  },
})