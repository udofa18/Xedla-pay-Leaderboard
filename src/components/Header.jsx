
import headerimg from "/images/headerimg.jpg"
import icon from "/images/icon.png"


 function Header(){

    return(

        <div className="w-full relative ">
            <img
             className="h-40 w-screen  object-cover object-center shadow-md shadow-blue-gray-900/50"
            src={headerimg}></img>
            <div className="absolute top-0 w-full h-full p-10 flex justify-center bg-purple-900/50">
                {/* <img src="https://www.xedla.com/_next/image?url=%2Fimg%2Fbrand%2FXedla%20Logo.png&w=3840&q=75"alt="logo"className="w-20"></img> */}
               <div className="">
               <img src={icon} width={110}></img>

               </div>
               <div className="m-auto">
                 <h1 className="text-white text-center text-lg">Xedla pay</h1>
                <h1 className="text-white text-center">Referral Dashboard</h1>

               </div>
               
            </div>
        </div>
    )


}
export default Header
