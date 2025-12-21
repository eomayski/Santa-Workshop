import { useEffect } from "react"

const useTitle = (title) => {

    useEffect(() => {
        document.title = `Santa's Workshop | ${title}` 
    }, [])
}

export default useTitle