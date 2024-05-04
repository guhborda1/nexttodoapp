"use client"
import { FormEventHandler, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Modal } from './Modal';
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

        setNewTaskValue("");
        setOpenModal(false)
        router.refresh()
    }
    return (
        <>

            {/* <Modal modalOpen={openModal} setModalOpen={setOpenModal}>
                <form onSubmit={handleSubmitTodo}>
                    <h3>Adicionar Nova Tarefa</h3>
                    <div className='w-full mt-5 join mx-auto justify-center'>
                        <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Digite sua tarefa aqui" className="input input-bordered w-full max-w-xs join-item" />
                        <button className='btn join-item' type='submit'>Salvar</button>

                    </div>
                </form>
            </Modal> */}
            <Drawer open={openModal} onOpenChange={setOpenModal}>
                <DrawerTrigger asChild><button onClick={() => setOpenModal(true)} className="btn btn-primary flex justify-between items-center bg-blue-700 p-3 rounded-xl text-white" >
                    <div></div>
                    <div>Adicionar Tarefa</div>
                    <AiOutlinePlus />
                </button></DrawerTrigger>
                <DrawerContent className='flex w-full justify-center items-center '>
                    <DrawerHeader className='justify-center items-center !text-center'>
                        <DrawerTitle className='justify-center items-center !text-center'>Adicionar nova tarefa</DrawerTitle>
                        <DrawerDescription className='justify-center items-center !text-center'>crie uma nova tarefa</DrawerDescription>
                    </DrawerHeader>
                    <div className='w-full mt-2 mb-1 px-4'>
                        {/* <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Digite sua tarefa aqui" className="input input-bordered w-full max-w-xs join-item" /> */}
                        <Input type="email" placeholder="Digite sua tarefa aqui" onChange={e => setNewTaskValue(e.target.value)} value={newTaskValue} className="w-full " />
                    </div>
                    <DrawerFooter className='w-full'>
                        <Button onClick={handleSubmitTodo} className='w-full bg-blue-700'>Salvar</Button>
                        <DrawerClose>
                            <Button variant="outline" className="w-full">Cancelar</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};
export default AddTask;
