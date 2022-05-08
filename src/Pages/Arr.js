import { useEffect } from "react"

export default function Arr(props){

    useEffect(()=>{
        console.log("Arr changed");

    },[props.arr])
    return(

        <div style={{display:"flex",flexDirection:'column',justifyContent:"center",alignContent:"center"}}>
            <div style={{display:"flex",width:"50%",margin:'auto',border:'2px solid blue',justifyContent:"center"}} >
                {props.arr?.map((a,index)=>(
                <div key={index}>
                    <h1 style={{height:`${(500/props.maxElem)*a}px`,border:'2px solid blue',margin:'5px',width:'30px',backgroundColor:'blue'}} ></h1>
                </div>
                ))}
            </div>
            <button onClick={props.bubbleSort} style={{width:'100px',margin:'auto',marginTop:'50px'}}>Sort</button>
        </div>

    )
}