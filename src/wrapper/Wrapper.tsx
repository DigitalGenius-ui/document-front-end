import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import queryClient from "../config/react-query";
import { Toaster } from "react-hot-toast";
import UserContext from "../context/UserContext";

const Wrapper = ({ children }: { children: React.ReactElement }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserContext>{children}</UserContext>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default Wrapper;
