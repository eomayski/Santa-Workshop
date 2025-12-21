import useTitle from "../title/useTitle.jsx";
import Hero from "./Hero.jsx";

export default function Home () {
    useTitle('Home')
    return (
        <>
        <Hero/>
        </>
    );
}