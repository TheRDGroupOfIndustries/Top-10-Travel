"use client";

import React, { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface Ticket {
  id: number;
  title: string;
  status: "Open" | "In Progress" | "Closed";
  priority: "Low" | "Medium" | "High";
  createdAt: string;
  description: string;
}

interface NewTicket {
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Closed";
}

const initialTickets: Ticket[] = [
  {
    id: 1,
    title: "Booking Issue",
    status: "Open",
    priority: "High",
    createdAt: "2024-03-15",
    description: "Customer unable to complete booking process",
  },
  {
    id: 2,
    title: "Refund Request",
    status: "In Progress",
    priority: "Medium",
    createdAt: "2024-03-14",
    description: "Customer requesting refund for cancelled trip",
  },
  {
    id: 3,
    title: "Package Inquiry",
    status: "Closed",
    priority: "Low",
    createdAt: "2024-03-13",
    description: "Customer asking about available travel packages",
  },
];

const HelpDeskDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] =
    useState<boolean>(false);
  const [newTicket, setNewTicket] = useState<NewTicket>({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "All" || ticket.status === filterStatus)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setFilterStatus(value);
  };

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleCloseTicketView = () => {
    setSelectedTicket(null);
  };

  const handleNewTicketChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewTicketSubmit = () => {
    const id = tickets.length + 1;
    const createdAt = new Date().toISOString().split("T")[0];
    setTickets((prev) => [...prev, { ...newTicket, id, createdAt } as Ticket]);
    setIsNewTicketDialogOpen(false);
    setNewTicket({
      title: "",
      description: "",
      priority: "Medium",
      status: "Open",
    });
  };

  const handleStatusChange = (
    ticketId: number,
    newStatus: "Open" | "In Progress" | "Closed"
  ) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const handlePriorityChange = (
    ticketId: number,
    newPriority: "Low" | "Medium" | "High"
  ) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, priority: newPriority } : ticket
      )
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Help Desk Dashboard</CardTitle>
          <CardDescription>
            Manage and respond to customer inquiries and issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search tickets..."
                className="w-64"
                value={searchTerm}
                onChange={handleSearch}
              />
              <Button size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select onValueChange={handleFilterChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
              </Select>
              <Dialog
                open={isNewTicketDialogOpen}
                onOpenChange={setIsNewTicketDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" /> New Ticket
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Ticket</DialogTitle>
                    <DialogDescription>
                      Enter the details for the new help desk ticket.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        className="col-span-3"
                        value={newTicket.title}
                        onChange={handleNewTicketChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        className="col-span-3"
                        value={newTicket.description}
                        onChange={handleNewTicketChange}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="priority" className="text-right">
                        Priority
                      </Label>
                      <Select
                        name="priority"
                        onValueChange={(value: "Low" | "Medium" | "High") =>
                          handleNewTicketChange({
                            target: { name: "priority", value },
                          } as React.ChangeEvent<HTMLInputElement>)
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button onClick={handleNewTicketSubmit}>Create Ticket</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(
                        value: "Open" | "In Progress" | "Closed"
                      ) => handleStatusChange(ticket.id, value)}
                    >
                      <SelectTrigger className="w-[150px] focus-visible:ring-none focus-visible:ring-0">
                        <SelectValue>
                          <Badge
                            variant={
                              ticket.status === "Open"
                                ? "destructive"
                                : ticket.status === "In Progress"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {ticket.status}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Open">Open</SelectItem>
                        <SelectItem value="In Progress">In Progress</SelectItem>
                        <SelectItem value="Closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      onValueChange={(value: "Low" | "Medium" | "High") =>
                        handlePriorityChange(ticket.id, value)
                      }
                    >
                      <SelectTrigger className="w-[150px] focus-visible:ring-none focus-visible:ring-0">
                        <SelectValue>
                          <Badge
                            variant={
                              ticket.priority === "High"
                                ? "destructive"
                                : ticket.priority === "Medium"
                                ? "secondary"
                                : "default"
                            }
                          >
                            {ticket.priority}
                          </Badge>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{ticket.createdAt}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleViewTicket(ticket)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Help Desk Statistics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Open Tickets</h3>
            <p className="text-3xl font-bold">
              {tickets.filter((t) => t.status === "Open").length}
            </p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Avg. Response Time</h3>
            <p className="text-3xl font-bold">2.5h</p>
          </div>
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Customer Satisfaction</h3>
            <p className="text-3xl font-bold">92%</p>
          </div>
        </CardContent>
      </Card>

      {selectedTicket && (
        <Dialog open={!!selectedTicket} onOpenChange={handleCloseTicketView}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ticket Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div>
                <Label className="font-bold">Title</Label>
                <p>{selectedTicket.title}</p>
              </div>
              <div>
                <Label className="font-bold">Description</Label>
                <p>{selectedTicket.description}</p>
              </div>
              <div>
                <Label className="font-bold">Status</Label>
                <Badge
                  variant={
                    selectedTicket.status === "Open"
                      ? "destructive"
                      : selectedTicket.status === "In Progress"
                      ? "secondary"
                      : "default"
                  }
                >
                  {selectedTicket.status}
                </Badge>
              </div>
              <div>
                <Label className="font-bold">Priority</Label>
                <Badge
                  variant={
                    selectedTicket.priority === "High"
                      ? "destructive"
                      : selectedTicket.priority === "Medium"
                      ? "secondary"
                      : "default"
                  }
                >
                  {selectedTicket.priority}
                </Badge>
              </div>
              <div>
                <Label className="font-bold">Created At</Label>
                <p>{selectedTicket.createdAt}</p>
              </div>
            </div>
            <Button onClick={handleCloseTicketView}>Close</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default HelpDeskDashboard;
