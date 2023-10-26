import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { useQueryClient } from "@tanstack/react-query";
import errorHandler from "@/utils/errorHandler";
import { message } from "antd";

//query to retrieve a live video from the user
export const fetchProfileData = async (id?: string) => {
  const { data } = await axios.get(`/ministry/${id}`);

  return data;
};

export const updateProfileData = async (data: any) => {
  const { data: profileData } = await axios.put(`/ministry/${data?._id}`, data);

  return profileData;
};

/**
 * @description - custom hook to retrieve the public profile of the current user
 * @param onSuccess  - callback function to be called on success
 * @param onError - callback function to be called on error
 * @returns  - returns the query object
 *
 * @author Ethan Cannelongo
 * @version 1.0
 * @since 1.0
 */
export const useSelectedProfile = (id?: string, onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
  const query = useQuery(["selectedProfile"], () => fetchProfileData(id), {
    onError,
    refetchOnWindowFocus: false,
    onSuccess,
    enabled: !!id,
  });
  return query;
};

export const useUpdateSelectedProfile = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
  const queryClient = useQueryClient();
  const mutate = useMutation(
    (data: any) => {
      return updateProfileData(data);
    },
    {
      onError: (error: any) => {
        errorHandler(error);
        onError && onError(error);
      },
      onSuccess: (data: any) => {
        message.success("Profile updated successfully");
        queryClient.invalidateQueries(["user"]);
        queryClient.invalidateQueries(["selectedProfile"]);

        onSuccess && onSuccess(data);
      },
    }
  );
  return mutate;
};
