import { Link } from "react-router-dom";
import TestCard from "../../components/ui/TestCard";

const Tests = () => {
    return ( 
        <>
            <h1>Online tests section</h1>
            <Link to="/create-quiz"><button className="btn">Create Quiz</button></Link>
            <TestCard></TestCard>
        </>
     );
}
 
export default Tests;