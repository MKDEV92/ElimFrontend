import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const RoleRedirector = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const res = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user");
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };

    checkUserRole();
  }, [getToken, navigate]);

  return null;
};

export default RoleRedirector;
