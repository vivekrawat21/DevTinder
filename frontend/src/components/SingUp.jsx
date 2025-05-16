import AuthCard from "./AuthCard"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const SignUp = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if(user?.user) {
      navigate("/profile")
    }
   }, [])
  return (
   <div className="flex justify-center items-center">
    <AuthCard isSignUp={true}/>
   </div>
  )
}
export default SignUp;