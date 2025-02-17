
import Courses from "../components/Courses"
import Experiences from "../components/Experiences"
import Intro from "../components/Intro"
import Projects from "../components/Projects"
import SayHello from "../components/SayHello"
import SideBar from "../components/SideBar"
import About from "./About"


const Home = () => {
 
  return (
    <div>
        <Intro/>
        <About/>
        <Experiences/>
        <Projects/>
        <Courses/>
        <SayHello/>
        <SideBar/>
    </div>
  )
}

export default Home