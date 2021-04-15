import Header from "./components/Header";
import Music from "./components/Music";
import { Container } from "react-bootstrap";
import "./App.css";

const App = () => {
  return (
    <div className="">
      <Header />
      <Container fluid>
        <Music />
      </Container>
    </div>
  );
};

export default App;
