import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Typography, useMediaQuery } from '@mui/material';
import { BiSolidDiscount } from 'react-icons/bi';
import api from '../../config/APIClient';
import order from "../../utils/images/seller/order.png"
const HtmlTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 420,
        fontSize: theme.typography.pxToRem(12),
    },
}));

 function  VariableWidth({keys,values,setFlag,flag}) {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
    const tooltipPlacement = isSmallScreen ? 'top' : 'left-start';
    const [isFetch,setIsfetch]=React.useState(0)
    const [data,setData]=React.useState({
        "isFetch":0,
        "dataFetch":values.data.map(({ sanPhamId, sanPhamSoLuong, giaBan,giaDaGiam }) => ({
            "giaDaGiam": giaDaGiam,
            "productId":sanPhamId,
            soLuong:sanPhamSoLuong,
            giaBan
        }))
    })
    const [vouchers,setVouchers]=React.useState([])
    const fetchVoucher=()=>{
        console.log(data.dataFetch)
        if(data.isFetch===0||1===1){
            api.post(`/cart/getvoucherapply/${keys}`,data.dataFetch,{
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(v=>v.data).then(v=>{
                setVouchers(v.data)
                
            })
            data.isFetch=1
        }
    }

    const getVoucher=(index,voucherId)=>{
        api.post(`/voucher/getvoucher/${voucherId}`).then(v=>v.data).then(v=>{
            if(v.status===200){
                alert("Lấy thành công voucher")
                vouchers[index].accountId=111;
                console.log(vouchers[index])
                setIsfetch(isFetch+1)
            }else{
                alert(v.message)
            }
        })
    }

    return (
        <div>
            <HtmlTooltip
                className="shadow-md"
                arrow
                placement={tooltipPlacement}
                title={
                    <React.Fragment>
                        <Typography  className="text-xs" style={{ width: '300px' }} color="inherit">
                            Tami voucher
                        </Typography>
                        <div style={{height:"250px ",overflow:"auto"}}>
                            <div style={ {display:`${vouchers.length<1?"block":"none"}`}}>
                                <img style={{display:"block",width:"60px",margin:"0 auto"}} src={order}/>
                                <p className='text-center text-sm text-gray-400'>Không có voucher nào</p>
                            </div>
                            {
                                vouchers.map((v,index)=><div className="mt-2  mb-2 flex items-center bg-white rounded-lg shadow-xs p-4 relative overflow-hidden w-96">
                                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        Tốt nhất
                                    </div>
    
                                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                                        <BiSolidDiscount color="red" size={40} />
                                    </div>
    
                                    <div className="flex" style={{ alignItems: 'center' }}>
                                        <div>
                                            <p className="font-bold text-gray-800">Giảm <sup>{v.loaiVoucher==1?"%":"đ"}</sup>{v.giaTriGiam}</p>
                                            <p className="text-gray-600 text-sm">Ước tính giảm cho đơn này: <sup>đ</sup> {v.priceDiscount.toFixed(0)}</p>
                                            <p className="text-gray-600 text-sm">Đơn Tối Thiểu <sup>đ</sup> {v.donToiThieu}</p>
                                            <p className="text-gray-600 text-sm"> {v.voucherName}</p>
                                            <p className="text-gray-500 text-xs mt-1">
                                                Còn lại {v.voucherSoLuocDung-v.voucherSoLuocDaDung} lượt
                                                <a href="#" className="text-blue-500 ml-1">
                                                    Điều Kiện
                                                </a>
                                            </p>
                                            <p onClick={()=>getVoucher(index,v.voucherId)} className="text-gray-600 text-sm">lấy</p>
                                        </div>
                                        <div className="absolute right-0 top-0 h-full w-8 bg-white mt-2">
                                            <input onClick={()=>{
                                                vouchers.forEach(vv=>{
                                                    if(v.voucherId===vv.voucherId){
                                                        vv.check=true
                                                        values.voucherShop=vouchers[index]
                                                        setFlag(flag+1)
                                                    }else{
                                                        vv.check=false;
                                                    }
                                                })
                                                setIsfetch(isFetch+1)
                                            }} checked={v.check===true} disabled={v.accountId===null} name={`v-${keys}`} type="radio" />
                                        </div>
                                    </div>
    
                                    <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                                        x3
                                    </div>
                                </div>)
                            }
                        </div>
                    </React.Fragment>
                }
            >
                <Button onMouseOver={()=>{
                                fetchVoucher() 
                }}><span className='text-red-600 mr-1'>{values.voucherShop!=null?"Giảm "+values.voucherShop. priceDiscount.toFixed(0)+"đ    " :""}</span>     Chọn voucher</Button>
            </HtmlTooltip>
        </div>
    );
}
export default React.memo(VariableWidth)