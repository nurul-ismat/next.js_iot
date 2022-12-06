import React,{useState} from "react";
const Login = () => {
    const [hasLogin, setHasLogin] = useState(false);
    const [loginUsername, setLoginUsername] = useState("");
    async function onPressedLoginBtn() {
        var result = await fetch("http://localhost:3000/api/registerUser", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            username: loginUsername,
          }),
        });
        if (result.status == 200 || result.status == 201) {
          const { data } = await result.json();
          // setUser(data);
          user = data;
          console.log(user._id); 
          setHasLogin(true);
          var resultClient = await fetch("http://localhost:3000/api/getClient", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              user: user,
            }),
          });
          if (resultClient.status == 200 || resultClient.status == 201) {
            const { client } = await resultClient.json();
            console.log("test:", client);
            setHasClient(true);
            setHost(client.host);
            setPort(client.port);
            setClientId(client.clientId);
            _client = client;
    
            socket.emit("registerClient", client._id);
          }
        }
      }
  return (
    <>
      <div className="py-5">
        <h1 className="font-semibold text-3xl pb-4">Login</h1>
        {hasLogin ? (
          <div className="h-min w-full border-solid border border-grey300 rounded-md px-10 py-3">
            <div className="flex flex-row py-3">
              <div className="flex flex-col w-full px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  LOGIN USERNAME
                </div>
                <div className="text-gray-700 text-[14px] pb-1">
                  {loginUsername}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-min w-full border-solid border border-grey300 rounded-md px-10 py-3">
            <div className="flex flex-row py-3">
              <div className="flex flex-col w-full px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  LOGIN USERNAME
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="loginUsername"
                  type="text"
                  placeholder="Username"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                ></input>
              </div>
            </div>

            <div className="flex flex-row py-3">
              <div className="flex flex-col justify-end basis-5/6 px-3 "></div>

              <div className="flex flex-col justify-end basis-1/6 px-3 ">
                <button
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-medium text-[14px] py-2 px-5 rounded"
                  onClick={onPressedLoginBtn}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {hasLogin && !hasClient ? (
        <div className="py-5">
          <h1 className="font-semibold text-3xl pb-4">Client</h1>
          <div className="h-min w-full border-solid border border-grey300 rounded-md px-10 py-3">
            <div className="flex flex-row py-3">
              <div className="flex flex-col basis-1/6 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  PROTOCOL
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="protocol"
                  type="text"
                  placeholder="ws://"
                  value={protocol}
                  onChange={(e) => setProtocol(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col basis-2/3 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  HOST
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="host"
                  type="text"
                  placeholder="Host"
                  value={host}
                  onChange={(e) => setHost(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col basis-1/6 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  PORT
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="port"
                  type="text"
                  placeholder="8000"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-row py-3">
              <div className="flex flex-col basis-1/3 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  CLIENT-ID
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="clientId"
                  type="text"
                  placeholder="Client-Pusat"
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col basis-1/3 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  USERNAME
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col basis-1/3 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  PASSWORD
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-row py-3">
              <div className="flex flex-col basis-1/3 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  MQTT PATH
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="mqttPath"
                  type="text"
                  placeholder="/mqtt"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col basis-1/3 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  RECONNECTION TIME (ms)
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="reconnectionPeriod"
                  type="text"
                  placeholder="2000"
                  value={reconnectionPeriod}
                  onChange={(e) => setReconnectionPeriod(e.target.value)}
                ></input>
              </div>
              <div className="flex flex-col basis-1/3 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  CONNECTION TIMEOUT (ms)
                </div>
                <input
                  className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                  id="timeout"
                  type="text"
                  placeholder="5000"
                  value={timeout}
                  onChange={(e) => setTimeout(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="flex flex-row py-3">
              <div className="flex flex-col justify-end basis-5/6 px-3 "></div>

              <div className="flex flex-col justify-end basis-1/6 px-3 ">
                <button
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-medium text-[14px] py-2 px-5 rounded"
                  onClick={onPressedConnectBtn}
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {hasLogin && hasClient ? (
        <div className="py-5">
          <h1 className="font-semibold text-3xl pb-4">Client</h1>
          <div className="h-min w-full border-solid border border-grey300 rounded-md px-10 py-3">
            <div className="flex flex-row py-3">
              <div className="flex flex-col basis-2/3 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  HOST
                </div>
                <div className="text-gray-700 text-[14px] pb-1">
                  {host + ":" + port}
                </div>
              </div>
              <div className="flex flex-col basis-1/6 px-3">
                <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                  CLIENT ID
                </div>
                <div className="text-gray-700 text-[14px] pb-1">{clientId}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {hasLogin && hasClient ? (
        <div className="py-5 flex flex-row gap-4">
          <div className="flex flex-col basis-1/4">
            <h1 className="font-semibold text-3xl pb-4">Subscription</h1>
            <div className="h-min w-full border-solid border border-grey300 rounded-md px-10 py-3">
              <div className="flex flex-row py-3">
                <div className="flex flex-col w-full px-3">
                  <div className="font-semibold text-[#9FA2B4] text-[12px] pb-1">
                    TOPIC
                  </div>
                  <input
                    className=" appearance-none border rounded w-full py-3 px-4 text-gray-700 text-[14px] leading-tight focus:outline-none focus:shadow-outline"
                    id="subscription"
                    type="text"
                    placeholder="topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className="flex flex-row py-3">
                <div className="flex flex-col justify-end w-full px-3 ">
                  {subscriptions.map((_) => (
                    <div className="text-gray-700 text-[14px] ">{_}</div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row py-3">
                <div className="flex flex-col justify-end w-full px-3 ">
                  <button
                    className=" w-full bg-blue-500 hover:bg-blue-700 text-white font-medium text-[14px] py-2 px-5 rounded"
                    onClick={onPressedSubscribeBtn}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col basis-3/4">
            <h1 className="font-semibold text-3xl pb-4">Message</h1>
            <div className="h-[500px] w-full border-solid border border-grey300 bg-gray-900 rounded-md px-3 py-3 overflow-scroll">
              <div className="flex flex-row py-3">
                <div className="flex flex-col w-full px-3 ">
                  {messages.map((_) => (
                    <div className="font-semibold text-[#FFF] text-[12px] pb-1">
                      <font className="text-[#2F446F]">
                        {moment(_.date).format("DD/MM/YYYY HH:mm:ss")}
                      </font>
                      &emsp;
                      <font className="text-[#BAE67E]">{_.topic}</font>:{" "}
                      {_.value}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Login;
