import Header from './components/header';
import HeaderTop from './components/headerTop'
import ConvertToken from "./components/convertToken";
import Footer from './components/footer';
// import TokenList from "./components/tokenlist";
// import ImportantDetails from "./components/importantDetails";
import { SubstrateContextProvider} from './api/contracts';

export default  function App() {
  return (
      <SubstrateContextProvider>
        <div className="App">
            <HeaderTop />
            <Header />
            <ConvertToken />
            {/*<TokenList />*/}
            {/*<ImportantDetails />*/}
            <Footer />
        </div>
      </SubstrateContextProvider>
  );
}

