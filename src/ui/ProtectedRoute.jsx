import styled from "styled-components";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // const navigate =

  // 1. load authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2, while loading the user show a spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3, If there is no authenticated user, redirect to the /login
  if (!isAuthenticated && !isLoading) {
    toast.error("Login to access your account");
    return <Navigate to="/login" replace />;
  }

  // 4, if there is a user, return the app;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;
