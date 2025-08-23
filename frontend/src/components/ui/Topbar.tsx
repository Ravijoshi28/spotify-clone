import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';

import { Link } from 'react-router-dom';
import SignInAuth from './ui/SignInAuth';
import { useAuthUser } from '@/stores/useAuthUser';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

function Topbar() {

  const {isAdmin}=useAuthUser();


  return (
    <div className='flex items-center justify-between p-4 sticky top-0 text-zinc-900
    bg-zinc-900 ' >
      <div className='flex gap-2 items-center '>
          <img src="/spotify.png" alt='spotify-image' className='size-8 '/>Spotify 
      </div>

      <div className='flex items-center gap-4 text-white'>
          {isAdmin && (
            <Link to="/admin" className={cn(buttonVariants({variant:"outline"}))}>
              <LayoutDashboardIcon className='size-4 mr-2'/>
              AdminDashboard</Link>
          )}

         

          <SignedOut>
             <SignInAuth/>
          </SignedOut>

          <UserButton/>
      </div>
    </div>
  )
}

export default Topbar