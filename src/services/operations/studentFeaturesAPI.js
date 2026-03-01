import toast from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnecter } from "../apiConnector";
import RazorPayLogo from '../../assets/Logo/razorpaylogo.png'
// import { verifyPayment } from "../../../../server/controllers/payment.controller";

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

// export const buyCourse = async (courses, token, userDetails, navigate, dispatch) => {

//     const toastId = toast.loading("Loading...");
//     try{

//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//         if(!res){
//             toast.error("Razorpay SDK failed to load");
//             return;
//         }

//         // initiate the order
//         const orderResponse = await apiConnecter("POST", COURSE_PAYMENT_API, {courses}, 
//         {
//             Authorization: `Bearer ${token}`,
//         });

//         if(!orderResponse.data.success){
//             throw new Error(orderResponse.data.message);
//         }

//         console.log('Razorpay key is: ', process.env.REACT_APP_RAZORPAY_KEY);
//         // options creater
//         const options = {
//             key: process.env.REACT_APP_RAZORPAY_KEY, // Replace with your Razorpay key_id
//             amount: `${orderResponse.data.data.amount}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//             currency: orderResponse.data.data.currency,
//             name: 'StudyNotion',
//             description: 'Thank you for purchasing the course',
//             image: RazorPayLogo,
//             order_id: orderResponse.data.data.id, // This is the order_id created in the backend
//             "handler": function (response){
//                 sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
//                 //verify payment
//                 verifyPayment({...response, courses}, token, navigate, dispatch);
//                 alert(response.razorpay_payment_id);
//                 alert(response.razorpay_order_id);
//                 alert(response.razorpay_signature)
//             },
//             "prefill": {
//                 // here we need the name of the user who is making the payment either as an input parameter or something else
//                 "name": `${userDetails.firstName}`,
//                 "email": `${userDetails.email}`,
//                 "contact": userDetails.phoneNumber
//             },
//             "notes": {
//                 "address": "Razorpay Corporate Office"
//             },
//             "theme": {
//                 "color": "#3399cc"
//             }
//         };

//     }catch(error){

//     }

// }