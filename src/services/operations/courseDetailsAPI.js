import toast from "react-hot-toast";
import { apiConnecter } from "../apiConnector";
import { categories, courseEndpoints } from "../apis";
import { setToken } from "../../reducers/slices/authSlice";
import { addYtCourseProgreesToUser, addYtCoursesToUser, updateYtCourseProgress } from "../../reducers/slices/profileSlice";


export const fetchAllCategories = async (dispatch, navigate) => {
    let result = [];
    try{

        const response = await apiConnecter("GET", categories.CATEGORIES_API);
        console.log('All categories repsonse...', response.status);
        if(!response.data.success){
            throw new Error("Error in response of fecthing all categories");
        }

        result = response?.data?.allCategories;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return result;
        }
        console.log('Error in getting all categories', error);
        toast.error(error?.response?.data?.message || error.message)
    }

    return result;
}

export const getDraftCourse = async (dispatch, navigate) => {
    try{

        const response = await apiConnecter("GET", courseEndpoints.GET_DRAFT_COURSE);
        console.log('draft course repsonse...', response.status);
        return response.data.data;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        else{
            toast.error(error?.response?.data?.message || error.message);
        }
        console.log('Error in getting draft course', error?.response?.data?.message || error?.message);
        
    }
}

export const editCourseDetails = async (data, dispatch, navigate) => {
    console.log('trying to editcourse');
    try{

        for (let [key, value] of data.entries()) {
            console.log(`${key}: ${value}`);
        }
        const response = await apiConnecter("POST", courseEndpoints.EDIT_COURSE_API,data);         
        
        // console.log('This is the response of edit course API is');

        if(!response.data.success){
            throw new Error("Edit course was unsuccessfull");
        }
        
        return response.data.data;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        console.log('Error in creating an API request to edit the course');
        toast.error(error?.response?.data?.message || error.message);
    }

}

export const addCourseDetails = async (data,token,dispatch,navigate) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try{   

        const response = await apiConnecter("POST", courseEndpoints.CREATE_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        // console.log('CREATE COURSE API RESPONSE.....', response);
        if(!response?.data?.success){
            throw new Error("Could not add course details");
        }

        toast.success("Course added successfully");
        result = response?.data?.data;

    } catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            toast.dismiss(toastId);
            return result;
        }
        console.log('Create course API error....', error);
        toast.error(error?.response?.data?.message || error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createYtCourse = async (data,token,dispatch,navigate) => {

    const toastId = toast.loading("Loading...");
    try{

        if(!data){
            toast.error("Please provide the data");
            toast.dismiss(toastId);
            return null;
        }

        const response = await apiConnecter("POST", courseEndpoints.CREATE_YT_COURSE, data, {
            Authorization: `Bearer ${token}`,
        });


        if(!response?.data?.success){
            if(response?.data?.message === "Course is already present with the user"){
                throw new Error("You already have this course");
            }
            throw new Error("Create YtCourse response failed");
        }
        const result = response.data.data;
        // console.log('result: ', result);    
        toast.success("Course Added Successfully");
        dispatch(addYtCoursesToUser(result.ytCourses));
        dispatch(addYtCourseProgreesToUser(result.ytCourseProgress));
        toast.dismiss(toastId)
        return;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            toast.dismiss(toastId);
            return;
        }
        console.log('Error in createYtCourse', error);
        if(error?.response?.data?.message === 'The given playlist URL is not valid'){
            toast.error(error?.response?.data?.message);
        }
        else{
            toast.error(error?.response?.data?.message || error.message);
        }
    }

    toast.dismiss(toastId);
    return;

}

export const markCourseAsComplete = async (data, token, dispatch, navigate) => {

    const toastId = toast.loading("Loading...");
    try{

        if(!data || !data?.playlistUrl || !data?.videoId){
            toast.error("All details not provided");
            toast.dismiss(toastId);
            return null;
        }

        console.log('data: ', data);

        const response = await apiConnecter("POST", courseEndpoints.MARK_LECTURE_COMPLETE, data, {
            Authorization: `Bearer ${token}`,
        });
        // console.log('Marked as complete response', response.data.success);

        if(!response?.data?.success){
            throw new Error(response?.data?.message || "Error in Marking Course as Complete");
        }
        if(response?.data?.data){
            dispatch(updateYtCourseProgress(response.data.data));
        }
        toast.dismiss(toastId)
        return true;

    }
    catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            toast.dismiss(toastId);
            return false;
        }
        console.log('Error in marking course as complete', error);
        toast.error(error?.response?.data?.message || "Could not mark the lecture as complete");
    }

    toast.dismiss(toastId);
    return false;

}

