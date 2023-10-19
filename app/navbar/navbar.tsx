'use client'
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import SignIn from './sign-in';
import { onAuthStateChangedHelper } from "../../utils/firebase/firebase";
import {
    useState,
    useEffect,
} from 'react';
import { User } from 'firebase/auth';


export default function Navbar () {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            setUser(user);
        });

        // cleanup
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image src="/youtube.svg" alt="youtube logo" width={90} height={50}></Image>
            </Link>
            <Link href="/watch"> Watch </Link>
            {
                // todo add upload
            }
            <SignIn user={user}/>
        </nav>
    )
}