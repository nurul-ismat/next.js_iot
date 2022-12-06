import Image from "next/image";
import React from "react";
import Header from "../../components/Header/Header";
import SideBar from "../../components/SideBar/SideBar";
import SideHeaderLoingUser from "../../components/SideHeaderLoingUser/SideHeaderLoingUser";
import image from "../assets/Lo-fi concept-rafiki.svg";
const user = () => {
  return (
    <section className="flex gap-0">
      <SideBar />
      <div className="flex flex-col w-full">
        <SideHeaderLoingUser />
        <div className="px-24 py-36 font-[Montserrat] flex flex-col">
          <h1 className="text-2xl font-bold my-2">Dashboard</h1>
          <div className="border-2 rounded-lg p-3">
            <Image width={350} src={image} alt="avatar" className="mx-auto" />
            <div>
              <p className="my-3 font-semibold text-center">
                You haven't setup your project yet. <br />
                Build your project now!
              </p>
              <button className="bg-blue-600 text-center block mx-auto p-2 rounded-sm text-white">
                Get Started !
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default user;
