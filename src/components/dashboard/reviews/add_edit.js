import React from "react";
import DashLayout from "../../../utils/dash_layout";
import ReviewForm from "./form";

const ReviewAddEdit = ({ auth, match, history }) => {
  return (
    <DashLayout auth={auth} title="Reviews">
      <ReviewForm id={match.params.id} history={history} />
    </DashLayout>
  );
};

export default ReviewAddEdit;
