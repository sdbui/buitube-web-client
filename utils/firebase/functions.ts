import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase'

const generateUploadUrlFunction = httpsCallable(functions, 'generateUploadUrl');
const getVideosFunction = httpsCallable(functions, 'getVideos');
const updateVideoDetailsFunction = httpsCallable(functions, 'updateVideoDetails');

// todo: move this somewhere else to share
export interface Video {
  id?: string,
  uid?: string,
  filename?: string,
  status?: "processing" | "processed",
  title?: string,
  description?: string
}

export async function uploadVideo (file: File) {

  const response: any = await generateUploadUrlFunction({
    fileExtension: file.name.split('.').pop(),
  });

  const result = await fetch(response?.data?.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  });

  return response?.data?.fileName;

}

export async function getVideos () {
  const response = await getVideosFunction();
  return response.data as Video[];
}

export async function updateVideoDetails (video: Video) {
  const response = await updateVideoDetailsFunction({video})
  return response.data;
}