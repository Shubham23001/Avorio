import * as React from "react";
import { cn } from "../../lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Checkbox } from "../ui/checkbox";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export interface Column<T> {
  key: keyof T;
  header: React.ReactNode;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  className?: string;
}

// (Stray interface properties removed)
export interface CommonTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  selectable?: boolean;
  selectedRows?: number[];
  onRowSelectChange?: (rowIdx: number, checked: boolean) => void;
  onBulkDelete?: (selectedRows: number[]) => void;
}


export function CommonTable<T extends Record<string, any>>({ columns, data, className, selectable, selectedRows = [], onRowSelectChange, onBulkDelete }: CommonTableProps<T>) {
  // Select all logic
  const allSelected = data.length > 0 && selectedRows.length === data.length;
  const someSelected = selectedRows.length > 0 && selectedRows.length < data.length;

  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  const handleDeleteClick = () => setShowDeleteModal(true);
  const handleCancel = () => setShowDeleteModal(false);
  const handleConfirm = () => {
    setShowDeleteModal(false);
    if (onBulkDelete) onBulkDelete(selectedRows);
  };

  return (
    <div className={cn("overflow-hidden rounded-md border bg-white", className)}>
      {/* Bulk delete button */}
      {selectable && onBulkDelete && (
        <div className="flex items-center px-4 py-2 border-b bg-muted/30">
          <button
            className="bg-destructive text-white px-3 py-1 rounded disabled:opacity-50"
            disabled={selectedRows.length === 0}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
          <ConfirmDeleteModal
            open={showDeleteModal}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            title="Confirm Deletion"
            description={
              selectedRows.length > 1
                ? `Are you sure you want to delete these ${selectedRows.length} items? This action cannot be undone.`
                : "Are you sure you want to delete this item? This action cannot be undone."
            }
          />
        </div>
      )}
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {selectable && (
              <TableHead className="px-4 py-2 font-semibold bg-muted/50 border-b w-10">
                <Checkbox
                  checked={allSelected ? true : someSelected ? "indeterminate" : false}
                  onCheckedChange={checked => {
                    if (!onRowSelectChange) return;
                    data.forEach((_, idx) => onRowSelectChange(idx, !!checked));
                  }}
                  aria-label="Select all"
                />
              </TableHead>
            )}
            {columns.map((col, idx) => (
              <TableHead key={String(col.key) + idx} className={cn(col.className, "px-4 py-2 font-semibold bg-muted/50 border-b")}>{col.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <td colSpan={columns.length + (selectable ? 1 : 0)} className="text-center text-muted-foreground py-4">
                No data
              </td>
            </TableRow>
          ) : (
            data.map((row, rowIdx) => (
              <TableRow
                key={rowIdx}
                className={cn(
                  "transition-colors hover:bg-muted/30",
                  selectedRows && selectedRows.includes(rowIdx) ? "bg-accent/30" : ""
                )}
                data-state={selectedRows && selectedRows.includes(rowIdx) ? "selected" : undefined}
              >
                {selectable && (
                  <TableCell className="px-4 py-2 align-middle w-10">
                    <Checkbox
                      checked={selectedRows.includes(rowIdx)}
                      onCheckedChange={checked => onRowSelectChange && onRowSelectChange(rowIdx, !!checked)}
                      aria-label="Select row"
                    />
                  </TableCell>
                )}
                {columns.map((col, colIdx) => (
                  <TableCell key={String(col.key) + colIdx} className={cn(col.className, "px-4 py-2 align-middle")}>{col.render ? col.render(row[col.key], row) : row[col.key]}</TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default CommonTable;