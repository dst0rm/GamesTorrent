import React from "react";
import { Game } from "../types/game";

export const useGames = () => {
  const [games, setGames] = React.useState<Game[]>([]);
  const [filteredGames, setFilteredGames] = React.useState<Game[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentSource, setCurrentSource] = React.useState('https://hydralinks.cloud/sources/gog.json');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedGame, setSelectedGame] = React.useState<Game | null>(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;

  const loadGames = React.useCallback(async (source: string) => {
    setLoading(true);
    try {
      const res = await fetch(source);
      const data = await res.json();
      const downloadedGames = data.downloads || [];
      setGames(downloadedGames);
      setFilteredGames(downloadedGames);
    } catch (error) {
      console.error('Error loading games:', error);
      setGames([]);
      setFilteredGames([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadGames(currentSource);
  }, [currentSource, loadGames]);

  React.useEffect(() => {
    if (searchQuery) {
      const filtered = games.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredGames(filtered);
      setCurrentPage(1);
    } else {
      setFilteredGames(games);
    }
  }, [searchQuery, games]);

  // Calculate paginated games
  const paginatedGames = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredGames.slice(startIndex, startIndex + pageSize);
  }, [filteredGames, currentPage, pageSize]);

  return {
    games,
    filteredGames,
    loading,
    currentSource,
    setCurrentSource,
    searchQuery,
    setSearchQuery,
    selectedGame,
    setSelectedGame,
    currentPage,
    setCurrentPage,
    pageSize,
    paginatedGames
  };
};
