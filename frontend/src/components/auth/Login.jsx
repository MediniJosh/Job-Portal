import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link,useNavigate  } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '../../redux/authSlice';
import { Loader2 } from 'lucide-react';






function Login() {
    const navigate = useNavigate();
    const {loading,user}=useSelector(store=>store.auth);
     const [input,setInput] =useState({
        
            email:"",
           
            password:"",
            role:""
             
        });
        const dispatch=useDispatch();
        const changeEventHandler=(e)=>{
            setInput({...input,[e.target.name]:e.target.value});
        }
    
        
const submitHandler=async(e)=>{
        e.preventDefault();
         
         
        try{
          dispatch(setLoading(true));
           const res=await axios.post(`${USER_API_END_POINT}/login`,input,{
            headers:{
                "Content-Type":"application/json"
            },
            withCredentials:true,
           });
           if(res.data.success){
            dispatch(setUser(res.data.user));
              navigate("/");
              toast.success(res.data.message);
           }
         }catch(error){
            console.log(error);
            toast.error(error.response.data.message);
         }finally{
           dispatch(setLoading(false));
         }
    }
  useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[])
  return (
    <div>
      <Navbar />
      <div className='flex items-center justify-center min-h-screen'>
        <form  onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-6 bg-white shadow-md'>
          <h1 className="font-bold text-2xl mb-6 text-center">Login</h1>

           

          <div className='mb-4'>
            <Label>Email</Label>
             <Input 
                        type="email" 
                        value={input.email}
                        name="email"
                        onChange={changeEventHandler}
                        placeholder="joship70@gamil.com" />
          </div>

          

          <div className='mb-4'>
            <Label>Password</Label>
            <Input  type="text"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="******"/>
          </div>

          <div className='flex items-center justify-between mb-5'>
            <RadioGroup className="flex items-center gap-6">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role=='student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1" className='cursor-pointer'>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                   checked={input.role=='recruiter'}
                  onChange={changeEventHandler}
                 className="cursor-pointer"
                />
                <Label htmlFor="r2" className='cursor-pointer'>Recruiter</Label>
              </div>
            </RadioGroup>
            </div>
           {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> :  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Login
          </Button>
           }


        
          <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Signup</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Login;
