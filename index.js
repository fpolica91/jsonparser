



function parseJson(str){
  const parsed = new Object();
  const exclude = [
    '{',
     '}',
    '[',
    ']',
    '(',
    ')',
    '\n',
    '\t',
  ]

  let newstr="";

  for(let i = 0; i < str.length; i++){
    if(exclude.indexOf(str[i]) === -1){
      newstr += str[i].trim();
    }
  }




  const arr = newstr.
    split(',')
    .map(x => x.trim())
    .filter(x => x.length > 0)

  const tt = arr.join(" ")



   
    
  for(let i = 0; i < arr.length; i++){
    const index = arr[i].search(":")
    if(index === -1){
      const append = arr[i].trim()
      let _index = arr[i-1].search(":")
      let k = arr[i-1].substring(1, _index)
      .trim()
      .replace('"', '')
      let _v = arr[i-1].substring(_index + 1).trim() + "," + append

       if(parseInt(_v)){
         parsed[k] = parseInt(_v)
       }else {
         parsed[k] = _v.substring(1, _v.length - 1)
       }
      
    }else {
       const key = arr[i].substring(1, index-1).trim()
       let value = arr[i].substring(index+1, arr[i].length).trim()
       if(parseInt(value)){
          parsed[key] = parseInt(value)
       }else{
         const valuelen = value.length
         let empty_count = 0
         for(let k =0; k < value.length; k++){
           if(value[k] === '"'){
             empty_count++
           }
         }
         if(empty_count === valuelen){
           parsed[key] = ''
         
         }else{
           parsed[key] = value.substring(1, value.length-1).trim()
         }
       }

       
    }
   

  }
  
  return parsed

}


const json = `{
  "x":"helloworld",
   "random":"comma,value",
   "colon":"colon:separated",
   "potaote":"potaote,fries",
    "digit": 5,
    "negative": -5,
    "numberStr": "5",
    "empty": """"
}`

console.log(parseJson(json))