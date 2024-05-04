import { ITask } from "@/types/tasks"
import Task from "./Task"
interface TodoListProps {
    tasks: ITask[]
}
const TodoList = ({ tasks }: TodoListProps) => {
    return (
        <>
            {
                tasks.length > 0 ? (
                    <div className="overflow-x-auto w-full justify-between flex">
                        <table className="table w-full">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <th>Tarefa</th>
                                    <th className="flex justify-end">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
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