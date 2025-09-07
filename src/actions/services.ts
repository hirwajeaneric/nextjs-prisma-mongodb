"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { FilterActive } from "@/lib/types/services";

// Define a cache tag for the services data. Using a tag gives you fine-grained control over revalidation.
const serviceTag = "services";

// --- CREATE ----
export async function createService(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const isActive = formData.get("isActive") === "true";
    const isFeatured = formData.get("isFeatured") === "true";

    if (!name || !description || isNaN(price)) {
        return { error: "All fields are required and price must be a valid number" };
    }

    try {
        await prisma.service.create({
            data: { 
                name, 
                description, 
                price, 
                isActive, 
                isFeatured 
            }
        });
        revalidateTag(serviceTag);
    } catch (error) {
        console.error("Error creating service:", error);
        return { error: "Failed to create service" };
    }
}

// --- READ ----
export async function getServices({ searchTerm, filterIsActive }: { searchTerm?: string, filterIsActive: FilterActive }) {
    // Use `unstable-cache` with a tag to enable memoization and on-demand revalidation.
    // Next.js also extends `fetch` with caching, but `unstable-cache` works for any function that fetches data.
    const whereClause: {
        isActive?: boolean;
        OR?: Array<{
            name?: { contains: string; mode: "insensitive" };
            description?: { contains: string; mode: "insensitive" };
        }>;
    } = {};
    
    // Add status filter
    if (filterIsActive.isActive !== "all") {
        whereClause.isActive = filterIsActive.isActive === "true";
    }
    
    // Add search filter
    if (searchTerm && searchTerm.trim() !== "") {
        whereClause.OR = [
            { name: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } }
        ];
    }
    
    try {
        const services = await prisma.service.findMany({
            where: whereClause,
            orderBy: {
                createdAt: "desc"
            },
        });
        return services;
    } catch (error) {
        console.error("Error getting services:", error);
        return [];
    }
}

export async function getService(id: string) {
    try {
        const service = await prisma.service.findUnique({
            where: { id }
        });
        return service;
    } catch (error) {
        console.error("Error getting service:", error);
        return { error: "Failed to get service" };
    }
}

// --- UPDATE ----
export async function updateService(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const isActive = formData.get("isActive") === "true";
    const isFeatured = formData.get("isFeatured") === "true";

    if (!name || !description || isNaN(price)) {
        return { error: "All fields are required and price must be a valid number" };
    }

    try {
        await prisma.service.update({
            where: { id },
            data: { 
                name, 
                description, 
                price, 
                isActive, 
                isFeatured 
            }
        });
        revalidateTag(serviceTag);
    } catch (error) {
        console.error("Error updating service:", error);
        return { error: "Failed to update service" };
    }
}

// --- DELETE ----
export async function deleteService(id: string) {
    try {
        await prisma.service.delete({
            where: { id }
        });
        revalidateTag(serviceTag);
        revalidatePath("/dashboard/services");
    } catch (error) {
        console.error("Error deleting service:", error);
        return { error: "Failed to delete service" };
    }
}