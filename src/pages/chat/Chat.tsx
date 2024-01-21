import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { removeTab, setactiveTabId } from "../../store/reducers/chatReducer";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import "./Chat.css";
import ChatWindow from "../../components/ChatWindow/ChatWindow";
import { TextField } from "@fluentui/react";
import Form from "react-bootstrap/Form";

interface Props {}

function Chat({}: Props) {
  let isClosed = false;
  const [show, setShow] = useState(false);
  const [saveChatTitle, setSaveChatTitle] = useState("");
  const [chat, setChat] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const saveChat = () => {
    dispatch(removeTab({ ...chat, title: saveChatTitle }));
    isClosed = true;
    setShow(false);
  };

  const { tabs, activeTabId } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const closeTab = (tab: any) => {
    console.log("Closed -- ", tab);
    if (tab.isSaved) {
      handleShow();
      setSaveChatTitle(tab.title);
      setChat(tab);
    } else {
      dispatch(removeTab(tab));
      isClosed = true;
    }
  };

  const onChange = (e: any) => {
    setSaveChatTitle(e.target.value);
  };

  return (
    <div className="chat">
      <Tabs
        id="controlled-tab-example"
        activeKey={activeTabId}
        onSelect={(k: any) => {
          if (!isClosed) {
            dispatch(setactiveTabId(k));
          }
        }}
        className="mb-3"
      >
        {tabs.length > 0 &&
          tabs.map((tab) => (
            <Tab
              className="tab-width"
              eventKey={tab.id}
              title={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <h6 style={{ marginTop: "5px", marginRight: "5px" }}>
                    <span>{tab.title}</span>{" "}
                    {tab.isSaved && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="8"
                        fill="currentColor"
                        style={{marginBottom:"2px"}}
                        className="bi bi-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <circle cx="8" cy="8" r="8" />
                      </svg>
                    )}
                  </h6>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-x"
                    viewBox="0 0 16 16"
                    onClick={() => closeTab(tab)}
                  >
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                  </svg>
                </div>
              }
            >
              <ChatWindow />
            </Tab>
          ))}
      </Tabs>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="save chat"
            placeholder="save chat"
            onChange={onChange}
            value={saveChatTitle}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              dispatch(removeTab({ ...chat, isSaved: false }));
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={saveChat}>
            Save Chat
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Chat;
