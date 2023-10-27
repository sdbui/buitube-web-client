'use client'
import styles from './login.module.css';
import { signInViaEmailPassword, signInWithGoogle } from '@/utils/firebase/firebase';
import Typography from '@mui/joy/Typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import Button from '@mui/joy/Button';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Link from 'next/link';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';

export default function Login () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const googleSignIn = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log('google signin successful')
      return router.push('/');
    } else {
      console.log('couldnt sign in with google???')
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const {result, error} = await signInViaEmailPassword(email, password);

    if (error) {
      return console.log(error);
    }

    // successful signin
    return router.push('/');
  }

  return (
    <Sheet sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '50px'}}>
      <Typography level="h1">Sign in</Typography>
      <Button sx={{display: 'flex', alignItems:'center', gap: 1, marginBottom: '20px', marginTop: '20px', justifySelf: 'flex-start'}} startDecorator={<GoogleIcon/>}
        onClick={googleSignIn} variant="solid">
        Signin with Google
      </Button>
      <form onSubmit={handleSubmit} >
        <Stack spacing={1}>
              <FormLabel>Email</FormLabel>
              <Input onChange={(e)=> setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com"></Input>
            <FormLabel>Password</FormLabel>
            <Input onChange={(e)=> setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password"></Input>
          <Button type="submit" variant="outlined">Sign In</Button>
        </Stack>
      </form>
      <Typography level="body-lg" sx={{marginTop: '50px'}}>Not a member? Sign up <Link href="/signup">here.</Link></Typography>
    </Sheet>
  );
}