import {
    channelList,
    userList,
    isLoggdInId,
    activeChannelName,
    authorizationError,
} from "../data/Atoms";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import "../../styles/Chat.css";
import { getUsers } from "../data/getUsers";
import { faPaperPlane, faTrashAlt, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendMessage } from "../data/sendMessage";
import { faPen, faPenToSquare, faXmark } from "@fortawesome/free-solid-svg-icons";
import { editedMessage } from "../data/editMessage";
import { deleteMessage } from "../data/deleteMessage";

const ChatWindow = () => {
    const [activChannelList] = useRecoilState(channelList);
    const [loggedInUserId] = useRecoilState(isLoggdInId);
    const [activChannel] = useRecoilState(activeChannelName);
    const [message, setMessage] = useState("");
    const [errorMessage] = useRecoilState(authorizationError);
    const [newMessage, setNewMessage] = useState("");
    const [currenttimeStamp, setTimeStamp] = useState();
    const [showInput, setShowInput] = useState(false);

    const clickEditMessage = (timeStamp) => {
        setTimeStamp(timeStamp);
        setShowInput(true);
       
    };
   
    const messageToDelete = async (timeStamp) => {
      try{
          const response = await deleteMessage(timeStamp, activChannel)
       

      }catch(error){
        console.log(error);
      }
    };

    const sendNewMessage = async () => {
        try {
            const result = await editedMessage(
                newMessage,
                currenttimeStamp,
                activChannel
            );
            if (result) {
                setShowInput(false);
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    };

    const sendMessageToChannel = async () => {
        try {
            const data = await sendMessage(message, activChannel);
        } catch (error) {
            console.error(error);
        }
        setMessage("");
    };

    return (
        <div className="chat-wrapper">
            <div className="modal">
                {activChannelList &&
                    activChannelList.map((channel, index) => {
                        const timestamp = channel.timestamp;

                        const date = new Date(timestamp);

                        const hours = String(date.getHours()).padStart(2, "0");
                        const minutes = String(date.getMinutes()).padStart(
                            2,
                            "0"
                        );

                        return (
                            <div className="chat-window" key={`${channel.userId}-${index}`}>
                                {channel.userId === loggedInUserId ? (
                                    <div className="right-main">
                                        <div className="right-convo-look">
                                            <div className="right-convo-message">{channel.message}</div>

                                            <div> {hours}:{minutes} {channel.userId} 
                                         
                                            <button type="none" onClick={() => clickEditMessage(channel.timestamp)}
                                                    className="edit-message"
                                                ><FontAwesomeIcon size="sm" icon={faPen}/></button>

                                            <button type="none" onClick={() => messageToDelete(channel.timestamp)}
                                                    className="edit-message"
                                                ><FontAwesomeIcon icon={faTrashCan} size="lg" /></button>
                                               


                                                { showInput && currenttimeStamp ===
                                                channel.timestamp ? (
                                                    <div className="chat-input ">
                                                        <input onChange={(e) => setNewMessage(e.target.value)}
                                                            type="text"
                                                            placeholder="Redigera meddelande"
                                                        />

                                                        <div className="send-button">
                                                            <button className="edit-button" onClick={ () => sendNewMessage()}>
                                                                <FontAwesomeIcon color="white" icon={faPaperPlane} size="2xl"/>
                                                            </button>
                                                        </div>
                                                        
                                                        <div className="send-button">
                                                            <button onClick={ () => setShowInput(false)}>
                                                                <FontAwesomeIcon color="white" icon={faXmark} size="2xl"/>
                                                            </button>
                                                        </div>

                                                    </div>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="left-main">
                                        <div className="left-convo-look">
                                            <div className="left-convo-message">
                                                {channel.message}
                                            </div>

                                            <div>
                                                {channel.userId} {hours}:
                                                {minutes}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                {errorMessage && (
                    <div className="error-message">
                        <h1>Du behöver vara inloggad för att se innehållet!</h1>
                    </div>
                )}
            </div>

            {errorMessage ? null : (
                <div className="chat-input">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        type="text"
                        placeholder="Send a message"
                    />

                    <div className="send-button">
                        <button onClick={sendMessageToChannel}>
                            <FontAwesomeIcon
                                color="white"
                                icon={faPaperPlane}
                                size="2xl"
                            />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
