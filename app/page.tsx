
import Image from 'next/image'
import { db } from "@/app/_lib/prisma";
import TodoList from './components/TodoList'
import AddTask from './components/AddTask'
import { getServerSession } from 'next-auth';
import authOptions from './api/auth/[...nextauth]/options';
import { signIn, signOut } from 'next-auth/react';
import { FiLogOut } from 'react-icons/fi';
import { LogOutBtn } from './components/LogOutBtn';
import { LogInBtn } from './components/LogInBtn';
import { fetchTodos } from './_actions/getTodos';
export interface PageProps {
  params: { [key: string]: string | string[] | undefined },
  searchParams?: { [key: string]: string | string[] | undefined }
}
const PAGE_SIZE = 8;
const Home = async (props: PageProps) => {
  const pageNumber = Number(props?.searchParams?.page || 1)
  const filter = (props?.searchParams?.filter) as string || 'createdAt'
  const orderby = (props?.searchParams?.orderby as 'asc' | 'desc') || 'desc'
  const filters = { filter, orderby }
  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;
  const session = await getServerSession(authOptions)
  if (session?.user) {
    const { data, metadata } = await fetchTodos({ take, skip, filters });


    return (
      <>
        <div className="flex-col justify-center items-center text-center pt-12">
          <h1>Bem vindo</h1>
          <div className='flex justify-center items-center gap-2'>
            <Image className='rounded-full' src={session?.user?.image ? session?.user?.image : ''} width={50} height={50} alt="user img" />
            {session?.user?.name}
            <LogOutBtn />
          </div>

        </div>

        <main className="flex mx-auto max-w-4xl text-center gap-4 flex-col items-center justify-center pt-24 px-5">

          <div className='flex w-full flex-col justify-center gap-4'>
            <h1>Lista de Tarefas</h1>
            <AddTask />
          </div>

          <TodoList tasks={data} />

        </main>
      </>
    )
  }

  return (

    <div className="flex min-h-screen mx-auto max-w-4xl text-center gap-4 flex-col items-center justify-center p-24">
      Bem vindo<br />
      Você não esta logado <br />
      <LogInBtn />
    </div>

  )

}

export default Home