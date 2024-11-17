import Features from "./features/features";
// importar el home.scss? para que si esta vacio
import "./home.scss";
import Main from "./main/main";
import OtherFeatures from "./otherFeatures/otherFeatures";
import TestCalendar from "./testCalendar/testCalendar";

const Home = () => {
    return (
        <>
            <Main />
            <Features />
            <OtherFeatures />
        </>
    )
}

export default Home;