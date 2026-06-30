'use client'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import Skeleton from '../components/homeSkeleton/page'
import { Skeleton1, Skeleton2 } from '../components/skeleton/skeleton'
import showAlert from '../utils/showalert'
import { ToastContainer } from 'react-toastify'


const Home = () => {

  let router = useRouter()
  let input = useRef(null)
  const [performance, setPerformance] = useState({})
  const [logoutToggle, setLogoutToggle] = useState(false)
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [progress, setProgress] = useState({ 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 })



  const { data: session, status } = useSession()
  const [user, setUser] = useState(null)
  const [islogin, setIslogin] = useState(false)
  const [questions, setquestions] = useState(null)
  const [problems, setProblems] = useState([])
  const [search, setSearch] = useState('')
  const [option, setOption] = useState('')
  const [probdire, setProbdire] = useState(false)
  const [completedQuestions, setCompletedQuestions] = useState([])
  const [globalRank, setGlobalRank] = useState([])



  let ProblemsSolved = (Problems, level) => {
    if (!Problems) return
    let Completed = Problems.filter((Q) => {
      if (Q.status === 'Completed' && Q.difficultyLevel === level) {
        return Q
      }
    })
    return Completed.length
  }

  let TotalProblemsSolved = (Problems) => {
    if (!Problems) return
    let Completed = Problems.filter((Q) => Q.status === 'Completed')
    return Completed.length
  }

  const Logout = async () => {
    setIslogin(false)
    if (session) {
      signOut()
      return router.push('/')
    }
    await fetch('/api/logout', {
      method: 'POST',
    });
    localStorage.removeItem('user')
    return router.push('/')
  }

  const questionSovedLimit = async (Limit) => {
    let res = await fetch('/api/todayCompletedQuestions', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Limit, Email: user, Provider: (session?.user?.provider || 'local'), date: new Date().toISOString().split('T')[0] })
    })
    let limit = await res.json()
    return limit.limit
  }


  const questionCompleted = async (data) => {
    let limit = await questionSovedLimit(5)
    if (data.status == 'Completed') return showAlert({ msg: 'you allready solved this question', type: 'success' })
    if (limit >= 5) return showAlert({ msg: <div className='text-amber-300'>😤 You can`t complete more than 5 questions in a day</div> })
    let q = questions.find((q) => data.id == q.id)
    data.status = 'Completed'
    q.status = 'Completed'
    setCompletedQuestions((prev) => [...prev, data])
    await fetch('/api/updateQuestion', {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, id: data.id, provider: (session?.user?.provider || 'local') })
    })

    await fetch('/api/dailyCompletedQuestion', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, data, provider: (session?.user?.provider || 'local'), date: new Date().toISOString().split('T')[0] })
    })
  }


  function Search(term) {
    let c = questions.map((el) => {
      if (el) {
        return {
          id: el?.id,
          difficultyLevel: el?.difficultyLevel.toLowerCase(),
          question: el?.question.toLowerCase(),
          status: el?.status.toLowerCase(),
          type: el?.type.toLowerCase(),
          xp: el?.xp
        }
      }
    })


    let Find = c.filter((Q) => {
      if (Q.question.includes(term) || Q.id == term
        || Q.difficultyLevel.includes(term) || Q.status.includes(term)
        || Q.type.includes(term) || Q.xp == term) {
        return Q
      }
    })
    return Find.map((el) => {
      if (el) {
        return {
          id: el?.id,
          difficultyLevel: el?.difficultyLevel[0].toUpperCase() +
            el?.difficultyLevel.slice(1, el?.difficultyLevel.length),
          question: el?.question[0].toUpperCase() +
            el?.question.slice(1, el?.question.length),
          status: el?.status[0].toUpperCase() +
            el?.status.slice(1, el?.status.length),
          type: el?.type[0].toUpperCase() + el?.type.slice(1, el?.type.length),
          xp: el?.xp
        }
      }
    })
  }


  const changeDirection = () => {
    let change = problems.reverse()
    setProblems(change)
  }

  const handleId = (_id) => {
    let id = _id.toString()
    if (id.length === 1) return (`00${id}`)
    else if (id.length === 2) return (`0${id}`)
    else return id
  }

  const Performance = async () => {
    let resStreak = await fetch('/api/login_check', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Email: user, Provider: (session?.user?.provider || 'local') })
    })

    let resXp = await fetch('/api/userTotalXp', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, provider: (session?.user?.provider || 'local') })
    })

    let resRank = await fetch('/api/userRank', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, provider: (session?.user?.provider || 'local') })
    })
    let rank = (await resRank.json()).rank
    let xp = (await resXp.json()).xp
    let streak = (await resStreak.json()).streak    
    setPerformance({ rank, xp, streak })
  }

  let Global_Ranks = async () => {
    let resRank = await fetch('/api/globalRank')
    let ranks = (await resRank.json()).ranks
    setGlobalRank(ranks)
  }

  let Progress_Chart = async (now = new Date(date)) => {
    const day = now.getDay(); 
    const diffToMonday = day === 0 ? -6 : 1 - day;
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() + diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    let UserProgress = await fetch('/api/userProgress', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, provider: (session?.user?.provider || 'local'), endOfWeek, startOfWeek })
    })

    let prog = (await UserProgress.json()).data
    console.log(prog);
    
    if(prog===0){
      setProgress({ 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 })
      return showAlert({msg:'sorry data not found'})
    } 
    setProgress((prev)=>{
      return {...prev,...prog}
    })
  }

  useEffect(() => {
    if (!date || !user) return
    Progress_Chart(new Date(date))
  }, [date,completedQuestions,progress])


  useEffect(() => {
    if (completedQuestions.length == 0) return
    setTimeout(() => {
      Performance()
      Global_Ranks()
    }, 500);
  }, [completedQuestions])

  useEffect(() => {
    if (user) return;
    if (typeof window === 'object') {
      let me = localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined'
        ? JSON.parse(localStorage.getItem('user'))
        : session?.user?.email
      if (!me) return
      setUser(me)
      setIslogin(true)
    }
  }, [session])


  useEffect(() => {
    let Questions = async () => {
      let q = await fetch('api/userProblemList', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Email: user, provider: (session?.user?.provider || 'local') })
      })
      let questionlist = await q.json()      
      setquestions(questionlist.problems)
      setProblems(questionlist.problems)
    }


    let loginstreak = async () => {
      fetch('/api/streakCreate', {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user, provider: (session?.user?.provider || 'local'), date: new Date().toISOString().split('T')[0] })
      })
    }

    let id = setTimeout(() => {
      if (!user) return router.push('/')
      Questions()
      loginstreak()
      Performance()
      Global_Ranks()
      Progress_Chart()
    }, 1500)
    return () => clearTimeout(id)
  }, [user])


  useEffect(() => {
    if (!search.trim()) return;
    let id = setTimeout(() => {
      let p = Search(search)
      if (p.length !== 0) return setProblems(p)
      setProblems(questions)
    }, 500);
    return () => clearTimeout(id)
  }, [search])


  useEffect(() => {
    if (!option) return
    let prob = []
    let levels = option.split('To')
    for (let level of levels) {
      let p = Search(level)
      prob.push(...p)
    }
    if (prob.length !== 0) return setProblems(prob)
    setProblems(questions)
  }, [option])


  return (
    <>
      {islogin ?
        <div className="conatainer text-amber-50">
          <nav className='h-20 border-2 border-[#A67D7D] bg-[#2C2121] sticky top-0 flex justify-around items-center'>
            <button className='border w-[90px] px-1 bg-amber-100 text-yellow-800 font-semibold border-black hover:border-2 invert active:bg-blue-200 box-border'>Smart DSA</button>
            <p className='greet'>welcome back <br /> {user}</p>
            <div onClick={() => setLogoutToggle((prev) => !prev)} onMouseEnter={() => setLogoutToggle(true)} className="login border w-15 h-15 rounded-full flex justify-center items-center border-amber-900">
              <button className="fl text-2xl">{user?.[0].toUpperCase() ?? 'S'}</button>
            </div>
            {logoutToggle && <>
              <ul onMouseLeave={() => setLogoutToggle(false)} className='absolute right-5 top-[120%] '>
                <li className='bg-gray-700 px-3' onClick={()=>redirect('\profile')}>Profile</li>
                <li onClick={Logout} className='bg-red-900 px-3'>Logout</li>
              </ul>
            </>}
          </nav>
          <main className='h-[calc(100dvh-82px)] sm:flex sm:flex-row overflow-y-auto Scrollbar'>
            <div className="problemSection border bg-[#3A3030] border-[#A67D7D] h-full sm:w-[50%] overflow-auto p-2">
              <h1 className='text-center'>FIND PROBLEMS</h1>
              <div className=" w-[90%] flex justify-center items-center gap-4 p-2 mx-auto">
                <input onChange={(e) => setSearch(e.target.value)} value={search} className='border bg-gray-400 border-amber-700 rounded px-2  w-2/3' type="text" />

              </div>
              <div className="QList w-[95%] h-95 bg-[#483535] mx-auto">
                <div className="type uppercase text-sm flex justify-center items-center gap-2">
                  <label htmlFor="dificulty">Difficulty Level:</label>
                  <button className={`direction ${probdire ? 'rotate-180' : 'rotate-0'}`} onClick={() => {
                    if (!problems) return
                    setProbdire((prev) => !prev)
                    changeDirection()
                  }}>⬇️</button>
                  <select name="dificulty" id="dificulty" className='appearance-none uppercase text-sm ' onClick={e => setOption(e.target.value)
                  }>
                    <option value="default">default</option>
                    <option value="easyTomedium">easy -&gt; medium</option>
                    <option value="mediumTohard">medium -&gt; hard</option>
                    <option value="easyTomediumTohard">easy -&gt;  medium -&gt; hard</option>
                  </select>
                </div>
                <div className='w-[95%] mx-auto h-6 bg-[rgb(109,74,74)] flex justify-between text-center'>
                  <div className=" w-[15%] bg-[rgba(144,103,103,0.7)]">
                    ID
                  </div>
                  <div className="problems w-[54%] bg-[rgba(144,103,103,0.7)]">
                    PROBLEMS
                  </div>
                  <div className="problems w-[30%] bg-[rgba(144,103,103,0.7)]">
                    OPTIONS
                  </div>
                </div>
                <div className="questions bg-[#332828] w-[95%] h-[85%] mx-auto overflow-auto p-2 text-center Scrollbar">
                  {problems ?
                    (problems.map((e) => (
                      <div key={e.id} className='w-full h-[10%] flex justify-between my-2'>
                        <div className=" w-[15%] bg-[rgba(130,117,117,0.7)] flex flex-col text-[10px] font-bold">
                          <span className='id'>{handleId(e.id)}</span>
                          <span className='difficultyLevel'>{e.difficultyLevel}</span>
                        </div>
                        <div className="problems w-[54%] px-1 bg-[rgba(130,117,117,0.7)] overflow-auto">
                          {e.question}
                        </div>
                        <div className="problems w-[30%]  bg-[rgba(130,117,117,0.7)] flex justify-around items-center">
                          <button onClick={() => router.push(`/code?prob=${e.question}&user=${user}&provider= ${session?.user?.provider || 'local'}`)} className="codeEditor cursor-pointer">
                            <img className='h-[24px] w-[24px]' src="/Options/pencil.png" alt="" />
                          </button>
                          <div className="xp">
                            {e.xp}XP
                          </div>
                          <button onClick={() => questionCompleted(e)} className="work cursor-pointer">
                            <img className='h-[20px] w-[20px]' src={`/Options/${e.status[0].toUpperCase() + e.status.slice(1, e.status.length)}.png`} alt="" />
                          </button>
                        </div>
                      </div>
                    )))
                    : (Array.from({ length: 10 }).map((e, id) => (
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
                    )))
                  }
                </div>
              </div>
              <div className='line h-0.5 bg-[#674040] mt-5'></div>
              <div className="totalSolved p-1">
                <h1 className='text-center mb-5'>TOTAL PROBLEMS YOU SOLVED</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Difficlty Level</th>
                      <th>Attempted/Complete</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>Easy</th>
                      <td>{ProblemsSolved(questions, 'Easy')}</td>
                    </tr>
                    <tr>
                      <th>Medium</th>
                      <td>{ProblemsSolved(questions, 'Medium')}</td>
                    </tr>
                    <tr>
                      <th>Hard</th>
                      <td>{ProblemsSolved(questions, 'Hard')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="performanceSection border border-[#A67D7D] bg-[#3A3030] h-full sm:w-[50%] overflow-y-auto p-2">
              <h1 className='text-center m-2'>Performance</h1>
              <table className='bg-[#704d4d77]'>
                <tbody>
                  <tr>
                    <th>Current Streak</th>
                    <td>{performance?.streak || 0}</td>
                  </tr>
                  <tr>
                    <th>Total XP</th>
                    <td >{performance?.xp || 0} XP</td>
                  </tr>
                  <tr>
                    <th>Rank</th>
                    <td>{performance?.rank || 0}</td>
                  </tr>
                  <tr>
                    <th>Questions Solved</th>
                    <td>{TotalProblemsSolved(questions)}</td>
                  </tr>
                </tbody>
              </table>
              <div className="progress w-[85%] mx-auto mt-10 bg-amber-900">
                <h2 className='text-center'>Progress Chart</h2>
                <div className="date w-full relative">
                  <input className='mx-auto w-full outline-0 border-0' onChange={(e) => {
                    if (new Date(e.target.value) > new Date()) return showAlert({msg:'you can track past data only'})
                    setDate(e.target.value)
                  }
                  } type="date" value={date} />
                  <div className="select_date absolute -top-0.5 right-8 ">----&gt;</div>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thu</th>
                      <th>Fri</th>
                      <th>Sat</th>
                      <th>Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr >
                      <td>{progress.Mon}</td>
                      <td>{progress.Tue}</td>
                      <td>{progress.Wed}</td>
                      <td>{progress.Thu}</td>
                      <td>{progress.Fri}</td>
                      <td>{progress.Sat}</td>
                      <td>{progress.Sun}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="leaderboard h-70 w-[85%] bg-[#755a5a] mx-auto mt-10 border">
                <div className="head h-[20%] border-b">
                  <h1 className='font-bold pl-3'>Leaderboard</h1>
                  <div className='text-center text-[12px] font-bold underline decoration-amber-300 text-red-500'>Top Coders All Time</div>
                </div>
                <div className='flex h-8 w-full border-b text-center uppercase items-center'>
                  <div className="ranks w-[20%]">ranks</div>
                  <div className="coders w-[80%]">coders</div>
                  <div className="xp w-[20%]">xp</div>
                </div>
                <div className="tcl flex flex-col gap-2 box-border p-2 h-full  overflow-y-auto Scrollbar">
                  {(globalRank && globalRank?.length !== 0) && (
                    globalRank.map((u, id) => (
                      <div className='flex h-8 w-full text-center not-odd:bg-[rgba(12,231,161,0.67)] not-even:bg-[rgba(247,5,5,0.6)] items-center border rounded-e-full' key={u._id}>
                        <div className="ranks w-[20%]">{id + 1}</div>
                        <div className="coders w-[80%]">{u.Email}</div>
                        <div className="xp w-[20%]">{u.xp}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </main>
        </div> : <Skeleton />}
      <ToastContainer />
    </>
  )
}

export default Home
