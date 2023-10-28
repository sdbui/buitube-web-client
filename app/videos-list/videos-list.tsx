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
import Skeleton from '@mui/joy/Skeleton';
import AspectRatio from '@mui/joy/AspectRatio';
import Sheet from '@mui/joy/Sheet';
import { useRouter } from 'next/navigation';

interface IVideos {
  videos: Video[];
}

type User = FirebaseUser & {roles: { admin?: boolean, viewer: boolean, uploader?: boolean}}

export default function VideosList ({videos} : IVideos) {
  const thumbnailPrefix = 'https://storage.googleapis.com/buitube-video-thumbnails'
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      if (!user) {
        // need to be signed in in order to see videos... redirect to login
        return router.push('/login')
      }

      // we have our user from firebase auth, reference firestore user for the roles
      let coll = collection(db,'users');
      getDocs(coll).then(snapshot => {
        let userDoc = snapshot.docs.find((doc) => {
          return doc.id === user?.uid;
        })
        setUser(userDoc?.data() as User);
        setLoading(false)
      });
    })

    return () => {
      unsubscribe();
    }
  },[]);

  if (loading) {
    return (
      <Sheet sx={{display: 'flex', gap: 2, flexWrap: 'wrap'}}>
        {[...Array(5)].map((_x,i) => {
          return (
            <Card key={i} variant="outlined" sx={{width: 343, display: 'flex', gap: 2}}>
              <AspectRatio ratio="21/9">
                <Skeleton variant="overlay"></Skeleton>
              </AspectRatio>
              <Typography>
                <Skeleton>
                  Hey, this is some temporary text. If you are reading this... why? there is nothing for you here. Turn around
                </Skeleton>
              </Typography>
            </Card>
          )
        })}
      </Sheet>)
  }

  if (!user?.roles?.viewer) {
    return (<>
        <Typography sx={{textAlign: 'center', marginTop: '100px'}} level="title-lg">Looks like you need access. Please contact your administrator.</Typography>
    </>)
  }

  return (
    <Grid sx={{ gap: 4, display:'flex', alignItems: 'start', justifyContent:'center', marginTop: '20px'}} container>
        {
          videos.map(video => {
            return (
              <Link key={video.id} href={`/watch?v=${video.filename}`} className={`${styles.cardLink} ${video.status === 'processed' ? '' : styles.cardDisabled}`}>
                <Card className={styles.card}>
                  {video?.thumbnail ? (
                    <AspectRatio maxHeight="150px">
                      <img height="150px" src={`${thumbnailPrefix}/${video.thumbnail}`} alt="video thumbnail"/>
                    </AspectRatio>) : (
                    <div className={styles.cardImage}>
                      <Typography level="title-lg">Processsing</Typography>
                    </div>
                    )}
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