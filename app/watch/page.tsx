'use client'
import { useSearchParams } from 'next/navigation';
import Sheet from '@mui/joy/Sheet';
import styles from './watch.module.css';
import AspectRatio from '@mui/joy/AspectRatio';
import {
    useEffect,
} from 'react';
import { onAuthStateChangedHelper, db } from '@/utils/firebase/firebase';
import { useRouter } from 'next/navigation';
import { collection, getDocs } from 'firebase/firestore';


export default function Watch() {

    const videoPrefix = 'https://storage.googleapis.com/buitube-processed-videos/';
    const videoSrc = useSearchParams().get('v');
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChangedHelper(user => {
            if (!user) {
                return router.push('/login')
            }
            // we have our user from firebase auth, reference firestore user for the roles
            let coll = collection(db,'users');
            getDocs(coll).then(snapshot => {
                let userDoc = snapshot.docs.find((doc) => {
                return doc.id === user?.uid;
                })
            });

        })
    },[])

    return (
        <>
            <Sheet sx={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <video controls className={styles.videoPlayer} playsInline muted loop>
                    <source src={videoPrefix + videoSrc} type="video/mp4"></source>
                </video>
            </Sheet>
        </>
    )
}