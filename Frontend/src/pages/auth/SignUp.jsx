import { Label } from '../../components/ui/label'
import { Input } from '../../components/ui/input'
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group'
import { Button } from '../../components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'
import { setLoading } from '../../redux/authSlice'

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
    file: ''
  });
  const { loading } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // below functions are for getting input value
  const changeEventHandler = (e) => {
    // console.log("Change event handlerE",e);
    // in this event whatever we enter into input field will be stored in input variable
    setInput({ ...input, [e.target.name]: e.target.value });
    // here name means input field name for eg: e.target.name = "fullname" and value means input field value for eg: e.target.value = "Herika Rajput"
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    // in this function whatever the data is written in input field will be stored in input variable so we can easily get data from input
    // console.log("submitHandler", input);
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${API_END_POINT}/v1/user/register`, formData, {
        headers:
        {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Error while registering user:", error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }

  }

  return (
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
      <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
        <h1 className='font-bold text-xl mb-5'>SignUp</h1>
        <div className='my-2'>
          <Label className='mb-2'>Full Name</Label>
          <Input type="text" value={input.fullname} name='fullname' onChange={changeEventHandler} placeholder='Herika Rajput' />
        </div>
        <div className='my-2'>
          <Label className='mb-2'>Email</Label>
          <Input type="email" value={input.email} name='email' onChange={changeEventHandler} placeholder='herikarajput@gmail.com' />
        </div>
        <div className='my-2'>
          <Label className='mb-2'>Phone Number</Label>
          <Input type="number" value={input.phoneNumber} name='phoneNumber' onChange={changeEventHandler} placeholder='123456789' />
        </div>
        <div className='my-2'>
          <Label className='mb-2'>Password</Label>
          <Input type="password" value={input.password} name='password' onChange={changeEventHandler} placeholder='********' />
        </div>
        <div className='flex items-center justify-between'>
          <RadioGroup className="flex items-center gap-4 my-3">
            <div className='flex items-center space-x-2'>
              <Input
                type="radio"
                name="role"
                value="candidate"
                checked={input.role === 'candidate'}
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
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
                id="recruiter"
                className={"cursor-pointer"} />
              <Label htmlFor="recruiter">Recruiter</Label>
            </div>
          </RadioGroup>

        </div>
        <div className='flex items-center gap-2'>
          <Label>Profile</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={changeFileHandler}
            className={"cursor-pointer"} />
        </div>
        {
          loading ?
            <Button className={"w-full my-4"} disabled><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>
            :
            <Button type="submit" className={"w-full my-4"}>SignUp</Button>
        }
        <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
      </form>
    </div>
  )
}

export default SignUp