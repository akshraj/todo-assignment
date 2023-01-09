import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUser(JSON.parse(localStorage.getItem("user")));
    }
  }, []);

  return { user };
};

export default useAuth;
