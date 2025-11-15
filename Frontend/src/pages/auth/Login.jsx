import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'


const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const changeEventHandler = (e) => {
    // in this event whatever we enter into input field will be stored in input variable
    setInput({ ...input, [e.target.name]: e.target.value });
    // here name means input field name for eg: e.target.name = "fullname" and value means input field value for eg: e.target.value = "Herika Rajput"
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_END_POINT}/login`, input, {
        headers:
        {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error while registering user:", error);
      toast.error(error.response.data.message);

    }

  }

  return (
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className='font-bold text-xl mb-5'>Login</h1>

        <div className='my-2'>
          <Label className='mb-2'>Email</Label>
          <Input type="email" name='email' value={input.email} onChange={changeEventHandler} placeholder='herikarajput@gmail.com' />
        </div>

        <div className='my-2'>
          <Label className='mb-2'>Password</Label>
          <Input type="password" name='password' value={input.password} onChange={changeEventHandler} placeholder='********' />
        </div>

        <div className='flex items-center justify-between'>
          <RadioGroup className="flex items-center gap-4 my-5">
            <div className='flex items-center space-x-2'>
              <Input
                type="radio"
                name="role"
                value="candidate"
                checked={input.role === "candidate"}
                onChange={changeEventHandler}
                id="candidate"
                className={"cursor-pointer"} />
              <Label htmlFor="candidate">Candidate</Label>
            </div>
            <div className='flex items-center space-x-2'>
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                id="recruiter"
                className={"cursor-pointer"} />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>

        </div>
        <Button type="submit" className={"w-full my-4"}>Login</Button>
        <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
      </form>
    </div>
  )
}

export default Login