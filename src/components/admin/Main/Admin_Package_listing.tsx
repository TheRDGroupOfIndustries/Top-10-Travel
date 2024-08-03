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

export type Package = {
  id: string;
  image: string;
  name: string;
  status: "active" | "inactive" | "suspended";
};

const data: Package[] = [
  {
    id: "p1",
    name: "Tropical Paradise Getaway",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p2",
    name: "Mountain Adventure Package",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p3",
    name: "City Explorer Tour",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "inactive",
  },
  {
    id: "p4",
    name: "Historical Landmarks Journey",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p5",
    name: "Culinary Delights Tour",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p6",
    name: "Wildlife Safari Experience",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "suspended",
  },
  {
    id: "p7",
    name: "Romantic Couples Retreat",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p8",
    name: "Adrenaline Rush Adventure",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p9",
    name: "Relaxation and Spa Getaway",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "inactive",
  },
  {
    id: "p10",
    name: "Cultural Immersion Experience",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p11",
    name: "Island Hopping Adventure",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p12",
    name: "Ski Resort Vacation",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "suspended",
  },
  {
    id: "p13",
    name: "Eco-Tourism Green Package",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p14",
    name: "Family Fun Holiday",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "active",
  },
  {
    id: "p15",
    name: "Luxury Cruise Experience",
    image:
      "https://img.freepik.com/free-photo/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.jpg?t=st=1722438770~exp=1722442370~hmac=7ed9d2126593030ccd670ab282b07e7a9a3b921438f087c1b1bcb3cf5aeaba22&w=826",
    status: "inactive",
  },
];

export const columns: ColumnDef<Package>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-24 h-16 overflow-hidden rounded-lg">
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
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <SquarePen className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <EditUserForm />
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export default function AdminPackagelisting() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showAddUserForm, setShowAddUserForm] = React.useState(false);

  const table = useReactTable({
    data,
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
          <h2 className="text-2xl font-bold">Package</h2>
          <p className="text-xs">
            <span className="font-bold">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            total package
          </p>
        </div>
        <Dialog open={showAddUserForm} onOpenChange={setShowAddUserForm}>
          <Button asChild>
            <Link href="/admin/package-listings/add-package">Add package +</Link>
          </Button>
        </Dialog>
      </div>
      <div className="flex items-center">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm focus-visible:ring-none focus-visible:ring-0"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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
