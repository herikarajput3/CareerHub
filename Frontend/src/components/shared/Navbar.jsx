import { Link } from 'react-router-dom'
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';

const Navbar = () => {
    const user = false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-3xl font-extrabold tracking-widest text-gray-800' style={{ fontFamily: "Pacifico" }}>Career<span className='text-[#F83002]'>Hub</span></h1>
                </div>

                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/jobs"}>Jobs</Link></li>
                        <li><Link to={"/browse"}>Browse</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'><Button variant='outline'>Login</Button></Link>
                                <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button></Link>
                            </div>
                        ) :
                            (
                                <Popover >
                                    <PopoverTrigger asChild>
                                        <Avatar className='cursor-pointer'>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className='w-80'>
                                        <div className='flex items-center gap-4'>
                                            <Avatar className='cursor-pointer'>
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>Herika Rajput</h4>
                                                <p className="text-sm text-muted-foreground">Software Engineer</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2'>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <User2 />
                                                <Button variant="link">View Profile</Button>
                                            </div>
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar