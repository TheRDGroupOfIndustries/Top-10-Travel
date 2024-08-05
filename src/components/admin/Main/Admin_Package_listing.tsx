"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, SquarePen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EditUserForm from "./EditUserform";
import AddUserForm from "./AddUserForm";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { $Enums } from "@prisma/client";
import EditListingForm from "./EditListingForm";

export type Company = {
  id: string;
  image: string | null;
  isSuspended: boolean;
  isCertified: boolean;
  userId: string;
  legalName: string;
  priority: number;
  state_priority: number;
  country: string;
  city: string;
  companyRole: $Enums.CompanyRole;
};

export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-20 h-14 overflow-hidden rounded-lg">
        <Image
          src={row.getValue("image")}
          alt={`${row.getValue("name")} package`}
          width={120}
          height={120}
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "Company Id",
  },
  {
    accessorKey: "legalName",
    header: "Name",
  },
  {
    accessorKey: "companyRole",
    header: "Company Role",
  },
  {
    accessorKey: "priority",
    header: "Priority (Country)",
  },
  {
    accessorKey: "state_priority",
    header: "Priority (city)",
  },
  {
    accessorKey: "isCertified",
    header: "Is Certified",
  },
  {
    accessorKey: "isSuspended",
    header: "Is Suspended",
  },
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const listing = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <SquarePen className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <EditListingForm company={listing} />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export default function AdminPackagelisting({
  listings,
}: {
  listings: Company[];
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showAddUserForm, setShowAddUserForm] = React.useState(false);

  const table = useReactTable({
    data: listings,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <Card className="mt-5 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h2 className="text-2xl font-bold">Listings</h2>
          <p className="text-xs">
            <span className="font-bold">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            total listings
          </p>
        </div>
        <Dialog
          open={showAddUserForm}
          onOpenChange={setShowAddUserForm}
        >
          <Button asChild>
            <Link href="/admin/listings/add-company">Add package +</Link>
          </Button>
        </Dialog>
      </div>
      <div className="flex items-center">
        <Input
          placeholder="Search by name..."
          value={
            (table.getColumn("legalName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("legalName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm focus-visible:ring-none focus-visible:ring-0"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto"
            >
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.a
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing{" "}
          {table.getState().pagination.pageIndex *
            table.getState().pagination.pageSize +
            1}
          -
          {Math.min(
            (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length
          )}{" "}
          of {table.getFilteredRowModel().rows.length} packages
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
}
