import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./assets/i18n/locales/en.json";
import plFemale from "./assets/i18n/locales/pl-female.json";
import plMale from "./assets/i18n/locales/pl-male.json";

const resources = {
  en: { translation: en },
  plFemale: { translation: plFemale },
  plMale: { translation: plMale },
};

// eslint-disable-next-line import/no-named-as-default-member
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
