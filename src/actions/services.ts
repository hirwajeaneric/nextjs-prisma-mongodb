"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

// Define a cache tag for the services data. Using a tag gives you fine-grained control over revalidation.
const serviceTag = "services";

// --- CREATE ----
export async function createService(formData: FormData) {
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const isActive = formData.get("isActive");
    const isFeatured = formData.get("isFeatured");

    if (!name || !description || !price) {
        return { error: "All fields are required" };
    }

    try {
        await prisma.service.create({
            data: { name, description, price, isActive, isFeatured }
        });
        revalidateTag(serviceTag);
        redirect("/dashboard/services");
    } catch (error) {
        console.error("Error creating service:", error);
        return { error: "Failed to create service" };
    }
}

// --- READ ----
export async function getServices() {
    // Use `unstable-cache` with a tag to enable memoization and on-demand revalidation.
    // Next.js also extends `fetch` with caching, but `unstable-cache` works for any function that fetches data.
    try {
        const services = await prisma.service.findMany({
            orderBy: {
                createdAt: "desc"
            },
            cache: {
                tags: [serviceTag]
            }
        });
        return services;
    } catch (error) {
        console.error("Error getting services:", error);
        return { error: "Failed to get services" };
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
    const name = formData.get("name");
    const description = formData.get("description");
    const price = formData.get("price");
    const isActive = formData.get("isActive");
    const isFeatured = formData.get("isFeatured");

    if (!name || !description || !price) {
        return { error: "All fields are required" };
    }

    try {
        await prisma.service.update({
            where: { id },
            data: { name, description, price, isActive, isFeatured }
        });
        revalidateTag(serviceTag);
        redirect("/dashboard/services");
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