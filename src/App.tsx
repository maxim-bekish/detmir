import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Main } from "./components/Main/Main";

export const App: React.FC=()=> {
  return (
    <>
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </>
  );
}

export default App;
