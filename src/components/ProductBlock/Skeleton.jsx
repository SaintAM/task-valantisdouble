import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={600}
    height={70}
    viewBox="0 0 600 70"
    backgroundColor="#9c9c9c"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="475" y="5" rx="0" ry="0" width="117" height="25" />
    <rect x="320" y="5" rx="0" ry="0" width="117" height="25" />
    <rect x="6" y="5" rx="0" ry="0" width="117" height="25" />
    <rect x="165" y="5" rx="5" ry="5" width="117" height="25" />
  </ContentLoader>
);

export default Skeleton;
