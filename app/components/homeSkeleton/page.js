import React from 'react'
import { Skeleton1, Skeleton2, Skeleton4 } from '../skeleton/skeleton'

const page = () => {
  return (
    <>
      <div className="conatainer text-amber-50">
        <div className='h-20 border-2 border-[#352f2f] bg-[#616161] sticky top-0 flex justify-around items-center'>
          <Skeleton1 className='border w-20 h-5 ' />
          <div className='w-30 h-10  flex flex-col justify-around'>
            <Skeleton1 className='w-full h-2 ' />
            <Skeleton1 className='w-full h-2 ' />
            <Skeleton1 className='w-full h-2 ' />
          </div>
          <Skeleton1 className='border w-15 h-15 rounded-full' />
        </div>
        <main className='h-[calc(100dvh-82px)] sm:flex sm:flex-row overflow-y-auto Scrollbar'>
          <div className="problemSection border bg-gray-500 h-full sm:w-[50%] overflow-auto p-2">
            <div className="findProblems grid grid-rows-[repeat(3,minmax(2px,1fr))] gap-1 w-1/3 mx-auto">
              <Skeleton1 />
              <Skeleton2 />
              <Skeleton1 />
            </div>
            <div className=" w-[90%]  flex justify-center items-center gap-4 p-2 mx-auto">
              <Skeleton1 className='w-2/3 h-6 rounded border' />
              <Skeleton2 className='w-7 h-7 rounded-full border' />
            </div>
            <div className="QList w-[95%] h-95 bg-[#4d4848] mx-auto">
              <div className="type flex justify-center items-center gap-2 p-1">
                <Skeleton2 className='w-1/2 h-2' />
                <Skeleton1 className='w-4 h-4 rounded' />
                <Skeleton2 className='w-20 h-4 rounded ' />
              </div>
              <div className='w-[95%] mx-auto h-6 bg-[rgb(79,76,76)] flex justify-between text-center'>
                <Skeleton1 className="id w-[15%] bg-[rgba(144,103,103,0.7)]" />
                <Skeleton2 className="problems w-[54%] " />
                <Skeleton1 className="problems w-[30%] " />

              </div>
              <div className="questions bg-[#605252] w-[95%] h-[85%] mx-auto overflow-auto Scrollbar p-2 text-center">
                {Array.from({ length: 10 }).map((e, id) => (
                  <div key={id} className='w-full h-[10%] flex justify-between my-2 '>
                    <Skeleton2 className="id w-[15%] bg-[rgba(153,118,118,0.7)] flex flex-col text-[10px] font-bold" />
                    <Skeleton1 className="problems w-[54%] px-1 bg-[rgba(130,117,117,0.7)] overflow-auto" />
                    <div className="problems w-[30%] bg-[rgba(194,170,170,0.7)] flex justify-around items-center">
                      <Skeleton2 className="codeEditor  h-5 w-5 border" />

                      <div className="grid grid-rows-[repeat(3,2px)] gap-1 w-1/3 ">
                        <Skeleton1 />
                        <Skeleton2 />
                        <Skeleton1 />
                      </div>
                      <Skeleton2 className="work h-5 w-5 border" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Skeleton1 className='line h-0.5 bg-[#674040] mt-5'></Skeleton1>
            <div className="totalSolved p-1">
              <div className="findProblems grid grid-rows-[repeat(3,minmax(2px,1fr))] gap-1 w-1/3 mx-auto py-3">
                <Skeleton1 />
                <Skeleton2 />
                <Skeleton1 />
              </div>
              <Skeleton1 className='border h-25 w-2/3 mx-auto' />
            </div>
          </div>
          <div className="performanceSection border border-[#A67D7D] bg-[#675e5e] h-full sm:w-[50%] overflow-y-auto p-2 Scrollbar">
            <div className='performance grid grid-rows-[repeat(3,minmax(2px,1fr))] gap-1 w-1/3 mx-auto py-3'>
              <Skeleton1 />
              <Skeleton2 />
              <Skeleton1 />
            </div>
            <Skeleton2 className='border h-25 w-2/4 mx-auto'/>
            <Skeleton2 className='progress border h-25  progress w-[85%] mx-auto mt-10'/>

            <div className="leaderboard h-80 w-[85%] bg-[#645c5c] mx-auto mt-10 border">
              <div className="head h-[20%] border-b">
                <Skeleton1 className='w-2/7 h-5'/>
                <div className='mx-auto grid grid-rows-[repeat(3,2px)] w-2/8 gap-1'>
                  <Skeleton2/>
                  <Skeleton1/>
                  <Skeleton1/>
                </div>
              </div>
              <Skeleton4 className="tcl h-[80%] box-border p-2 overflow-y-auto Scrollbar" />
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default page