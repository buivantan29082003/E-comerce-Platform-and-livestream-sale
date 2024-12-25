import { Box,  Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
// import apiUser from "../../../config/APIClient";
// import api from "../../../config/APISeller";
import toast from "react-hot-toast";
import api from "../../../config/APISeller";
import apiUser from "../../../config/APIClient";


const ModalReport=({order})=>{
    const [open, setOpen] = useState(false);

    const [report,setReport]=useState({})
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [viPhams,setViPham]=useState([])

    
    const submit=()=>{
        
        if(window.confirm("Bạn muốn gửi report?")){
            toast.promise(api.post("/order/report",report,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(v=>v.data).then(v=>{
                if(v.status===200){
                    setOpen(false)
                }else{
                    throw new Error(v.message)
                }
            }),{
                loading: "Đang thực hiện.....", 
                success: 'Đã report đến quản trị.', 
                error: (error) => error.message,
            })
        }
    }

    

  useEffect(()=>{
        apiUser.get("/vipham/getall").then(v=>v.data).then(v=>{
            setViPham(v.data)
        }).catch(error=>{
            alert("Có lỗi fecth dữ liệu")
        })
  },[])
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0]; // Chỉ lấy một file duy nhất

    if (!selectedFile) return; // Nếu không có file nào được chọn thì dừng

    const formData = new FormData();
    formData.append('files', selectedFile); // Đặt tên key là 'files' như API yêu cầu

    fetch('http://localhost:8080/upload-single-files', { // Endpoint tải lên 1 file
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === 200) {
                setReport((prevDoiTuong) => ({
                    ...prevDoiTuong,
                    hinhAnhDanChung: data.data
                  }));
            } else {
                alert('Tải ảnh thất bại');
            }
        })
        .catch((error) => {
            console.error('Lỗi khi tải ảnh:', error);
            alert('Có lỗi xảy ra khi tải ảnh');
        })
        .finally(() => {
        });
};
  return (
    <div>
      {/* Button để mở modal */}
      <button className="border text-sm border-gray-300 text-black px-4 py-2 rounded-sm lg:ml-2 d-inline-block" style={{display:"inline-block"}}  onClick={handleOpen}>
            Report đơn hàng
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <p id="modal-title" className="font-semibold ml-2 text-md" variant="h6" component="h2" gutterBottom>
            Báo cáo vi phạm
          </p>
          <div class="container mx-auto mt-3">

                <div class="col-span-12 lg:col-span-10  ">
                        <p>Loại vi phạm</p>
                        <select onChange={(e)=>{ 
                            report.viPham=viPhams[e.target.value]
                        }} class="w-12/12 p-1 lg:w-11/12  border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                        >
                            {viPhams.map((v,index)=>{
                               return <option value={index}>{v.maViPham}</option>
                            })}
                        </select>
                </div>
                <div class="col-span-12 lg:col-span-10 mt-2 ">
                        <p>Nội dung vi phạm</p>
                        <textarea onChange={(e)=>{
                            report.noiDungViPham=e.target.value
                        }} class="w-12/12 p-1 lg:w-11/12  border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                        >
                        </textarea>
                </div>
                <div class="col-span-12 lg:col-span-10  ">
                        <p>Hình ảnh vi phạm</p>
                        <input onChange={(e)=>handleFileChange(e)} id="fileInput" hidden type="file"></input>
                        <div  className="flex">
                            <img alt="Hình ảnh vi phạm" style={{width:'60px',height:"60px",objectFit:"cover"}} src={report.hinhAnhDanChung}/>
                            <FiUploadCloud onClick={()=>{
                                document.getElementById("fileInput").click()
                            }} style={{padding:"10px", border:"1px dashed blue", marginLeft:"5px", borderRadius:"5px"}}  size={40} color="blue"/>
                        </div>
                </div>
            </div>
            <button onClick={() => {
                        submit()
                    }} className="text-red-600 border-2 border-red-600 ml-3 mt-2 p-2 text-sm rounded">Gửi report</button>
        </Box>
      </Modal>
    </div>
  );
};
export default ModalReport