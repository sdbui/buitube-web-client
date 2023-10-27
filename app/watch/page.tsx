'use client'
import { useSearchParams } from 'next/navigation';
import Sheet from '@mui/joy/Sheet';
import styles from './watch.module.css';
import AspectRatio from '@mui/joy/AspectRatio';


export default function Watch() {

    const videoPrefix = 'https://storage.googleapis.com/buitube-processed-videos/';
    const videoSrc = useSearchParams().get('v');

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