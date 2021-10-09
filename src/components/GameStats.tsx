import React from "react";
import { GameState } from "../types/grid";
import { 
    Card, 
    CardContent, 
    List, 
    ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Typography 
} from '@mui/material';
import { Celebration, Mouse, RestartAlt } from '@mui/icons-material';

interface Props {
    clickCount: number;
    gameState: GameState;
    resetGame: () => void;
}

const GameStats: React.FC<Props> = (props: Props) => <Card sx={{position: 'absolute', bottom: 10, left: 0, right: 0}}>
    <CardContent sx={{ flex: '1 0 auto' }}>
    <Typography component="div" variant="h6">
        Game stats
    </Typography>
    <List>
        <ListItem disablePadding>
        <ListItemIcon>
            <Mouse />
        </ListItemIcon>
        <ListItemText primary={`Clicks: ${props.clickCount}`}/>
        </ListItem>
        <ListItem disablePadding>
        <ListItemIcon>
            <Celebration color={props.gameState === GameState.Won ? 'success' : 'disabled'} />
        </ListItemIcon>
        <ListItemText primary={props.gameState === GameState.Won ? 'You win!!!': 'Keep trying...'}/>
        {
        props.gameState === GameState.Won
        && <ListItemButton onClick={props.resetGame}>
                <ListItemIcon>
                    <RestartAlt />
                </ListItemIcon>
                <ListItemText primary="Click to start over" />
            </ListItemButton>
        }
        </ListItem>
    </List>
    </CardContent>
</Card>

export default GameStats;