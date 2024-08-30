import finance from './assets/finance.jpg'
import health from './assets/health.jpg'
import living from './assets/living.jpg'
import science from './assets/science.jpg'
import fam from './assets/fam.jpg'
import tech from './assets/tech.jpg'
import animals from './assets/animals.jpg'
import { useContext, useState } from 'react'
// import CategoryContext from './CategoryContext'
import { CategoryContext } from './CategoryContext'


const LeftBar = () => {
    // const {category, setCategory} = useContext(CategoryContext); 
    const {category, setCategory} = useContext(CategoryContext)
    // console.log(category)
    return (
        <div className="px-5 pt-5 text-sm  w-1/3 sticky top-0 h-screen bg-gray-900 text-black">
            <div className="flex cursor-pointer border-0 p-2 hover:bg-gray-800 rounded-md" onClick={() => {setCategory('Anxiety'); 

            }}>
                <img src="https://plus.unsplash.com/premium_photo-1689177356594-b988a1cc45ff?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-8 h-8 rounded-full" />
                <h1 className="ml-3 text-white text-lg">Anxiety</h1>
            </div>
            <div className="flex mt-5 cursor-pointer border-0 p-2 hover:bg-gray-800 rounded-md" onClick={() => setCategory('Depression')}>
                <img src="https://images.unsplash.com/photo-1613312328068-c9b6b76c9e8a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-8 h-8 rounded-full" />
                <h1 className="ml-3 text-white text-lg">Depression</h1>
            </div>
            <div className="flex mt-5 cursor-pointer border-0 p-2 hover:bg-gray-800 rounded-md" onClick={() => setCategory('Autism')}>
                <img src="https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-8 h-8 rounded-full" />
                <h1 className="ml-3 text-white text-lg">Autism</h1>
            </div>
            <div className="flex mt-5 cursor-pointer border-0 p-2 hover:bg-gray-800 rounded-md" onClick={() => setCategory('ADHD')}>
                <img src="https://images.unsplash.com/photo-1553465528-5a213ccc0c7b?q=80&w=2596&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-8 h-8 rounded-full" />
                <h1 className="ml-3 text-white text-lg">ADHD</h1>
            </div>
            <div className="flex mt-5 cursor-pointer border-0 p-2 hover:bg-gray-800 rounded-md" onClick={() => setCategory('Schizophrenia')}>
                <img src="https://plus.unsplash.com/premium_photo-1668525428466-a2a500216656?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-8 h-8 rounded-full" />
                <h1 className="ml-3 text-white text-lg">Schizophrenia</h1>
            </div>
            <div className="flex mt-5 cursor-pointer border-0 p-2 hover:bg-gray-800 rounded-md" onClick={() => setCategory('PTSD')}>
                <img src="https://plus.unsplash.com/premium_photo-1664644300751-10933c12285f?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-8 h-8 rounded-full" />
                <h1 className="ml-3 text-white text-lg">PTSD</h1>
            </div>
            <div className="flex mt-5 cursor-pointer border-0 p-2 hover:bg-gray-800 rounded-md" onClick={() => setCategory('Randoms')}>
                <img src="https://images.unsplash.com/photo-1525190750224-ce6c77cd9cfa?q=80&w=2575&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-8 h-8 rounded-full" />
                <h1 className="ml-3 text-white text-lg">Randoms</h1>
            </div>
            <div className="flex mt-5 cursor-pointer border-0 p-2 hover:bg-gray-800 rounded-md" onClick={() => setCategory('')}>
                <img src={living} className="w-8 h-8 rounded-full" />
                <h1 className="ml-3 text-white text-lg">All Posts!!</h1>
            </div>
            {/* <hr className="mt-3" />
            <h1 className="mt-3 text-gray-400 text-sm">About . Careers . </h1>
            <h1 className="text-gray-400 text-sm">Terms . Policies .</h1>
            <h1 className="text-gray-400 text-sm">Acceptable use</h1> */}
        </div>
    )
}

export default LeftBar