import toast from "react-hot-toast"
import { apiConnecter } from "../apiConnector";
import { profileEndpoints } from "../apis";

export const getInstructorDashboardData = async (token) => {

    const toastId = toast.loading("Loading...");
    let result = [];

    try{

        const response = await apiConnecter("GET", profileEndpoints.INSTRUCTOR_DASHBOARD_DATA_API, null, {
            Authorization: `Bearer ${token}`,
        });

        console.log('get instructor dashboard data response: ', response);

        result = response?.data?.data;

    }
    catch(error){
        console.log('Error in getting instructor dashboard data, ', error);
        toast.error("Error in getting data");
    }

    toast.dismiss(toastId);
    return result;

}