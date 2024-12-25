import * as React from 'react';
// import Button from '@mui/material/Button';
import { Button, Pagination, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
// import { AiOutlineEdit } from 'react-icons/ai';
import api from '../../config/APISeller';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

function Row(props) {
    const { row, reload} = props;
    // const [flag, setFlag] = React.useState(0);
    //  console.log(row)
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row" className="flex items-center justify-center">
                    <span className=''>{row.id}</span> 
                </TableCell>

                <TableCell className="flex items-center justify-center" align="right">
                    <img src={row.hinhAnh} style={{ width: '60px' }} className="rounded-md d-inline-block overflow-hidden" />
                </TableCell>
                <TableCell className="flex items-center justify-center" align="right">
                    <span className="text-truncate ml-2">{row.tenSanPham}</span>
                </TableCell>
                <TableCell align="right">
                    <Button onClick={()=>reload(row.id)}>Thêm</Button>
                </TableCell>
            </TableRow>
           
        </React.Fragment>
    );
}

const ProductsNotInLive = ({socket,setProducts,liveId }) => {
    const [datas,setData]=React.useState({
        key:"",
        page:0,
        numPages:0
    })
    const [p,setP]=useState(null)
    useEffect(()=>{
        getProduct()
    },[datas.page,datas.key])

    const getProduct=()=>{
        api.get("/productnotinlive?key="+datas.key+"&page="+datas.page).then(v=>{
            datas.numPages=v.data.totalPages
            setP(v.data.data.content)
            // console.log(v.data.data.content)
        }).catch(error=>{
        
        })
    }
    const addProduct=(productId)=>{
        toast.promise(api.post(`/live/addproduct?liveId=${liveId}&productId=${productId}`).then(v=>v.data).then(v=>{
            if(v.status===200){
                getProduct()
                api.get("/productinlives?id="+liveId).then(v=>v.data).then(v=>{
                    setProducts(v.data)
                }).catch(error=>{
                    alert(error)
                })
            }
        }),{
            loading:"Đang xử lý",
            success:"Thêm thành công",
            error:error=>error.message
        })
        
    }

    return (
        <>
                        <Stack spacing={2}>
                    <Pagination onChange={(event, value)=> setData(prevFilter => ({
                        ...prevFilter, // Giữ lại các thuộc tính cũ
                        page: value-1, // Chỉ thay đổi thuộc tính page
                    }))} count={datas.numPage} variant="outlined" color="primary" />
                </Stack>
            <Table aria-label="collapsible table">
                <TableHead className="bg-gray-600 text-white-900">
                    <TableRow>
                        {/* <TableCell className="text-white">Cài đặt</TableCell> */}
                        <TableCell className="text-white" align="right">
                            ID
                        </TableCell>
                        <TableCell className="text-white" align="right">
                            Hình ảnh
                        </TableCell>
                        <TableCell className="text-white" align="right">
                            Tên sản phẩm
                        </TableCell>
                        <TableCell className="text-white" align="right">
                            Thêm {p!=null?p.length:0}
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {p!=null&&
                        p.map((row, index) => {
                           
                            return <Row reload={addProduct} row={row}/>
                        })}
                </TableBody>
            </Table>
        </>
    );
};
export default React.memo(ProductsNotInLive);
