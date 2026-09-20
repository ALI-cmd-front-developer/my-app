import { useState } from 'react'
import './App.css'
  function Popup(props){
        return (
        <div className="overlay" onClick={props.onClose}>
            <span className={props.isSuccess == true ? "popup-success" : "popup-error"} onClick={e => e.stopPropagation()}>{props.message}</span>
        </div>
    )
   }
 function App(){
//==================================================
  const [user,setUser] = useState ({
    name : "" ,
    number : "",
    age : "",
    isEmploye : false,
    salary : "",
  })
//==================================================
const [showPopup , setShowPopup] = useState ({
    show : false,
    message :"",
    isSuccess: false,
  })
//functions =========================================
 function handleChange (e) {
    setUser ({...user, [e.target.name] : e.target.value})
 }
 function handleSubmit (e){
    e.preventDefault();
  if (((user.number).length) < 10 || ((user.number).length) > 12){
    setShowPopup({show:true , message :"the phone number must be 10-12 length",isSuccess:false});
    return;
}
    else if (Number(user.age) < 18 || Number(user.age) > 100){
        setShowPopup({show: true , message: "the age you enterd is incorrect",isSuccess:false});
        return;
    }else {
        setShowPopup ({show : true , message :"Loan sent sucessfully",isSuccess:true})
    }
}
 function isFormFilled() {
    const values = Object.values(user);
    return values.every(value => value !== "");
}
 //=============================================================
    return (
    <>
    {showPopup.show && (
        <Popup isSuccess = {showPopup.isSuccess} message= {showPopup.message} onClose = {() => {
            setShowPopup({ ...showPopup, show: false})}}/>
    )}
    <h1>Requesting a Loan</h1>
    <form onSubmit={handleSubmit}>
        <div className="container">
        <label htmlFor="name">Name: </label>
    <input type="text" name="name" id="name"  value={user.name} onChange={handleChange}/>
    </div>
    <div className="container">
        <label htmlFor="phone-number">Phone Number:</label>
    <input type="number" name="number" id="phone-number" min={0} step={1} value={user.number} onChange={handleChange}/>
    </div>
    <div className="container">
        <label htmlFor="age">Age: </label>
    <input type="number" name="age" id="age" min={0} step={1} value={user.age} onChange={handleChange}/>
    </div>
    <div className="con">
        <label htmlFor="check">Are You an Employ?: </label>
    <input type="checkbox" name="isEmploye" id="check" checked={user.isEmploye} onChange={(e)=> setUser({...user , [e.target.name]: (e.target.checked)})} />
    </div>

    <div className="con2">
        <label htmlFor="salary">Salary: </label>
    <select name="salary" id="salary" value={user.salary} onChange={handleChange}>
        <option value={""}>-</option>
        <option value="500">500$</option>
        <option value="1000">1000$</option>
        <option value="2000">2000$</option>
    </select>
    </div>
    <button type="submit" disabled={!isFormFilled()}>Submit</button>
    </form>
    </>
 )
 }
export default App;
