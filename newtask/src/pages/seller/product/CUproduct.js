import TabNavigation from './tab';
import React, { lazy, useContext, useEffect, useRef, useState } from 'react';
import DescriptionAlerts from './Loader';
import { LuUploadCloud } from 'react-icons/lu';
import { MdDeleteOutline } from 'react-icons/md';
import { TiDelete } from 'react-icons/ti';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Upload from './IconUpload';
import toast from 'react-hot-toast';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../App';
import api from '../../../config/APISeller';
const CategoryModal = lazy(() => import('./ModalCategory'));
const CUProduct = () => {
    const { setFloadingPage } = useContext(AppContext);
    const componentRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isPhanLoai, setIsPhanLoai] = useState(false);
    const [variant, setVariant] = useState({ soLuong: 2, giaBan: 1000, hinhAnh: '', mauSac: { id: 1 }, kichThuoc: { id: 1 } });
    const [flag, setFlag] = useState(0);
    const [isRender, setIsRender] = useState(false);
    const [listProductDetail, setListProductDetail] = useState(new Map());
    const [cate, setCate] = useState(null);
    const [data, setData] = useState({
        mauSac: [],
        kichThuoc: [],
        thuongHieu: [],
    });
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        trangThai: 1,
    });
    const apliVariant = () => {
        let sl = document.getElementById('soLuongPopu').value;
        let pr = document.getElementById('pricePopu').value;
        if (Number(sl) && sl > 0 && Number(pr) && pr > 999) {
            sl = parseInt(sl);
            listProductDetail.forEach((details, productName) => {
                details.soLuong = sl;
                details.giaBan = pr;
            });
            setFlag(flag + 1);
        } else {
            alert('Số nhập không hợp lệ');
        }
    };

    const submit = () => {
        if (cate !== null) {
            product.category = cate;
            product.productImages = images;
            if (isPhanLoai) {
                product.productDetails = Array.from(listProductDetail.values());
            } else {
                product.productDetails = [variant];
            }
            toast.promise(
                api
                    .post('/product/addproduct', product, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => response.data) // Parse JSON response
                    .then((data) => {
                        if (data.status !== 200) {
                            throw new Error(data.message);
                        } else {
                            navigate('/seller/product');
                        }
                    }),
                {
                    loading: 'Creating product.....',
                    success: 'Create product successfully.',
                    error: (error) => error.message,
                },
            );
        } else {
            alert('Chưa chọn cate');
        }
    };

    function checkMau(id) {
        let a = data.mauSac[id];
        a.isCheck = !a.isCheck;
        setIsRender(!isRender);
    }

    function checkKichThuoc(id) {
        let a = data.kichThuoc[id];
        a.isCheck = !a.isCheck;
        setIsRender(!isRender);
    }

    useEffect(() => {
        const mauTamp = data.mauSac.filter((v) => v.isCheck);
        const kichThuocTamp = data.kichThuoc.filter((v) => v.isCheck);
        mauTamp.forEach((v) => {
            kichThuocTamp.forEach((vv) => {
                if (!listProductDetail.has(`${v.tenMau} ${vv.tenKichThuoc}`)) {
                    listProductDetail.set(`${v.tenMau} ${vv.tenKichThuoc}`, {
                        mauSac: v,
                        kichThuoc: vv,
                        soLuong: 1,
                        giaBan: 1000,
                        hinhAnh: '',
                    });
                }
            });
        });
        setFlag(flag + 1);
        // console.log(listProductDetail)
    }, [isRender]);

    const fetchMauSac = () => {
        return fetch('http://localhost:8080/mausac/getall').then((v) => v.json());
    };

    const fetchKichThuoc = () => {
        return fetch('http://localhost:8080/kichthuoc/getall').then((v) => v.json());
    };

    const fetchThuongHieu = () => {
        return fetch('http://localhost:8080/thuonghieu/getall').then((v) => v.json());
    };

    // Sử dụng Promise.all để thực hiện đồng thời
    useEffect(() => {
        setFloadingPage();
        fet();
    }, []);

    const fet = async () => {
        Promise.all([fetchMauSac(), fetchKichThuoc(), fetchThuongHieu()])
            .then(([mauSacResponse, kichThuocResponse, thuongHieuResponse]) => {
                data.mauSac = mauSacResponse.data;
                data.kichThuoc = kichThuocResponse.data;
                data.thuongHieu = thuongHieuResponse.data;
                product.thuongHieu = thuongHieuResponse.data[0];
                setFlag(flag + 1);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleFileChangeKey = (e, key) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('files', file);

        toast.promise(fetch('http://localhost:8080/upload-single-files', {
            method: 'POST',
            body: formData,
        })
            .then((v) => v.json())
            .then((v) => {
                let k = listProductDetail.get(key);
                if (key !== null) {
                    k.hinhAnh = v.data;
                    setFlag(flag+1)
                }
            }),{
                loading:"Đang tải ảnh",
            success:"Tải thành công",
            error:"Tải ảnh thất bại"
            })
    };

    const handleFileChangePopu = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('files', file);
        toast.promise(fetch('http://localhost:8080/upload-single-files', {
            method: 'POST',
            body: formData,
        })
            .then((v) => v.json())
            .then((v) => {
                listProductDetail.forEach((details, productName) => {
                    if (details.hinhAnh === '') {
                        details.hinhAnh = v.data;
                        
                    }
                });
                setFlag(flag+1)
            }),{
                loading:"Đang tải ảnh",
                success:"Tải thành công",
                error:"Tải thất bại"
            })
    };

    function handleFileChanges(e) {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('files', file);
        toast.promise(fetch('http://localhost:8080/upload-single-files-video', {
            method: 'POST',
            body: formData,
        })
            .then((v) => v.json())
            .then((v) => {
                setProduct((prevProduct) => ({
                    ...prevProduct,
                    video: v.data,
                }));
            }),{
                loading:"Đang upload video",
                success:"Tải thành công",
                error:"Có lỗi xảy ra, vui lòng thử lại sao...."
            })
    }

    const handleFileChangeImage = async (e) => {
        const selectedFile = e.target.files[0]; // Chỉ lấy một file duy nhất

        if (!selectedFile) return; // Nếu không có file nào được chọn thì dừng

        const formData = new FormData();
        formData.append('files', selectedFile);

        toast.promise(fetch('http://localhost:8080/upload-single-files', {
            // Endpoint tải lên 1 file
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    product.hinhAnh = data.data;
                    setFlag(flag+1)
                } else {
                    alert('Tải ảnh thất bại');
                }
            }),{
                loading:"Đang upload",
                success:"Upload thành công",
                error:"Tải thất bại"
            })
    };

    const handleFileChange = async (e) => {
        let selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 5) {
            selectedFiles = selectedFiles.slice(0, 5);
        } else {
        }
        const formData = new FormData();
        selectedFiles.forEach((file) => {
            formData.append('files', file);
        });

        toast.promise(fetch('http://localhost:8080/upload-multiple-files', {
            method: 'POST',
            body: formData,
        })
            .then((v) => v.json())
            .then((v) => {
                setImages(v.data);
                product.hinhAnh = v.data[0].hinhAnh;
            }),{
                loading:"Đang tải ảnh",
                success:"Tải ảnh thành công",
                error:"Tải ảnh thất bại"
            })
    };
    return (
        <>
            <div>
                <Suspense fallback={<div>Loading...</div>}>
                    <CategoryModal setCate={setCate}></CategoryModal>
                </Suspense>
            </div>
            <div ref={componentRef} style={{ scrollBehavior: 'smooth' }}>
                <div id="productinfo" className="container mt-2 mx-auto p-4  bg-white " style={{ borderRadius: '7px' }}>
                    <p className="font-semibold text-md text-blue-700">Thông tin cơ bản</p>
                    <div>
                        <div class="container mx-auto mt-3">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12 lg:col-span-2 text-sm font-semibold  lg:text-right sm:text-left">
                                    Hình ảnh sản phẩm.
                                </div>

                                <div className="col-span-12 lg:col-span-10">
                                    <div className="col-span-12 lg:col-span-10">
                                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                                            {images.map((v, index) => (
                                                <div
                                                    key={index}
                                                    style={{ borderRadius: '5px', position: 'relative' }}
                                                    className="p-1 h-24 flex justify-center items-center border"
                                                >
                                                    <img
                                                        style={{
                                                            width: '80px',
                                                            height: '80px',
                                                            objectFit: 'cover',
                                                        }}
                                                        src={v.hinhAnh}
                                                        alt={`Image ${index + 1}`}
                                                    />
                                                    <p
                                                        onClick={() => {
                                                            if (images[index] != null) {
                                                                images.splice(index, 1);
                                                                setFlag(flag + 1);
                                                            }
                                                        }}
                                                        style={{
                                                            position: 'absolute',
                                                            right: '0px',
                                                            top: '0px',
                                                            zIndex: '12',
                                                        }}
                                                    >
                                                        <TiDelete size={20} />
                                                    </p>
                                                </div>
                                            ))}
                                            <Upload lable="images" />
                                            <input
                                                onChange={(e) => {
                                                    handleFileChange(e);
                                                }}
                                                style={{ display: 'none' }}
                                                id="images"
                                                type="file"
                                                multiple
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container mx-auto mt-3">
                            <div className="grid grid-cols-12 gap-4 items-center">
                                <label
                                    className="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right sm:text-left"
                                    htmlFor="image"
                                >
                                    Ảnh đại diện
                                </label>
                                <div className="col-span-12 lg:col-span-10 flex items-center gap-2">
                                    {product.hinhAnh && (
                                        <div
                                            className="p-1 h-24 flex justify-center items-center border rounded"
                                            style={{ position: 'relative' }}
                                        >
                                            <img src={product.hinhAnh} className="w-20 h-20 object-cover" alt="Product" />
                                        </div>
                                    )}
                                    <input id="image" type="file" multiple style={{ display: 'none' }} onChange={handleFileChangeImage} />
                                    <Upload lable="image" />
                                </div>
                                
                            </div>
                        </div>

                        {/* Video */}
                        <div class="container mx-auto mt-3">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12 lg:col-span-2 text-sm font-semibold  lg:text-right sm:text-left">
                                    Video Sản phẩm
                                </div>

                                <div class="col-span-12 lg:col-span-10 flex items-center">
                                    {product.video !== undefined && (
                                        <video style={{ width: '95px', height: '95px' }} controls>
                                            <source src={product.video} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    <input
                                        onChange={(e) => {
                                            handleFileChanges(e);
                                        }}
                                        hidden
                                        style={{ display: 'none' }}
                                        id="videoProduct"
                                        type="file"
                                        accept=".mp4,.avi,.mkv"
                                    />
                                    <Upload lable="videoProduct" />
                                </div>
                            </div>
                        </div>

                        <div class="container mx-auto mt-4">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right sm:text-left">Tên sản phẩm</div>

                                <div class="col-span-12 lg:col-span-10  ">
                                    <input
                                        value={product.tenSanPham}
                                        onChange={(e) => {
                                            product.tenSanPham = e.target.value;
                                            setFlag(flag + 1);
                                        }}
                                        type="text"
                                        placeholder="Nhập tên sản phẩm."
                                        class="p-2 w-11/12 lg:w-10/12 p-1 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                    />
                                    {product.tenSanPham !== undefined && product.tenSanPham.length < 10 &&(
                                        <p className="hidden lg:block text-xs mt-2 text-danger">Số lượng ký tự lớn hơn 10 và nhỏ hơn 150</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div class="container mx-auto mt-4">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right sm:text-left">Ngành hàng</div>
                                 <div class="col-span-12 lg:col-span-10  ">
                                    <input
                                        onClick={() => {
                                            document.getElementById('hello').click();
                                        }}
                                        placeholder="Chọn ngành hàng"
                                        class="w-11/12 p-2 cursor-pointer lg:w-10/12 p-1 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                    />
                                    <p className="hidden lg:block text-sm mt-2 ">
                                        <span className="hidden lg:block text-sm mt-2  font-medium">Đã chọn</span>: {cate != null ? cate.tenLoai : ''}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="container mx-auto mt-3">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12 lg:col-span-2 text-sm font-semibold  lg:text-right sm:text-left">Thương hiệu</div>

                                <div class="col-span-12 lg:col-span-10  ">
                                    <select class="w-11/12 p-2 lg:w-10/12 p-1 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm">
                                        {data.thuongHieu.map((v, index) => (
                                            <option
                                                onClick={() => {
                                                    if (data.thuongHieu[index] !== null) {
                                                        product.thuongHieu = data.thuongHieu[index];
                                                    }
                                                }}
                                            >
                                                {v.tenMau}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="container mx-auto mt-3">
                            <div class="grid grid-cols-12 gap-4">
                                <div class="col-span-12 lg:col-span-2 text-sm font-semibold lg:text-right sm:text-left">mô tả sản phẩm</div>

                                <div class="col-span-12 lg:col-span-10  ">
                                    <CKEditor
                                        style={{ width: '50%' }}
                                        editor={ClassicEditor}
                                        onChange={(event, editor) => {
                                            product.moTa = editor.getData();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Thông tin chi tiết  */}
                <div id="productdetail" className="container mt-2 mx-auto p-4 relative bg-white " style={{ borderRadius: '7px' }}>
                    <p className="text-blue-700 font-semibold  ">Thông tin biến thể</p>

                    {/* Sản phẩm mặc định */}
                    <div className="mt-5  flex items-center justify-start" style={{ alignItems: 'start' }}>
                        <span className=" w-1/6 text-md font-semibold">
                            <strong className="text-danger ">* </strong> Sản phẩm mặc định
                            <div class="flex items-center mb-4"></div>
                        </span>
                        <div className=" w-5/6 relative  rounded-md shadow-md p-3">
                            <button
                                onClick={() => {
                                    setIsPhanLoai(!isPhanLoai);
                                }}
                                style={{ border: '1.5px solid orangered', hover: '' }}
                                class=" mb-3  text-red-500   px-4 py-2 mt-2 md:mt-0 rounded hover:bg-red-50"
                            >
                                {' '}
                                + Thêm phân loại
                            </button>
                            <p className="mt-1 mb-3 text-sm font-medium">Giá bán</p>
                            <input
                                disabled={isPhanLoai}
                                value={variant.giaBan}
                                onChange={(e) => {
                                    variant.giaBan = e.target.value;
                                    setFlag(flag + 1);
                                }}
                                type="text"
                                placeholder="Nhập giá bán"
                                class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                            />
                            {variant.giaBan < 1000 ? <p className="mt-1 text-xs text-danger">Giá vui lòng lớn hơn = 1000</p> : <></>}
                            <p className="mt-3 mb-3 text-sm font-medium">Số lượng</p>
                            <input
                                value={variant.soLuong}
                                disabled={isPhanLoai}
                                onChange={(e) => {
                                    variant.soLuong = e.target.value;
                                    setFlag(flag + 1);
                                }}
                                type="text"
                                placeholder="Nhập số lượng"
                                class="w-11/12 lg:w-10/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                            />
                            {variant.soLuong < 1 ? <p className="mt-1 text-xs text-danger">Giá vui lòng lớn hơn = 1000</p> : <></>}
                        </div>
                    </div>

                    {/* Tên sản phẩm */}
                    <div
                        className="mt-5 transition-all duration-500 ease-in-out flex items-center justify-start"
                        style={{ alignItems: 'start', height: `${isPhanLoai ? '' : '0px'}`, overflow: 'hidden' }}
                    >
                        <span className="text-md font-semibold w-1/6">
                            <strong className="text-danger">* </strong> Sản phẩm biến thể
                            <div class="flex items-center mb-4"></div>
                        </span>
                        <div className="w-5/6 relative  rounded-md shadow-md p-3">
                            <p className="mt-2 mb-3 text-md font-semibold">Màu sắc</p>
                            {data.mauSac.map((v, index) => {
                                return (
                                    <>
                                        <span
                                            style={{
                                                cursor: 'pointer',
                                                border: v.isCheck ? '1px solid #F0644E ' : '1px solid lightgray',
                                                position: 'relative',
                                            }}
                                            onClick={() => {
                                                checkMau(index);
                                            }}
                                            className="pl-5 rounded-sm d-inline-block pr-5 pt-2 pb-2 mr-2"
                                        >
                                            {v.tenMau}
                                            {v.isCheck && (
                                                <span
                                                    className=" position-absolute font-medium rounded-full "
                                                    style={{ zIndex: '999', bottom: '0', right: '2px', color: 'red' }}
                                                >
                                                    ✓
                                                </span>
                                            )}
                                        </span>
                                    </>
                                );
                            })}

                            <p className="mt-3 mb-3 text-md font-semibold">Kích thước </p>
                            {data.kichThuoc.map((v, id) => {
                                return (
                                    <>
                                        <span
                                            onClick={() => {
                                                checkKichThuoc(id);
                                            }}
                                            style={{
                                                cursor: 'pointer',
                                                border: v.isCheck ? '1px solid #F0644E ' : '1px solid lightgray',
                                                position: 'relative',
                                            }}
                                            className="pl-5 rounded-sm d-inline-block pr-5 pt-2 pb-2 mr-2"
                                        >
                                            {v.tenKichThuoc}
                                            {v.isCheck && (
                                                <span
                                                    className=" position-absolute font-medium rounded-full "
                                                    style={{ zIndex: '999', bottom: '0', right: '2px', color: 'red' }}
                                                >
                                                    ✓
                                                </span>
                                            )}
                                        </span>
                                    </>
                                );
                            })}

                            <div class="relative overflow-x-auto mt-3">
                                <div className="mt-3 mb-3">
                                    <input
                                        id="soLuongPopu"
                                        type="number"
                                        placeholder="Số lượng"
                                        class="w-5/12 mr-2 lg:w-3/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                    />

                                    <input
                                        id="pricePopu"
                                        type="number"
                                        placeholder="Giá bán"
                                        class="mr-2 w-5/12 lg:w-3/12 p-2 border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm"
                                    />
                                    <button
                                        onClick={() => {
                                            apliVariant();
                                        }}
                                        className="text-white rounded-sm text-sm p-2 mr-2"
                                        style={{ backgroundColor: 'orangered' }}
                                    >
                                        Áp dụng cho tất cả{' '}
                                    </button>
                                    <input
                                        onChange={(e) => {
                                            handleFileChangePopu(e);
                                        }}
                                        id="filepopu"
                                        type="file"
                                        style={{ display: 'none' }}
                                    ></input>

                                    <div
                                        onClick={() => {
                                            document.getElementById('filepopu').click();
                                        }}
                                        className="cursor-pointer p-2   rounded-sm  inline-block text-center"
                                        style={{ border: '1px solid orangered' }}
                                    >
                                        {/* <LuUploadCloud color="blue" size={24} /> */}
                                        <span className="text-xs font-medium " style={{ color: 'orangered' }}>
                                            Upload cho sp chưa có ảnh
                                        </span>
                                    </div>
                                </div>
                                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-200 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" class="px-6 py-3">
                                                Tên biến thể
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Hình ảnh
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Số lượng
                                            </th>
                                            <th scope="col" class="px-6 py-3">
                                                Giá bán
                                            </th>
                                            <th scope="col" class="px-6 py-3"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from(listProductDetail).map(([key, value]) => (
                                            <tr
                                                class="bg-white  dark:bg-gray-800 dark:border-gray-700"
                                                style={{ borderBottom: '1px dotted lightgray' }}
                                            >
                                                <th
                                                    scope="row"
                                                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                                                >
                                                    {key}
                                                </th>
                                                <td class="px-6 py-4" style={{ cursor: 'pointer', position: 'relative' }}>
                                                    {value.hinhAnh === '' ? (
                                                        <>
                                                            <div className="p-2 border-dashed">
                                                                <LuUploadCloud
                                                                    onClick={() => {
                                                                        document.getElementById(key).click();
                                                                    }}
                                                                    color="blue"
                                                                    size={22}
                                                                />
                                                            </div>
                                                            <input
                                                                onChange={(e) => {
                                                                    handleFileChangeKey(e, key);
                                                                }}
                                                                hidden
                                                                type="file"
                                                                id={key}
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <img width={'50px'} src={value.hinhAnh} />
                                                            <p
                                                                onClick={() => {
                                                                    listProductDetail.get(key).hinhAnh = '';
                                                                    setFlag(flag + 1);
                                                                }}
                                                                className="absolute right-0 top-0 z-12"
                                                            >
                                                                <TiDelete size={20} />
                                                            </p>
                                                        </>
                                                    )}
                                                    {/* handleFileChangeKey */}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <input
                                                        style={{ border: '1px solid gray' }}
                                                        type="text"
                                                        name="price"
                                                        id="price"
                                                        value={value.soLuong}
                                                        onChange={(e) => {
                                                            value.soLuong = e.target.value;
                                                            setFlag(flag + 1);
                                                        }}
                                                        className="block w-5/6 rounded-sm border-1 py-1.5 pl-3 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="12000đ"
                                                    />
                                                    <p className="text-danger text-xs">
                                                        {value.soLuong < 1 ? '* Số lượng phải lớn hơn 0' : ''}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <input
                                                        style={{ border: '1px solid gray' }}
                                                        type="text"
                                                        name="price"
                                                        value={value.giaBan}
                                                        onChange={(e) => {
                                                            value.giaBan = e.target.value;
                                                            setFlag(flag + 1);
                                                        }}
                                                        id="price"
                                                        className="block w-5/6 rounded-sm border-1 py-1.5 pl-3 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                        placeholder="12000đ"
                                                    />
                                                    <p className="text-danger text-xs">
                                                        {value.giaBan < 1000 ? '* Số lượng phải lớn hơn 1000' : ''}
                                                    </p>
                                                </td>
                                                <td
                                                    onClick={() => {
                                                        listProductDetail.delete(key);
                                                        setFlag(flag + 1);
                                                    }}
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    {' '}
                                                    <MdDeleteOutline color="red" size={25} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <button
                                onClick={() => {
                                    submit();
                                }}
                                type="button"
                                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg mt-3 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CUProduct;
