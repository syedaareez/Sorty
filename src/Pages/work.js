import { useEffect,useState } from "react";
import Select from 'react-select';
// import Arr from './Arr';

export default function Work(){

  const [ arr,setArr] = useState([55,44,77,66,33,11,88,99,22]);
  const [maxElem,setMaxElem]=useState(0);

  const [selectedOption,setSelectedOption]=useState({});

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(()=>{
    setMaxElem(Math.max(...arr));
  },[]);

  async function bubbleSort(){
   
    var check=0;
    for(var i=0;i<arr.length;i++){
      var max=-1;
      
      for(var j=0;j<arr.length-i-1;j++){

        var block=document.querySelector(`.div${arr[j]}`);
        var block2=document.querySelector(`.div${arr[j+1]}`);

        if(arr[j]>max){

          block.style.backgroundColor="red";
          max=arr[j];

        }

        if(arr[j]>arr[j+1]){

          check=arr[j];
          arr[j]=arr[j+1];
          arr[j+1]=check;
          block.style.backgroundColor="red";
          await sleep(50);
          block.style.backgroundColor="blue";
          block2.style.backgroundColor="red";
        
        }else{

          block.style.backgroundColor="blue";
          
          block2.style.backgroundColor="red";

        }
        setArr([...arr]);
        await sleep(50);
        block.style.backgroundColor="blue";
        block2.style.backgroundColor="blue";
      }
      
    }
    // var neww=[...arr];
    // for(var i=0;i<arr.length;i++){
    //   neww[i]=neww[i]-i;
    // }
    
    // setArr(neww);
    // console.log("sort",arr);
  }

  async function insertion_Sort(){
    
    for (let i = 1; i < arr.length; i++) {
        let j=i;

        var block2=document.querySelector(`.div${arr[i]}`);
        block2.style.backgroundColor="red";

        while(j>0 && arr[j]<arr[j-1]){
          await sleep(10);
          block2.style.backgroundColor="blue";
          var block=document.querySelector(`.div${arr[j-1]}`);
          block.style.backgroundColor="red";

          var temp=arr[j];
          arr[j]=arr[j-1];
          arr[j-1]=temp;

          j--;
          
          setArr([...arr]);

          await sleep(60);
          block.style.backgroundColor="blue";
        }

        block2.style.backgroundColor="blue";
  
    }
    
  }



  function refresh(){
    
    setArr([55,44,77,66,33,11,88,99,22]);

  }

  const options = [
    { value: 'bubbleSort', label: 'Bubble Sort', onClick : bubbleSort },
    { value: 'insertion_Sort', label: 'Insertion Sort' , onClick : insertion_Sort },
  ]

  return(
    <>

    <div style={{display:"flex",flexDirection:'column',justifyContent:"center",alignContent:"center"}}>
      <div style={{display:"flex",width:"50%",margin:'auto',border:'2px solid blue',justifyContent:"center"}} >
          {arr.map((a,index)=>(
          <div key={index}>
              <h1 className={`div${a}`} style={{height:`${(500/maxElem)*a}px`,border:'2px solid blue',margin:'5px',width:'30px',backgroundColor:'blue'}} ></h1>
          </div>
          ))}
      </div>
      <div style={{width:'300px',margin:'auto',marginTop:'50px'}}>
      <Select options={options} onChange={(e)=>setSelectedOption(e)}/>
      </div>
      {selectedOption.length!==0 &&
        (<>
        <button 
          onClick={selectedOption.onClick}
          style={{width:'100px',margin:'auto',marginTop:'50px'}}
        >Sort</button>
        </>)
      }
      <button onClick={refresh} style={{width:'100px',margin:'auto',marginTop:'50px'}}>Refresh</button>
    </div>
      
    </>
    
  )
};