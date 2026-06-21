import { About } from "../../components/About/About"
import { Presentation } from "../../components/Presentation/Presentation"
import { Stacks } from "../../components/Stacks/Stacks"
import "./Home.css"

export const Home = () => {
    return (
        <>
            <Presentation />
            <About />
            <Stacks />
        </>
    )
}