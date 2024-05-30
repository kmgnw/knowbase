export const isIdentifiedUser = (id)=>{
    let userid = parseInt(window.sessionStorage.getItem('userid'), 10)
    if(userid === parseInt(id, 10)){return true}
    else {return false}
}

export const isMentor = ()=>{
    let isMentor = window.sessionStorage.getItem('isMentor')
    if(isMentor === 'true'){return true}
    else {return false}
}

export const isValidatedInput = (inputArr)=>{
    const isValidated = inputArr.every((e,i)=>{
        return e !== ''
    })
    if(!isValidated){
        window.alert('유효하지 않은 입력입니다.')
        return false
    }
    return true
}

export const dateExtractor = (str)=>{
    let arrStr = str.split('')
    let year = arrStr.slice(0,4)
    let month = arrStr.slice(1,4)
    let day = arrStr.slice(1,4)
    console.log(year, month, day)
}