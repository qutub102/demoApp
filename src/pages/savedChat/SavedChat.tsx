import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNewChat } from "../../store/reducers/chatReducer";
import { useNavigate } from "react-router-dom";

interface Props {}

function SavedChat({}: Props) {
  const navigate = useNavigate();
  const { savedChat } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {savedChat.length > 0 &&
        savedChat.map((chat) => (
          <h1
            style={{ cursor: "pointer" }}
            onClick={() => {
              dispatch(addNewChat(chat));
              navigate("/");
            }}
          >
            {chat.title}
          </h1>
        ))}
    </div>
  );
}

export default SavedChat;
