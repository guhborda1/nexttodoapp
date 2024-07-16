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

            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="w-[100px]">Tarefa</TableHead>
                        <TableHead>Actions</TableHead>

                    </TableRow>
                </TableHeader>
                <TableBody>
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

            {
                tasks.length > 0 ? (
                    <div className="overflow-x-auto w-full justify-between">
                        <table className="table w-full gap-2 ">
                            {/* head */}
                            <thead className="mb-6">
                                <tr className="border-b border-solid border-gray-400">
                                    <th className="flex justify-start">
                                        <label>
                                            <Checkbox />
                                        </label>
                                    </th>
                                    <th className="ml-2 text-left">Tarefa</th>
                                    <th className="flex justify-end">Ações</th>
                                </tr>
                            </thead>
                            <tbody className="flex-col gap-3 mt-3">
                                {tasks.map((task) => (
                                    <Task key={task.id} task={task} />
                                )).reverse()}


                            </tbody>


                        </table>
                    </div>
                ) : (<div className="overflow-x-auto w-full justify-center flex">
                    <div className="h2 text-center">Adicione sua primeira tarefa!</div></div>)
            }
        </>
    )
}
export default TodoList