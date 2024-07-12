import { useEffect } from "react"

const useTitle = title =>{
    useEffect(()=>{
        document.title = `${title} - Edukate`
    }, [title])
}

export default useTitle;