'use client';
import React, {useEffect} from 'react';
import { useLoadUserQuery } from '../../../../redux/features/api/apiSlice';
import exp from 'constants';
import { redirect } from 'next/dist/server/api-utils';
import Loader from '../../../components/Loader/Loader';
import CourseContent from '../../../components/Course/CourseContent';

type Props = {
  params: any;
}

const page = ({params}: Props) => {
  const id = params.id;
  const {isLoading,error,data} = useLoadUserQuery(undefined,{});

  useEffect(() => {
    if(data){
      const isPurchased = data.user.courses.find((item:any) => item.courseId ===id);
      console.log(data.user,"id", id);
      console.log(isPurchased,"ispurchaed");
      console.log("dfdfffgf");
      if(!isPurchased){
        //  redirect("/");
      }
      if(error){
        // redirect("/");
      }
    }
  }, [data,error]);


  return (
    
    <>
    {
      
    isLoading ? (
      <Loader/>
    ) :(
      <div>
        
        <CourseContent id={id} user={data.user}/>

      </div>
    )
   
  
}
</>
  )
}

export default page;