import { useEffect,useState } from "react";
import Select from 'react-select';
// import Arr from './Arr';

export default function Work(){

  const [ arr,setArr] = useState([55,44,77,66,33,11,88,99,22,55,44,77,66,33,11,88,99,22,55,44,77,66,33,11,88,99,22]);
  const [maxElem,setMaxElem]=useState(0);
  const [allElemLength,setAllElemLength]=useState(0);
  const [maxWidth,setMaxWidth]=useState(0);
  const [maxHeight,setMaxHeight]=useState(0);
  const [started,setStarted]=useState(false);

  const [selectedOption,setSelectedOption]=useState({});

  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  useEffect(()=>{
    setMaxElem(Math.max(...arr));
    setAllElemLength(arr.length);
    handleResize();
    window.addEventListener("resize", handleResize, false);
  },[]);

  function handleResize(){
    var block=document.querySelector(`.center-div`);
    setMaxWidth(block?.clientWidth);
    setMaxHeight(block?.clientHeight);
  }

  async function bubbleSort(){
    
    setStarted(true);

    const test_Arr=[...arr];
   
    var check=0;
    for(var i=0;i<test_Arr.length;i++){
      var max=-1;
      
      for(var j=0;j<test_Arr.length-i-1;j++){

        var block=document.querySelector(`.div${test_Arr[j]}`);
        var block2=document.querySelector(`.div${test_Arr[j+1]}`);

        if(test_Arr[j]>max){

          block.style.backgroundColor="red";
          max=test_Arr[j];

        }

        if(test_Arr[j]>test_Arr[j+1]){

          check=test_Arr[j];
          test_Arr[j]=test_Arr[j+1];
          test_Arr[j+1]=check;
          block.style.backgroundColor="red";
          await sleep(10);
          block.style.backgroundColor="blue";
          block2.style.backgroundColor="red";
        
        }else{

          block.style.backgroundColor="blue";
          
          block2.style.backgroundColor="red";

        }
        setArr([...test_Arr]);
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

    setStarted(false);
  }

  async function insertion_Sort(){

    setStarted(true);

    const test_Arr=[...arr];
    
    for (let i = 1; i < test_Arr.length; i++) {
        let j=i;

        var block2=document.querySelector(`.div${test_Arr[i]}`);
        block2.style.backgroundColor="red";

        while(j>0 && test_Arr[j]<test_Arr[j-1]){
          await sleep(10);
          block2.style.backgroundColor="blue";
          var block=document.querySelector(`.div${test_Arr[j-1]}`);
          block.style.backgroundColor="red";

          var temp=test_Arr[j];
          test_Arr[j]=test_Arr[j-1];
          test_Arr[j-1]=temp;

          j--;
          
          setArr([...test_Arr]);

          await sleep(60);
          block.style.backgroundColor="blue";
        }

        block2.style.backgroundColor="blue";
  
    }

    setStarted(false);
    
  }



  function refresh(){
    
    setArr([55,44,77,66,33,11,88,99,22,55,44,77,66,33,11,88,99,22,55,44,77,66,33,11,88,99,22]);

  }

  const options = [
    { value: 'bubbleSort', label: 'Bubble Sort', onclick : bubbleSort },
    { value: 'insertion_Sort', label: 'Insertion Sort' , onclick : insertion_Sort },
  ]

  return(
    <>

    <div className="grid grid-rows-[80px_minmax(50px,auto)_80px] h-screen">
      <div className="flex justify-center items-center gap-8 border-b-4">
        <div style={{width:'300px'}}>
          <Select className="text-left" options={options} onChange={(e)=>setSelectedOption(e)} isReadOnly={true}/>
        </div>
      </div>


      <div className="flex items-center justify-center max-w-screen overflow-hidden">
        <div className="min-w-[85%] md:min-w-[85%] md:px-2 md:mt-2 center-div h-full gap-1 flex md:gap-2 max-w-screen justify-center items-end" >
            {arr.map((a,index)=>(
            <div key={index}>
                <div className={`div${a}`} style={{height:`${(maxHeight/maxElem)*a}px`,width:`${maxWidth/(allElemLength+1)}px`,backgroundColor:'blue'}} ></div>
            </div>
            ))}
        </div>
      </div>


      <div className="flex justify-center items-center gap-8 border-t-4">
        
        {selectedOption.value && !started &&
            (<>
            <button 
              onClick={selectedOption.onclick}
              style={{width:'100px'}} className="border-2 p-2 hover:border-blue-500"
            >Sort</button>

            <div>
              <button onClick={refresh} style={{width:'100px'}} className="border-2 p-2 hover:border-blue-500">Refresh</button>
            </div>
            </>)
          }
          {started && (
              <>
              <button className="w-[100px] p-2 border-2 hover:border-blue-500">Stop</button>
              </>
            )}
        
      </div>
      
    </div>
      
    </>
    
  )
};