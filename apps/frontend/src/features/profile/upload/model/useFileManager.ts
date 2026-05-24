import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { message } from "antd/lib";

import api from "@shared/api/client";

import { FileItem } from "./types";

const useFileManager = () => {
  const queryClient = useQueryClient();

  const fetchFiles = async (): Promise<FileItem[]> => {
    const { data } = await api.get("/files");
    return data;
  };

  const uploadFile = async (file: File): Promise<FileItem> => {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await api.post("/files/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  };

  const deleteFile = async (id: number): Promise<void> => {
    await api.delete(`/files/${id}`);
  };

  const { data: files, isLoading } = useQuery({
    queryKey: ["user-files"],
    queryFn: fetchFiles,
  });

  const uploadMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-files"] });
      message.success("Uploaded");
    },
    onError: () => message.error("Upload failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-files"] });
      message.success("Deleted");
    },
    onError: () => message.error("Delete failed"),
  });

  const handleUpload = (file: File) => {
    uploadMutation.mutate(file);
    return false; // prevent default upload
  };

  return {
    uploadMutation,
    deleteMutation,
    handleUpload,
    files,
    isLoading,
  };
};

export default useFileManager;
