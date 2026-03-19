import React, { useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const InstructorDashboard = () => {

  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const courses = useMemo(() => {
    if (!Array.isArray(user?.courses)) return [];
    return user.courses;
  }, [user?.courses]);

  const dashboardStats = useMemo(() => {
    const totalCourses = courses.length;

    const totalStudents = courses.reduce((acc, course) => {
      const enrolledCount = Array.isArray(course?.studentsEnrolled)
        ? course.studentsEnrolled.length
        : 0;
      return acc + enrolledCount;
    }, 0);

    const totalEarnings = courses.reduce((acc, course) => {
      const enrolledCount = Array.isArray(course?.studentsEnrolled)
        ? course.studentsEnrolled.length
        : 0;
      const coursePrice = Number(course?.price) || 0;
      return acc + coursePrice * enrolledCount;
    }, 0);

    return {
      totalCourses,
      totalStudents,
      totalEarnings,
    };
  }, [courses]);

  const previewCourses = useMemo(() => courses.slice(0, 4), [courses]);


  return (
    <div className='w-full p-6'>
      <div className='flex flex-col gap-6'>
        <div>
          <p className='text-sm font-inter text-richblack-300'>Home / Dashboard / <span className='text-yellow-50'>Instructor</span></p>
          <h1 className='mt-6 text-2xl ml-6 font-medium font-inter text-richblack-5'>Hi {user.firstName} {user.lastName} 👋</h1>
          <h4 className='text-richblack-400 font-mono ml-6 mt-1'>Lets Start Something New!</h4>
        </div>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-xl border border-richblack-700 bg-richblack-800 p-5'>
            <p className='text-sm font-medium text-richblack-300'>Total Courses</p>
            <p className='mt-2 text-3xl font-bold text-richblack-5'>{dashboardStats.totalCourses}</p>
          </div>

          <div className='rounded-xl border border-richblack-700 bg-richblack-800 p-5'>
            <p className='text-sm font-medium text-richblack-300'>Total Students</p>
            <p className='mt-2 text-3xl font-bold text-richblack-5'>{dashboardStats.totalStudents}</p>
          </div>

          <div className='rounded-xl border border-richblack-700 bg-richblack-800 p-5'>
            <p className='text-sm font-medium text-richblack-300'>Total Earnings</p>
            <p className='mt-2 text-3xl font-bold text-yellow-50'>₹{dashboardStats.totalEarnings.toLocaleString('en-IN')}</p>
          </div>
        </div>

        <div className='rounded-xl border border-richblack-700 bg-richblack-800 p-5'>
          <div className='mb-5 flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-richblack-5'>Your Courses</h2>
            <button
              type='button'
              onClick={() => navigate('/dashboard/my-courses')}
              className='rounded-md border border-yellow-50 px-4 py-2 text-sm font-semibold text-yellow-50 transition-all duration-200 hover:bg-yellow-50 hover:text-richblack-900'
            >
              View All
            </button>
          </div>

          {previewCourses.length === 0 ? (
            <div className='rounded-lg border border-richblack-700 bg-richblack-900 p-8 text-center'>
              <p className='text-base text-richblack-200'>No courses found. Start by adding your first course.</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
              {previewCourses.map((course) => {
                const enrolledCount = Array.isArray(course?.studentsEnrolled)
                  ? course.studentsEnrolled.length
                  : 0;

                return (
                  <div key={course?._id} className='mx-auto flex min-h-[280px] w-full max-w-[360px] flex-col rounded-md border border-richblack-700 bg-richblack-900 p-4'>
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName || 'Course thumbnail'}
                      className='h-40 w-full rounded-md border border-richblack-600 object-cover'
                    />

                    <div className='mt-3 flex flex-1 flex-col justify-between'>
                      <div>
                        <p className='line-clamp-1 text-base font-semibold text-richblack-5'>
                          {course?.courseName || 'Untitled course'}
                        </p>
                        <p className='mt-1 text-xs text-richblack-300'>
                          {enrolledCount} Students Enrolled
                        </p>
                      </div>

                      <div className='mt-3 flex items-center justify-between'>
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${
                            course?.status === 'Public'
                              ? 'bg-caribbeangreen-800 text-caribbeangreen-25'
                              : course?.status === 'Private'
                                ? 'bg-pink-800 text-pink-25'
                                : 'bg-yellow-800 text-yellow-50'
                          }`}
                        >
                          {course?.status || 'Draft'}
                        </span>

                        <p className='text-sm font-semibold text-richblack-5'>
                          ₹{(Number(course?.price) || 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InstructorDashboard