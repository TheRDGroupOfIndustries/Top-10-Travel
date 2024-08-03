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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const AdminDashboardSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    companyName: "Top-Ten-Travels",
    emailNotifications: true,
    autoAssignTickets: false,
    ticketPriorityLevels: 3,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name: string) => {
    setSettings((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }));
  };

  const handleSaveSettings = () => {
    // Here you would typically save the settings to your backend
    console.log("Saving settings:", settings);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Dashboard Settings</CardTitle>
        <CardDescription>
          Customize your help desk dashboard settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={settings.companyName}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="emailNotifications">Email Notifications</Label>
          <Switch
            id="emailNotifications"
            checked={settings.emailNotifications}
            onCheckedChange={() => handleSwitchChange("emailNotifications")}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="autoAssignTickets">Auto-assign Tickets</Label>
          <Switch
            id="autoAssignTickets"
            checked={settings.autoAssignTickets}
            onCheckedChange={() => handleSwitchChange("autoAssignTickets")}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="ticketPriorityLevels">Ticket Priority Levels</Label>
          <Input
            id="ticketPriorityLevels"
            name="ticketPriorityLevels"
            type="number"
            min="1"
            max="5"
            value={settings.ticketPriorityLevels}
            onChange={handleInputChange}
          />
        </div>
        <Button className="w-full" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdminDashboardSettings;
