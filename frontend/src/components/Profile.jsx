// import React, { useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from './ui/badge.jsx'
// import { Label } from './ui/label'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialog from './UpdateProfileDialog';
// import { useSelector } from 'react-redux';

 
// //const skills=["Html","css","Javascript","REactjs"]
//  const isResume=true;

// const Profile = () => {
   
//     // useGetAppliedJobs();
//     const [open, setOpen] = useState(false);
//     const {user} = useSelector(store=>store.auth);

//   return (
//      <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
//                 <div className='flex justify-between'>
//                     <div className='flex items-center gap-4'>
//                         <Avatar className="h-24 w-24">
//                             <AvatarImage src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" alt="profile" />
//                         </Avatar>
//                         <div>
//                             <h1 className='font-medium text-xl'> {user?.fullname}</h1>
//                             <p>{user?.profile?.bio}</p>
//                         </div>
//                     </div>
//                     <Button onClick={()=>setOpen(true)}  className="text-right" variant="outline"><Pen /></Button>
//                 </div>
//                 <div className='my-5'>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Mail />
//                         <span>{user?.email}</span>
//                     </div>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Contact />
//                         <span>{user?.phoneNumber}</span>
//                     </div>
//                 </div>
//                 <div className='my-5'>
//                     <h1>Skills</h1>
//                     <div className='flex items-center gap-1'>
//                         {
//                           user?.profile?.skills.length!=0? user?.profile?.skills.map((item,index)=><Badge key={index}>{item}</Badge>):<span>NA</span>
//                         }
//                     </div>
//                 </div>
//               <div className='grid w-full max-w-sm items-center gap-1.5'>
//   <Label className="text-md font-bold">Resume</Label>
//   {isResume ? (
//     <a
//       href={user?.profile?.resume}
//       target="_blank"
//       rel="noopener noreferrer"
//       className='text-blue-500 hover:underline cursor-pointer'
//     >
//       {user?.profile?.resumeOriginalName}
//     </a>
//   ) : (
//     <span>NA</span>
//   )}
// </div>

//             </div>
//             <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//                 <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
//                 {/* Applied Job Table   */}
//                 <AppliedJobTable />
//             </div>
//             <UpdateProfileDialog open={open} setOpen={setOpen}/>
//         </div>
//   )
// }

// export default Profile


import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge.jsx';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-8 p-8 shadow-sm">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-semibold text-xl">{user?.fullname}</h1>
              <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
            </div>
          </div>
          <Button onClick={() => setOpen(true)} variant="outline">
            <Pen className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>

        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3">
            <Contact className="h-4 w-4" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-medium mb-2">Skills</h2>
         <div className="flex flex-wrap gap-2 ">
             {user?.profile?.skills?.length !== 0
              ? user?.profile?.skills.map((item, index) => (
                  <Badge key={index}
  className="capitalize px-3 py-1 text-sm font-medium bg-black text-white rounded-full hover:bg-gray-800 hover:text-white">
        {item}
      </Badge>
                ))
              : <span className="text-sm text-gray-400 ">NA</span>}
          </div>
        </div>

        <div className="mt-6">
          <Label className="font-medium text-md">Resume</Label>
          <div className="mt-1">
            {isResume ? (
              <a
                href={user?.profile?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {user?.profile?.resumeOriginalName}
              </a>
            ) : (
              <span className="text-gray-400">NA</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl mt-6 p-6 shadow-sm">
        <h1 className="font-semibold text-lg mb-4">Applied Jobs</h1>
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
