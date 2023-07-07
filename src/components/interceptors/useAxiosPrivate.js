import axios from "./axios";
import { axiosPrivate } from "./axios";
import { useEffect } from "react";
import {useDispatch} from 'react-redux';
import { loginUser } from "../../store/authSlice";
// const refresh = async () => {
//     await axios.post("/refresh",{withCredentials:true}).then((res)=>{
//         console.log(res.data)
//     });
// }


const useAxiosPrivateInstance=()=>{
    const disPatch=useDispatch();
    useEffect(()=>{
        const responseIntercept=axiosPrivate.interceptors.response.use(
            response => response,
            async error=>{
                const prevRequest=error.config;
                if(error.response.status===401 && !prevRequest?.sent){
                    prevRequest.sent=true
                    // refresh();
                    await axios.post("/refresh",{withCredentials:true}).then((res)=>{
                        disPatch(loginUser(res.data));
                        // console.log(res.data)
                    });
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error)
            }
        )
        return ()=>{
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    },[disPatch])
    return axiosPrivate
}
export default useAxiosPrivateInstance













