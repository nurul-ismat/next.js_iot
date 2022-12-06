import React from "react";
import { BsSearch } from "react-icons/bs";
import { MdCircleNotifications } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
const SideHeaderLoingUser = () => {
  return (
    <div className="md:flex items-center justify-between bg-white py-4 px-7 border-b-2">
      <div className="flex flex-row  ">
        <div className="p-2 bg-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-5  h-5 "
          >
            <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03zM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 00.372-.648V7.93zM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 00.372.648l8.628 5.033z" />
          </svg>
        </div>
        <div
          className="font-semibold text-sm  cursor-pointer flex items-center font-[Montserrat] 
            text-gray-800 px-3"
        >
          My First Project
        </div>
      </div>
      <div>
        <div className="flex">
          <div className="flex items-center border-r-2">
            <BsSearch className="text-2xl" />
            <MdCircleNotifications className="mx-6 text-3xl" />
          </div>
                  <div className="flex items-center">
                      <span className="text-sm text-blue-800 ml-12">User Name</span>
                      <FaUserCircle className="text-3xl ml-5"/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SideHeaderLoingUser;
