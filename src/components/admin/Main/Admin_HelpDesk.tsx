"use client";

import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, SquarePen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { HelpDesk } from "@prisma/client";
import useMutation from "@/hooks/useMutation";
import { updateHelpdeskAction } from "@/core/server/actions/helpdesk/editHelpdesk";
import { toast } from "sonner";
import { FaTrashCan } from "react-icons/fa6";
import { deleteHelpdesk } from "@/core/server/actions/helpdesk/deleteHelpdesk";

type Ticket = HelpDesk;

interface HelpDeskDashboardProps {
  initialTickets: Ticket[];
  pending: number;
  resolved: number;
}

const HelpDeskDashboard: React.FC<HelpDeskDashboardProps> = ({
  initialTickets,
  pending,
  resolved,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [isEditTicketDialogOpen, setIsEditTicketDialogOpen] =
    useState<boolean>(false);

  const [editTicket, setEditTicket] = useState<Ticket>({} as Ticket);

  const filteredTickets = useMemo(
    () =>
      initialTickets.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (filterStatus === "All" || ticket.status === filterStatus)
      ),
    [searchTerm, filterStatus, initialTickets]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setEditTicket(ticket);
    setIsEditTicketDialogOpen(true);
  };

  const handleEditTicketChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditTicket((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate, isPending } = useMutation(updateHelpdeskAction);
  const handleEditTicketSubmit = async () => {
    if (editTicket) {
      const { success, error } = await mutate({
        id: editTicket.id,
        description: editTicket.description,
        status: editTicket.status,
      });
      if (success) {
        toast.success(success);
        setIsEditTicketDialogOpen(false);
      } else toast.error(error);
    }
  };
  async function deleteDesk(id: string) {
    const res = await deleteHelpdesk(id);
    if (res.success) {
      toast.success(res.success);
    } else toast.error(res.error);
  }

  return (
    <div className="space-y-6 mt-5">
      <Card className="bg-[#F3F3F3]">
        <CardHeader>
          <CardTitle className="lg:text-3xl md:text-2xl text-xl font-semibold">
            <span className="text-[#fcaf1e]">Help Desk</span> Dashboard
          </CardTitle>
          <CardDescription className="font-medium text-sm text-[#36454F]">
            Manage and respond to customer inquiries and issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Open Tickets</h3>
              <p className="text-3xl font-bold">{pending}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Resolved tickets</h3>
              <p className="text-3xl font-bold">{resolved}</p>
            </div>
            <div className="bg-primary/10 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Customer Satisfaction</h3>
              <p className="text-3xl font-bold">
                {Math.round((resolved * 100) / (pending + resolved))}%
              </p>
            </div>
          </div>

          <div className="md:flex justify-between items-center mb-6 mt-2">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={handleSearch}
                className="max-w-64 bg-[#fbfbfb] focus-visible:ring-0"
              />
              <Button
                size="icon"
                className="bg-[#fcaf1e] hover:bg-[#fcaf1e]/80"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="ml-auto bg-[#F3F3F3] hover:bg-[#dbdbdb]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="ml-auto bg-[#F3F3F3] hover:bg-[#dbdbdb]">
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#c2c2c2] hover:bg-[#c2c2c2] text-white">
                <TableHead className="text-white">ID</TableHead>
                <TableHead className="text-white">Title</TableHead>
                <TableHead className="text-white">Status</TableHead>
                <TableHead className="text-white">Created At</TableHead>
                <TableHead className="text-white">Description</TableHead>
                <TableHead className="text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow
                  className="hover:bg-[#dbdbdb]"
                  key={ticket.id}
                >
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        ticket.status === "PENDING" ? "destructive" : "default"
                      }
                    >
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {ticket.createdAt
                      ? new Date(ticket.createdAt).toDateString()
                      : ""}
                  </TableCell>
                  <TableCell className="min-w-[250px] text-justify">
                    {ticket.description}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                        >
                          <SquarePen className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="space-y-1">
                        <DropdownMenuLabel>Listing actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleEditTicket(ticket)}
                        >
                          Edit Info
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="bg-destructive text-destructive-foreground focus:bg-destructive/80"
                          onClick={() => deleteDesk(ticket.id)}
                        >
                          Delete Helpdesk
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog
        open={isEditTicketDialogOpen}
        onOpenChange={setIsEditTicketDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="description"
                className="text-right"
              >
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                className="col-span-3"
                value={editTicket.description || ""}
                onChange={handleEditTicketChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="status"
                className="text-right"
              >
                Status
              </Label>
              <Select
                name="status"
                defaultValue={editTicket.status}
                onValueChange={(value: "PENDING" | "RESOLVED") =>
                  handleEditTicketChange({
                    target: { name: "status", value },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue>{editTicket.status || ""}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            disabled={isPending}
            onClick={handleEditTicketSubmit}
            className="bg-[#fcaf1e] w-full hover:bg-[#fcaf1e]/80"
          >
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpDeskDashboard;
