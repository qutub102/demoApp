import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PageLayout from "./pages/pageLayout/PageLayout";
import Chat from "./pages/chat/Chat";
import SavedChat from "./pages/savedChat/SavedChat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Chat />} />
          <Route path="/savedchats" element={<SavedChat />} />
          <Route path="*" element={<h1>404</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
