import React from "react";

export const Navigation = () => {
  let userInfo = localStorage.getItem("gUserInfo");
  userInfo = JSON.parse(userInfo);
  return (
    <nav>
      <span className="image-url">
        <img src={userInfo.imageUrl} alt="Google Avatar" />
      </span>
    </nav>
  );
};
