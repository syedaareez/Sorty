import { useEffect,useState } from "react";
// import Arr from './Arr';

export default function Work(){

  const [ arr,setArr] = useState([55,44,77,66,33,11,88,99,22,55,44,77,66,33,11,88,99,22,55,44,77,66,33,11,88,99,22]);
  const [maxElem,setMaxElem]=useState(0);
  const [allElemLength,setAllElemLength]=useState(0);
  const [maxWidth,setMaxWidth]=useState(0);
  const [maxHeight,setMaxHeight]=useState(0);

  const [started,setStarted]=useState(false);

  const [selectedOption,setSelectedOption]=useState("");

  const [whichFunc,setWhichFunc]=useState();

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

  const ArraytoChange=[55,44,77,66,33,11,88,99,22,55,44,77,66,33,11,88,99,22,55,44,77,66,33,11,88,99,22];

  async function bubbleSort(){

    setStarted(true);
    const test_Arr=[...ArraytoChange];
   
    var check=0;
    for(var i=0;i<test_Arr.length;i++){
      var max=-1;
      for(var j=0;j<test_Arr.length-i-1;j++){
        var block=document.querySelector(`.div${j}`);
        var block2=document.querySelector(`.div${j+1}`);

        if(test_Arr[j]>max){
          max=test_Arr[j];
        }

        if(test_Arr[j]>test_Arr[j+1]){

          block.style.backgroundColor="red";
          check=test_Arr[j];
          test_Arr[j]=test_Arr[j+1];
          test_Arr[j+1]=check;
          
          await sleep(10);
        
        }else{
          
          block2.style.backgroundColor="red";

        }
        setArr([...test_Arr]);
        await sleep(20);
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

    const test_Arr=[...ArraytoChange];
    
    for (let i = 1; i < test_Arr.length; i++) {
        let j=i;

        var block2=document.querySelector(`.div${i}`);
        block2.style.backgroundColor="red";

        while(j>0 && test_Arr[j]<test_Arr[j-1]){
          await sleep(10);
          block2.style.backgroundColor="blue";
          var block=document.querySelector(`.div${j-1}`);
          block.style.backgroundColor="red";

          var temp=test_Arr[j];
          test_Arr[j]=test_Arr[j-1];
          test_Arr[j-1]=temp;

          j--;
          
          setArr([...test_Arr]);

          await sleep(30);
          block.style.backgroundColor="blue";
        }

        block2.style.backgroundColor="blue";
  
    }

    setStarted(false);
    
  }



  function refresh(){
    
    setArr([...ArraytoChange]);

  }

  const [showDropDown,setShowDropDown]=useState(false);

  function changeSelectOption(str){
    setSelectedOption(str);
    switch(str){
      case "Bubble Sort":
        setWhichFunc(()=>bubbleSort);
        break;
      case "Insertion Sort":
        setWhichFunc(()=>insertion_Sort);
        break;
      default:
        console.log("default")
    }
  }

  return(
    <>

    <div className="grid grid-rows-[80px_minmax(50px,auto)_80px] h-screen">
      <div  className="flex justify-center items-center gap-8 border-b-4 h-[100%]" >
        <div tabIndex={0} className="md:w-[300px] md:h-auto w-full h-[100%] " onBlur={()=>setShowDropDown(false)} >
          <div
            className="flex w-full border-2 md:p-2 outline-none cursor-pointer h-[100%] justify-center items-center md:text-xl text-2xl"
            onClick={()=>setShowDropDown(!showDropDown)} 
            >{selectedOption?(selectedOption):(" Select an algorithm ")}</div>
          {showDropDown&& !started &&(
            <div className="md:w-[300px] w-full absolute flex flex-col border-2 bg-white md:text-xl text-2xl">
              <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=>{changeSelectOption("Bubble Sort"); setShowDropDown(false); refresh();}}>Bubble Sort</div>
              <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={()=>{changeSelectOption("Insertion Sort"); setShowDropDown(false); refresh();}}>Insertion Sort</div>
            </div>
          )}
          
        </div>
      </div>


      <div className="flex items-center justify-center max-w-screen overflow-hidden">
        <div className="min-w-[85%]  md:min-w-[85%] md:px-2 md:mt-2 center-div h-full gap-1 flex md:gap-2 max-w-screen justify-center items-end px-8" >
            {arr.map((a,index)=>(
            <div key={index}>
                <div className={`div${index}`} style={{height:`${(maxHeight/maxElem)*a}px`,width:`${maxWidth/(allElemLength+1)}px`,backgroundColor:'blue'}} ></div>
            </div>
            ))}
        </div>
      </div>


      <div className="flex md:justify-center md:items-center md:border-t-4 border-t-2 md:text-xl text-3xl gap-2 md:gap-0">
        
        {selectedOption&& !started &&
            (<>
            <button 
              onClick={()=>whichFunc()}
              className="border-2 p-2 hover:border-blue-500 w-[50%] h-[100%]"
            >Sort</button>

            
            <button onClick={()=>refresh()} className="border-2 p-2 hover:border-blue-500 w-[50%] h-[100%]">Refresh</button>
            
            </>)
        }
        
      </div>
      
    </div>
      
    </>
    
  )
};