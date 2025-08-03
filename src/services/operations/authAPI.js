import toast from "react-hot-toast"
import { setLoading, setToken } from "../../reducers/slices/authSlice";
import { apiConnecter } from "../apiConnector";
import { endpoints } from "../apis";
import { setUser } from "../../reducers/slices/profileSlice";
import { resetCart } from "../../reducers/slices/cartSlice";
import { setCourse, setEditCourse } from "../../reducers/slices/courseSlice";

export const login = (email,password,navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{

            const response = await apiConnecter("POST", endpoints.LOGIN_API, {
                email,
                password,
            });

            console.log('Login API response...', response);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Login Successful");
            dispatch(setToken(response.data.token));


            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({ ...response.data.user, image: userImage, password: null}))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            navigate("/dashboard/my-profile")

        }catch(error){
            console.log('Error in Login API', error);
            toast.error("incorrect username or password");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

}

export const signup = (
    {accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate}
) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        dispatch(setLoading(true));
        try{
            const payload = {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                otp
            };
            console.log('payload:', payload);
            const response = await apiConnecter("POST", endpoints.SIGNUP_API, payload);

            console.log('SignUp API Response ...', response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success('Signup Successfull');

            navigate('/login');


        }catch(error){
            console.log('Error in Signup API');
            toast.error("Signup failed");
            navigate('/signup');
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId)
    }
}

export const SendOTP = (email,navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));

        try{

            const response = await apiConnecter("POST",endpoints.SENDOTP_API,{
                email,
                checkUserPresent: true,
            });

            console.log("SENDOTP API RESPONSE...", response)
            console.log(response.data.success);

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        
        }catch(error){
            console.log('Error in signup API', error);
            toast.error("Sign Up failed");
        }

        dispatch(setLoading(false));
        toast.dismiss(toastId);

    }
}

export const getPasswordResetToken = (email,setEmailSent) => {
    return async(dispatch) => {
        dispatch(setLoading(true));
        try{

            const response = await apiConnecter("POST", endpoints.RESETPASSTOKEN_API,{
                email
            });

            console.log("Reset password token response...", response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Reset email sent");
            setEmailSent(true);

        }catch(error){
            console.log("Reset password token error in API");
            toast.dismiss("Failed to send email for resetting password");
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword = (password, confirmPassword, token, navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{
            const response = await apiConnecter("POST", endpoints.RESETPASSWORD_API, {
                password,
                confirmPassword,
                token
            });
            
            console.log('RESETPASSWORD response...', response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset successfully");
            navigate('/login');

        }catch(error){
            console.log("Error in resseting password");
            toast.dismiss("Unable to reset password");
        }
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }
}

export const logout = (navigate) => {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        dispatch(setCourse(null));
        dispatch(setEditCourse(false));
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}