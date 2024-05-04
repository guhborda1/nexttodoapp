import { signIn, signOut } from 'next-auth/react'
import React from 'react'
import { FiLogOut } from 'react-icons/fi'

export const LogInBtn = () => {
    return (
        <button onClick={() => signIn('google')}>Entrar</button>
    )
}
