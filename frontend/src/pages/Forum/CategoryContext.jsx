import { createContext, useState } from "react";

const CategoryContext = createContext(''); 


const CategoryProvider = ({children}) =>{
    const [category, setCategory] = useState('')
    return(
        <CategoryContext.Provider value={{ category, setCategory }}>
            {children}
        </CategoryContext.Provider>
    )
}
export  {CategoryContext,CategoryProvider};