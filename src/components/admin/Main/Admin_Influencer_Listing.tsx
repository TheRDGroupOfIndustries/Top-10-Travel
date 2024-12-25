"use client";

import AnimatedImage from "@/components/site/Details/AnimatedImage";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import { deleteInfluencerAdminAction } from "@/core/server/actions/admin/deleteInfluencerAdmin";
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
import { ChevronDown, Plus, SquarePen } from "lucide-react";
import * as React from "react";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "sonner";
import EditInfluencerForm from "./EditInfluencerForm";
import Link from "next/link";

export type Company = {
  name: string;
  id: string;
  image: string;
  userId: string;
  state: string;
  priority: number;
  isCertified: boolean;
  country: string;
  speciality: string;
  state_priority: number;
};
async function deleteListing(id: string) {
  const ask = window.confirm("Do you want to delete?")
  if (ask) {
    const res = await deleteInfluencerAdminAction({ id });
    if (res.success) {
      toast.success(res.success);
    } else toast.error(res.error);
  }
  else {
    return null;
  }
}
export const columns: ColumnDef<Company>[] = [
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      let href = null;
      const url = row.getValue("image") as string;
      try {
        href = new URL(url).href;
      } catch (error) {
        if (!url?.startsWith("/")) href = null;
        else href = url;
      }
      return (
        <div className="w-20 h-14 overflow-hidden rounded-lg">
          <AnimatedImage
            src={href ?? "/UploadImage.jpg"}
            alt={"Company Image"}
            fill
            className="w-full h-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "state",
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
            <DropdownMenuLabel>Influencer actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex justify-between px-2 items-center gap-2 w-full"
                  >
                    Edit Info <SquarePen className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <EditInfluencerForm company={listing} />
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-start gap-2"
              onClick={() => deleteListing(row.original.id)}
            >
              Delete Influencer
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
  const [searchValue, setSearchValue] = React.useState("");

  const data = React.useMemo(() => {
    const val = searchValue.toLowerCase().trim();
    return listings.filter(
      (i) => i.id.includes(val) || i.name.toLowerCase().includes(val)
    );
  }, [searchValue, listings]);

  const table = useReactTable({
    data: data,
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
    <Card className="mt-5 z-[999] p-4 bg-[#F3F3F3]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <h2 className="lg:text-3xl md:text-2xl text-xl font-semibold">
            Listing of <span className="text-mainColor">Influencers</span>
          </h2>
          <p className="font-medium text-sm text-[#36454F]">
            <span className="font-bold">
              {table.getFilteredRowModel().rows.length}
            </span>{" "}
            Total Influencers
          </p>
        </div>
      </div>
      <div className="flex items-center flex-wrap p-1 md:p-0">
        <Input
          placeholder="Search by name or id..."
          value={searchValue}
          onChange={(event) => {
            const value = event.target.value;
            setSearchValue(value);
          }}
          className="max-w-sm bg-[#fbfbfb] focus-visible:ring-0"
        />
        {/* Influencer */}
        
        <Link href="/admin/create-influencer" className="ml-auto inline-block">
          <Button
            variant="outline"
            className="bg-[#F3F3F3] hover:bg-[#dbdbdb] border-mainColor"
          >
            Add Influencer <Plus className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className=" ml-1 bg-[#F3F3F3] hover:bg-[#dbdbdb] border-mainColor"
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
                    className="capitalize bg-[#F3F3F3] hover:bg-[#dbdbdb]"
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
              <TableRow
                key={headerGroup.id}
                className="bg-[#c2c2c2] hover:bg-[#c2c2c2] text-white"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-white"
                    >
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
                  className="hover:bg-[#dbdbdb]"
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
                  className="h-24 text-center hover:bg-slate-300"
                >
                  No results
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
