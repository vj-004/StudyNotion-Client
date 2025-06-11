import toast from "react-hot-toast";
import { apiConnecter } from "../apiConnector";
import { categories } from "../apis";


export const fetchAllCategories = async () => {
    let result = [];
    try{

        const response = await apiConnecter("GET", categories.CATEGORIES_API,);
        console.log('All categories repsonse...', response);
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