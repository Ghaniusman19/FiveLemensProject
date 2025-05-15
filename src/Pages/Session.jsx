import Container from "../Components/Container";
import SessionHeader from "../Components/Session-Components/SessionHeader";
// import { useState } from "react";
// import { useEffect } from "react";
const Session = () => {
  // const [data, setData] = useState(null);
  // useEffect(() => {
  //   fetch("https://fldemo.fivelumenstest.com/api/auth/roles/all")
  //     .then((response) => response.json())
  //     .then((json) => setData(json))
  //     .catch((error) => console.error(error));
  // }, []);
  return (
    <div className="bg-gray-100 ">
      <Container>
        <div className="bg-white rounded-xl shadow-lg">
          <SessionHeader />
        </div>
      </Container>
    </div>
  );
};

export default Session;
