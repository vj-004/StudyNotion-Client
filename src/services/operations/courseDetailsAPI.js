import toast from "react-hot-toast";
import { apiConnecter } from "../apiConnector";
import { categories, courseEndpoints } from "../apis";


export const fetchAllCategories = async () => {
    let result = [];
    try{

        const response = await apiConnecter("GET", categories.CATEGORIES_API,);
        console.log('All categories repsonse...', response.status);
        if(!response.data.success){
            throw new Error("Error in response of fecthing all categories");
        }

        result = response?.data?.allCategories;

    }catch(error){
        console.log('Error in getting all categories', error);
        toast.error(error.message)
    }

    return result;
}

export const getDraftCourse = async () => {
    try{

        const response = await apiConnecter("GET", courseEndpoints.GET_DRAFT_COURSE);
        console.log('draft course repsonse...', response.status);
        if(!response.data.success){
            throw new Error("Error in response of getting a draft course");
        }

        return response.data.data;

    }catch(error){
        console.log('Error in getting all categories', error);
        toast.error(error.message)
    }
}

export const editCourseDetails = async (data) => {

    try{

        const formData = {};
        for (let [key, value] of data.entries()) {
            if (key === "instructions" || key === "tag") {
                formData[key] = value.split(",").map((s) => s.trim());
            } else {
                formData[key] = value;
            }
        }
        const response = await apiConnecter("POST", courseEndpoints.EDIT_COURSE_API,formData); 
        console.log('This is the response of edit course API is');

        if(!response.data.success){
            throw new Error("Edit course was unsuccessfull");
        }
        
        return response.data.data;

    }catch(error){
        console.log('Error in creating an API request to edit the course');
    }

}

export const addCourseDetails = async (data,token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try{   

        const response = await apiConnecter("POST", courseEndpoints.CREATE_COURSE_API,data,{
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });
        console.log('CREATE COURSE API RESPONSE.....', response);
        if(!response?.data?.success){
            throw new Error("Could not add course details");
        }

        toast.success("Course added successfully");
        result = response?.data?.data;

    } catch(error){
        console.log('Create course API error....', error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}

export const createSection = async (data,token) => {
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
        console.log('Error in creating a section', error);
        toast.error(error.message);
    }
}

export const deleteSection = async (data,token) => {
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

        return response.data.data;

    }catch(error){
        console.log('Error in deleting a section', error);
        toast.error(error.message);
    }
}

export const updateSection = async (data,token) => {
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

        return response.data.data;

    }catch(error){
        console.log('Error in updating a section', error);
        toast.error(error.message);
    }
}

export const createSubSection = async (data, token) => {
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
    result = response?.data?.data
  } catch (error) {
    console.log("CREATE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

