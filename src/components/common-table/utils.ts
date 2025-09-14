/**
 * Extracts the data array from a TanStack Table instance's current row model.
 */
export function getTableData<T>(table: any): T[] {
  return table.getRowModel().rows.map((row: any) => row.original);
}
import { flexRender } from "@tanstack/react-table";
import { Column } from "./CommonTable";

/**
 * Maps TanStack Table columns and data to CommonTable columns.
 * @param table The TanStack table instance
 * @returns Array of CommonTable columns
 */
export function mapReactTableToCommonColumns<T extends Record<string, any>>(table: any): Column<T>[] {
  const visibleColumns = table.getVisibleLeafColumns();
  const headerGroups = table.getHeaderGroups();
  const headerContextMap: Record<string, any> = {};
  if (headerGroups.length > 0) {
    headerGroups[0].headers.forEach((header: any) => {
      headerContextMap[header.column.id] = header.getContext();
    });
  }
  return visibleColumns.map((col: any) => ({
    key: col.id as keyof T,
    header:
      typeof col.columnDef.header === "function"
        ? flexRender(col.columnDef.header, headerContextMap[col.id])
        : col.columnDef.header,
    render: (value: any, row: T) => {
      const tableRow = table.getRowModel().rows.find((r: any) => r.original === row);
      if (!tableRow) return value;
      const cell = tableRow.getAllCells().find((c: any) => c.column.id === col.id);
      if (!cell) return value;
      return flexRender(col.columnDef.cell, cell.getContext());
    },
  }));
}
