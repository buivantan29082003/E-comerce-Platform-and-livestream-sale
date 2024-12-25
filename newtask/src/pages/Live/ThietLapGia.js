import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {
    Checkbox,
    Collapse,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material';
import toast from 'react-hot-toast';
import api from '../../config/APISeller';
import formatToVND from '../client/FormatVnd';
import {  BiCheckCircle, BiRightDownArrowCircle } from 'react-icons/bi';
import { pink } from '@mui/material/colors';
import { MdAccessAlarm } from 'react-icons/md';
import { useState } from 'react';
import { BsGear } from 'react-icons/bs';

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [flag, setFlag] = React.useState(0);
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell className="cursor-pointer" onClick={() => setOpen(!open)}>
                    <BiRightDownArrowCircle />
                </TableCell>
                <TableCell component="th" scope="row" className="flex items-center justify-center">
                    <Checkbox
                        {...''}
                        onClick={() => {
                            row.isCheck = !row.isCheck;
                            setFlag(flag + 1);
                        }}
                        checked={row.isCheck}
                        // defaultChecked
                        sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                        }}
                    />
                    {'  '}
                    {/* {row.p.id} */}
                </TableCell>

                <TableCell className="flex items-center justify-center" align="right">
                    <img src={row.p.hinhAnh} style={{ width: '60px' }} className="rounded-md d-inline-block overflow-hidden" />
                    <span className="hidden md:inline-block ml-2">{row.p.tenSanPham}</span>
                </TableCell>

                <TableCell align="right">
                    <span className="font-semibold truncate text-red-500">
                        {formatToVND(row.minPrice)} ~ {formatToVND(row.maxPrice)}
                    </span>
                </TableCell>
                <TableCell align="right">
                    <TextField
                        id="outlined-number"
                        label="Số lượng"
                        size="small"
                        value={row.soLuongGioiHan}
                        type="number"
                        onChange={(e) => {
                            let num = e.target.value;
                            if (!isNaN(num)) {
                                let numb = Number(num);
                                if (numb >= 0) {
                                    row.soLuongGioiHan = numb;
                                    setFlag(flag + 1);
                                }
                            }
                        }}
                        sx={{ width: '100px' }}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </TableCell>
                <TableCell align="right">
                    <TextField
                        id="outlined-number"
                        label="Giá giảm"
                        size="small"
                        type="number"
                        onChange={(e) => {
                            let num = e.target.value;
                            if (!isNaN(num)) {
                                let numb = Number(num);
                                if (numb > -1 && numb < 100) {
                                    row.giaGiam = numb;
                                    setFlag(flag + 1);
                                }
                            }
                        }}
                        sx={{ width: '100px' }}
                        value={row.giaGiam}
                        slotProps={{
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                    />
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box
                            sx={{
                                margin: 1,
                                maxHeight: '200px', // Đặt chiều cao tối đa
                                overflowY: 'auto', // Bật cuộn theo chiều dọc
                            }}
                        >
                            {/* <p className='font-semibold text-md text-blue-700'>Chi tiết</p> */}
                            <Table className="mb-2" size="small" aria-label="purchases">
                                <TableHead className="bg-gray-300 text-white-900">
                                    <TableRow>
                                        <TableCell>Sản phẩm</TableCell>
                                        <TableCell>Số lượng </TableCell>
                                        <TableCell>Giới hạn</TableCell>
                                        <TableCell align="right">Giá bán</TableCell>
                                        <TableCell align="right">Giá trong live</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.p.productDetails.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row" style={{ padding: '20px' }}>
                                                <div className="flex justify-content-center align-items-center">
                                                    <img className='hidden md:inline-block' src={historyRow.hinhAnh} style={{ width: '60px' }} alt="Hình ảnh sản phẩm" />
                                                    <span>
                                                        {historyRow.kichThuoc.tenKichThuoc} - {historyRow.mauSac.tenMau}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell style={{ padding: '20px' }}>{historyRow.soLuong}</TableCell>
                                            <TableCell style={{ padding: '20px', color: 'red' }}>
                                                {row.soLuongLive} <span className="text-black">Lược mua</span>
                                            </TableCell>
                                            <TableCell align="right" style={{ padding: '20px' }}>
                                                <span className="pl-3 pr-3 pt-2 pb-2 bg-green-50 rounded-lg text-green-500">
                                                    {formatToVND(historyRow.giaBan)}
                                                </span>
                                            </TableCell>
                                            <TableCell align="right" style={{ padding: '20px' }}>
                                                <span className="pl-3 trunkcate pr-3 pt-2 pb-2 bg-red-50 rounded-lg text-red-500">
                                                    <BiCheckCircle style={{ display: 'inline' }} color="red" />{' '}
                                                    {formatToVND(historyRow.giaBan * (1 - row.giaGiam / 100))}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const ThietLapGia=({products,socket,liveId})=>{
    const thietLapGia = () => {
        let a = products
            .filter((v) => v.isCheck === true)
            .map((v) => {
                return {
                    id: v.id,
                    soLuongGioiHan: v.soLuongGioiHan,
                    giaGiam: v.giaGiam,
                };
            });
        if (a.length > 0) {
            toast.promise(
                api
                    .post('/live/thietlapgia?liveId=' + liveId, a, { 
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((v) => v.data)
                    .then((v) => {
                        if (v.status !== 200) {
                            throw new Error(v.message);
                        } else {
                            socket.emit('message', {
                                type: 5,
                                timeOut:oclock
                            });
                        }
                    }),
                {
                    loading: 'Đang hoàn tất thiết lập giá...',
                    success: 'Hoàn tất thiết lập giá',
                    error: (error) => error.message,
                },
            );
        }
    };
    const [oclock,setOclock]=useState(-1)
    return <>
        <Button className="mb-2 mt-2" onClick={()=>{
            thietLapGia()
        }} variant="outlined">
                                Thiết lập  <BsGear className='ml-2' size={18} color="blue" />
                            </Button>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label"><MdAccessAlarm/></InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={oclock}
                                label="Age"
                                onChange={(e)=>{
                                    setOclock(Number(e.target.value))
                                }}
                            >
                                <MenuItem value="-1">
                                    Không giới hạn thời gian
                                </MenuItem>
                                <MenuItem value={10000}>10s</MenuItem>
                                <MenuItem value={300000}>5'</MenuItem>
                                <MenuItem value={3600000000}>1h</MenuItem>
                            </Select>
                            </FormControl>
                            
                            <Table aria-label="collapsible table">
                                <TableHead className="bg-gray-600 text-white-900">
                                    <TableRow>
                                        <TableCell className="text-white">Biến thể</TableCell>
                                        <TableCell className="text-white">Id</TableCell>
                                        <TableCell className="text-white" align="right">
                                            Sản phẩm
                                        </TableCell>
                                        <TableCell className="text-white" align="right">
                                            Giá bán
                                        </TableCell>
                                        <TableCell className="text-white" align="right">
                                            Giới hạn (Từng biến thể)
                                        </TableCell>
                                        <TableCell className="text-white" align="right">
                                            Giá giảm
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products != null &&
                                        products.map((row, index) => {
                                            const { minPrice, maxPrice } = row.p.productDetails.reduce(
                                                (acc, item) => {
                                                    acc.minPrice =
                                                        acc.minPrice === null ? item.giaBan : Math.min(acc.minPrice, item.giaBan);
                                                    acc.maxPrice =
                                                        acc.maxPrice === null ? item.giaBan : Math.max(acc.maxPrice, item.giaBan);
                                                    return acc;
                                                },
                                                { minPrice: null, maxPrice: null },
                                            );
                                            row.minPrice = minPrice;
                                            row.maxPrice = maxPrice;
                                            return <Row key={row.name} row={row} />;
                                        })}
                                </TableBody>
                            </Table>
    </>
}

export default React.memo(ThietLapGia)