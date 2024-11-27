import { axiosAuth } from "@/config/axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
// import { useSelector } from "react-redux";

export default function useAxiosAuth() {
//   const { auth } = useSelector((state: any) => state.auth);
const session = useSession()

  const accessToken = session.data?.accessToken;

  // console.log(accessToken);
   useEffect(() => {
    const requestIntercept = axiosAuth.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] =`Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosAuth.interceptors.request.eject(requestIntercept);
    };
  }, [accessToken]);

  return axiosAuth;
}