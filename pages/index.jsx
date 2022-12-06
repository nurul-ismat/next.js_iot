import React, {useEffect, useState } from "react";
import moment from "moment";
import io from "socket.io-client";
import Header from '../components/Header/Header';
import SideBar from '../components/SideBar/SideBar';
import Login from "../components/Login/Login"
import SideHeaderLoingUser from "../components/SideHeaderLoingUser/SideHeaderLoingUser";
var user;
var _client;
let socket;
let socketId;
const Home = () => {
  const [hasClient, setHasClient] = useState(false);
  const [loginUsername, setLoginUsername] = useState("");
  const [hasLogin, setHasLogin] = useState(false);
  const [protocol, setProtocol] = useState("ws://");
  const [host, setHost] = useState("");
  const [port, setPort] = useState("8000");
  const [clientId, setClientId] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [path, setPath] = useState("/mqtt");
  const [reconnectionPeriod, setReconnectionPeriod] = useState("5000");
  const [timeout, setTimeout] = useState("2000");
  const [topic, setTopic] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socketInitializer();
  }, []);
  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch("/api/socket");

    socket = io();

    socket.on("connect", () => {
      console.log(socket.id); // "G5p5..."
      socketId = socket.id;
      socket.on("updateClientData", (data) => {
        setMessages(data);
        console.log(messages);
      });
    });
  };

  async function onPressedConnectBtn() {
    var mqttUri = protocol + host;
    const data = {
      user: user._id,
      host: mqttUri,
      username: username,
      password: password,
      clientId: clientId,
      reconnectPeriod: parseInt(reconnectionPeriod),
      connectTimeout: parseInt(timeout),
      port: parseInt(port),
      path: "/mqtt",
    };
    console.log(data);
    var result = await fetch("http://localhost:3000/api/connectClient", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (result.status == 200 || result.status == 201) {
    const {client} = await result.json();
    console.log(client);
    setHasClient(true);
        setHost(client.host);
        setPort(client.port);
        setClientId(client.clientId);
    _client = client;
    socket.emit("registerClient", client._id);
    }
  }

  async function onPressedSubscribeBtn() {
    var result = await fetch("http://localhost:3000/api/subscribeTopic", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ client: _client, topic: topic }),
    });

    if (result.status == 201) {
      setSubscriptions((await result.json()).subscriptions);
    }
    console.log(_client);
    // setSubscriptions([...subscriptions, subscription]);
    // setSubscription("");
  }

  return (
    
    <section className="flex gap-0">
      <SideBar/>
      <div className="flex flex-col w-full">
        <SideHeaderLoingUser/>
        <div className="px-24 py-36 font-[Montserrat] flex flex-col">
          <Login/>
        </div>
      </div>
    </section>
  );
};
export default Home;
