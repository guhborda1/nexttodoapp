import { ITask } from "@/types/tasks"
import Task from "./Task"
interface TodoListProps {
    tasks: ITask[]
}
const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
    return (
        <div className="overflow-x-auto w-full">

            {tasks.length > 0 ? (
                <table className="table">
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
            ) : (<div className="h2">Adicione sua primeira tarefa!</div>)}

        </div>
    )
}
export default TodoList