import { useEffect } from "react"

const useTitle = (title) => {

    useEffect(() => {
        document.title = `Santa's Workshop | ${title}` 
    }, [title])
}

export default useTitle