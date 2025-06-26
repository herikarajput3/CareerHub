import React from 'react'
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

const Header = () => {
  return (
    <>
      <nav className='flex justify-between items-center py-4'>
        <Link to={"/"} className='text-4xl tracking-widest' style={{ fontFamily: "Anton" }}>CAREERHUB</Link>
        {/* <Button variant={"outline"}><Link to={"/login"}>Login</Link></Button> */}
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </>
  )
}

export default Header