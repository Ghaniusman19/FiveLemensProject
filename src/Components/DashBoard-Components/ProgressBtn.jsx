import React from 'react'

const ProgressBtn = ( {text , icon,backgroundColor }  ) => {
  return (
    <div className='w-full py-5 px-2 rounded-md relative flex gap-3 mb-2 ' style={
        {backgroundColor : backgroundColor}
    }>  
     <div className="img absolute right-0 top-[50%] translate-x-[50%] translate-y-[-50%]"><img src="src/assets/play-icon-1.png" alt="" /></div>
     <div className="icon"> { icon }</div> 
     <div className="text"> {text} </div>
    </div>
  )
}

export default ProgressBtn