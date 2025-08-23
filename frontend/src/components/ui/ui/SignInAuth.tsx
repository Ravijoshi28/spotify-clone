import { useSignIn } from '@clerk/clerk-react';
import { Button } from "@/components/ui/ui/button"



const SignInAuth=()=> {

    const {signIn,isLoaded}=useSignIn();

    if(!isLoaded){
        return null;
    }

    const SignInWithGoogle=()=>{
        signIn.authenticateWithRedirect({
            strategy:"oauth_google",
            redirectUrl:"/sso-callback",
            redirectUrlComplete:"/auth-callback",
        })
    }

  return <Button onClick={SignInWithGoogle} variant="secondary" className='w-full text-white border-zinc-500
  h-11 bg-transparent'>Sign In With Google</Button>
}

export default SignInAuth