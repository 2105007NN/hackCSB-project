import { NavLink, useNavigate } from 'react-router-dom'
import lens from './assets/lens.png'
import PostPopup from './PostPopup'
import { useContext, useState } from 'react'
import { SearchContext } from './SearchContext'
import { AuthContext } from '../../context/AuthProvider'
import { CiSearch } from "react-icons/ci";




const NavBar = () => {
    // const [post, setPost] = useState(false);
    const { search, setSearch } = useContext(SearchContext);
    const { user } = useContext(AuthContext);
    // console.log(search)
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => {
        setIsVisible(!isVisible);
    }


    const goToLogin = () => {
        const navigate = useNavigate();
        navigate('/auth/login');
    }
    return (

        <div className="flex pl-5  shadow-md h-auto w-screen bg-gray-900 justify-between border-zinc-950">
            {
                !user && <div>
                    <p className='text-semibold'>Please
                        <span className='hover:bg-sky-700' onClick={goToLogin}> Login </span>
                        or signup for making post or comments!!</p>
                </div>
            }
            <div className="flex  border-spacing-1 h-full w-72 p-1 cursor-pointer bg-gray-700 m-2 border-1 rounded-full">
                {/* <img src={lens} className="w-5 h-5 mt-4 ml-3 text-white bg-white" /> */}
                <CiSearch className='mt-1' size={20} />
                <input onChange={(e) => setSearch(e.target.value)} placeholder="Search What You Want!!" className="ml-2 outline-none bg-gray-700 text-white text-lg" value={search} />
            </div>
            <div className='border px-20 bg-gradient-to-r from-primary via-secondary to-accent py-2 rounded-lg shadow-lg'>
                <h1 className="text-5xl text-neutral font-bold mb-4">Discuss Openly!!</h1>
            </div>
            {
                user &&
                <h1 onClick={toggle} className="hover:bg-gray-700  text-lg cursor-pointer text-white w-auto px-6 rounded-full bg-gray-800 mx-3  p-1 h-full">Add Question</h1>
            }
            {/* {post && <PostPopup setPost={setPost} />} */}
            <PostPopup
                isVisible={isVisible}
                onClose={toggle}
            ></PostPopup>
        </div>
    )
}

export default NavBar