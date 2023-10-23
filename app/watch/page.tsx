'use client'
import { useSearchParams } from 'next/navigation';


export default function Watch() {

    const videoPrefix = 'https://storage.googleapis.com/buitube-processed-videos/';
    const videoSrc = useSearchParams().get('v');

    return (
        <>
            <h1>Watch page</h1>
            {
                <video width="400px" autoPlay playsInline controls src={videoPrefix + videoSrc}/>
            }
        </>
    )
}