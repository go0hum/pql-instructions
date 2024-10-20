import {
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    useEffect,
    useImperativeHandle,
    useState,
    forwardRef,
    ForwardedRef,
} from 'react';
import { getAllPlayers, getAllPlayersAvailable } from '../../api/player';
import { TablePlayersProps } from "../../interfaces/TablePlayersProps";
import { Player } from "../../interfaces/Player";
import { Container } from "./styles";

export const TablePlayers = forwardRef(
    (
        { columns, searchValue='', onlyAvailable = false }: TablePlayersProps, 
        ref: ForwardedRef<{ reloadData: () => void }>
    ) => {
        const [sorting, setSorting] = useState<SortingState>([]);
        const [players, setPlayers] = useState([]);

        const table = useReactTable<Player>({
            data: players,
            columns,
            debugTable: true,
            getCoreRowModel: getCoreRowModel(),
            state: {
                sorting,
            },
            onSortingChange: setSorting,
        });

        const loadPlayers = async (searchValue: string, sorting: SortingState) => {
            const order = sorting[0]?.desc ? 'desc' : 'asc';
            const sort = sorting[0]?.id ?? 'id';
            const players = await getAllPlayers(searchValue, order, sort);
            if (players.error) {
                console.log(players.message || 'Failed to submit the form');
            } else {
                return players.message;
            }
        };

        const loadPlayersAvailable = async () => {
            const players = await getAllPlayersAvailable();
            if (players.error) {
                console.log(players.message || 'Failed to submit the form');
            } else {
                return players.message;
            }
        };

        const reload = async () => {
            const players = onlyAvailable ? await loadPlayersAvailable() : await loadPlayers('', []);
            setPlayers(players || []);
        };

        useImperativeHandle(ref, () => ({
            reloadData: async () => {
                reload();
            },
        }));

        useEffect(() => {
            const fetchPlayers = async () => {
                try {
                    const playersData = onlyAvailable ? await loadPlayersAvailable(): await loadPlayers(searchValue, sorting);
                    setPlayers(playersData || []);
                } catch (error) {
                    console.error('Error loading players:', error);
                }
            };

            fetchPlayers();
        }, [searchValue, sorting, onlyAvailable]);

        return (
            <Container>
                <table className="table">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="table-cell">
                                        <div
                                            {...{
                                                className:
                                                    header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                            {{
                                                asc: ' 🔼',
                                                desc: ' 🔽',
                                            }[
                                                header.column.getIsSorted() as string
                                            ] ?? null}
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell, index) => (
                                    <td
                                        key={`${row.id}_${cell.column.id}_${index}`}
                                        className="table-cell"
                                    >
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Container>
        );
    }
);
