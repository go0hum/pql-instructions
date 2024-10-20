import { Player } from "./Player";

export interface TeamResponse {
    error: boolean;
    message: Player[] | string; 
}