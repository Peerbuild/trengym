import React, { createContext, useContext } from "react";
import { ApiClient } from "@trengym/api-client";

const ApiClientContext = createContext<ApiClient | null>(null);

export const ApiClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const apiClient = new ApiClient({});

  return (
    <ApiClientContext.Provider value={apiClient}>
      {children}
    </ApiClientContext.Provider>
  );
};

export const useApiClient = () => {
  const apiClient = useContext(ApiClientContext);
  if (!apiClient) {
    throw new Error("useApiClient must be used within ApiClientProvider");
  }
  return apiClient;
};
