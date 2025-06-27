import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignIn,
  useUser,
  SignInButton,
} from "@clerk/clerk-react";
import { PenBox } from 'lucide-react';

const Header = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
    }
  }
  return (
    <>
      <nav className='flex justify-between items-center py-4'>
        <Link to={"/"} className='text-4xl tracking-widest' style={{ fontFamily: "Anton" }}>CAREERHUB</Link>
        <div className="flex gap-8">
          <SignedOut>
            <Button variant={"outline"} onClick={() => setShowSignIn(true)}>Login</Button>
          </SignedOut>
          <SignedIn>
            <Link to={"/post-job"}>
              <PenBox size={20} className='mr-2' />
              <Button variant={"destructive"} className={"rounded-full"}>Post a Job</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
      {showSignIn &&
        <div className='fixed inset-0 flex items-center justify-center bg-black'
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl='/onboarding'
            fallbackRedirectUrl='/onboarding'

          />
        </div>}
    </>
  )
}

export default Header