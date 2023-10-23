import Image from 'next/image'
import styles from './page.module.css';
import { getVideos } from '../utils/firebase/functions';
import Link from 'next/link';

export default async function Home() {

  const videos = await getVideos();
  console.log(videos);

  return (
    <main className={styles.main}>
      {
        videos.map(video => {
          return (
              <Link key={video.id} href={`/watch?v=${video.filename}`}>
              VIDEO!!
            </Link>
          )
        })
      }
    </main>
  )
}

export const revalidate = 30;