export const createSection = async (data,token,dispatch,navigate) => {
    try{

        const response = await apiConnecter("POST", courseEndpoints.CREATE_SECTION_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log('Response for creating section is called');
        if(!response){
            throw new Error("Couldn't get output from API");
        }

        toast.success("Section created successfully");

        return response.data.data;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        console.log('Error in creating a section', error);
        toast.error(error?.response?.data?.message || error.message);
    }
}

export const deleteSection = async (data,token,dispatch,navigate) => {
    try{

        const response = await apiConnecter("POST", courseEndpoints.DELETE_SECTION_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log('Response for deleting section is called');
        if(!response){
            throw new Error("Couldn't get output from API");
        }

        toast.success("Section deleted successfully");

        return;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        console.log('Error in deleting a section', error);
        toast.error(error?.response?.data?.message || error.message);
    }
}
    
export const updateSection = async (data,token,dispatch,navigate) => {
    try{

        const response = await apiConnecter("POST", courseEndpoints.UPDATE_SECTION_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        console.log('Response for updating section is called');
        if(!response){
            throw new Error("Couldn't get output from API");
        }

        toast.success("Section updated successfully");

        return;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        console.log('Error in updating a section', error);
        toast.error(error?.response?.data?.message || error.message);
    }
}

export const createSubSection = async (data, token, dispatch, navigate) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnecter("POST", courseEndpoints.CREATE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("CREATE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Add Lecture")
    }
    toast.success("Lecture Added")
    result = response?.data.updatedSection;
    } catch (error) {
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            toast.dismiss(toastId)
            return result
        }
        console.log("CREATE SUB-SECTION API ERROR............", error)
        toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const deleteSubSection = async (data, token, dispatch, navigate) => {
//   let result = null
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnecter("POST", courseEndpoints.DELETE_SUBSECTION_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE SUB-SECTION API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Lecture")
    }
    toast.success("Lecture Deleted")
    // result = response?.data.updatedSection;
    } catch (error) {
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            toast.dismiss(toastId)
            return;
        }
        console.log("DELETE SUB-SECTION API ERROR............", error)
        toast.error(error?.response?.data?.message || error.message)
  }
  toast.dismiss(toastId)
  return;
}

export const editSubSection = async (data, token, dispatch, navigate) => {

    try{

        const response = await apiConnecter("POST", courseEndpoints.UPDATE_SUBSECTION_API, data, {
        Authorization: `Bearer ${token}`,
        });
        if(!response.data.success){
            throw new Error("Please login again");
        }
        console.log('response for updating the lecture is ', response);
        toast.success("Lecture edited successfully");
        return response.data.data;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        console.log('There was an error in editting sub section');
        toast.error(error?.response?.data?.message || error.message);
    }

}


export const instructorCourses = async (dispatch, navigate) => {

    try{

        const response = await apiConnecter("GET", courseEndpoints.GET_ALL_INSTRUCTOR_COURSES_API);

        if(!response.data.success){
            throw new Error("Pleae login again");
        }
        console.log('response of getting all lectures works');
        return response?.data?.data;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        toast.error(error?.response?.data?.message || error.message);
        console.log('Error in getting instructor courses');
    }

}

export const deleteCourse = async (courseId, token, dispatch, navigate) => {

    try{

        const response = await apiConnecter("DELETE", courseEndpoints.DELETE_COURSE_API,{courseId},{
           Authorization: `Bearer ${token}`, 
        });

        console.log('The response for deleting the course is ', response);
        toast.success("Course deleted successfully");

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        console.log('Error in deleting the course');
        throw new Error(error?.response?.data?.message || "Please login later");
    }

    return;

} 

export const getAllCourseDetails = async (courseId, dispatch, navigate) => {
    try{

        const response = await apiConnecter("POST", courseEndpoints.GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId});

        // console.log('course details repsonse...', response);
        return response.data.data;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        else{
            toast.error(error?.response?.data?.message || error.message);
        }
        console.log('Error in getting draft course', error?.response?.data?.message || error.message);
        
    }
}

export const getCategoryCourses = async (categoryId, dispatch, navigate) => {
    try{

        const response = await apiConnecter("POST", courseEndpoints.GET_COURSES_BY_CATEGORY,{categoryId});

        // console.log('all courses by category repsonse...', response);
        return response.data.data;

    }catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        else{
            toast.error(error?.response?.data?.message || error.message);
        }
        console.log('Error in getting courses based on category', error?.response?.data?.message || error.message);
        
    }
}

export const getAllUserYtCourses = async (token, dispatch, navigate) => {


    try{

        const response = await apiConnecter("GET", courseEndpoints.GET_USER_YT_COURSES, null, {
            Authorization: `Bearer ${token}`,
        });
        return response.data.data;


    }
    catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        toast.error(error?.response?.data?.message || error.message);
        console.log('Error in getting youtube courses: ', error);
    }

}

export const getAllYtPlaylists = async (page, dispatch, navigate) => {


    try{

        const response = await apiConnecter("GET", courseEndpoints.GET_ALL_YT_PLAYLIST+`?page=${page}`);
        return response.data.data;

    }
    catch(error){
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        toast.error(error?.response?.data?.message || error.message);
        console.log('Error in getting youtube courses: ', error);
    }

}

export const getYtCourseById = async (playlistId, dispatch, navigate) => {

    try{
        const response = await apiConnecter("POST", courseEndpoints.GET_YT_COURSE_BY_ID, {playlistId});
        console.log('response: ', response);
        return response.data.data;
    }
    catch(error){
        console.log('Error in getting ytCourse', error);
        if(error?.response?.status === 401){
            toast.error("Please login again");
            dispatch(setToken(null));
            navigate('/login');
            return;
        }
        else{
            toast.error("This is an invalid youtube course");
        }
    }

}