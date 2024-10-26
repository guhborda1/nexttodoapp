'use server'
import { db } from "@/app/_lib/prisma";
import { getServerSession } from 'next-auth';
import authOptions from "../api/auth/[...nextauth]/options";



interface PetsListingProps {
    take: number;
    skip: number;
    filters: { filter: string; orderby: 'asc' | 'desc' };
}

export const fetchTodos = async ({ take, skip, filters }: PetsListingProps) => {
    const session = await getServerSession(authOptions)


    try {
        const orderBy: { [key: string]: 'asc' | 'desc' } = {};
        if (filters.filter) {
            if (filters.filter == 'userId') {
                orderBy['name'] = filters.orderby;
            } else {
                orderBy[filters.filter] = filters.orderby;
            }
        } else {
            orderBy['name'] = 'asc';
        }
        if (session?.user) {
            const tasks = await db.task.findMany({
                where: {
                    userId: (session?.user as any).id,
                }
            });
            const total = await db.task.count({

            });
            return {
                data: tasks,
                metadata: {
                    hasNextPage: skip + take < total,
                    totalPages: Math.ceil(total / take),
                    count: total
                }
            };
        }

    } catch (err: any) {
        return err;
    }
};

