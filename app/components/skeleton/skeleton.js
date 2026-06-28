import React from 'react'

export const Skeleton1 = ({className,children,style}) => {
  return (
    <div className={`animate-pulse text-black border-amber-100 bg-neutral-300 ${className}`} style={{...style}}>{children}</div>
  )
}

export const Skeleton2 = ({className,children,style}) => {
  return (
    <div className={`animate-[blink_2s_linear_infinite] text-black border-amber-100 bg-[linear-gradient(to_left,rgba(255,255,255,0.1),rgba(0,0,0,0.4))]  ${className}`} style={{...style}}>{children}</div>
  )
}

export const Skeleton3 = ({className,children,style}) => {
  return (
    <div className="parnet">
    <div className={`s3 animate-[slide_2s_linear_infinite] text-black border-amber-100 bg-neutral-300 ${className}`} style={{...style}}>{children}</div>
    </div>
  )
}

export const Skeleton4 = ({className,children,style}) => {
  return (
    <div className={`animate-[loader_2s_ease-in-out_infinite] text-black border-amber-100 bg-neutral-300 ${className}`} style={{...style}}>{children}</div>
  )
}


