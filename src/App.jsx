import { Route, Routes } from "react-router-dom";
import { route } from "./Router/Routes";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";

function App() {
  return (
    <>
      <Header />
      <NavBar />
      <Routes>
        {route.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}

export default App;
