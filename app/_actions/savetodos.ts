"use server"

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface SaveTodosParams {
    text: string;
    checked: boolean;
    userId: string;
}
