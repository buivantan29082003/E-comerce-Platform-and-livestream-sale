// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Modal from '@mui/material/Modal';
// import { useState } from 'react';
// import { Tab, Tabs } from '@mui/material';
// import api from "../../config/APISeller"
// import toast from 'react-hot-toast';
// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     bgcolor: 'white',
//     border: '1px solid violet',
//     boxShadow: 24,
//     p: 2,
//     m: 1,
//     text: 'xs',
//     borderRadius: '8px',
// };

// function CustomTabPanel(props) {
//     const { children, value, index, ...other } = props;

//     return (
//         <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
//             {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//         </div>
//     );
// }

// function a11yPropss(index) {
//     return {
//         id: `simple-tab-${index}`,
//         'aria-controls': `simple-tabpanel-${index}`,
//     };
// }



// export default function ModalSeller({ products, setProducts, sendMessage ,liveId,socket}) {
//     const [open, setOpen] = useState(false);
//     const [value, setValue] = React.useState('1');
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//     const thietLapGia=()=>{
//        let a=products.filter(v=>v.isCheck===true).map(v=>{
//           return {
//             id:v.id,
//             soLuongGioiHan:v.soLuongGioiHan,
//             giaGiam: v.giaGiam
//           }
//        })
//        if(a.length>0){
//         toast.promise(api.post("/live/thietlapgia?liveId="+liveId,a,{
//           headers:{
//             "Content-Type":"application/json"
//           }
//         }).then(v=>v.data).then(v=>{
//           if(v.status!==200){
//             throw new Error(v.message)
//           }else{
//             socket.emit("message",{
//                 type:5
//             })
//           }
//       }),{
//         loading:"Đang hoàn tất thiết lập giá...",
//         success:"Hoàn tất thiết lập giá",
//         error:(error)=>error.message
//       })
//        }
//     }
//     const [flag,setFlag]=useState(0)
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//     return (
//         <div>
//             <Button style={{ display: 'none' }} variant="contained" id="cartlive" color="primary" onClick={handleOpen}>
//                 Mở giỏ hàng
//             </Button>
//             <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
//                 <Box sx={{ ...style, width: '6/12' ,overflow:"auto" }} className="p-1 lg:w-7/12 p-0 sm:w-10/12 bg-white-900">
//                     <p variant="h6" component="h2" className="text-center mb-4 text-white">
//                         Quản lý live của shop
//                     </p>
//                     <Box sx={{ width: '100%'}}>
//                         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//                             <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
//                                 <Tab label="Sản phẩm" {...a11yPropss(0)} />
//                                 <Tab label="Thiết lập giá" {...a11yPropss(1)} />
//                                 <Tab label="Thông kê" {...a11yPropss(2)} />
//                             </Tabs>
//                         </Box>
//                         <CustomTabPanel value={value} index={0}>
//                             <div style={{height:"500px ",overflow:"auto"}} className='w-full' >
//                                 <p className="font-bold  d-inline-block">Danh sách sản phẩm</p> <button 
//                                   onClick={()=>thietLapGia()}
//                                 className='p-1 border border-red-500 d-inline-block'>Thiết lập</button>
//                                 <table className="w-full table-auto border-collapse text-xs" style={{ width: '100%' ,overflow:"auto"}}>
//                                     <thead className="bg-gray-100">
//                                         <tr>
//                                             <th className="border px-4 py-2 text-left">ID</th>
//                                             <th className="border px-4 py-2 text-left">Sản phẩm</th>
//                                             <th className="border px-4 py-2 text-left">Giá</th>
//                                             <th className="border px-4 py-2 text-left">Số lượng giới hạn</th>
//                                             <th className="border px-4 py-2 text-left">Giá giảm</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                     {products.map((v) => {
//                                             const { minPrice, maxPrice } = v.p.productDetails.reduce(
//                                                 (acc, item) => {
//                                                     acc.minPrice =
//                                                         acc.minPrice === null ? item.giaBan : Math.min(acc.minPrice, item.giaBan);
//                                                     acc.maxPrice =
//                                                         acc.maxPrice === null ? item.giaBan : Math.max(acc.maxPrice, item.giaBan);
//                                                     return acc;
//                                                 },
//                                                 { minPrice: null, maxPrice: null },
//                                             );
//                                             v.minPrice = minPrice;
//                                             v.maxPrice = maxPrice;
//                                             return (
//                                                 <tr>
//                                                     <td className="border px-4 py-2">{v.p.id} <input
//                                                       onClick={()=>{
//                                                         v.isCheck=!v.isCheck
//                                                         setFlag(flag+1)
//                                                       }} checked={v.isCheck}
//                                                      type='checkbox'/></td>
//                                                     <td className="border px-4 py-2 flex  align-items-center">
//                                                         <img style={{ width: '70px' }} src={v.p.hinhAnh} />
//                                                         <span className="ml-2 text-truncate">{v.p.tenSanPham}</span>
//                                                     </td>
//                                                     <td className="border px-4 py-2">
//                                                         {minPrice}-{maxPrice} VND
//                                                         <span className="text-red-500">
//                                                             {v.giaTriKhuyenMai ? `- khuyến mãi: ${v.giaTriKhuyenMai}%` : ''}
//                                                         </span>
//                                                     </td>
//                                                     <td className="border px-4 py-2">
//                                                         <input  value={v.soLuongGioiHan} onChange={(e)=>{
                                                          
