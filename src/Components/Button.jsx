import { motion } from "motion/react"
import { useState } from "react"



const Button = ({buttonLeft, buttonRight, isButtonLeftClicked, setIsButtonLeftClicked, setTvActive}) => { 
  const widthLeft = 90 + (buttonLeft.length - 5) * 9
  const widthRight = 90 + (buttonRight.length - 5) * 9

  return (
    <div className='border-1 px-5 rounded-full flex gap-10 relative font-semibold'>
        <motion.div
            initial={{ width: `${widthLeft}px`, left: 0 }}
            animate={{
                left: isButtonLeftClicked ? 0 : `calc(100% - ${widthRight}px)`,
                width: isButtonLeftClicked ? `${widthLeft}px` : `${widthRight}px`,
            }}
            className="bg-primary rounded-full absolute top-0 h-full z-10"
        />
        <button onClick={()=>{
            setIsButtonLeftClicked(true)
            setTvActive(false);
        }} className='py-1 z-20'>
        <div className={`${isButtonLeftClicked?'bg-gradient-to-r from-emerald-200 relative to-emerald-400 bg-clip-text text-transparent':'text-black'} text-lg font-semibold`}>
            <p>{buttonLeft}</p>
        </div>
        <p>{isButtonLeftClicked}</p>
        </button>
        <button onClick={
            ()=>{
                setIsButtonLeftClicked(false)
                setTvActive(true);
            }
            } className='py-1 z-20'>
        <div className={`${isButtonLeftClicked?'text-black':'bg-gradient-to-r relative from-emerald-200 to-emerald-400 bg-clip-text text-transparent'} text-lg font-semibold`}>
            <p>{buttonRight}</p>
        </div>
        </button>
    </div>
  )
}

export default Button