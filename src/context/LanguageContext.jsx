import React, { createContext, useContext, useState, useCallback } from 'react'
import fr from '../translations/fr'
import en from '../translations/en'
import ar from '../translations/ar'

const translations = { fr, en, ar }

const LanguageContext = createContext({
  language: 'fr',
  setLanguage: () => {},
  t: (key) => key,
  isRTL: false,
})

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr')

  const t = useCallback((key) => {
    const keys = key.split('.')
    let value = translations[language]
    for (const k of keys) {
      value = value?.[k]
    }
    return value ?? key
  }, [language])

  const isRTL = language === 'ar'

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
