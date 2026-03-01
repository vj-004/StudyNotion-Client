import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getCategoryCourses } from '../../services/operations/courseDetailsAPI';
import { categories } from '../../services/apis';
import { apiConnecter } from '../../services/apiConnector';
import CourseCard from './CourseCard';
import Footer from '../Footer/Footer';

const Catalog = () => {

  const {catalogName} = useParams();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState({});
  // console.log('catalog name is ', catalogName);
  useEffect(() => {

    const getCoursesByCategory = async () => {
      setLoading(true);
      try{
        const allCategories = await apiConnecter("GET", categories.CATEGORIES_API);
        const currentCategory = allCategories.data.allCategories.find((category) => category.name.split(" ").join("-") === catalogName);
        const result = await getCategoryCourses(currentCategory._id);
        setCategory(currentCategory);
        console.log('The courses of the current category are ', result);
        setCourses(result);

      }catch(error){
        console.log('Error in getting courses for the current category', error);
      }
      setLoading(false);
    }

    getCoursesByCategory();

  }, [catalogName]);
    

  return (
    <div className='flex flex-col w-full items-center'>
      <div className='bg-richblack-800 w-full  items-center flex justify-center'>
        <div className='w-[80%] mt-6 p-6 mb-6'>
          <p className='text-richblack-300 font-inter text-sm'>Home / Catalog / <span className='text-yellow-50'>{catalogName.split("-").join(" ")}</span></p>
          <p className='text-richblack-5 font-inter font-medium text-3xl mt-4'>{category.name}</p>
          <p className='text-sm text-richblack-200 font-inter mt-2'>{category.description}</p>
        </div>
        
      </div>
      <div className='w-[80%] mt-6 p-6 mb-12'>
          {
            courses && courses.length > 0 ? (
              <>
                <p className='font-semibold font-inter text-richblack-5 text-3xl'>Courses</p>
                <div className='flex flex-wrap mt-8'>
                  {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
              </>
            ) : (
              <div className='flex flex-col items-center justify-center mt-10 w-full bg-richblack-700 rounded-lg py-10'>
                <div className='text-richblack-5 text-2xl font-bold font-inter mb-2'>
                  No Courses Found
                </div>
                <div className='text-richblack-200 text-base font-inter'>
                  There are no courses available for this category yet.
                </div>
              </div>
            )
          }
      </div>
      <Footer/>
    </div>
  )
}

export default Catalog