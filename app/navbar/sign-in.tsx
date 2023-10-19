'use client';

import styles from './sign-in.module.css';
import { signInWithGoogle, signOut } from '../../utils/firebase/firebase';
import { User } from 'firebase/auth';

interface SignInProps {
    user: User
}

export default function SignIn({ user }: SignInProps) {


    return (
        <>
        {
            user ? (
                <button className={styles.signin} onClick={signOut}>Sign Out</button>
            ) : (
                <button type="button" className={styles.signin} onClick={signInWithGoogle}>Sign In</button>
            )
        }
        </>
    )
}