import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../reducers/slices/cartSlice';
import toast from 'react-hot-toast';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cart);
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const handleRemove = (courseId) => {
    dispatch(removeFromCart(courseId));
  };

  const handleBuyCart = async () => {

    if(user && user.accountType === 'instructor'){
        toast.error("You are not allowed to buy a course");
        return;
    }
    let courseIds = [];
    for (const course of cart){
      courseIds.push(course._id);
    }
    // console.log(courseIds);
    if(token){
        buyCourse(token, courseIds, user, navigate, dispatch);
        return;
    }
    
  }

  return (
    <div className="p-6 w-full flex flex-col md:flex-row gap-8">
      {/* Cart Items Section */}
      <div className="flex-1 flex flex-col gap-4">
        <p className='text-sm font-inter text-richblack-300'>Home / <span className='text-yellow-50'>Cart</span></p>
        <h1 className='text-3xl font-medium font-inter mt-10 mb-4 text-yellow-50'>Courses</h1>

        { (!cart || cart.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 bg-richblack-800 rounded-lg">
            <p className="text-lg text-richblack-300">Your cart is empty.</p>
          </div>
        ) : (
          <div className='flex flex-col w-full rounded-lg p-1 border-1 border-richblack-700'>
            <div className='flex w-full justify-between items-center p-2 bg-richblack-700 rounded-t-lg'>
              <p className='text-sm font-medium font-inter text-richblack-50 w-[45%] text-center'>Course Name</p>
              <p className='text-sm font-medium font-inter text-richblack-50 w-[20%] text-center'>Price</p>
              <p className='text-sm font-medium font-inter text-richblack-50 w-[20%] text-center'>Remove</p>
            </div>
            {cart.map((course, index) => (
              <div
                key={course._id || index}
                className="flex items-center justify-between w-full p-4 border-b border-richblack-700 bg-richblack-800 hover:bg-richblack-900 transition-colors duration-200"
              >
                {/* Course Info */}
                <div className="flex items-center gap-4 w-[45%]">
                  <img
                    src={course.thumbnail || "/default-course.png"}
                    alt={course.courseName}
                    className="w-52 h-36 object-cover rounded-lg border border-richblack-600 shadow-sm"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-richblack-5 line-clamp-1">{course.courseName}</h2>
                    <p className="text-xs text-richblack-300 line-clamp-2 mt-1">{course.courseDescription}</p>
                  </div>
                </div>
                {/* Price */}
                <div className="w-[20%] flex items-center justify-center">
                  <span className="text-sm text-richblack-200">₹{course.price}</span>
                </div>
                {/* Remove */}
                <div className="w-[20%] flex items-center justify-center">
                  <button
                    onClick={() => handleRemove(course._id)}
                    className="text-red-400 hover:text-red-600 font-bold text-base px-4 py-2 rounded transition-colors duration-200 border border-red-400 hover:border-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Checkout Section */}
      {cart && cart.length > 0 && (
        <div className="w-full md:w-1/3 bg-richblack-800 rounded-lg p-6 h-fit flex flex-col gap-6 shadow-lg border border-richblack-700 mt-36">
          <h2 className="text-xl font-semibold text-richblack-5 mb-2">Checkout</h2>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-richblack-200 text-md">
              <span>Total Items:</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between text-richblack-200 text-md">
              <span>Total Amount:</span>
              <span className="text-yellow-50 font-bold text-lg">₹{total}</span>
            </div>
          </div>
          <button className="mt-4 bg-yellow-50 text-richblack-900 font-bold py-3 rounded-lg hover:bg-yellow-100 transition-colors duration-200"
            onClick={() => handleBuyCart()}
          >Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default Cart;