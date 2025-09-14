import * as React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface TableToolbarProps {
  table: any;
  filterColumnKey?: string;
  filterPlaceholder?: string;
}

export function TableToolbar({ table, filterColumnKey = "email", filterPlaceholder = "Filter..." }: TableToolbarProps) {
  return (
    <div className="flex items-center py-4">
      <Input
        placeholder={filterPlaceholder}
        value={(table.getColumn(filterColumnKey)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(filterColumnKey)?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Columns <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column: any) => column.getCanHide())
            .map((column: any) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default TableToolbar;
