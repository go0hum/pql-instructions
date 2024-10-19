import styled from "styled-components";
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
import { FormEvent, useEffect, useState } from "react";

export const TablePlayers = ({columns}) => {
    const [searchValue, setSearchValue] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [inputSearchValue, setInputSearchValue] = useState("");
    const [players, setPlayers] = useState([]);

    const submitSearchForm = (e: FormEvent) => {
        e.preventDefault();
        setSearchValue(inputSearchValue);
    };

    const table = useReactTable({
        data: players,
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
        const url = `http://localhost:3001/api/players/available/?name_like=${searchValue}&_sort=${sort}&_order=${order}`;
        fetch(url)
          .then((res) => res.json())
          .then((users) => {
            setPlayers(users);
          }).catch((error) => {
            console.error("Error fetching players:", error);
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
                {row.getVisibleCells().map((cell, index) => (
                    <td key={`${row.id}_${cell.column.id}_${index}`} className="table-cell">
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
        }
    }
    .search-bar {
        margin: 2rem 0;
    }
`