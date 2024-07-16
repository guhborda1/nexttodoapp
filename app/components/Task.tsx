'use client'
import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi'

import { useRouter } from "next/navigation";
import { deleteTask, updateTask } from "@/api";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Checkbox } from "@/components/ui/checkbox";
import { SeparatorHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TableCell } from "@/components/ui/table";
import { ResponsiveDialog } from "./Modal";

interface TaskProps {
    task: ITask;
}
const Task = ({ task }: TaskProps) => {
    const router = useRouter()
    const [openModalEdit, setOpenModalEdit] = useState<boolean>(false)
    const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
    const [taskToEdit, setTaskToEdit] = useState<string>(task.text)
    const [hasChecked, setHasChecked] = useState<boolean>(task.checked)
    const onChangeCheckBox = () => {
        const updatedChecked = !task.checked;
        setHasChecked(updatedChecked);
        handleUpdateCheckbox()
    };
    const handleUpdateCheckbox = async () => {
        const updatedChecked = !task.checked;
        setHasChecked(updatedChecked);
        await updateTask({ id: task.id, text: task.text, checked: updatedChecked });
        router.refresh()
    };
    const handleSubmitEditTodo = async () => {

        await updateTask({ id: task.id, text: taskToEdit, checked: hasChecked });
        setTaskToEdit(taskToEdit);
        setOpenModalEdit(false);
        router.refresh();
    };
    const handleDeleteTodo = async () => {
        await deleteTask(task.id)
        router.refresh();
    }
    return (

        <>
            <TableCell><label className="flex justify-start items-center">
                <Checkbox id={task.id} checked={task.checked} onCheckedChange={onChangeCheckBox} />
                {/* <input type="checkbox" checked={task.checked} onChange={onChangeCheckBox} className="checkbox" /> */}
            </label>
            </TableCell>
            <TableCell>
                {hasChecked ? (<td><s><p className="ml-2 text-left overflow-hidden text-ellipsis text-nowrap">{task.text}</p></s></td>) : (<td><p className="text-left overflow-hidden text-ellipsis text-nowrap">{task.text}</p></td>)}
            </TableCell>
            <TableCell>


                <Button onClick={() => { setOpenModalEdit }} className="btn btn-ghost btn-xs bg-blue-700"><FiEdit cursor="pointer" size={12} /></Button>
                <ResponsiveDialog isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title="Alterar Tarefa" description="tem certeza que deseja alterar a tarefa?">


                    <div className='w-full mt-2 mb-1 px-4'>
                        {/* <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Digite sua tarefa aqui" className="input input-bordered w-full max-w-xs join-item" /> */}
                        <Input type="email" placeholder="Digite sua tarefa aqui" onChange={e => setTaskToEdit(e.target.value)} value={taskToEdit} className="w-full " />
                    </div>
                    <footer className='w-full'>
                        <Button onClick={handleSubmitEditTodo} className='w-full bg-blue-700'>Salvar</Button>

                        <Button onClick={() => setOpenModalEdit(false)} variant="outline" className="w-full">Cancelar</Button>

                    </footer>

                </ResponsiveDialog>


                <Button variant="outline" onClick={() => setOpenModalDeleted} className="btn btn-ghost btn-xs"><FiTrash2 cursor="pointer" size={12} /></Button>
                <ResponsiveDialog isOpen={openModalDeleted} setIsOpen={setOpenModalDeleted} title="Alterar Tarefa" description="tem certeza que deseja alterar a tarefa?">


                    <div className='w-full mt-2 mb-1 px-4'>
                        {/* <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Digite sua tarefa aqui" className="input input-bordered w-full max-w-xs join-item" /> */}
                        <h5>Tem certeza que deseja Deletar a Tarefa?</h5>
                        <p>Essa ação é irreversível</p>
                    </div>
                    <footer className='w-full'>
                        <Button onClick={handleDeleteTodo} className='w-full bg-blue-700'>Excluir Tarefa</Button>

                        <Button onClick={() => setOpenModalEdit(false)} variant="outline" className="w-full">Cancelar</Button>

                    </footer>

                </ResponsiveDialog>
            </TableCell>
        </>

    )
}
export default Task