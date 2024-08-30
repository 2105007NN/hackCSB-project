import NavBar from "./NavBar";
import LeftBar from './LeftBar'
import RightBar from "./RightBar";
import Home from "./Home";
import { SearchProvider } from "./SearchContext";
import { BlogProvider } from "./BlogContext";
const Forum = () => {
    return (
        <BlogProvider>
            <SearchProvider>
                <div className="flex flex-col grow-1 w- bg-black">
                    <NavBar></NavBar>
                    <Home></Home>
                </div>
            </SearchProvider>
        </BlogProvider>
    );
}

export default Forum;