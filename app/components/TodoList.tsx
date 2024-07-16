"use client"
import { ITask } from "@/types/tasks"
import Task from "./Task"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
interface TodoListProps {
    tasks: ITask[]
}








const TodoList = ({ tasks }: TodoListProps) => {


    return (
        <>
            {
                tasks.length > 0 ? (
                    <Table>
                        <TableCaption>Lista de Tarefas</TableCaption>
                        <TableHeader className="w-full">
                            <TableRow className={``}>
                                <TableHead><Checkbox /></TableHead>
                                <TableHead className="w-[100px]">Tarefa</TableHead>
                                <TableHead>Actions</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody className="w-full">
                            {tasks.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>{task.checked}</TableCell>
                                    <TableCell className="font-medium">{task.text}</TableCell>
                                    <TableCell className="font-medium"></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">$2,500.00</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                ) : (<div className="overflow-x-auto w-full justify-center flex">
                    <div className="h2 text-center">Adicione sua primeira tarefa!</div></div>)
            }
        </>
    )
}
export default TodoList