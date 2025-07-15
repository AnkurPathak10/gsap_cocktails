import gsap from "gsap"
import { ScrollTrigger ,SplitText } from "gsap/all"

gsap.registerPlugin(ScrollTrigger, SplitText)

const page = () => {
  return (
    <div className="flex-center ">page</div>
  )
}

export default page