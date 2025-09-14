import Select from '@/components/form/Select';
import React, { useRef } from 'react';
import { SelectContent, SelectItem, SelectTrigger } from '@radix-ui/react-select';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
// } from '@/components/ui/select';
// import { PAGINATION_LEFT, PAGINATION_RIGHT } from '@/utils/images';

interface DataTablePaginationProps {
  page: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  perPageOptions?: number[];
  pageSize: number;
}

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  page,
  totalItems,
  totalPages,
  onPageChange,
  onLimitChange,
  pageSize,
  perPageOptions = [10, 20, 30, 40, 50],
}) => {
  const startResult = totalItems > 0 ? (page - 1) * pageSize + 1 : 0;
  const endResult = Math.min(page * pageSize, totalItems);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const handlePrevPage = () => {
    if (page > 1) {
      onPageChange(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      onPageChange(page + 1);
    }
  };

  return (
    <div className="flex items-center gap-4 justify-between px-5 pt-2.5">
      {totalItems > 0 ? (
        <>
          <div className="text-sm font-stdFontPrimary text-darkGray6">
            Showing results -{' '}
            <span className="font-stdFontMedium text-tertiary">
              {startResult} - {endResult} of {totalItems}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span
              onClick={handlePrevPage}
              className={`p-0.5 cursor-pointer ${
                page === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <img 
            //   src={PAGINATION_LEFT} 
              alt="left arrow" className="w-2" />
            </span>

            <h2 className="font-stdFontMedium text-base">
              <span className="text-darkGray6 mr-2">Page</span>
              {page} of {totalPages}
            </h2>

            <span
              onClick={handleNextPage}
              className={`p-0.5 cursor-pointer ${
                page === totalPages ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <img
            //    src={PAGINATION_RIGHT}
                alt="right arrow" className="w-2" />
            </span>
          </div>
        </>
      ) : (
        <div className="text-sm font-stdFontPrimary text-darkGray6">
          No results found.
        </div>
      )}

      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => triggerRef.current?.click()}
      >
        <p className="text-sm font-stdFontPrimary text-darkGray6">
          Show{' '}
          <span className="font-stdFontMedium text-tertiary focus-visible:outline-none">
            {pageSize} per page
          </span>
        </p>

        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            const newLimit = Number(value);
            onLimitChange(newLimit);
            onPageChange(1); // Reset to first page
          }}
        >
          <SelectTrigger
            ref={triggerRef}
            className="w-5 border-none focus-visible:outline-none"
          />
          <SelectContent side="top">
            {perPageOptions.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DataTablePagination;
