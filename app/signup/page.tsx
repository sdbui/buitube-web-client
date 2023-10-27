'use client'
import { signUp } from "@/utils/firebase/firebase";
import Typography from "@mui/joy/Typography";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '@mui/joy/Button';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from "@mui/joy/FormHelperText";
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import FormLabel from '@mui/joy/FormLabel';
import Sheet from '@mui/joy/Sheet';
import Stack from '@mui/joy/Stack';
import Tooltip from '@mui/joy/Tooltip';


interface SignUpProps {
  email: string;
  password: string;
}

export default function SignUp () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const router = useRouter();

  const [emailInputError, setEmailInputError] = useState(false);
  const [passwordInputError, setPasswordInputError] = useState(false);
  const [passwordAgainInputError, setPasswordAgainInputError] = useState(false);


  const handleForm = async (e: any) => {
    e.preventDefault();
    // if any errors do nothing
    if (emailInputError||passwordInputError||passwordAgainInputError) return;

    const { result, error } = await signUp(email, password);

    if (error) {
      return console.log(error)
    }

    // signup successful
    return router.push('/login')
  }

  const validateEmail = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    let emailRegexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!emailRegexp.test(e.target.value)) {
      setEmailInputError(true);
    } else {
      setEmailInputError(false)
    }
  }
  const validatePassword = (e: React.FocusEvent<HTMLInputElement>) => {
    let regexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    if (!regexp.test(e.target.value)) {
      setPasswordInputError(true)
    } else {
      setPasswordInputError(false)
    }
  }

  const validatePasswordAgain = (e: React.FocusEvent<HTMLInputElement>) => {
    setPasswordAgainInputError(password !== repeatPassword)
  }

  return (
    <Sheet sx={{display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '50px'}}>

      <Typography level="h1" sx={{marginBottom: '20px'}}>Sign up</Typography>
      <form onSubmit={handleForm}>
        <Stack spacing={2}>
          <FormControl error={emailInputError}>
            <FormLabel>Email</FormLabel>
            <Input onBlur={validateEmail} onChange={(e)=> setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com"></Input>
            {emailInputError && (<FormHelperText>Invalid Email</FormHelperText>)}
          </FormControl>
          <FormControl error={passwordInputError}>
            <FormLabel>Password <Tooltip variant="solid" placement="top" title="At least 8 characters and contain both letters and numbers"><InfoOutlined></InfoOutlined></Tooltip></FormLabel>
            <Input onBlur={validatePassword} onChange={(e)=> setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password"></Input>
            {passwordInputError && (<FormHelperText>Invalid Password</FormHelperText>)}
          </FormControl>
          <FormControl error={passwordAgainInputError}>
            <FormLabel>Password again</FormLabel>
            <Input onBlur={validatePasswordAgain} onChange={(e)=> setRepeatPassword(e.target.value)} required type="password" name="password2" id="password2" placeholder="password"></Input>
            {passwordAgainInputError && (<FormHelperText>Passwords don't match</FormHelperText>)}
          </FormControl>
          <Button variant="outlined" type="submit">Sign up</Button>

        </Stack>
      </form>
    </Sheet>
  );
}