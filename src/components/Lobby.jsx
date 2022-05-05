import images from "../images/export.js";

import { useContext, useState, useEffect } from "react";

import SocketContext from "../context/socketContext";

import Container from "./shared/Container";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Lobby() {
  const [matchType, setMatchType] = useState(false);
  const [globalMatches, setGlobalMatches] = useState(null);
  const { socket, setMatchKey, avatar, setAvatar, setOppAvatar, setPlayerType } =
    useContext(SocketContext);
  if (!socket) window.location.href = "/";

  const searchForMatch = (e) => {
    setMatchType(e.target.value);
  };
  if (matchType) {
    socket.emit("join-queue", matchType);
    setMatchType(false);
  }
  const navigate = useNavigate();
  const navStore = () => {
    navigate("/store");
  };

  useEffect(() => {
    socket.on("joined-match", (data) => {
      const [matchKey, oppAvatar, playerType] = data;
      console.log(playerType)
      setMatchKey(matchKey);
      setOppAvatar(oppAvatar);
      setPlayerType(playerType)
      navigate("/match");
    });
    socket.on("matches", (matches) => {
      setGlobalMatches(matches);
    });
    socket.on("avatar", (data) => {
      setAvatar(data);
      console.log(images);
      console.log(images.data);
    });
  }, [socket]);

  let hide = null;
  if (matchType !== false)
    hide = {
      display: "none",
    };

  return (
    <>
      <h1>Lobby</h1>
      <div className="Lobby">
        <Container
          className={"vertical-container"}
          children={[
            <Container
              key={1}
              className={"user"}
              children={[
                <img
                  key={1}
                  src={images.items[avatar]}
                  className={"pepe"}
                  width={250}
                ></img>,
                <Button key={2} onClick={navStore} children={"Store"} />,
              ]}
            />,
            <Container
              key={2}
              className={"match-type"}
              children={[
                <h1 key={1}>Match Type</h1>,
                <Container
                  key={2}
                  className={"buttons"}
                  children={[
                    <Button
                      key={1}
                      className={"casual"}
                      children={"casual 😎"}
                      value={"casual"}
                      onClick={searchForMatch}
                      style={hide}
                    />,
                    <Button
                      key={2}
                      className={"wager"}
                      children={"wager 🤑"}
                      value={"wager"}
                      onClick={searchForMatch}
                      style={hide}
                    />,
                  ]}
                />,
              ]}
            />,
          ]}
        />

        <Container
          key={3}
          className={"matches"}
          children={
            globalMatches === null
              ? null
              : globalMatches.map((match, i) => {
                  return (
                    <Card
                      key={i}
                      className={"match-card"}
                      children={[
                        <img src={match.playerA.avatar} />,
                        <h2>{match.type}</h2>,
                        <img src={match.playerB.avatar} />,
                      ]}
                    />
                  );
                })
          }
        />
      </div>
    </>
  );
}

export default Lobby;
