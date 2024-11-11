"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Megaphone, Tag, Users, BarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Marketing() {
  const [campaignName, setCampaignName] = useState("");
  const [campaignType, setCampaignType] = useState("");
  const [campaignDescription, setCampaignDescription] = useState("");

  const handleCreateCampaign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Creating campaign:", {
      campaignName,
      campaignType,
      campaignDescription,
    });
    // Reset form
    setCampaignName("");
    setCampaignType("");
    setCampaignDescription("");
  };

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-semibold">Marketing Tools</h1>
        <p>
          Looking to grow your business? Create campaigns and promotions that
          help you reach more customers.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Campaigns
            </CardTitle>
            <Megaphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coupons</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Affiliate Partners
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Conversion Rate
            </CardTitle>

            <BarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="campaigns">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="coupons">Coupons</TabsTrigger>
            <TabsTrigger value="affiliates">Affiliates</TabsTrigger>
          </TabsList>
          <TabsContent value="campaigns">
            <Card>
              <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateCampaign} className="space-y-4">
                  <div>
                    <label
                      htmlFor="campaignName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Campaign Name
                    </label>
                    <Input
                      id="campaignName"
                      value={campaignName}
                      onChange={(e) => setCampaignName(e.target.value)}
                      placeholder="Enter campaign name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="campaignType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Campaign Type
                    </label>
                    <Select
                      value={campaignType}
                      onValueChange={setCampaignType}
                    >
                      <SelectTrigger id="campaignType">
                        <SelectValue placeholder="Select campaign type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email Campaign</SelectItem>
                        <SelectItem value="social">
                          Social Media Campaign
                        </SelectItem>
                        <SelectItem value="ppc">PPC Campaign</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label
                      htmlFor="campaignDescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Campaign Description
                    </label>
                    <Textarea
                      id="campaignDescription"
                      value={campaignDescription}
                      onChange={(e) => setCampaignDescription(e.target.value)}
                      placeholder="Enter campaign description"
                      rows={4}
                    />
                  </div>
                  <Button type="submit">Create Campaign</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="coupons">
            <Card>
              <CardHeader>
                <CardTitle>Active Coupons</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Discount</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>SUMMER2023</TableCell>
                      <TableCell>20%</TableCell>
                      <TableCell>2023-08-31</TableCell>
                      <TableCell>45/100</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>NEWCUSTOMER</TableCell>
                      <TableCell>15%</TableCell>
                      <TableCell>2023-12-31</TableCell>
                      <TableCell>78/200</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="affiliates">
            <Card>
              <CardHeader>
                <CardTitle>Affiliate Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Partner</TableHead>
                      <TableHead>Commission Rate</TableHead>
                      <TableHead>Total Sales</TableHead>
                      <TableHead>Earnings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>TechReviewer</TableCell>
                      <TableCell>10%</TableCell>
                      <TableCell>$5,230</TableCell>
                      <TableCell>$523</TableCell>
                    </TableRow>
                    <TableCell>GadgetGuru</TableCell>
                    <TableCell>12%</TableCell>
                    <TableCell>$3,750</TableCell>
                    <TableCell>$450</TableCell>
                    <TableRow></TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
