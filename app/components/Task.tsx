'use client'
import { ITask } from "@/types/tasks"
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { Modal } from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTask, updateTask } from "@/api";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

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
        <tr key={task.id} className="relative w-full">
            <th>
                <label>
                    <Checkbox id={task.id} checked={task.checked} onCheckedChange={onChangeCheckBox} />
                    {/* <input type="checkbox" checked={task.checked} onChange={onChangeCheckBox} className="checkbox" /> */}
                </label>
            </th>
            {hasChecked ? <td><s>{task.text}</s></td> : <td>{task.text}</td>}
            <th className="">
                <div className="flex justify-end gap-1">


                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className="btn btn-ghost btn-xs"><FiEdit cursor="pointer" size={12} /></Button>
                        </DrawerTrigger>
                        <DrawerContent className='flex w-full justify-center items-center px-5'>
                            <DrawerHeader className='justify-center items-center !text-center'>
                                <DrawerTitle className='justify-center items-center !text-center'>Alterar tarefa</DrawerTitle>
                                <DrawerDescription className='justify-center items-center !text-center'>para alterar basta clicar em Salvar</DrawerDescription>
                            </DrawerHeader>
                            <div className='w-full mt-5'>
                                {/* <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Digite sua tarefa aqui" className="input input-bordered w-full max-w-xs join-item" /> */}
                                <Input type="email" placeholder="Digite sua tarefa aqui" onChange={e => setTaskToEdit(e.target.value)} value={taskToEdit} className="w-full " />
                            </div>
                            <DrawerFooter className='w-full'>
                                <Button onClick={handleSubmitEditTodo} className='w-full'>Salvar</Button>
                                <DrawerClose>
                                    <Button variant="outline" className="w-full">Cancelar</Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="outline" className="btn btn-ghost btn-xs"><FiTrash2 cursor="pointer" size={12} /></Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Você deseja apagar tarefa?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Essa ação não pode ser desfeita!
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteTodo}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </th>
        </tr>
    )
}
export default Task