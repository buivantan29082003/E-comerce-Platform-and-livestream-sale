import * as React from 'react';
// import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import formatToVND from '../client/FormatVnd';
// import { AiOutlineEdit } from 'react-icons/ai';
import { BiPin } from 'react-icons/bi';

function Row(props) {
    const { row,sendMessage,conner } = props;
    const [flag, setFlag] = React.useState(0);
    //  console.log(row)
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row" className="flex items-center justify-center">
                    <span onClick={() => {
                        row.conner=conner
                        sendMessage(row)
                    }} className='p-2 cursor-pointer pl-4 pr-4  rounded-md bg-pink-100 text-pink-600 font-semibold'> 
                    <span className='hidden md:inline-block'>Ghim</span> 
                     <BiPin className='d-inline-block'/></span>
                </TableCell>

                <TableCell className="flex items-center justify-center" align="right">
                    <img src={row.p.hinhAnh} style={{ width: '60px' }} className="rounded-md d-inline-block overflow-hidden" />
                    <span className="hidden md:inline-block text-trunkcake ml-2">{row.p.tenSanPham}</span>
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
           
        </React.Fragment>
    );
}

const LiveViewProduct = ({ products,sendMessage,conner }) => {
    return (
        <>
            <Table aria-label="collapsible table">
                <TableHead className="bg-gray-600 text-white-900">
                    <TableRow>
                        <TableCell className="text-white">Cài đặt</TableCell>
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
                           
                            return <Row sendMessage={sendMessage} conner={conner} key={row.name} row={row} />;
                        })}
                </TableBody>
            </Table>
        </>
    );
};
export default React.memo(LiveViewProduct);
