import React, { createContext, useContext, useState, ReactNode } from "react"

export type BibleVersion = "acf" | "kjf" | "nbv" | "nvi"

type Settings = {
  bibleVersion: BibleVersion
  fontSize: number
  setBibleVersion: (version: BibleVersion) => void
  setFontSize: (size: number) => void
}

const SettingsContext = createContext<Settings | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {

  const [bibleVersion, setBibleVersion] = useState<BibleVersion>("acf")
  const [fontSize, setFontSize] = useState(18)

  return (
    <SettingsContext.Provider
      value={{
        bibleVersion,
        fontSize,
        setBibleVersion,
        setFontSize
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {

  const context = useContext(SettingsContext)

  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider")
  }

  return context
}