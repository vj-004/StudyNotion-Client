import toast from "react-hot-toast";
import { setLoading, setToken } from "../../reducers/slices/authSlice"
import { apiConnecter } from "../apiConnector";
import { settingsEndpoints } from "../apis";
import { setUser } from "../../reducers/slices/profileSlice";

export const updateUserPicture = (file,token) => {
    return async(dispatch,getState) => {
        dispatch(setLoading(true));
        try{

            const formData = {
                displayPicture: file,
                token,
            };
            
            const response = await apiConnecter("PUT", settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formData,{
                "Content-Type": "multipart/form-data"
            });

            console.log('The response after uploading user image is ...', response);

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const user = getState().profile.user;

            dispatch(setUser({
                ...user,
                image: response.data.data.image
            }));

            toast.success("Image updated successfully");

        }catch(error){
            console.log('Error in updating user picture in frontend');
            console.log(error);
        }
        dispatch(setLoading(false));

    }
}

export const updateUserProfile = (updatedUser,token,navigate) => {
    return async (dispatch, getState) => {
        dispatch(setLoading(true));
        try{
            //console.log('updatedUser', updatedUser);
            const {gender, dateOfBirth, contactNumber, about} = updatedUser;
            const response = await apiConnecter("PUT", settingsEndpoints.UPDATE_PROFILE_API, {
                gender,
                dateOfBirth,
                contactNumber,
                about,
                token,
            },{
                Authorization: `Bearer ${token}`
            });

            console.log('The response after updating the profile is ...', response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            const user = getState().profile.user;
            dispatch(setUser({
                ...user,
                additionalDetails: {
                    ...user.additionalDetails,
                    gender,
                    dateOfBirth,
                    contactNumber,
                    about
                }
            }));
            
            toast.success("Profile updated successfully");


            
        }catch(error){
            console.log('Error in updating profile in frontend');
            console.log(error);
        }
        dispatch(setLoading(false));
    }
} 

export const updatePassword = (email, newPassword, confirmNewPassword,token, navigate) => {
    
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try{

            const response = await apiConnecter("POST", settingsEndpoints.CHANGE_PASSWORD_API, {
                email,
                newPassword,
                confirmNewPassword,
                token
            });

            console.log('Resonse for changing password is ...', response);

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            toast.success("Password Changed Successfully");

        }catch(error){
            console.log('Error in updating password in frontend');
            console.log(error);
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }
    
}

export const deleteUserAccount = (email,token,navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try{
            console.log('Trying to delete account');
            
            const response = await apiConnecter("DELETE", settingsEndpoints.DELETE_PROFILE_API, {
                email,
                token,
            });
            console.log('Delete account response ...', response);
            if(!response.data.success){
                throw new Error(response.data.message);
            }

            toast.success("Account Deleted Successfully");
            localStorage.removeItem("token");
            dispatch(setToken(null));
            dispatch(setUser(null));
            navigate('/login');

        }catch(error){
            console.log('Error in deleting account in frontend');
            console.log(error);
        }
        dispatch(setLoading(false));

    }
}