//                                                           let num=e.target.value
//                                                           if(!isNaN(num)){
//                                                             let numb=Number(num)
//                                                             if(numb>=0){
//                                                               v.soLuongGioiHan=numb
//                                                               setFlag(flag+1)
//                                                             }
//                                                           }
//                                                         }} type='number' className='border focus:border-gray-200'/>
//                                                     </td>
//                                                     <td className="border px-4 py-2">
//                                                         <input value={v.giaGiam} onChange={(e)=>{
                                                          
//                                                           let num=e.target.value
//                                                           if(!isNaN(num)){
//                                                             let numb=Number(num)
//                                                             if(numb>-1&&numb<100){
//                                                               v.giaGiam=numb
//                                                               setFlag(flag+1)
//                                                             }
//                                                           }
//                                                         }} type='number' className='border'/>
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </CustomTabPanel>
//                         <CustomTabPanel value={value} index={1}>
//                             <div style={{height:"500px ",overflow:"auto"}}>
//                                 <p className="font-bold">Danh sách sản phẩm</p>
//                                 <table className="w-full table-auto border-collapse text-xs" style={{ width: '100%' }}>
//                                     <thead className="bg-gray-100">
//                                         <tr>
//                                             <th className="border px-4 py-2 text-left">ID</th>
//                                             <th className="border px-4 py-2 text-left">Sản phẩm</th>
//                                             <th className="border px-4 py-2 text-left">Giá</th>
//                                             <th className="border px-4 py-2 text-left">Thao tác {products.length}</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {products.map((v) => {
//                                             const { minPrice, maxPrice } = v.p.productDetails.reduce(
//                                                 (acc, item) => {
//                                                     acc.minPrice =
//                                                         acc.minPrice === null ? item.giaBan : Math.min(acc.minPrice, item.giaBan);
//                                                     acc.maxPrice =
//                                                         acc.maxPrice === null ? item.giaBan : Math.max(acc.maxPrice, item.giaBan);
//                                                     return acc;
//                                                 },
//                                                 { minPrice: null, maxPrice: null },
//                                             );
//                                             v.minPrice = minPrice;
//                                             v.maxPrice = maxPrice;
//                                             return (
//                                                 <tr>
//                                                     <td className="border px-4 py-2">{v.p.id}</td>
//                                                     <td className="border px-4 py-2 flex  align-items-center">
//                                                         <img style={{ width: '70px' }} src={v.p.hinhAnh} />
//                                                         <span className="ml-2">{v.p.tenSanPham}</span>
//                                                     </td>
//                                                     <td className="border px-4 py-2">
//                                                         {minPrice}-{maxPrice} VND
//                                                         <span className="text-red-500">
//                                                             {v.giaTriKhuyenMai ? `- khuyến mãi: ${v.giaTriKhuyenMai}%` : ''}
//                                                         </span>
//                                                     </td>
//                                                     <td className="border px-4 py-2">
//                                                         <button
//                                                             onClick={() => sendMessage(v)}
//                                                             className="text-blue-500 hover:text-blue-700 mr-2"
//                                                         >
//                                                             Hiển thị
//                                                         </button>
//                                                     </td>
//                                                 </tr>
//                                             );
//                                         })}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </CustomTabPanel>
//                         <CustomTabPanel value={value} index={2}>
//                             <div>
//                                 <p className="font-bold">Danh sách sản phẩm</p>
//                                 <table className="w-full table-auto border-collapse text-xs" style={{ width: '100%' }}>
//                                     <thead className="bg-gray-100">
//                                         <tr>
//                                             <th className="border px-4 py-2 text-left">ID</th>
//                                             <th className="border px-4 py-2 text-left">Sản phẩm</th>
//                                             <th className="border px-4 py-2 text-left">Giá</th>
//                                             <th className="border px-4 py-2 text-left">Thao tác</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr>
//                                             <td className="border px-4 py-2">1</td>
//                                             <td className="border px-4 py-2 flex justify-content-center align-items-center">
//                                                 <img
//                                                     style={{ width: '70px' }}
//                                                     src="https://shopee.vn/T%C3%BAi-x%C3%A1ch-%C4%91eo-vai-n%E1%BB%AF-d%C3%A1ng-xinh-%C4%91%E1%BA%B9p-sang-tr%E1%BB%8Dng-%C4%91i-ti%E1%BB%87c-thi%E1%BA%BFt-k%E1%BA%BF-thanh-l%E1%BB%8Bch-TDC290-i.1365471401.25837151097?sp_atk=72bbed18-b9f7-48b1-98b4-687fb60dd7a0&xptdk=72bbed18-b9f7-48b1-98b4-687fb60dd7a0"
//                                                 />
//                                                 <span>Bánh bông lan</span>
//                                             </td>
//                                             <td className="border px-4 py-2">222-2000 VND</td>
//                                             <td className="border px-4 py-2">
//                                                 <button
//                                                     //   onClick={() => handleEdit(product.id)}
//                                                     className="text-blue-500 hover:text-blue-700 mr-2"
//                                                 >
//                                                     Hiển thị
//                                                 </button>
//                                                 <button
//                                                     //   onClick={() => handleDelete(product.id)}
//                                                     className="text-red-500 hover:text-red-700"
//                                                 >
//                                                     Ngưng bán
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </CustomTabPanel>
//                     </Box>
//                     <Button onClick={handleClose} color="secondary" className="mt-4 w-full">
//                         Đóng
//                     </Button>
//                 </Box>
//             </Modal>
//         </div>
//     );
// }
