'use client'
import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.css";
import SignIn from './sign-in';
import { onAuthStateChangedHelper, db } from "../../utils/firebase/firebase";
import { collection, getDocs} from 'firebase/firestore';
import {
    useState,
    useEffect,
} from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import Upload from "./upload";
import { useRouter } from 'next/navigation'


type User = FirebaseUser & { roles: {admin?: boolean, viewer:boolean, uploader?:boolean}}

import { useColorScheme } from "@mui/joy/styles";
import Button from '@mui/joy/Button';

export default function Navbar () {

    const [hydrated, setHydrated] = useState(false); // Todo: hacky fix to fix hydration issues with text
    const {mode, setMode} = useColorScheme();
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const toggleColorScheme = () => {
        mode === 'dark' ? setMode('light') : setMode('dark');
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper((user) => {
            // we have our user from firebase auth, reference firestore user for the roles
            if (!user) {
                setUser(null);
                return;
            }
            let coll = collection(db,'users');
            getDocs(coll).then(snapshot => {
              let userDoc = snapshot.docs.find((doc) => {
                return doc.id === user?.uid;
              })
              setUser(userDoc?.data() as User);
            });
          });

        setHydrated(true);
        // cleanup
        return () => {
            unsubscribe();
        }
    }, []);

    if (!hydrated) {
        return null;
    }

    return (
        <>
            <nav className={styles.nav}>
                <Link href="/">
                    <Image src="/youtube.svg" alt="youtube logo" width={90} height={50}></Image>
                </Link>
                {user?.roles?.uploader ? <Upload></Upload> : null}
                <Button variant="outlined" onClick={toggleColorScheme} sx={{marginLeft: 'auto', marginRight: '10px'}}>    
                    {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </Button>
                <SignIn user={user as User}/>
            </nav>
        </>
    )
}