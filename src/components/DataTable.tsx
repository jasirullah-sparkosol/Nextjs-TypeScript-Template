'use client';

import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Divider from '@mui/material/Divider';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

// third-party
import {
    ColumnDef,
    HeaderGroup,
    SortingState,
    ColumnFiltersState,
    flexRender,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFacetedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getFacetedMinMaxValues,
    getFacetedUniqueValues
} from '@tanstack/react-table';
import { LabelKeyObject } from 'react-csv/lib/core';

// project import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import { Filter, HeaderSort, TablePagination } from 'components/third-party/react-table';

interface ReactTableProps<T> {
    columns: ColumnDef<T>[];
    data: T[];
}

// ==============================|| REACT TABLE - PAGINATION - FILTERING - SORTING ||============================== //

export default function DataTable<T>({ columns, data }: ReactTableProps<T>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const [sorting, setSorting] = useState<SortingState>([
        {
            // @ts-ignore
            id: columns[0].accessorKey, // Sort by the first column
            desc: false
        }
    ]);

    const table = useReactTable<T>({
        data,
        columns,
        state: {
            sorting,
            columnFilters
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFacetedRowModel: getFacetedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getFacetedUniqueValues: getFacetedUniqueValues()
    });

    let headers: LabelKeyObject[] = [];
    table.getAllColumns().map((columns) =>
        headers.push({
            label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
            // @ts-ignore
            key: columns.columnDef.accessorKey
        })
    );

    return (
        <MainCard content={false}>
            <ScrollX>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                                            Object.assign(header.column.columnDef.meta, {
                                                className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                                            });
                                        }

                                        return (
                                            <TableCell
                                                key={header.id}
                                                {...header.column.columnDef.meta}
                                                onClick={header.column.getToggleSortingHandler()}
                                                {...(header.column.getCanSort() &&
                                                    header.column.columnDef.meta === undefined && {
                                                        className: 'cursor-pointer prevent-select'
                                                    })}>
                                                {header.isPlaceholder ? null : (
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                                                        {header.column.getCanSort() && <HeaderSort column={header.column} />}
                                                    </Stack>
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableHead>
                            {table.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableCell key={header.id} {...header.column.columnDef.meta}>
                                            {header.column.getCanFilter() && <Filter column={header.column} table={table} />}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Divider />
                <Box sx={{ p: 2 }}>
                    <TablePagination
                        {...{
                            setPageSize: table.setPageSize,
                            setPageIndex: table.setPageIndex,
                            getState: table.getState,
                            getPageCount: table.getPageCount
                        }}
                    />
                </Box>
            </ScrollX>
        </MainCard>
    );
}
