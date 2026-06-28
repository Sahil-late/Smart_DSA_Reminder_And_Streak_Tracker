'use client'
import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Editor from '@monaco-editor/react';
import { useSearchParams } from 'next/navigation';
import { Skeleton2 } from '../components/skeleton/skeleton';
import { ToastContainer,Bounce} from 'react-toastify';
import showAlert from '../utils/showalert';
import {useRouter} from 'next/navigation'

const Page = () => {
  const router = useRouter()
  const [code, setCode] = useState('')
  const editorRef = useRef(null)
  const languageRef = useRef(null)
  const btns = useRef({
    copy:'copy',
    paste:'paste'
  })
  const [lang_id, setLang_id] = useState("63")
  const [output, setOutput] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showcodes, setShowcodes] = useState([])
  const [codesToggle, setcodesToggle] = useState(false)
  let problem = useSearchParams().get('prob')
  let user = useSearchParams().get('user')
  let Provider = useSearchParams().get('provider')  

  const handleFormat = () => {
    if (!editorRef.current) return console.log('not mount yet');
    editorRef.current.getAction("editor.action.formatDocument").run()
    console.log('format');
  }

  function handleEditorMount(editor, monaco) {
    editorRef.current = editor
  }

  function handleSelectLanguage(e) {
    const lang = e.target.value
    setLang_id(lang)
  }

  const handleRun = async (e) => {
    let click = e.target.disabled
    if (!code) return
    click = true
    e.target.style.cursor = 'wait'
    try {
      setLoading(true)
      let res = await fetch(`/api/editor/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, lang_id })
      })
      let { output } = await res.json()
      setOutput(output)
    }
    catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
      click = false
      e.target.style.cursor = 'default'
    }
  }

  const handlesave = async (code) => {
    if (!code) return alert('please code first')
    let Question = code.split('//')[1].split('.')[1].split('\n')[0]
    const map = {
      63: "Javascript",
      62: "Java",
      71: "Python",
      50: "C",
      51: "C",
      54: "C++"
    }
    const Language = map[lang_id]
    let res = await fetch('api/editor/save', {
      method: "POST",
      header: { "content-type": "application/json" },
      body: JSON.stringify({ User: user,Provider, Lang_id: lang_id, Language, Question, Code: code, })
    })
    let {msg} = await res.json()
    let result = confirm(msg)
    if (result && msg == 'allready exists can you want to update it') {
      updateCode({ User: user,Provider, Lang_id: lang_id, Language, Question, Code: code, })
      return
    }

    console.log(' don\'t update');
  }

  const updateCode = async (body) => {
    let res = await fetch('api/editor/update', {
      method: "POST",
      header: { "content-type": "application/json" },
      body: JSON.stringify(body)
    })
    let {msg} = await res.json()
    showAlert({msg,type:'success'})
  }

  const savedCodes = async (User,Provider) => {
    try {
      let res = await fetch('api/editor/saved_codes', {
        method: "POST",
        header: { "content-type": "application/json" },
        body: JSON.stringify({User,Provider})
      })
      let codes = await res.json()
      setShowcodes(codes.mycodes);
    }
    catch (err) {
      console.log(err);

    }
  }

  const handleCopy = (e,code)=>{
    navigator.clipboard.writeText(code)
    let text = btns.current.copy
    text.innerText="Copied!"
    setTimeout(()=>{
      text.innerText='Copy'
    },1000)
  }

  const handlePaste = async ()=>{
   let copyText = await navigator.clipboard.readText()
   let text = btns.current.paste
    text.innerText="Pasted!"
    setTimeout(()=>{
      text.innerText='Paste'
    },1000)
   setCode((prevText)=>`${prevText}\n${copyText}`)
  }


  useEffect(() => {
    savedCodes(user,Provider)
  }, [])



  return (
    <>
      <div className='options w-full border h-8 flex justify-around bg-amber-900 text-amber-100 relative'>
        <button onClick={handleFormat}>Format</button>
        <select ref={languageRef} onChange={handleSelectLanguage} name="languages" id="languages">
          <option value="63">Javascript</option>
          <option value="62">Java</option>
          <option value="71">Python</option>
          <option value="50">C</option>
          <option value="51">C#</option>
          <option value="54">C++</option>
        </select>
        <button onClick={() => setcodesToggle(!codesToggle)}>Saved codes</button>

        <button onClick={handleRun}>Run</button>
        <button onClick={() => handlesave(code)}>Save</button>
        {codesToggle && <ul onMouseLeave={() => setcodesToggle(!codesToggle)} className="codes absolute top-full z-1 h-15 overflow-y-auto Scrollbar bg-[rgba(0,0,0,0.6)] px-2 mt-4">
          {showcodes.length !== 0 ? showcodes.map((code) => (
            <li key={code._id} onClick={() => {
              setCode(code.Code)
              languageRef.current.value = code.Lang_id
            }}>{code.Question} --&gt; {code.Language}</li>
          )) : <li className='uppercase'>Codes not saved yet</li>}
        </ul>}
      </div>
      <div className="editorSpace h-[calc(80vh-32px)] border p-2 bg-black box-border overflow-hidden text-amber-50 relative ">
        <Editor onMount={handleEditorMount} className='h-full' theme="vs-dark" onChange={(e) => setCode(e)} language="javascript" value={code} defaultValue={`// Q.${problem}\n// open leetcode https://leetcode.com/search/?q=${problem.split(' ').join('+')}\n`} />
          <div className="btns absolute bottom-2 flex w-full  h-10 items-center">
            <div className="copy-paste flex gap-2.5 ">
            <button title='copy the code' className='copy text-center bg-amber-100 text-amber-700 px-2 w-20' ref={(el)=> btns.current.copy=el} onClick={(e)=>handleCopy(e,code)}>copy</button>
            <button className='paste bg-amber-100 text-amber-700 px-2 w-20' ref={(el)=> btns.current.paste=el} onClick={handlePaste}>Paste</button>
            </div>
             <div className="clear-home mx-auto flex gap-2.5  items-center justify-center w-50 h-10">
              <button className='paste bg-amber-100 text-amber-700 px-2 w-15' onClick={()=>setCode('')}>Clear</button>
              <div className="sizeHolder w-15">
              <button className=' border text-[rgb(1,1,1)] border-[rgb(241,241,241)] bg-[rgba(16,14,14,0.82)] px-1 hover:text-[17px] active:border-2'>
              <span className='bg-[linear-gradient(50deg,red,pink,green,orange,blue,yellow)] text-transparent bg-clip-text font-bold text-stroke' onClick={()=>router.push('/home')}>HOME</span>
              </button>
              </div>
             </div>
          </div>
      </div>
      {!loading ? <footer className='border overflow-auto h-[20vh] border-amber-100 box-border p-2 bg-[rgb(50,49,49)] Scrollbar'>
        {output && (
          output?.error ? <pre className='font-extrabold text-sm px-1 text-center text-red-600'>
            caused compilation error please check your code
          </pre> :
            output?.stderr ? <pre className='font-extrabold text-sm px-1 text-center text-red-600'>
              {(output?.stderr)}
            </pre> : output?.stdout ? <pre className='font-extrabold text-sm px-1 text-center text-amber-100'>
              {(output?.stdout)}
            </pre> : <pre className='font-extrabold text-sm px-1 text-center text-red-500'>
              {(output?.status?.description)}
            </pre>
        )}
      </footer> :
        <Skeleton2 className='border h-[20vh] ' />
      }
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default Page
