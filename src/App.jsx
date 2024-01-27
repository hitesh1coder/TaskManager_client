import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";

import AuthContextProvider from "./Context/userContext";

function App() {
  return (
    <AuthContextProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
