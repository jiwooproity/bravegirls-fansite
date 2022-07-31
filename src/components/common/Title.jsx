import React from "react";
import { Link } from "react-router-dom";

const Title = (props) => {
  const { title } = props;

  return <Link to={"/"}>{title}</Link>;
};

export default Title;
