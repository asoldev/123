
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/thi-cu")
  }, []);

  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;
