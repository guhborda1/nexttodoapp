'use server'
import { useSession } from "next-auth/react";
import { db } from "./app/_lib/prisma";
import { ITask } from "./types/tasks";
import { getServerSession } from 'next-auth';
import authOptions from "./app/api/auth/[...nextauth]/options";
interface SaveTodosParams {
    id: string,
    text: string,
    checked: boolean,
    userId: string
}
interface UpdateTodosParams {
    id: string,
    text: string,
    checked: boolean,
}

export const addTask = async (todo: SaveTodosParams): Promise<ITask> => {

    const todos = await db.task.create({
        data: {
            id: todo.id,
            text: todo.text,
            userId: todo.userId,
            checked: todo.checked,

        }
    })
    return todos;
}
export const updateTask = async (todo: UpdateTodosParams) => {

    const todos = await db.task.update({
        where: {
            id: todo.id,
        },
        data: {
            text: todo.text,
            checked: todo.checked,
        }
    })
    return todos;
}
export const deleteTask = async (todo: string) => {

    const todos = await db.task.delete({
        where: {
            id: todo,
        },
    })
    return todos;
}

export const getAllTodos = async () => {
    const data  = await getServerSession(authOptions)
    if (data) {
        const tasks = await db.task.findMany({
            where: {
                userId: (data?.user as any).id,
            }
        });
        return tasks
    }
    return false
}