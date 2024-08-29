
import useTitle from "../../hooks/useTitle";
import Blogs from "./Blogs";
import WriteBlogs from "./WriteBlogs";

const Forum = () => {
    useTitle('Blogs');
    return ( 
        <div className="p-5 m-auto">
            <WriteBlogs></WriteBlogs>
            <Blogs></Blogs>
        </div>
     );
}
 
export default Forum;
