import React from "react";
import { GameState } from "../types/types.game";
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Celebration, Mouse, RestartAlt } from "@mui/icons-material";

interface Props {
  clickCount: number;
  gameState: GameState;
  resetGame: () => void;
}

const GameStats: React.FC<Props> = (props: Props) => (
  <Card sx={{ position: "absolute", bottom: 10, left: 0, right: 0 }}>
    <CardContent sx={{ flex: "1 0 auto" }}>
      <Typography component="div" variant="h6">
        Game Stats
        {props.gameState === GameState.Won && (
          <Typography component="small">
            {" "}
            <Celebration color="success" /> You win!!!{" "}
          </Typography>
        )}
      </Typography>
      <List>
        <ListItem disablePadding>
          <ListItemIcon>
            <Mouse />
          </ListItemIcon>
          <ListItemText primary={`Clicks: ${props.clickCount}`} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemIcon>
            <RestartAlt />
          </ListItemIcon>
          <ListItemButton onClick={props.resetGame} sx={{ paddingLeft: 0 }} data-testid="reset-button">
            <ListItemText primary="Click to start over" />
          </ListItemButton>
        </ListItem>
      </List>
    </CardContent>
  </Card>
);

export default GameStats;
