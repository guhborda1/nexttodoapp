"use client"
import { FormEventHandler, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ResponsiveDialog } from './Modal';
import { addTask } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'
import { getSession, useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import authOptions from '../api/auth/[...nextauth]/options';
import { ITask } from '@/types/tasks';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const AddTask = () => {
    const { data } = useSession();



    const router = useRouter()
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("")

    const handleSubmitTodo = async () => {

        await addTask({
            id: uuidv4(),
            text: newTaskValue,
            checked: false,
            userId: (data?.user as any).id
        });
        setOpenModal(false)
        setNewTaskValue("");
        router.refresh()
    }
    return (
        <>
            <Button onClick={() => setOpenModal(true)} className="btn btn-primary flex justify-between items-center bg-blue-700 p-3 rounded-xl text-white" >
                <div></div>
                <div>Adicionar Tarefa</div>
                <AiOutlinePlus />
            </Button>
            <ResponsiveDialog isOpen={openModal} setIsOpen={setOpenModal} title="Criar" description={'nova tarefa'}>
                <form onSubmit={handleSubmitTodo}>
                    <h3>Adicionar Nova Tarefa</h3>
                    <div className='w-full mt-5 join mx-auto justify-center'>
                        <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Digite sua tarefa aqui" className="input input-bordered w-full max-w-xs join-item" />
                        <Button className='btn join-item' type='submit'>Salvar</Button>
                    </div>
                </form>
            </ResponsiveDialog>

        </>
    );
};
export default AddTask;
