"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { ServiceForm } from "./service-form";
import { DeleteServiceDialog } from "./delete-service-dialog";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ServiceActionsProps {
  service: Service;
}

export function ServiceActions({ service }: ServiceActionsProps) {
  return (
    <>
      <ServiceForm service={service}>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Service
        </DropdownMenuItem>
      </ServiceForm>
      <DeleteServiceDialog serviceId={service.id} serviceName={service.name}>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Service
        </DropdownMenuItem>
      </DeleteServiceDialog>
    </>
  );
}
