import { useEffect } from "react"

const useTitle = (title) => {

    useEffect(() => {
        if (title) {  
            document.title = `Santa's Workshop | ${title}` 
        }
    }, [title])
}

export default useTitle