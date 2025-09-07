import { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Download,
} from "lucide-react";
import { FilterActive } from "@/lib/types/services";
import { getServices } from "@/actions/services";
import { ServiceForm } from "./service-form";
import { ServiceFilters } from "./service-filters";
import { ServiceActions } from "./service-actions";

interface ServicesPageProps {
  searchParams: {
    search?: string;
    status?: string;
    page?: string;
  };
}

export default async function ServicesPage({ searchParams }: ServicesPageProps) {
  const { search, status } = await searchParams;
  const filterIsActive: FilterActive = { 
    isActive: (status as "true" | "false" | "all") || "all" 
  };

  const services = await getServices({ searchTerm: search, filterIsActive });

  const getStatusBadge = (status: boolean) => {
    switch (status) {
      case true:
        return <Badge variant="default">Active</Badge>;
      case false:
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Inactive</Badge>;
    }
  };

  const getFeaturedBadge = (role: boolean) => {
    switch (role) {
      case true:
        return <Badge variant="default">Featured</Badge>;
      case false:
        return <Badge variant="secondary">Not Featured</Badge>;
      default:
        return <Badge variant="secondary">Not Featured</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">
            Manage and monitor all services in your system
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <ServiceForm />
        </div>
      </div>

      {/* Filters */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <ServiceFilters searchTerm={search || ""} filterIsActive={filterIsActive} />
      </Suspense>

      {/* Services Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Services ({Array.isArray(services) ? services.length : 0})</CardTitle>
          <CardDescription>
            A list of all services in your system with their details and status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.isArray(services) ? services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="flex flex-col justify-start items-start space-x-3">
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground text-wrap">{service.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    ${service.price}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {getStatusBadge(service.isActive)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {getFeaturedBadge(service.isFeatured)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(service.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <ServiceActions service={service} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground">
                    No services found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
