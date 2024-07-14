import { Link } from "react-router-dom";
import TestCard from "../../components/ui/TestCard";
import Banner from "./Banner";

const Tests = () => {
    return ( 
        <>
            <Banner></Banner>
            <Link to="/create-quiz"><button className="btn">Create Quiz</button></Link>
            <TestCard></TestCard>
        </>
     );
}
 
export default Tests;