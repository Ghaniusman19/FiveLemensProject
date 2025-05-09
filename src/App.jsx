import Header from "./Components/Header";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import { route } from "./Router/Routes";

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
