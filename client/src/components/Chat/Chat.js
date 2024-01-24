import React, { useEffect, useState } from "react";




function Chat({ socket, username, room }) { 

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
          const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };
    
          await socket.emit("send_message", messageData);
          setMessageList((prevMssgBackend) => [...prevMssgBackend, messageData]);
          setCurrentMessage("");
        }
      };

     
      useEffect(() => {
        socket.on("receive_message_from_server", (data) => { 
          setMessageList((prevMssgBackend) => [...prevMssgBackend, data]);
          //console.log(data);
        });
      }, [socket]);


    return (
        <div className="chat-window">
          <div className="chat-header">
            <p>Live Chat</p>
            <p>user: {username}</p>
            <p>Room: {room}</p>
          </div>
          <div className="chat-body">
          <div className="message-container">
          {messageList.map((elt) => {
            return (
              <div
                className="message"
                id={username === elt.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{elt.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{elt.time}</p>
                    <p id="author">{elt.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Hey..."
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      );
}

export default Chat;