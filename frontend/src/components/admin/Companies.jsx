import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllComapnies'
 import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
// import useGetAllCompanies from '@/hooks/useGetAllComapanies'
// import { setSearchCompanyByText } from '../../redux/slices/companySlice';

const Companies = () => {
    useGetAllCompanies();
     const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
    dispatch(setSearchCompanyByText(e.target.value)); // ✅ dispatch on change
   
  };
  return (
      <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name"
                        // onChange={(e) => setInput(e.target.value)}
                         onChange={handleInputChange} 
                    />
                    <Button className="w-auto my-4 bg-black text-white hover:bg-gray-500" onClick={() => navigate("/admin/companies/create")}>New Company</Button>
                </div>
                <CompaniesTable/>
            </div>
        </div>
  )
}

export default Companies

 