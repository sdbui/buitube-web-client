'use client';
import { uploadVideo, updateVideoDetails } from '../../utils/firebase/functions';
import styles from './upload.module.css';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import { useState } from 'react';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import IconButton from '@mui/joy/IconButton';


const defaultUploadForm = {
  title: '',
  description: '',
  id: '',
}

export default function Upload () {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [uploadForm, setUploadForm] = useState(defaultUploadForm);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.item(0);
    if (file) {
      await handleUpload(file);
    }
  }

  const handleUpload = async (file: File) => {
    try {
      setLoading(true);
      setShowModal(true);
      const response = await uploadVideo(file);
      setLoading(false);
      // response should contain the new filename (uid + timestamp) so we can go ahead and
      // video id will be filename dropping the file extension 
      const id = response.split('.')[0];
      setUploadForm(prev => {
        return {
          ...prev,
          id
        }
      });

    } catch (e) {
      console.error(`Failed to upload file: ${e}`);
    }
  }

  const onTitleChange = (e: any) => {
    setUploadForm(prev => ({...prev, title: e.target.value}))
  }
  const onDescriptionChange = (e: any) => {
    setUploadForm(prev => ({...prev, description: e.target.value}))
  }
  const handleSubmit = async () => {
    try {
      updateVideoDetails(uploadForm);
      setUploadForm({...defaultUploadForm})
      setShowModal(false);
    } catch (e) {
      console.log('error updating:', e)
    }
  }
  return (
    <>
      <input id="upload" className={styles.uploadInput} type="file" onChange={handleFileChange} />
      <label htmlFor="upload" className={styles.uploadButton}>
        <VideoCallIcon className={styles.uploadButton}/>
      </label>
      <Modal open={showModal} onClose={()=>setShowModal(false)}>
        <ModalDialog>
          <DialogTitle>Upload a new video</DialogTitle>
          <DialogContent>
            <Input type="text" placeholder='title' onChange={onTitleChange}></Input>
            <Input type="text" placeholder='description' onChange={onDescriptionChange}></Input>
          </DialogContent>
          <DialogActions>
            {loading ? (<>Uploading, Please wait</>)
              : (<>
                  <Button onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button onClick={handleSubmit}>Submit</Button>
                </>)
            }
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  )
}