export default function newQuestions(userPro,globalPro){
            let output = []
            let arr = new Set(userPro)
            for(let i=0; i<globalPro.length; i++){
                if(!arr.has(globalPro[i].question)) output.push(globalPro[i])             
            }
            return output
}
