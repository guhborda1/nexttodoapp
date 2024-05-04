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
const AddTask = () => {
    const { data } = useSession();



    const router = useRouter()
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [newTaskValue, setNewTaskValue] = useState<string>("")

    const handleSubmitTodo: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
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
            <button onClick={() => setOpenModal(true)} className="btn btn-primary flex justify-between">
                <div></div>
                <div>Adicionar Tarefa</div>
                <AiOutlinePlus />
            </button>
            <Modal modalOpen={openModal} setModalOpen={setOpenModal}>
                <form onSubmit={handleSubmitTodo}>
                    <h3>Adicionar Nova Tarefa</h3>
                    <div className='w-full mt-5 join mx-auto justify-center'>
                        <input value={newTaskValue} type="text" onChange={e => setNewTaskValue(e.target.value)} placeholder="Type here" className="input input-bordered w-full max-w-xs join-item" />
                        <button className='btn join-item' type='submit'>Salvar</button>

                    </div>
                </form>
            </Modal>
        </>
    );
};
export default AddTask;
