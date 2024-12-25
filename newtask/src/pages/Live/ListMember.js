import { useEffect, useState } from "react"


const ListMember=({socket})=>{
    const [userList,setUserList]=useState([])
    useEffect(()=>{
        alert("Hello world")
        socket.emit("message",{type:7})
        socket.on('message', (data) => {
            switch (data.type) {
                case 'GETMEMBERS':

                    console.log(data.data)
                    break;
                default:
                    break;
            }
        });
    },[])
    return <>
        <p  >List Member</p>
        {userList.map(v=>{
            return <span>djcdcjdjcdc</span>
        })}
    </>
}

export default ListMember