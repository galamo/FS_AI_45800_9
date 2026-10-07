import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react"

type AppSettings = {
  showMap: boolean;
  isLocalTime:boolean
  dateFormat:string
}

type AppContextValue = {
  settings: AppSettings
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
}

const defaultSettings: AppSettings = {
  showMap: true,
  isLocalTime:true,
  dateFormat: "dd/MMM/yyyy HH:mm"
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings)

  function setSetting<K extends keyof AppSettings>(key: K, value: AppSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  return (
    <AppContext.Provider value={{ settings, setSetting }}>
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider")
  }
  return context
}
