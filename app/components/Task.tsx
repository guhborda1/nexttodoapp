'use client'
import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTask, updateTask } from "@/api";

interface TaskProps {
    task: ITask;
}
const Task = ({ task }: TaskProps) => {
    console.log(task)
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)
    const [hasChecked, setHasChecked] = useState<boolean>(task.checked)
    const onChangeCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedChecked = !task.checked;
        setHasChecked(updatedChecked);
        handleUpdateCheckbox()
    };
    const handleUpdateCheckbox = async () => {
        const updatedChecked = !task.checked;
        setHasChecked(updatedChecked);

        await updateTask({ id: task.id, text: task.text, checked: updatedChecked });
        console.log("After updateTodo:", updatedChecked);
        router.refresh()
    };
    const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        await updateTask({ id: task.id, text: taskToEdit, checked: hasChecked });
        setTaskToEdit(taskToEdit);
        setOpenModalEdit(false);
        router.refresh();
    };
    const handleDeleteTodo: FormEventHandler<HTMLFormElement> = async () => {
        await deleteTask(task.id)
    }
    return (
        <tr key={task.id} className="relative">
            <th>
                <label>
                    <input type="checkbox" checked={task.checked} onChange={onChangeCheckBox} className="checkbox" />
                </label>
            </th>
            {hasChecked ? <td><s>{task.text}</s></td> : <td>{task.text}</td>}

            <th className="">
                <div className="flex justify-end">
                    <a onClick={() => { setOpenModalEdit(true) }} className="btn btn-ghost btn-xs"><FiEdit cursor="pointer" size={12} /></a>
                    <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
                        <form onSubmit={handleSubmitEditTodo}>
                            <h3>Editar Tarefa</h3>
                            <div className='w-full mt-5 join mx-auto justify-center'>

                                <input value={taskToEdit} type="text" onChange={e => setTaskToEdit(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs join-item" />
                                <button className='btn join-item' type='submit'>Salvar</button>

                            </div>
                        </form>
                    </Modal>
                    <a className="btn btn-ghost btn-xs" onClick={() => { setOpenModalDeleted(true) }}><FiTrash2 cursor="pointer" size={12} /></a>
                    <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
                        <form className="text-center py-5" onSubmit={handleDeleteTodo}>
                            <h3>Tem Certeza que deseja excluir essa tarefa?</h3>
                            <div className='w-full mt-5 join mx-auto justify-center'>

                                <button className='btn join-item' type='submit'>Excluir</button>
                                <button className='btn btn-primary join-item' onClick={() => setOpenModalDeleted(false)}>Cancelar</button>


                            </div>
                        </form>
                    </Modal>
                </div>
            </th>
        </tr>
    )
}
export default Task