
import Image from 'next/image'
import { db } from "@/app/_lib/prisma";
import TodoList from './components/TodoList'
import AddTask from './components/AddTask'
import { getServerSession } from 'next-auth';
import authOptions from './api/auth/[...nextauth]/options';
import { signIn, signOut, useSession } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';


const Home = async () => {
  const { data } = await useSession()
  if (data) {
    const tasks = await db.task.findMany({
      where: {
        userId: (data?.user as any).id,
      }
    });


    return (
      <>
        <div className="flex-col justify-center items-center text-center pt-12">
          <h1>Bem vindo</h1>
          <div className='flex justify-center items-center gap-2'>
            <Image className='rounded-full' src={data?.user?.image ? data?.user?.image : ''} width={50} height={50} alt="user img" />
            {data?.user?.name}
            <button className='flex gap-3 items-center justify-center' onClick={() => { signOut() }}><FiLogOut /> <div>Sair</div></button>
          </div>

        </div>

        <main className="flex mx-auto max-w-4xl text-center gap-4 flex-col items-center justify-center pt-24">

          <div className='flex w-full flex-col justify-center gap-4'>
            <h1>Lista de Tarefas</h1>
            <AddTask />
          </div>

          <TodoList tasks={tasks} />

        </main>
      </>
    )
  }

  return (

    <div className="flex min-h-screen mx-auto max-w-4xl text-center gap-4 flex-col items-center justify-center p-24">
      Bem vindo<br />
      Você não esta logado <br />
      <button onClick={() => signIn('google')}>Entrar</button>
    </div>

  )

}

export default Home