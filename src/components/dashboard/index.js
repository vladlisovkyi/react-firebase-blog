import React from "react";
import DashLayout from "../../utils/dash_layout";

const Dashboard = ({ auth }) => {
  return (
    <DashLayout auth={auth} title="Dashboard">
      Some content...
    </DashLayout>
  );
};

export default Dashboard;
