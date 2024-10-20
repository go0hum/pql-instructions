import {
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { FormEvent, useEffect, useState } from 'react';
import { TeamTable } from '../../interfaces/TeamTable';
import { getAllTeams } from "../../api/team";
import { TableTeamProps } from "../../interfaces/TableTeamProps";
import { Container } from './styles';

export const TableTeam = ({ handleClick }: TableTeamProps) => {
    const [searchValue, setSearchValue] = useState('');
    const [sorting, setSorting] = useState<SortingState>([]);
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [teams, setTeams] = useState<TeamTable[]>([]);

    const columnHelper = createColumnHelper<TeamTable>();

    const columns = [
        columnHelper.accessor('id', {
            header: () => 'ID',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: () => 'Name',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('slogan', {
            header: () => 'Descripción',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('id', {
            header: () => '',
            cell: (info) => (
                <div
                    className="linkTeam"
                    onClick={() => handleClick(info.getValue())}
                >
                    See players
                </div>
            ),
        }),
    ];

    const submitSearchForm = (e: FormEvent) => {
        e.preventDefault();
        setSearchValue(inputSearchValue);
    };

    const table = useReactTable({
        data: teams,
        columns,
        debugTable: true,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
    });

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const order = sorting[0]?.desc ? 'desc' : 'asc';
                const sort = sorting[0]?.id ?? 'id';
                const teamData = await getAllTeams(searchValue, order, sort);
                setTeams(teamData.message || []);
            } catch (error) {
                console.error('Error loading teams:', error);
            }
        };
        fetchTeams();
    }, [searchValue, sorting]);

    return (
        <Container>
            <div className="search-bar">
                <form onSubmit={submitSearchForm}>
                    <input
                        className="input"
                        type="text"
                        placeholder="Search..."
                        value={inputSearchValue}
                        onChange={(e) => setInputSearchValue(e.target.value)}
                    />
                </form>
            </div>
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
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="table-cell">
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
};
