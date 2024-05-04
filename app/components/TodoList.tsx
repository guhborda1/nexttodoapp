import { ITask } from "@/types/tasks"
import Task from "./Task"
import { Checkbox } from "@/components/ui/checkbox"
interface TodoListProps {
    tasks: ITask[]
}
const TodoList = ({ tasks }: TodoListProps) => {
    return (
        <>
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