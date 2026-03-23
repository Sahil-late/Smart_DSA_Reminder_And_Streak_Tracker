'use client'
import Image from 'next/image'
import React,{ useState ,useEffect} from 'react'
import {useSession,signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'


const Home = () => {
  let router = useRouter()
  const [logoutToggle, setLogoutToggle] = useState(false)
  const { data: session} = useSession()
  console.log(session);
  

  useEffect(() => {
    if(!session) return router.push('/')
  }, [session])
  
  
  return (
    <>
    <div className="conatainer text-amber-50">
        <nav className='h-20 border-2 border-[#A67D7D] bg-[#2C2121] sticky top-0 flex justify-around items-center'>
          <button className='border w-[90px] px-1 bg-amber-100 text-yellow-800 font-semibold border-black hover:border-2 invert active:bg-blue-200 box-border'>Smart DSA</button>
          <p>welcome back username</p>
          <div onClick={()=>setLogoutToggle((prev)=>!prev)} className="login border w-15 h-15 rounded-full flex justify-center items-center border-amber-900">
            <button className="fl text-2xl">{session?.user.email[0].toUpperCase() || 5}</button>
          </div>
           {logoutToggle && <>
              <ul className='absolute right-5 top-[120%] '>
                <li className='bg-gray-700 px-3'>Profile</li>
                <li className='bg-gray-700 px-3'>Setting</li>
                <li onClick={()=> {
                  signOut() }} className='bg-red-900 px-3'>Logout</li>
              </ul>
            </>}
        </nav>
        <main className='h-[calc(100dvh-82px)] sm:flex sm:flex-row overflow-y-auto Scrollbar'>
            <div className="problemSection border bg-[#3A3030] border-[#A67D7D] h-full sm:w-[50%] overflow-auto p-2">
              <h1 className='text-center'>FIND PROBLEMS</h1>
              <div className=" w-[90%] flex justify-center items-center gap-4 p-2 mx-auto">
                <input className='border bg-gray-400 border-amber-700 rounded px-2  w-2/3' type="text" />
                <button type='button' className='bg-[#785D5D] w-7 h-7 rounded-full flex justify-center items-center hover:border active:border-2 active:border-amber-200'>
                  <Image className='search h-auto' src='/search.png' height={15} width={15} alt='Search'/>
                </button>
              </div>
              <div className="QList w-[95%] h-70 bg-[#483535] mx-auto">
                <div className="type text-center">
                  <label className='p-2 ' htmlFor="dificulty">Difficulty Level:</label>
                  <select name="dificulty" id="dificulty" className='appearance-none'>
                    <option value="default">default</option>
                    <option value="meadiumToHard">meadium to hard</option>
                  </select>
                </div>
                <div className="questions bg-[#332828] w-[95%] h-[85%] mx-auto overflow-auto">
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
                      <th>Beginner</th>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>Intermediate</th>
                      <td>0</td>
                    </tr>
                    <tr>
                      <th>Pro</th>
                      <td>0</td>
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
                  <td>0 Days</td>
                </tr>
                <tr>
                  <th>Total XP</th>
                  <td>0 XP</td>
                </tr>
                <tr>
                  <th>Rank</th>
                  <td>0</td>
                </tr>
                <tr>
                  <th>Questions Solved</th>
                  <td>0</td>
                </tr>
                </tbody>
              </table>

              <div className="progress w-[85%] mx-auto mt-10 bg-amber-900">
                <h2 className='text-center'>Progress Chart</h2>
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
                    <tr>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    <td>-</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="leaderboard h-80 w-[85%] bg-[#755a5a] mx-auto mt-10 border">
                <div className="head h-[20%] border-b">
                  <h1 className='font-bold pl-3'>Leaderboard</h1>
                  <div className='text-center text-[12px]'>Top Coders This Week</div>
                </div>
                <div className="tcl h-[80%] box-border p-2 overflow-y-auto Scrollbar">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur est voluptatem vel repellat sunt, numquam, magnam earum delectus at recusandae vero! Voluptate ut enim quas neque dolorum laborum tempora adipisci suscipit sed voluptatum perspiciatis sit voluptatibus dolorem ipsum officiis, dolores laudantium illo. Sunt voluptatem, necessitatibus dolores ex pariatur et, maxime libero praesentium esse molestiae, est numquam at voluptates illo excepturi possimus aliquam reprehenderit perspiciatis minima eligendi consequuntur in nostrum quas atque. Magni delectus maiores ipsa iste recusandae, libero explicabo perspiciatis rem numquam. Dolorum doloribus quis hic voluptate ex commodi mollitia animi nobis cum quas reiciendis beatae voluptatum optio culpa earum facilis ab excepturi perspiciatis, sunt minima. Beatae numquam rem nisi dolor itaque optio ratione assumenda, explicabo unde laborum laudantium veniam similique, porro alias adipisci nihil inventore molestiae illum ex totam mollitia fuga, labore quidem maiores? Esse facere praesentium itaque officiis aspernatur reprehenderit suscipit alias facilis. Dolore explicabo soluta itaque delectus rem accusantium provident necessitatibus sapiente dolor sed reprehenderit aspernatur sit veniam placeat quasi, a minus! Odio voluptate officia cumque eos dolore quasi dolorem accusamus, obcaecati sequi modi nihil aperiam. Quisquam cupiditate saepe enim tempora ea qui consequatur corporis nesciunt ut. Quibusdam ratione doloribus et. Cupiditate quisquam vero doloribus voluptate cumque molestias illum excepturi ducimus officia repellat, quo sed magnam qui in repellendus porro tenetur veritatis minima illo? Iste incidunt quos repellat nobis laudantium sit autem voluptatem. Odio eligendi molestiae doloremque cum maiores ipsum provident ab tempore possimus atque praesentium, iure consequatur, veniam enim laboriosam, quidem illo sed sunt animi asperiores aliquam harum at. Asperiores aspernatur esse sapiente. Vel facere qui obcaecati saepe voluptas inventore quasi incidunt non ipsum eum rem, voluptatum magnam doloribus porro error ducimus? Eligendi sint natus laboriosam fugiat. Deleniti saepe tempora assumenda nemo fugiat maxime, vitae optio, dolorem reprehenderit impedit ut? Aperiam, debitis, repudiandae pariatur magni eveniet quis nihil consequatur laudantium, repellendus modi suscipit sunt odit praesentium facilis sequi numquam enim. Asperiores atque distinctio, fuga aspernatur illum, voluptas perspiciatis dolorum natus sequi laboriosam harum qui culpa ea consequuntur ipsum esse, mollitia rem aperiam amet sit tenetur obcaecati corrupti? Rem pariatur itaque laboriosam beatae repellendus, autem accusamus iure suscipit similique. Libero quam quas atque porro, possimus nobis nemo expedita voluptatibus obcaecati dolores. Adipisci, illo soluta assumenda pariatur ipsum, dolore distinctio voluptatibus ab exercitationem deserunt cupiditate dolores quas voluptates enim a porro dolorum modi sapiente, quasi obcaecati dolorem voluptas ipsa aperiam deleniti? Voluptatum tempore magni repudiandae nesciunt quae! Architecto nobis dolores consequuntur illum totam dolorum eveniet culpa, voluptates provident sit. Amet hic perspiciatis reprehenderit illo totam omnis placeat eos inventore iure, asperiores magnam autem maiores! Quidem et, at quo consectetur voluptatum esse cumque magni accusantium vitae mollitia a exercitationem? In fugit provident voluptatibus saepe autem velit, molestias obcaecati quidem placeat harum magni vitae ea esse labore reprehenderit quas. Provident quaerat accusantium vero explicabo reprehenderit quod nulla nemo, quae, eius adipisci, aliquam distinctio eos eum mollitia laboriosam aspernatur dolores tempora saepe amet recusandae cum cumque magni tempore? Rem illo, consequatur ut in reiciendis incidunt placeat temporibus ab. Quasi, iste repellat. Culpa nihil sunt nulla, aliquam maxime pariatur sed eos nostrum unde quo repudiandae sequi officia, cupiditate quia. Molestiae facilis quaerat adipisci, numquam repudiandae aspernatur eaque expedita tempora eum similique quidem, quas eos? Vel ut sed aliquid est! Hic sint incidunt, exercitationem tempore itaque vitae, ratione inventore eius eaque cumque delectus expedita facere rerum blanditiis id perspiciatis voluptatum sequi error voluptatibus quidem ipsum esse ullam modi? Iste reiciendis vero facilis inventore, exercitationem eligendi quasi dolorem debitis sunt, similique odio quisquam porro? Expedita, asperiores nostrum velit provident voluptatibus illo natus neque reprehenderit, eaque enim fugit doloremque sequi aspernatur animi eos. Quibusdam accusamus quam sapiente et ad nostrum veniam minima odit assumenda. Aspernatur, nemo, distinctio iste eligendi amet ea laudantium esse doloremque optio similique soluta ratione. Hic sint itaque perspiciatis voluptates deleniti quidem quis et odio, reiciendis quae eaque corporis dolorum unde fuga atque quasi, inventore maiores. Dolorem, fuga maxime eligendi animi iste assumenda natus saepe repellendus non vitae veniam autem delectus illum officia ipsum error? Dignissimos dolorum eveniet explicabo, repellendus voluptas vero excepturi numquam magnam ipsum voluptatum exercitationem ut ullam fugit possimus neque odio culpa deserunt non! Adipisci officia eaque recusandae nostrum eius culpa? In neque ipsam reiciendis tempora dolorum quod, mollitia ex quaerat itaque asperiores placeat voluptas sunt rem molestiae explicabo vel nulla minima quisquam nobis necessitatibus, ratione aut, eum assumenda et. Iste adipisci, tenetur eaque animi corrupti consectetur excepturi blanditiis impedit praesentium quis fuga vel velit ex nobis reprehenderit inventore incidunt fugiat earum cumque labore accusantium. Iure autem eligendi reiciendis eaque voluptatum. Ad eum possimus assumenda ipsum quae perferendis! Et sapiente iusto aspernatur labore facilis libero eius fugiat minus explicabo quod, officiis delectus ipsum sint incidunt nostrum possimus animi. Voluptates dicta tenetur voluptatum ducimus vel necessitatibus doloribus at inventore, deleniti quis dolores? Laboriosam sed alias nam illum. Quas eos beatae nisi. Consectetur nesciunt exercitationem quaerat facilis aliquam ex aperiam cumque earum sunt incidunt! Alias ipsam dicta repellat explicabo molestiae, necessitatibus quasi! Veniam aliquid dicta ab sequi suscipit tempora? Recusandae facere dolorum vel est totam odio ipsa impedit quasi quos, illo inventore culpa maiores, blanditiis eveniet alias doloribus explicabo veniam quam tempore! Nisi, ex hic vero laboriosam autem, odio quaerat incidunt id eius ipsam architecto saepe repudiandae! Corporis dignissimos praesentium veritatis tenetur libero temporibus sint harum aperiam dolor. Harum, voluptatibus asperiores accusantium aspernatur doloribus expedita modi reprehenderit eveniet ipsam magni vitae esse quaerat odit quidem rem tempora quod fugit corrupti autem incidunt ut architecto ab! Optio recusandae velit natus fuga et saepe laboriosam molestias accusamus fugit enim nostrum illum asperiores, unde ullam eum dolores quos veritatis, at numquam provident repellendus ipsa iure voluptas labore. Libero quae quam facilis laboriosam, obcaecati deleniti illum voluptatibus suscipit iste accusantium a, architecto odio perferendis vitae provident harum sed nisi eaque placeat ratione ex dignissimos animi! Repudiandae pariatur quidem error officia animi aliquam corrupti consequatur ipsam ex vel officiis, porro accusamus itaque a deleniti enim harum laboriosam dolorum in? Quod nisi quaerat quae, commodi repellendus eaque eos incidunt itaque perferendis? Quam inventore dolorem iste expedita beatae?
                </div>
                </div>
            </div>
        </main>
    </div>
    </>
  )
}

export default Home