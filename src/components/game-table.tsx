import React from "react";
import { 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Tooltip,
  Button,
  Link
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLocalization } from "../hooks/use-localization";
import { Game } from "../types/game";

interface GameTableProps {
  games: Game[];
  onGameSelect: (game: Game) => void;
}

export const GameTable: React.FC<GameTableProps> = ({ games, onGameSelect }) => {
  const { t } = useLocalization();
  
  const getLinkType = (link: string) => {
    if (link.startsWith('magnet:')) {
      return 'Magnet';
    } else {
      try {
        const url = new URL(link);
        return url.hostname.replace('www.', '');
      } catch {
        return t("link");
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return t("notSpecified");
    return new Date(dateString).toLocaleDateString();
  };

  const renderActions = (game: Game) => {
    const rawLink = game.uris ? game.uris[0].replace(/&#038;/g, '&') : '#';
    const link = decodeURIComponent(rawLink);
    const linkType = getLinkType(link);

    return (
      <div className="flex gap-2 justify-end">
        <Tooltip content={t("viewDetails")}>
          <Button 
            isIconOnly 
            size="sm" 
            color="primary" 
            variant="light" 
            onPress={() => onGameSelect(game)}
          >
            <Icon icon="lucide:info" />
          </Button>
        </Tooltip>
        
        <Tooltip content={`${t("download")} (${linkType})`}>
          <Link 
            isExternal 
            href={link} 
            className="flex items-center justify-center w-8 h-8 text-success"
          >
            <Icon icon="lucide:download" />
          </Link>
        </Tooltip>
      </div>
    );
  };

  return (
    <Table 
      aria-label={t("gameList")}
      classNames={{
        wrapper: "shadow-none"
      }}
    >
      <TableHeader>
        <TableColumn>{t("title")}</TableColumn>
        <TableColumn>{t("size")}</TableColumn>
        <TableColumn>{t("uploadDate")}</TableColumn>
        <TableColumn className="text-right">{t("actions")}</TableColumn>
      </TableHeader>
      <TableBody emptyContent={t("noGamesFound")}>
        {games.map((game, index) => (
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium cursor-pointer hover:text-primary" onClick={() => onGameSelect(game)}>
                {game.title}
              </div>
            </TableCell>
            <TableCell>{game.fileSize || t("notSpecified")}</TableCell>
            <TableCell>{formatDate(game.uploadDate)}</TableCell>
            <TableCell>{renderActions(game)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
