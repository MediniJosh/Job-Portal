import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Tech", "Finance", "Healthcare", "Education", "E-commerce"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k-1 lakh", "1 lakh to 5 lakh"]
  }
];

const Filter = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  }

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2' key={itemId}>
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
};

export default Filter;
