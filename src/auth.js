import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export function AdminCheck(props) {
  const cookies = new Cookies();
  const authToken = cookies.get("role");
  
  if (!authToken) {
    return <Navigate to="/login-admin" />;
  }else if(authToken!=="superAdmin" && authToken!=="admin" ){     
    return <Navigate to="/login-admin" />;

}

  return <>{props.children}</>;
}
export function SuperAdminCheck(props) {
    const cookies = new Cookies();
    const authToken = cookies.get("role");
    
    if (!authToken ) {
      return <Navigate to="/login-admin" />;
    }else if(authToken!=="superAdmin"){      return <Navigate to="/login-admin" />;
}
  
    return <>{props.children}</>;
  }
  export function UserCheck(props) {
    const cookies = new Cookies();
    const authToken = cookies.get("role");
    
    if (!authToken || authToken!=="user") {
      return <Navigate to="/login" />;
    }
  
    return <>{props.children}</>;
  }