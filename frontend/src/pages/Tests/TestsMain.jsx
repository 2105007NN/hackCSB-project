import { Link } from "react-router-dom";
import Banner from "./Banner";
import Tests from "./Tests";

const TestsMain = () => {
    return ( 
        <>
            <Banner></Banner>
            <Link to="/create-quiz"><button className="btn">Create Quiz</button></Link>
            <Tests></Tests>
        </>
     );
}
 
export default TestsMain;