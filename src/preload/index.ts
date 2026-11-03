import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('app', {
  setTheme: (mode: 'light' | 'dark' | 'system'): Promise<boolean> =>
    ipcRenderer.invoke('theme:set', mode)
})
