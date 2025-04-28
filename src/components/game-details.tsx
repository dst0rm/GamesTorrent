import React from "react";
import { Button, Card, CardBody, CardHeader, Divider, Link } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useLocalization } from "../hooks/use-localization";
import { Game } from "../types/game";

interface GameDetailsProps {
  game: Game;
  onBack: () => void;
}

export const GameDetails: React.FC<GameDetailsProps> = ({ game, onBack }) => {
  const { t } = useLocalization();
  
  const getLinkType = (link: string) => {
    if (link.startsWith('magnet:')) {
      return t("magnetLink");
    } else {
      try {
        const url = new URL(link);
        return url.hostname.replace('www.', '');
      } catch {
        return t("link");
      }
    }
  };

  const rawLink = game.uris ? game.uris[0].replace(/&#038;/g, '&') : '#';
  const link = decodeURIComponent(rawLink);
  const linkType = getLinkType(link);

  return (
    <Card>
      <CardHeader className="flex gap-3">
        <Button 
          isIconOnly 
          variant="light" 
          onPress={onBack}
          aria-label={t("back")}
        >
          <Icon icon="lucide:arrow-left" />
        </Button>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{game.title}</h3>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="space-y-4">
          <div>
            <p className="text-small text-default-500">{t("fileSize")}</p>
            <p>{game.fileSize || t("notSpecified")}</p>
          </div>
          
          <div>
            <p className="text-small text-default-500">{t("uploadDate")}</p>
            <p>{game.uploadDate ? new Date(game.uploadDate).toLocaleDateString() : t("notSpecified")}</p>
          </div>
          
          <Button
            as={Link}
            href={link}
            target="_blank"
            color="primary"
            startContent={<Icon icon="lucide:download" />}
            className="mt-4"
          >
            {t("download")} - {linkType}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
