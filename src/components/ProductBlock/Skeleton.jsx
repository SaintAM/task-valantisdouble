import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={1000}
    height={124}
    viewBox="0 0 1000 124"
    backgroundColor="#9c9c9c"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="58" cy="38" r="25" /> 
    <rect x="106" y="18" rx="5" ry="5" width="150" height="12" /> 
    <rect x="106" y="46" rx="5" ry="5" width="220" height="12" /> 
    <rect x="106" y="71" rx="5" ry="5" width="150" height="12" /> 
    <rect x="105" y="98" rx="5" ry="5" width="220" height="12" />
  </ContentLoader>
);

export default Skeleton;
