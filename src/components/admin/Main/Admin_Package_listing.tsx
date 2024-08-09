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
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import { deleteCompany } from "@/core/server/actions/company/deleteCompany";
import AnimatedImage from "@/components/site/Details/AnimatedImage";

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
  methodology: string | null;
  companyRole: $Enums.CompanyRole;
};
async function deleteListing(id: string) {
  const res = await deleteCompany(id);
  console.log(res);
  if (res.success) {
    toast.success(res.success);
  } else toast.error(res.error);
}
export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      let href = null;
      try {
        href = new URL(row.getValue("image")).href;
      } catch (error) {
        href = null;
      }
      return (
        <div className="w-20 h-14 overflow-hidden rounded-lg">
          <AnimatedImage
            src={href ?? "/UploadImage.jpg"}
            alt={"/UploadImage.jpg"}
            layout="fill"
            objectFit="cover"
            className="w-full h-full"
          />
        </div>
      );
    },
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
            >
              <SquarePen className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Listing actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex justify-between items-center gap-2 w-full"
                  >
                    Edit Info <SquarePen className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <EditListingForm company={listing} />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-start gap-2"
              onClick={() => deleteListing(row.original.id)}
            >
              Delete Company
              <FaTrashCan />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
    <Card className="mt-5 z-[999] p-4">
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

        <Button asChild>
          <Link href="/admin/companies/add-company">Add Listing +</Link>
        </Button>
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
