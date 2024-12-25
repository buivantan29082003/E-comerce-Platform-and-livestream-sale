import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import { useState } from 'react';
import { Textarea } from '@mui/joy';
import { BiAddToQueue } from 'react-icons/bi';
import { BsCloudUploadFill } from 'react-icons/bs';
// import api from "../../config/APIUser";
import toast from 'react-hot-toast';
import api from '../../../config/APIClient';

export default function ModalReport({ order }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({
        order: {
            id: order.id,
        },
        noiDung: '',
        hinhAnh: '',
    });
    const submit = () => {
        toast.promise(
            api
                .post('/addreport', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((v) => v.data)
                .then((v) => {
                    if (v.status !== 200) {
                        throw new Error(v.message);
                    }
                }),
            {
                loading: 'Đang thêm report',
                success: 'Đã gửi report đến quản trị, vui lòng đợi thông báo sau',
                error: (error) => error.message,
            },
        );
    };
    const [flags, setFlags] = useState(0);

    const handleFileChangePopu = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('files', file);

        toast.promise(
            fetch('http://localhost:8080/upload-single-files', {
                method: 'POST',
                body: formData,
            })
                .then((v) => v.json())
                .then((v) => {
                    setData((prevData) => ({
                        ...prevData,
                        hinhAnh: v.data,
                    }));
                }),
            {
                loading: 'Đang tải ảnh',
                success: 'Đã tải ảnh',
                error: (error) => error.message,
            },
        );
    };
    return (
        <>
            <Button variant="outlined" color="neutral" startDecorator={<BiAddToQueue />} onClick={() => setOpen(true)}>
                Báo cáo vi phạm
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog
                    sx={{
                        width: '600px', // Chiều rộng cố định
                    }}
                >
                    <DialogTitle>Report đơn hàng</DialogTitle>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            setOpen(false);
                        }}
                    >
                        <Stack spacing={2}>
                            <div class="flex flex-wrap items-center">
                                <div class="w-full md:w-1/2">
                                    <p class="text-sm font-medium mt-2 truncate">Id đơn: {order.id}</p>
                                    <p class="text-sm font-medium  mt-2 truncate">
                                        Trạng thái đơn:
                                        {order.trangThai.tenTrangThai}
                                    </p>
                                    <p class="text-sm font-medium  mt-2 truncate">
                                        Người hủy:
                                        {order.nguuoiHuy == 0 ? 'Khách hàng' : 'Shop hủy'}
                                    </p>
                                </div>
                                <div class="w-full md:w-1/2 p-2">
                                    <p class="text-sm font-medium mt-2 truncate">Tên khách hàng: {order.accountId.hoVaTen}</p>
                                    <p class="text-sm font-medium  mt-2 truncate">Thông tin liên hệ: {order.accountId.soDienThoai}</p>
                                </div>
                            </div>
                            <p className="font-medium">Mô tả tình trạng đơn hàng</p>
                            <input
                                onChange={(e) => handleFileChangePopu(e)}
                                type="file"
                                id="im"
                                multiple
                                style={{ display: 'none' }}
                            ></input>
                           <div className="grid grid-cols-2 gap-4">
  <div>
    <Textarea
      rows={7}
      onChange={(e) =>
        setData((prevData) => ({
          ...prevData,
          noiDung: e.target.value,
        }))
      }
      required
    />
  </div>
  <div className="flex align-items-center">
    <span
      className="text-xs  p-2 border mr-2 rounded-sm"
      onClick={() => {
        document.getElementById('im').click();
      }}
    >
      Thêm ảnh <BsCloudUploadFill style={{ display: 'inline' }} />
    </span>
    <div className="mt-2">
      <img style={{ width: '150px' }} src={data.hinhAnh} />
    </div>
  </div>
</div>

                            
                            <Button
                                type="button"
                                onClick={() => {
                                    submit();
                                }}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </>
    );
}
