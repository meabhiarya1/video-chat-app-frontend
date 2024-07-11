import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { SocketProvider } from "./providers/Socket";
import { PeerProvider } from "./providers/Peer";
import Room from "./pages/Room";

function App() {
  return (
    <div>
      <SocketProvider>
        <PeerProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomID" element={<Room />} />
          </Routes>
        </PeerProvider>
      </SocketProvider>
    </div>
  );
}

export default App;
