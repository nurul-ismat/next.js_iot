import React from "react";
import SideBar from "../../components/SideBar/SideBar";
import SideHeaderLoingUser from "../../components/SideHeaderLoingUser/SideHeaderLoingUser";

const clientChat = () => {
  return (
    <div>
      <section className="flex gap-0">
        <SideBar />
        <div className="flex flex-col w-full">
          <SideHeaderLoingUser />
          <div className="px-24 py-36 font-[Montserrat] flex flex-col">
            <h1 className="text-2xl font-bold my-2">Client</h1>
            <div className="border-2 rounded-lg p-3 my-8">
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
                <button className="bg-blue-500 text-white p-1 px-3 rounded float-right">
                  Connected
                </button>
              </form>
            </div>
            <h1 className="text-2xl font-bold my-1">Client</h1>
            <div className="border-2 rounded-lg p-3 my-8">
              <form>
                <div className="flex items-center w-full">
                  <div className="w-full">
                    <label>Host</label>
                    <br />
                    <input
                      className="border p-1 rounded w-full"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="mx-3 w-full">
                    <label>Port</label>
                    <br />
                    <input
                      className="border p-1 rounded w-full"
                      type="number"
                      name=""
                      id=""
                    />
                  </div>
                  <div className="w-50">
                    <label></label>
                    <br />
                    <button className="bg-blue-500 text-white p-1 px-3 rounded float-right">
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex">
              <div className="h-50">
                <h1 className="text-2xl font-bold">Subscription</h1>
                <div className="border-2 rounded-lg p-3 my-8 h-full">
                  <button className="bg-blue-500 text-white p-1 px-3 rounded">
                    + Add New Topic
                  </button>
                </div>
              </div>
              <div className="h-50 w-full ml-7">
                <h1 className="text-2xl font-bold">Message</h1>
                <div className="border-2 rounded-lg p-3 my-8 h-full">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="bg-blue-200 p-2 mb-3 rounded">
                      <span>Topic</span>
                      <h1 className="font-bold">Message</h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default clientChat;
