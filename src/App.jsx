
import './App.css'
import FormtoSheet from './Components/FormtoSheet'
import Glogo from "../src/assets/gitam-logo.svg"


function App() {
 
  return (
   
    <>
        <div className=" w-full  bg-[#007367] flex flex-row justify-left px-4 py-4 ">
            <img src={Glogo} alt="gitam_logo" className="px-4"/>
        </div>
    <FormtoSheet/>
    </>
  )
}

export default App
