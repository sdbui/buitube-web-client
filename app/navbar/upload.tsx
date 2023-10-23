'use client';

import { uploadVideo } from '../../utils/firebase/functions';

import styles from './upload.module.css';

export default function Upload () {

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      handleUpload(file);
    }
  }
  const handleUpload = async (file: File) => {
    try {
      const response = await uploadVideo(file);
    } catch (e) {
      console.error(`Failed to upload file: ${e}`);
    }
  }

  return (
    <>
      <input id="upload" className={styles.uploadInput} type="file" onChange={handleFileChange} />
      <label htmlFor="upload" className={styles.uploadButton}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="black" className={styles.uploadButton}>
          <path strokeLinecap="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </label>
    </>
  )
}