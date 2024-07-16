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
                            <TableRow className={`w-full`}>
                                <TableHead className="w-[100px]"><Checkbox /></TableHead>
                                <TableHead >Tarefa</TableHead>
                                <TableHead className="text-right">Actions</TableHead>

                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.map((task) => (
                                <Task key={task.id} task={task} />
                            ))}
                        </TableBody>

                    </Table>
                ) : (<div className="overflow-x-auto w-full justify-center flex">
                    <div className="h2 text-center">Adicione sua primeira tarefa!</div></div>)
            }
        </>
    )
}
export default TodoList