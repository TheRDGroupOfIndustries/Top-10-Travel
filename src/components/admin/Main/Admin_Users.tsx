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

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive" | "suspended";
};

const data: User[] = [
  {
    id: "u1",
    name: "John Doe",
    email: "john@example.com",
    role: "USER",
    status: "active",
  },
  {
    id: "u2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "ADMIN",
    status: "active",
  },
  {
    id: "u3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "COMPANY",
    status: "inactive",
  },
  {
    id: "u4",
    name: "Alice Brown",
    email: "alice@example.com",
    role: "USER",
    status: "active",
  },
  {
    id: "u5",
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "COMPANY",
    status: "active",
  },
  {
    id: "u6",
    name: "Eva Wilson",
    email: "eva@example.com",
    role: "USER",
    status: "suspended",
  },
  {
    id: "u7",
    name: "Frank Miller",
    email: "frank@example.com",
    role: "COMPANY",
    status: "active",
  },
  {
    id: "u8",
    name: "Grace Lee",
    email: "grace@example.com",
    role: "ADMIN",
    status: "active",
  },
  {
    id: "u9",
    name: "Henry Taylor",
    email: "henry@example.com",
    role: "USER",
    status: "inactive",
  },
  {
    id: "u10",
    name: "Ivy Clark",
    email: "ivy@example.com",
    role: "COMPANY",
    status: "active",
  },
  {
    id: "u11",
    name: "Jack Robinson",
    email: "jack@example.com",
    role: "USER",
    status: "active",
  },
  {
    id: "u12",
    name: "Karen White",
    email: "karen@example.com",
    role: "COMPANY",
    status: "suspended",
  },
  {
    id: "u13",
    name: "Liam Harris",
    email: "liam@example.com",
    role: "USER",
    status: "active",
  },
  {
    id: "u14",
    name: "Mia Garcia",
    email: "mia@example.com",
    role: "ADMIN",
    status: "active",
  },
  {
    id: "u15",
    name: "Noah Martinez",
    email: "noah@example.com",
    role: "COMPANY",
    status: "inactive",
  },
];

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => <div>{row.getValue("role")}</div>,
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

function AdminUsers() {
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
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="text-xs">
            <span className="font-bold">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            total users
          </p>
        </div>
        <Dialog open={showAddUserForm} onOpenChange={setShowAddUserForm}>
          <DialogTrigger asChild>
            <Button>Add user +</Button>
          </DialogTrigger>
          <DialogContent>
            <AddUserForm onClose={() => setShowAddUserForm(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center">
        <Input
          placeholder="Search by email..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
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
                  No results.
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
          of {table.getFilteredRowModel().rows.length} users
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

export default AdminUsers;
