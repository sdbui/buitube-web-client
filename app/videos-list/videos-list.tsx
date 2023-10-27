'use client'
import styles from './videos-list.module.css';
import { onAuthStateChangedHelper, db } from '../../utils/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import {
  useState,
  useEffect,
} from 'react';

import { User as FirebaseUser } from 'firebase/auth';
import Grid from '@mui/joy/Grid';
import Link from 'next/link';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import {Video} from '../page';

interface IVideos {
  videos: Video[];
}

type User = FirebaseUser & {roles: { admin?: boolean, viewer: boolean, uploader?: boolean}}

export default function VideosList ({videos} : IVideos) {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChangedHelper((user) => {
      if (!user) return;
      // we have our user from firebase auth, reference firestore user for the roles
      let coll = collection(db,'users');
      getDocs(coll).then(snapshot => {
        let userDoc = snapshot.docs.find((doc) => {
          return doc.id === user?.uid;
        })
        setUser(userDoc?.data() as User);
      });
    })

    return () => {
      unsubscribe();
    }
  },[]);

  if (!user?.roles?.viewer) {
    return (<>
      <p>YOU DONT HAVE ACCESS LMAO</p>
    </>)
  }

  return (
    <Grid sx={{flexGrow: 1}} container spacing={2}>
        {
          videos.map(video => {
            return (
              <Link key={video.id} href={`/watch?v=${video.filename}`} className={styles.cardLink}>
                <Card className={styles.card}>
                  <div className={styles.cardImage}>image here todo</div>
                  <Typography level="title-lg">{video.title || 'Untitled'}</Typography>
                  <Typography level="body-md">{video.description || 'No Description Provided'}</Typography>
                </Card>
              </Link>
            )
          })
        }

    </Grid>
  )
}