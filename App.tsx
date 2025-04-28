import React from "react";
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  Input, 
  Select, 
  SelectItem, 
  Card, 
  Spinner, 
  Pagination, 
  Button,
  Link
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "@heroui/use-theme";
import { GameTable } from "./components/game-table";
import { GameDetails } from "./components/game-details";
import { useGames } from "./hooks/use-games";
import { useLocalization } from "./hooks/use-localization";

export default function App() {
  const { theme, setTheme } = useTheme();
  const { t, locale, setLocale } = useLocalization();
  const { 
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
  } = useGames();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleLocale = () => {
    setLocale(locale === "en" ? "ru" : "en");
  };

  const sources = [
    { value: "https://hydralinks.cloud/sources/gog.json", label: "GOG" },
    { value: "https://hydralinks.cloud/sources/repack-games.json", label: "Repack-Games" },
    { value: "https://hydralinks.cloud/sources/atop-games.json", label: "Atop-Games" },
    { value: "https://hydralinks.cloud/sources/steamrip.json", label: "SteamRip" },
    { value: "https://hydralinks.cloud/sources/dodi.json", label: "DODI" },
    { value: "https://hydralinks.cloud/sources/empress.json", label: "Empress" },
    { value: "https://hydralinks.cloud/sources/fitgirl.json", label: "FitGirl" },
    { value: "https://hydralinks.cloud/sources/kaoskrew.json", label: "Kaoskrew" },
    { value: "https://hydralinks.cloud/sources/onlinefix.json", label: "OnlineFix" },
    { value: "https://hydralinks.cloud/sources/tinyrepacks.json", label: "TinyRepacks" },
    { value: "https://hydralinks.cloud/sources/xatab.json", label: "Xatab" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar isBordered maxWidth="xl" className="mb-6">
        <NavbarBrand>
          <Icon icon="lucide:gamepad-2" className="text-primary text-2xl mr-2" />
          <p className="font-bold text-inherit">{t("gameList")}</p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <Button 
            isIconOnly 
            variant="light" 
            aria-label="Toggle language"
            onPress={toggleLocale}
          >
            <Icon icon={locale === "en" ? "lucide:languages" : "lucide:languages"} className="text-lg" />
          </Button>
          <Button 
            isIconOnly 
            variant="light" 
            aria-label="Toggle theme"
            onPress={toggleTheme}
          >
            <Icon icon={theme === "light" ? "lucide:moon" : "lucide:sun"} className="text-lg" />
          </Button>
          <Link 
            href="https://t.me/hydralinks" 
            isExternal 
            showAnchorIcon 
            color="primary"
          >
            Telegram
          </Link>
        </NavbarContent>
      </Navbar>

      <div className="container mx-auto px-4">
        <Card className="p-4 mb-6">
          {/* <div className="text-small text-default-500 mb-2">
            {t("totalGames")}: {filteredGames.length}
          </div> */}
          
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <Input
              size="lg"
              radius="md"
              placeholder={t("searchGames")}
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={<Icon icon="lucide:search" className="text-default-400" />}
              className="flex-grow"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small whitespace-nowrap mr-2">
                    {t("totalGames")}: {filteredGames.length}
                  </span>
                </div>
              }
                          
              // description={${t("totalGames")}: ${filteredGames.length}}
            />
            
            <Select
              size="sm"
              radius="md"
              label={t("selectSource")}
              selectedKeys={[currentSource]}
              className="md:max-w-xs"
              onChange={(e) => setCurrentSource(e.target.value)}
            >
              {sources.map((source) => (
                <SelectItem key={source.value}>
                  {source.label}
                </SelectItem>
              ))}
            </Select>
          </div>
          
          {selectedGame ? (
            <GameDetails 
              game={selectedGame} 
              onBack={() => setSelectedGame(null)} 
            />
          ) : (
            <>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Spinner size="lg" color="primary" label={t("loading")} />
                </div>
              ) : (
                <>
                  <GameTable 
                    games={paginatedGames} 
                    onGameSelect={setSelectedGame} 
                  />
                  
                  <div className="flex justify-center mt-6">
                    <Pagination
                      total={Math.ceil(filteredGames.length / pageSize)}
                      page={currentPage}
                      onChange={setCurrentPage}
                      showControls
                    />
                  </div>
                </>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}