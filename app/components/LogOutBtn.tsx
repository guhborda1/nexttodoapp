"use client"
import { signOut } from 'next-auth/react'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'

export const LogOutBtn = () => {
    return (
        <button className='flex gap-3 items-center justify-center' onClick={() => { signOut() }}><FiLogOut /> <div>Sair</div></button>
    )
}
