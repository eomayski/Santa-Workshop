import { Route, Routes } from "react-router";
import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import NotFound from "./components/404/NotFound.jsx";
import ToysList from "./components/toys/ToysList.jsx";

const App = () => {

    return (
        // Main Container with Background
        <div className="relative min-h-screen bg-slate-900 overflow-hidden flex justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-[url(/images/background.png)] bg-cover bg-center"
            ></div>
            <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/toys" element={<ToysList />} />

                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;