import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { SocketProvider } from "./providers/Socket";

function App() {
  return (
    <div>
      <SocketProvider>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </SocketProvider>
    </div>
  );
}

export default App;
