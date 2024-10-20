import {
    ColumnDef,
} from '@tanstack/react-table';
import {Player } from "./Player";

export interface TablePlayersProps {
    columns: ColumnDef<Player, any>[]; // Array de definiciones de columnas para la tabla
    searchValue?: string; // Valor opcional de búsqueda
    onlyAvailable?: boolean; // Para filtrar solo jugadores disponibles
}