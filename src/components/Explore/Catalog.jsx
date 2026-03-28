
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryCourses, fetchAllCategories, getAllYtCourses } from '../../services/operations/courseDetailsAPI';
import CourseCard from './CourseCard';
import Logo from '../../assets/Logo/courseX_logo.png';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const defaultYtCourseData = [
  {
    title: "Advanced Computer Algorithms",
    description: "A Harvard Uni Course, topic was interesting, talks special trees and hashing and a lot more"
  },
  {
    title: "C++",
    description: "Best C++ Course on Youtube. By The Cherno. MUST WATCH"
  },
  {
    title: "Backend From First Principles",
    description: "backend playlist by Sriniously. One of the best playlist for backend"
  },
]

const Catalog = () => {
  const { catalogName: urlCatalogName } = useParams();
  const [catalogName, setCatalogName] = useState(urlCatalogName || "");
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState({});
  const {user} = useSelector((state) => state.profile);
  const [allCategories, setAllCategories] = useState([]);
  const {token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [ytCourses, setYtCourses] = useState([]);
  // Fetch all categories for chips
  useEffect(() => {
    const fetchCategories = async () => {
      const cats = await fetchAllCategories();
      setAllCategories(cats);
    };
    fetchCategories();
  }, []);

  // Fetch courses for selected category
  useEffect(() => {
    const getCoursesByCategory = async () => {
      setLoading(true);
      try {
        const currentCategory = allCategories.find((cat) => cat.name.split(" ").join("-") === catalogName);
        setCategory(currentCategory || {});
        if (currentCategory) {
          const result = await getCategoryCourses(currentCategory._id);
          setCourses(result || []);
        } else {
          setCourses([]);
        }
      } catch (error) {
        setCourses([]);
      }
      setLoading(false);
    };
    if (catalogName) getCoursesByCategory();
  }, [catalogName, allCategories]);

  useEffect(() => {
    const populateYtCourseData = async () => {
      if(!token || !user){
        let ytCourseData;
        if(!localStorage.getItem("defaultYtCourseData")){
          console.log('fetching data again');
          ytCourseData = await getAllYtCourses(1);
          localStorage.setItem("defaultYtCourseData", JSON.stringify(ytCourseData));
          localStorage.setItem("defaultYtCourseMetaData", JSON.stringify(defaultYtCourseData));
        }
        else{
          ytCourseData = JSON.parse(localStorage.getItem("defaultYtCourseData"));
        }
        setYtCourses(ytCourseData);
      }
    }
    populateYtCourseData();
  }, [token, user]);

  // // Fetch YouTube courses
  // useEffect(() => {
  //   const getYtCourses = async () => {
  //     setLoading(true);
  //     try {
  //       const result = await getAllYtCourses();
  //       setYtCourses(result || []);
  //     } catch (error) {
  //       setYtCourses([]);
  //     }
  //     setLoading(false);
  //   };
  //   getYtCourses();
  // }, []);

  // Handle chip click
  
  
  const handleCategoryClick = (cat) => {
    setCatalogName(cat.name.split(" ").join("-"));
  };

  return (
    <div className="w-full flex flex-col items-center bg-richblack-900">
      {/* Modern Banner/Header */}
      <div className="w-full bg-gradient-to-r from-blue-900 via-richblack-800 to-richblack-900 py-12 mb-6 flex flex-col items-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-yellow-50 mb-2 font-inter tracking-tight drop-shadow-lg">
          Explore Catalog
        </h1>
        <p className="text-sm text-richblack-200 text-center mt-2 mb-4 font-inter">
          {"Browse our categories and discover top courses!"}
        </p>
        
      </div>

      {/* Main Content: Courses left, YouTube right */}
      <div className="w-[90%] max-w-full flex gap-8 mb-12 max-h-full">

        {/* Category Deatils */}
        <div className='w-[20%] bg-richblack-800 rounded-xl shadow-md pt-8 flex flex-col items-center h-fit'>
          <h2 className="text-2xl text-yellow-50 font-bold font-inter mb-2">{
            category?.name || "Select a Category"}
          </h2>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            {allCategories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full font-semibold border transition-all duration-200 text-sm font-inter
                  ${cat.name.split(" ").join("-") === catalogName
                    ? "bg-yellow-25 text-richblack-900 border-yellow-25 shadow-lg scale-105"
                    : "bg-richblack-700 text-richblack-25 border-richblack-600 hover:bg-richblack-600 hover:scale-105"}
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <p className="text-sm text-richblack-200 text-center font-inter mt-10 mb-10 px-10">
            {category?.description || "Check out the Category Description Here"}
          </p>
          {/* Category Chips */}
        </div>

        {/* Courses Section */}
        <div className="bg-richblack-800 flex-1 p-8 flex flex-col rounded-xl shadow-md w-[50%] h-fit">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl text-yellow-50 font-bold font-inter mb-2 md:mb-0">Courses</h2>
          </div>

          {/* {
            category.name && (
              
            )
          }

          <p className="text-lg md:text-xl text-richblack-200 max-w-2xl text-center mb-4 font-inter">
          {category?.description || "Browse our categories and discover top courses!"}
        </p> */}

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl text-yellow-25" />
            </div>
          ) : courses && courses.length > 0 ? (
            <div className="flex flex-wrap gap-8">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center w-full bg-richblack-700 rounded-lg p-10">
              <span className="text-richblack-5 text-2xl font-bold font-inter mb-2">{Object.keys(category).length !== 0 ? "No Courses Found" : "Pick a category"}</span>
            </div>
          )}
        </div>

        {/* Your YouTube Courses Section (vertical, right, full height) */}
        {
          user && (
            <div className="w-[20%]">
            <div className="bg-richblack-800 rounded-xl shadow-md flex flex-col items-center md:sticky md:top-[100px] md:max-h-[calc(75vh)] overflow-y-auto pt-8 p-4">
              <h2 className="text-2xl text-yellow-50 font-bold font-inter mb-4 ">Your Courses</h2>
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <AiOutlineLoading3Quarters className="animate-spin text-3xl text-yellow-25" />
                </div>
              ) : user.ytCourses.length > 0 ? (
                <div className="flex flex-col gap-8 w-full">
                  {user.ytCourses.map((course, index) => (
                    <div
                      key={index}
                      className="w-full bg-richblack-700 px-3 py-2 rounded-lg flex flex-col shadow-md hover:shadow-yellow-25 transition-shadow duration-200 cursor-pointer"
                      onClick={() => navigate(`/ytcourse/${course.url_id}`)}
                    >
                      <img src={Logo} alt="thumbnail" className="w-[60%] self-center mb-2" />
                      <p className="text-richblack-5 text-base font-semibold truncate">{course.title.length > 35 ? course.title.substring(0, 35).trim() + '...' : course.title}</p>
                      <p className="text-richblack-300 text-xs mt-1 truncate">{course.description ? course.description.length>100 ? course.description.substring(0, 100).trim() : course.description : "No Description"}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-24 w-full bg-richblack-700 rounded-lg">
                  <span className="text-richblack-5 text-base font-bold font-inter mb-2">No YouTube Courses Found</span>
                </div>
              )}
            </div>
          </div>
          )
        }

        {
          (!token || !user) && (
             <div className="w-[20%]">
              <div className="bg-richblack-800 rounded-xl shadow-md flex flex-col items-center md:sticky md:top-[100px] overflow-y-auto pt-8 p-4">
                <h2 className="text-2xl text-yellow-50 font-bold font-inter mb-4 ">Your Courses</h2>
                <p className='text-richblack-400 text-md mb-4 text-center'>These are just sample courses <br/> Login to personalize your courses</p>
                { ytCourses && ytCourses.length > 0 ? (
                  <div className="flex flex-col gap-8 w-full">
                    {ytCourses.map((course, index) => (
                      <div
                        key={index}
                        className="w-full bg-richblack-700 px-3 py-2 rounded-lg flex flex-col shadow-md hover:shadow-yellow-25 transition-shadow duration-200 cursor-pointer"
                        onClick={() => navigate(`/sampleytcourse/${course.playlist_id}`)}
                      >
                        <img src={Logo} alt="thumbnail" className="w-[60%] self-center mb-2" />
                        <p className="text-richblack-5 text-base font-semibold truncate">{course.title ? course.title.length > 35 ? course.title.substring(0, 35).trim() + '...' : course.title : defaultYtCourseData[index].title}</p>
                        <p className="text-richblack-300 text-xs mt-1 truncate">{course.description ? course.description.length>100 ? course.description.substring(0, 100).trim() : course.description : defaultYtCourseData[index].description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-24 w-full bg-richblack-700 rounded-lg">
                    <span className="text-richblack-5 text-base font-bold font-inter mb-2">No YouTube Courses Found</span>
                  </div>
                )}
              </div>
            </div>
          )
        }

      </div>
    </div>
  );
};

export default Catalog;