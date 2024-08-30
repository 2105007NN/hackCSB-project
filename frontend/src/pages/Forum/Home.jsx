import React from 'react'
import NavBar from './NavBar'
import LeftBar from './LeftBar'
import AskShare from './AskShare'
import Posts from './Posts'
import {CategoryProvider} from './CategoryContext.jsx'
import { useState,useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider.jsx'

const Home = () => {
    const {user} = useContext(AuthContext)
    const [category,setCategory] = useState('');
    return (
       <CategoryProvider>
            <div>
                <div className='flex justify-center bg-gray-900'>
                    <LeftBar></LeftBar>
                    {/* {
                        user &&
                        <AskShare></AskShare>
                    } */}
                    <Posts></Posts>
                </div>
            </div>
        </CategoryProvider>
    )
}

export default Home