'use client'
import Main from './components/Main';
import { Provider } from "react-redux";
import store from '../shared/store';
import '../shared/styles/main.css';
import Header from "./components/Header";
import { AdobeFonts } from 'react-adobe-fonts';

interface Props{
}

const App : React.FC<Props> = (props = {}) => {
    return(<Provider store={store}>
        <AdobeFonts kitId="ylo6zft" />
        <div id={"app-container"}>
            <Header/>
            <Main/>
        </div>
    </Provider>);
    // return(<Header/>);
}

export default App;
