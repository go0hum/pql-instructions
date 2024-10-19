import styled from "styled-components";
import {
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
import { FormEvent, useEffect, useState } from "react";

export type Team = {
    id: number;
    name: string;
    slogan: string;
};

const columnHelper = createColumnHelper<Team>();

export const TableTeam = ({handleClick}) => {
    const [searchValue, setSearchValue] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [inputSearchValue, setInputSearchValue] = useState("");
    const [teams, setTeams] = useState<Team[]>([]);

    const columns = [
        columnHelper.accessor("id", {
          header: () => "ID",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("name", {
          header: () => "Name",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("slogan", {
          header: () => "Descripción",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("id", {
            header: () => "",
            cell: (info) => (
                <div 
                className="linkTeam"
                onClick={() => handleClick(info.getValue())}>
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
        console.log("sorting", sorting);
        const order = sorting[0]?.desc ? "desc" : "asc";
        const sort = sorting[0]?.id ?? "id";
        const url = `http://localhost:3001/api/teams?name_like=${searchValue}&_sort=${sort}&_order=${order}`;
        fetch(url)
          .then((res) => res.json())
          .then((users) => {
            setTeams(users);
          }).catch((error) => {
            console.error("Error fetching teams:", error);
          });
    }, [searchValue, sorting]);
    
  return (<Container>
            <div className="search-bar">
                <form onSubmit={submitSearchForm}>
                <input
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
                        className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                        onClick: header.column.getToggleSortingHandler(),
                        }}
                    >
                        {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                        )}
                        {{
                        asc: " 🔼",
                        desc: " 🔽",
                        }[header.column.getIsSorted() as string] ?? null}
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                ))}
                </tr>
            ))}
            </tbody>
        </table>
  </Container>);
}
const Container =styled.div`
    .table {
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
        background: #fff;
        .table-cell {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 0.5rem;
            .linkTeam {
                cursor: pointer;
                color: blue;
            }
        }
    }
    .search-bar {
        margin: 2rem 0;
    }
`