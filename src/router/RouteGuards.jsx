import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = ({element}) => {
    const {isAuth} = useContext(AuthContext);

    return isAuth ? element : <Navigate to ="/login" replace />
}

export const PublicRoute = ({element}) => {
    const {isAuth} = useContext(AuthContext);
    return isAuth ? <Navigate to ="/" replace /> : element
}