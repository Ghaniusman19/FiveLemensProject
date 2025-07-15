import { Route, Routes } from "react-router-dom";
import { route } from "./Router/Routes";
import Header from "./Components/Header";
import NavBar from "./Components/NavBar";
import { useLocation } from "react-router-dom";
function App() {
  const location = useLocation();
  const hideHeaderNav =
    ["/", "/signup"].includes(location.pathname) ||
    location.pathname === "/*" ||
    location.pathname === "*";
  return (
    <>
      {!hideHeaderNav && <Header />}
      {!hideHeaderNav && <NavBar />}
      <Routes>
        {route.map(({ path, element }, i) => (
          <Route key={i} path={path} element={element} />
        ))}
      </Routes>
    </>
  );
}
export default App;
