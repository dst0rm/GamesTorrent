import React from "react";

type Locale = "en" | "ru";

const translations = {
  en: {
    gameList: "GamesTorrent",
    totalGames: "Total Games",
    searchGames: "Search games...",
    selectSource: "Select Source",
    loading: "Loading...",
    title: "Title",
    size: "Size",
    uploadDate: "Upload Date",
    actions: "Actions",
    noGamesFound: "No games found",
    viewDetails: "View Details",
    download: "Download",
    back: "Back",
    fileSize: "File Size",
    notSpecified: "Not specified",
    link: "Link",
    magnetLink: "Magnet Link"
  },
  ru: {
    gameList: "GamesTorrent",
    totalGames: "Всего игр",
    searchGames: "Поиск игр...",
    selectSource: "Источник:",
    loading: "Загрузка...",
    title: "Название",
    size: "Размер",
    uploadDate: "Дата загрузки",
    actions: "Действия",
    noGamesFound: "Игры не найдены",
    viewDetails: "Подробности",
    download: "Скачать",
    back: "Назад",
    fileSize: "Размер файла",
    notSpecified: "Не указано",
    link: "Ссылка",
    magnetLink: "Magnet-ссылка"
  }
};

export const useLocalization = () => {
  const [locale, setLocale] = React.useState<Locale>("ru");

  const t = React.useCallback((key: keyof typeof translations.en) => {
    return translations[locale][key];
  }, [locale]);

  return { t, locale, setLocale };
};
