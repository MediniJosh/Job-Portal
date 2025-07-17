import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link,useNavigate  } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';





function Signup() {
     
     const [input,setInput] =useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    });
    const navigate=useNavigate();
    const {loading,user}=useSelector(store=>store.auth);
    const dispatch=useDispatch();

    const changeEventHandler=(e)=>{
        setInput({...input,[e.target.name]:e.target.value});
    }

    const changeFileHandler=(e)=>{
        setInput({...input,file:e.target.files?.[0]});
    }

    const submitHandler=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("fullname",input.fullname);
        formData.append("email",input.email);
        formData.append("phoneNumber",input.phoneNumber);
        formData.append("password",input.password);
        formData.append("role",input.role);
        if(input.file){
            formData.append("file",input.file);
        }
        try{
          dispatch(setLoading(true));
           const res=await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
           });
           if(res.data.success){
              navigate("/login");
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
          <h1 className="font-bold text-2xl mb-6 text-center">Sign Up</h1>

          <div className='mb-4'>
            <Label>Full Name</Label>
            <Input 
            type="text" 
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            placeholder="Joshi" />
          </div>

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
            <Label>Phone Number</Label>
             <Input 
            type="text" 
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler}
            placeholder="0123456789" />
          </div>

          <div className='mb-4'>
            <Label>Password</Label>
            <Input 
            type="text"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="******" />
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

            <div className='flex items-center gap-2'>
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
           {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin'/> Please wait</Button> :  <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                      Sign Up
                    </Button>
          }

           
          <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
      </div>
    </div>
  );
}

export default Signup;
