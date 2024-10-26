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
import { EllipsisIcon, SeparatorHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import { ResponsiveDialog } from "./Modal";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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

            <TableRow className={`${task.checked ?? ('bg-[#f1f5f980]')}`}>
                <TableCell><label className="flex justify-start items-center">
                    <Checkbox id={task.id} checked={task.checked} onCheckedChange={onChangeCheckBox} />
                    {/* <input type="checkbox" checked={task.checked} onChange={onChangeCheckBox} className="checkbox" /> */}
                </label>
                </TableCell>
                <TableCell className="w-full">
                    {hasChecked ? (<s><p className="ml-2 text-left overflow-hidden text-ellipsis text-nowrap">{task.text}</p></s>) : (<p className="text-left overflow-hidden text-ellipsis text-nowrap">{task.text}</p>)}
                </TableCell>
                <TableCell className="text-right flex gap-2 justify-end">

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="link"><EllipsisIcon /></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="w-full tex-left" asChild>
                                <Button className="tex-left" onClick={() => { setOpenModalEdit(!openModalEdit) }} variant={'ghost'}><FiEdit cursor="pointer" size={12} />
                                    <span>Editar</span>
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="w-full tex-left" asChild>
                                <Button className="tex-left" variant="ghost" onClick={() => setOpenModalDeleted(!openModalDeleted)} ><FiTrash2 cursor="pointer" size={12} /><span>Deletar</span></Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>
                </TableCell>
            </TableRow>


            <ResponsiveDialog isOpen={openModalEdit} setIsOpen={setOpenModalEdit} title="Alterar Tarefa" description="tem certeza que deseja alterar a tarefa?">


                <div className='w-full mt-2 mb-2 px-4'>
                    {/* <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Digite sua tarefa aqui" className="input input-bordered w-full max-w-xs join-item" /> */}
                    <Input type="text" placeholder="Digite sua tarefa aqui" onChange={e => setTaskToEdit(e.target.value)} value={taskToEdit} className="w-full " />
                </div>
                <footer className='w-full flex gap-1 mt-2 px-4'>
                    <Button onClick={handleSubmitEditTodo} className='w-full bg-blue-700'>Salvar</Button>


                </footer>

            </ResponsiveDialog>
            <ResponsiveDialog isOpen={openModalDeleted} setIsOpen={setOpenModalDeleted} title="Deletar tarefa" description="tem certeza que deseja deletar a tarefa?">


                <div className='w-full mt-2 mb-1 px-4'>
                    {/* <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Digite sua tarefa aqui" className="input input-bordered w-full max-w-xs join-item" /> */}
                    <p>Essa ação é irreversível</p>
                </div>
                <footer className='w-full px-4 gap-1'>
                    <Button onClick={handleDeleteTodo} className='w-full bg-blue-700'>Excluir Tarefa</Button>


                </footer>

            </ResponsiveDialog>
        </>
    )
}
export default Task