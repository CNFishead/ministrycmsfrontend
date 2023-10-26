import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "@/utils/axios";
import setAuthToken from "@/utils/setAuthToken";
import { getAbsoluteUrl } from "@/utils/getAbsoluteUrl";
import errorHandler from "@/utils/errorHandler";
import { message } from "antd";
//make a react query hook to get the user data from the server
const fetchUserData = async (token?: string) => {
  const { data } = await axios.post("/auth/me", {
    token: token,
  });

  return data;
};

const updateUser = async (data: any) => {
  const { data: userData } = await axios.put("/user", data);

  return userData;
};

export const useUser = (token?: string, onSuccess?: () => void, onError?: () => void) => {
  if (typeof window !== "undefined" && !token) {
    token = localStorage.getItem("token") as string;
  }

  const query = useQuery(["user"], () => fetchUserData(token), {
    onError: (error: Error) => {
      // if we errored destroy the token, in local storage
      localStorage.removeItem("token");
      errorHandler(error);
    },
    staleTime: Infinity,
    cacheTime: Infinity,
    onSuccess,
    enabled: !!token,
  });

  //save user and token in local storage
  if (query.data && token) {
    localStorage.setItem("token", token);
    // set the auth token in axios
    setAuthToken(token);
  }

  return query;
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<any, Error, any>((data: any) => updateUser(data), {
    onSuccess: (data: any) => {
      message.success("User Updated");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["userDetails"] });
    },
    onError: (error: Error) => {
      console.log(error);
      errorHandler(error);
    },
  });

  return mutate;
};

/**
 * @description - fetch user details, in full
 * @param id - user id
 * @returns
 */
export const fetchUserDetails = async (id: string) => {
  const { data } = await axios.get(`/user/${id}`);
  return data.user;
};

export const useUserDetails = (id: string) => {
  const query = useQuery(["userDetails", id], () => fetchUserDetails(id), {
    staleTime: Infinity,
    enabled: !!id,
    onError: (error: Error) => {
      console.log(error);
      errorHandler(error);
    },
  });

  return query;
};

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = `https://auth.truthcasting.com?logout=true`;
};
