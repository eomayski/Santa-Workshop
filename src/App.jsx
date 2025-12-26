import { Route, Routes } from "react-router";
import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import NotFound from "./components/404/NotFound.jsx";
import ToysList from "./components/toys/ToysList.jsx";
import ToyDetails from "./components/toys/ToyDetails.jsx";
import OrdersList from "./components/orders/OrdersList.jsx";

const App = () => {

    return (
        // Main Container with Background
        <div className="relative h-screen bg-slate-900 overflow-y-auto flex justify-center">
            {/* Background Image */}
            <div
                className="absolute fixed inset-0 bg-[url(/images/background.png)] bg-cover bg-center"
            ></div>
            <div className="wrapper">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/toys" element={<ToysList />} />
                    <Route path="/toys/:toyId" element={<ToyDetails />} />
                    <Route path="/orders" element={<OrdersList />} />


                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;