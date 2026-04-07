import { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Apply direction based on language
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;

    // Persist language choice
    localStorage.setItem("pharma_language", i18n.language);
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language: i18n.language,
        toggleLanguage,
        changeLanguage,
        isRTL: i18n.language === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
