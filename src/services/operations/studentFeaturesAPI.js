import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnecter } from "../apiConnector";
import RazorPayLogo from '../../assets/Logo/razorpaylogo.png'
import { setPaymentLoading } from "../../reducers/slices/courseSlice";
import { resetCart } from "../../reducers/slices/cartSlice";
import { addCoursesToUser } from "../../reducers/slices/profileSlice";

const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

const loadScript = (src) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        } 
        document.body.appendChild(script);
    })
}

export const buyCourse = async (token, courses, userDetails, navigate, dispatch) => {

    const toastId = toast.loading("Loading...");
    try{

        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // initiate the order
        const orderResponse = await apiConnecter("POST", COURSE_PAYMENT_API, {courses}, 
        {
            Authorization: `Bearer ${token}`,
        });

        if(orderResponse.data.message === "Student already enrolled in a course"){
            throw new Error("You have already enrolled in the course");
        }

        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        // console.log(orderResponse);
        // console.log('Razorpay key is: ', process.env.REACT_APP_RAZORPAY_KEY);
        // options creater
        const boughtCourses = orderResponse.data.courses;
        // console.log('orderResponse: ', orderResponse);
        // console.log('bought courses: ', boughtCourses);
        const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY, // Replace with your Razorpay key_id
            amount: `${orderResponse.data.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: orderResponse.data.data.currency,
            name: 'CourseX',
            description: 'Thank you for purchasing the course',
            image: RazorPayLogo,
            order_id: orderResponse.data.data.id, // This is the order_id created in the backend
            "handler": function (response){
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
                //verify payment
                verifyPayment({...response, courses}, boughtCourses, token, navigate, dispatch);
                // toast.loading("Verifying Payment");
            },
            "prefill": {
                // here we need the name of the user who is making the payment either as an input parameter or something else
                "name": `${userDetails.firstName}`,
                "email": `${userDetails.email}`,
                "contact": userDetails.phoneNumber
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
        };


        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function(response){
            toast.error("Oops! Payment Failed");
        })
        paymentObject.on("payment.success", function(response){
            dispatch(addCoursesToUser(orderResponse.courses));
        })

 

    }catch(error){
        console.log("Error in making buyCourse function",error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);

}

async function sendPaymentSuccessEmail(response, amount, token) {
    try{

        await apiConnecter("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        },{
            Authorization: `Bearer ${token}`
        })

    }
    catch(error){
        console.log('Payment unsuccessfull email error', error);
    }
}

async function verifyPayment(bodyData, boughtCourses, token, navigate, dispatch){

    const toastId = toast.loading("Verifying payment");
    dispatch(setPaymentLoading(true));
    // console.log('bodyData: ', bodyData);
    try{

        const response = await apiConnecter("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`
        });
        console.log('Got a response from verifyapi');
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment successful, you are now added to the course");
        dispatch(addCoursesToUser(boughtCourses));
        navigate('/dashboard/enrolled-courses');
        dispatch(resetCart());
        

    }catch(error){
        console.log('Error in verifying payment', error);
        toast.error("Could not verify payment, try again later or contact us");
    }
    toast.dismiss(toastId);

}