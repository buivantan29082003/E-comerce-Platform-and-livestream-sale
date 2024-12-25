import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import { useState } from 'react';
import { BiAddToQueue } from 'react-icons/bi';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import toast from 'react-hot-toast';
import api from '../../../config/APISeller';
import React from 'react';
// import api from '../../config/APIUser';
// import gsap from 'gsap';

 function ModalCancel({id,index,reload}) {
  const [open, setOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState(0); // State để theo dõi lý do hủy
  const cancelOrder = () => {
    toast.promise(
      api.post(`/order/cancelsingle/${id}/${reasons[selectedReason]}`)
        .then((v) => v.data)
        .then((v) => {
          if (v.status === 200) {
            reload(index);
          } else {
            throw new Error(v.message);
          }
        }),
      {
        loading: "Đang thực hiện",
        success: "Hủy đơn thành công",
        error: (error) => error.message,
      }
    );
  };
  
  const reasons = [
    "Tôi nhận thấy thông tin không hợp lệ" ,
    "Địa chỉ hoặc số điện thoại của bạn không hợp lệ" ,
    "Sản phẩm trong kho không đủ" ,
    "Đơn vị vận chuyển không nhận đơn này" ,
    "Kích thước quá tải" ,
    "Lý do khác" ,
  ];
  return (
    <>
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<BiAddToQueue />}
        onClick={() => setOpen(true)}
      >
        Hủy đơn hàng
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          sx={{
            marginLeft:"10px",
            width: '600px', // Tăng chiều rộng modal
            maxWidth: '90%', // Đảm bảo không vượt màn hình nhỏ
          }}
        >
          <DialogTitle>Nội dung hủy đơn</DialogTitle>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                {/* <FormLabel id="demo-controlled-radio-buttons-group">Lý do hủy đơn</FormLabel> */}
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={selectedReason}
                  onChange={(e) =>{
                    setSelectedReason(Number(e.target.value))
                  }}
                >
                  <FormControlLabel checked={selectedReason==0} value="0" control={<Radio />} label="Tôi nhận thấy thông tin không hợp lệ" />
                  <FormControlLabel checked={selectedReason==1} value="1" control={<Radio />} label="Địa chỉ hoặc số điện thoại của bạn không hợp lệ" />
                  <FormControlLabel checked={selectedReason==2} value="2" control={<Radio />} label="Sản phẩm trong kho không đủ" />
                  <FormControlLabel checked={selectedReason==3} value="3" control={<Radio />} label="Đơn vị vận chuyển không nhận đơn này" />
                  <FormControlLabel checked={selectedReason==4} value="4" control={<Radio />} label="Kích thước quá tải" />
                  <FormControlLabel checked={selectedReason==5} value="5" control={<Radio />} label="Lý do khác" />
                </RadioGroup>
              </FormControl>
              <Button onClick={()=>cancelOrder()} type="buttin">Hủy đơn</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default React.memo(ModalCancel)