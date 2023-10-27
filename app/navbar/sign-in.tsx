'use client';

import styles from './sign-in.module.css';
import { signOut } from '../../utils/firebase/firebase';
import { User } from 'firebase/auth';
import { useRouter } from 'next/navigation'
import Button from '@mui/joy/Button';

interface SignInProps {
    user: User
}

export default function SignIn({ user }: SignInProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    }

    return (
        <>
        {
            user ? (
                <Button onClick={handleSignOut}>Sign Out</Button>
            ) : (
                <Button type="button" onClick={()=>router.push('/login')}>Sign In</Button>
            )
        }
        </>
    )
}