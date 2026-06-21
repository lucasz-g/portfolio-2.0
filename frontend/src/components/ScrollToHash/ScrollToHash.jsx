import { useEffect } from "react"
import { useLocation } from "react-router"

export const ScrollToHash = () => {
    const { pathname, hash } = useLocation()

    useEffect(() => {
        if (!hash) {
            window.scrollTo({ top: 0, behavior: "smooth" })
            return
        }

        const target = document.querySelector(hash)

        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" })
        }
    }, [pathname, hash])

    return null
}
