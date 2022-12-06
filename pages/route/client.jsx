import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import SideHeaderLoingUser from "../../components/SideHeaderLoingUser/SideHeaderLoingUser";

const client = () => {
  return (
    <div>
      <section className="flex gap-0">
        <SideBar />
        <div className="flex flex-col w-full">
          <SideHeaderLoingUser />
          <div className="px-24 py-36 font-[Montserrat] flex flex-col">
            <h1 className="text-2xl font-bold my-2">Setup</h1>
            <div className="border-2 rounded-lg p-3 my-3">
              <h1 className="text-2xl font-bold my-2">Chose Client</h1>
              <div className="flex items-center">
                <button className="border-blue-600 border-2 mr-2  w-full text-center py-2 block rounded-lg text-blue">
                  Public
                </button>
                <button className="bg-blue-600 w-full text-center mr-2 block rounded-lg py-2 text-white">
                  Private
                </button>
              </div>
            </div>
            <div className="border-2 rounded-lg p-3 my-8">
              <h1 className="text-2xl font-bold my-2">Client</h1>
              <form>
                <div className="flex w-full">
                  <div className="w-full">
                    <label>Host</label>
                    <br />
                    <input
                      className="border p-1 rounded w-full"
                      type="text"
                      name=""
                      id=""
                    />
                    <br />
                  </div>
                  <div className="mx-3">
                    <label>Port</label>
                    <br />
                    <input
                      className="border p-1 rounded w-20"
                      type="number"
                      name=""
                      id=""
                    />
                    <br />
                  </div>
                  <div className="w-full">
                    <label>Client Id</label>
                    <br />
                    <input
                      className="border p-1 rounded w-full"
                      type="number"
                      name=""
                      id=""
                    />
                    <br />
                  </div>
                </div>
                <div className="flex w-full my-2">
                  <div className="w-full">
                    <label>Username</label>
                    <br />
                    <input
                      className="border p-1 rounded w-full"
                      type="text"
                      name=""
                      id=""
                    />
                    <br />
                  </div>
                  <div className="w-full mx-2">
                    <label>Password</label>
                    <br />
                    <input
                      className="border p-1 rounded w-full"
                      type="password"
                      name=""
                      id=""
                    />
                    <br />
                  </div>
                  <div className="w-full">
                    <label>Keep Alive(sec)</label>
                    <br />
                    <input
                      className="border p-1 rounded w-full"
                      type="text"
                      name=""
                      id=""
                    />
                    <br />
                  </div>
                </div>
                <button className="bg-blue-500 text-white p-1 px-3 rounded float-right">Setup</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default client;
