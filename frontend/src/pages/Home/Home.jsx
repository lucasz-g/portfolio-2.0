import { About } from "../../components/about/About"
import { Presentation } from "../../components/presentation/Presentation"
import { Stacks } from "../../components/stacks/Stacks"
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
