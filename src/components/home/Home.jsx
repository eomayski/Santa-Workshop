import useTitle from "../../hooks/useTitle.js";
import Hero from "./Hero.jsx";

export default function Home () {
    useTitle('Home')
    return (
        <>
        <Hero/>
        </>
    );
}