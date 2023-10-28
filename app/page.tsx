import styles from './page.module.css';
import { getVideos } from '../utils/firebase/functions';

import VideosList from './videos-list/videos-list';


export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string,
  thumbnail?: string,
}

export default async function Home() {

  const videos = await getVideos();

  return (
      <main className={styles.main}>
        <VideosList videos={videos}></VideosList>
      </main>
  )
}

export const revalidate = 30;