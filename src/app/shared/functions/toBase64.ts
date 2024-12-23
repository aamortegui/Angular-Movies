//Promise: It allows me not return something inmediatly, but in the future i will do it (asynchronous) (chapter 57)
export function toBase64(file:File): Promise<string>{
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload=()=>resolve(reader.result as string);
        reader.onerror=(error)=> reject(error);
        
    })
}