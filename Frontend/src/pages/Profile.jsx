import React from 'react'
import { Avatar, AvatarImage } from '../components/ui/avatar'
import { Contact, Mail, Pen } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Label } from '../components/ui/label'
import ApplicationTable from '../components/ApplicationTable'

const skills = ["HTML", "CSS", "JS", "React", "Node", "Express", "MongoDB"]
const Profile = () => {
    const isResume = true;
    return (
        <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
            <div className='flex justify-between'>
                <div className='flex items-center gap-5'>
                    <Avatar className='h-24 w-24'>
                        <AvatarImage src='https://cdn.pixabay.com/photo/2022/09/02/01/00/play-button-7426443_1280.png' alt="profile" />
                    </Avatar>
                    <div>
                        <h1 className='font-medium text-xl'>Full Name</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae deserunt animi esse!</p>
                    </div>
                </div>
                <Button className="text-right" variant={"outline"}><Pen className='h-5 w-5' /></Button>
            </div>
            <div className='my-5'>
                <div className='flex items-center gap-3 my-2'>
                    <Mail className='h-5 w-5' />
                    <span>herikarajput@gmail.com</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <Contact className='h-5 w-5' />
                    <span>9125678937</span>
                </div>
            </div>
            <div className='my-5'>
                <h1 className='mb-2 font-medium '>Skill</h1>
                <div className='flex items-center gap-1'>
                    {
                        skills.length !== 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>N/A</span>
                    }
                </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-md font-bold">Resume</Label>
                {
                    isResume ? <a target='blank' href='https://youtube.com' className='w-full text-blue-500 hover:underline cursor-pointer'>Herika Rajput</a> : <span>NA</span>
                }
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='text-lg font-bold my-5'>Applied Jobs</h1>
                <ApplicationTable />
            </div>

        </div>
    )
}

export default Profile