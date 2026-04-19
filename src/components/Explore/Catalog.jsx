
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCategoryCourses, fetchAllCategories } from '../../services/operations/courseDetailsAPI';
import CourseCard from './CourseCard';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import YtCourseCard from '../Common/YtCourseCard';



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
              <span className="text-richblack-5 text-2xl font-bold font-inter mb-2">No Courses Found</span>
            </div>
          )}
        </div>

        {/* Your YouTube Courses Section (vertical, right, full height) */}
        {
          token && (
            <div className="w-fit max-h-[990px] overflow-y-scroll">
            <div className="bg-richblack-800 rounded-xl shadow-md flex flex-col items-center md:sticky md:top-[100px] overflow-y-auto pt-8 p-4">
              <h2 className="text-2xl text-yellow-50 font-bold font-inter mb-4 ">Your Courses</h2>
              {loading ? (
                <div className="flex justify-center items-center h-32">
                  <AiOutlineLoading3Quarters className="animate-spin text-3xl text-yellow-25" />
                </div>
              ) : user.ytCourses.length > 0 ? (
                <div className="flex flex-col gap-8 w-full">
                  {user.ytCourses.map((course, index) => {
                    return (
                      <YtCourseCard
                        key={index}
                        course={course}
                        onClick={() => navigate(`/ytcourse/${course.url_id}`)}
                      />
                    );
                  })}
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