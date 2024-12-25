// import { useState, useEffect, useRef } from 'react';
// import { useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import apiUser from '../../../config/APINormal';
// import api from '../../../config/APIClient';
// import { Pagination, PaginationItem, Rating, Stack } from '@mui/material';
// import { IoArrowBackCircleOutline, IoArrowForwardCircleOutline } from 'react-icons/io5';
// import toast from 'react-hot-toast';
// const DetailProduct = () => {
//     const { id } = useParams();
//     const [dataFill,setdataFill]=useState({

//     })
//     const fetchCounstar=()=>{
//         apiUser.post("/danhgia/getcountstart",[...Array.from(productMap.keys())],
//         {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         }).then(v=>v.data).then(v=>{
//             setdataFill(v)
//         })
//     }
//     const [product, setProduct] = useState({
//         product: {
//             productImages: [],
//             productDetails: [],
//             thuongHieu: {},
//             category: {},
//         },
//         khuyenMai: {},
//     });
//     const [productMap, setProductMap] = useState(new Map());
//     const proccess = async (data) => {
//         data.forEach((v) => {
//             productMap.set(v.id, v.mauSac.tenMau + '  ' + v.kichThuoc.tenKichThuoc);
//         });
//         fetchCounstar()
//         setFlag(flag+1)
//     };
//     const [vouchers, setVouchers] = useState([]);
//     const StyledWrapper = styled.div`
//         .button {
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             padding: 6px 10px;
//             gap: 15px;
//             background-color: #181717;
//             outline: 3px #181717 solid;
//             outline-offset: -3px;
//             border-radius: 5px;
//             border: none;
//             cursor: pointer;
//             transition: 400ms;
//         }

//         .button .text {
//             color: white;
//             font-weight: 700;
//             font-size: 1em;
//             transition: 400ms;
//         }

//         .button svg path {
//             transition: 400ms;
//         }

//         .button:hover {
//             background-color: transparent;
//         }

//         .button:hover .text {
//             color: #181717;
//         }

//         .button:hover svg path {
//             fill: #181717;
//         }
//     `;
//     const getVoucherByProduct = () => {
//         api.get(`/voucher/gevoucherbyproductid/${id}`)
//             .then((v) => v.data)
//             .then((v) => {
//                 setVouchers(v.data);
//             })
//             .catch((Error) => {
//                 alert(Error);
//             });
//     };

//     const addToCart = () => {
//         if (cart.product.id !== undefined) {
//             toast.promise(api.post(
//                 '/cart/addtocart',
//                 {
//                     productDetailId: cart.product.id,
//                     soLuong: cart.soLuong,
//                 },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 },
//             )
//                 .then((v) => v.data)
//                 .then((v) => {
//                     if (v.status !== 200) {
//                         throw new Error(v.message);
//                     }
//                 }),{
//                     loading:"Đang thêm vào giỏ hàng",
//                     success:"Thêm thành công vào giỏ hàng",
//                     error:error=>error.message
//                 })
//         } else {
//             alert('Chưa chọn sản phẩm nào');
//         }
//     };

//     // const [productDetails, setProductDetails] = useState([]);
//     const [flag, setFlag] = useState(0);
//     useEffect(() => {
//         apiUser
//             .get(`/product/productdetail/${id}`)
//             .then((v) => v.data)
//             .then((v) => {
//                 if (v.status === 200) {
//                     product.product = v.data.product;
//                     proccess(product.product.productDetails);
//                     let a = product.product.productDetails;
//                     let minPrice = a[0].giaBan;
//                     let maxPrice = a[0].giaBan;

//                     for (let i = 1; i < a.length; i++) {
//                         if (a[i].giaBan < minPrice) {
//                             minPrice = a[i].giaBan;
//                         }
//                         if (a[i].giaBan > maxPrice) {
//                             maxPrice = a[i].giaBan;
//                         }
//                         product.product.minPrice = minPrice;
//                         product.product.maxPrice = maxPrice;
//                     }
//                     const map = v.data.product.productDetails.reduce((acc, item) => {
//                         const key = item.kichThuoc.id;
//                         if (!acc.has(key)) {
//                             acc.set(key, {
//                                 kichThuoc: item.kichThuoc,
//                                 productDetails: [],
//                             });
//                         }
//                         acc.get(key).productDetails.push(item);
//                         return acc;
//                     }, new Map());
//                     product.product.productDetails = map;
//                     setProductDetails(map.values().next().value.productDetails);
                    
//                 }
//             });
//         getVoucherByProduct();
//     }, []);
//     const tableRef = useRef(null);

//     const [cart, setCart] = useState({
//         product: {},
//         soLuong: 1,
//     });
//     return (
//         <>
//             <div ref={tableRef} className="flex flex-col space-y-4 bg-gray-100 min-h-screen p-4">
//                 {/* Phần đầu */}
//                 <div className="flex flex-col md:flex-row w-full p-4 md:space-x-4 bg-gray-100">
//                     {/* Phần hình ảnh sản phẩm bên trái */}
//                     <div className="md:w-1/3 w-full mb-4 md:mb-0">
//                         <div className="space-y-2">
//                             <div className="border border-gray-300 p-2 rounded-md">
//                                 <img src={product.product.hinhAnh} alt="Main Product" className="w-full h-auto" />
//                             </div>
//                             <div className="flex space-x-2">
//                                 {product.product.productImages.map((v) => {
//                                     return <img src={v.hinhAnh} alt="Thumbnail" className="w-16 h-16 border border-gray-300 rounded-md" />;
//                                 })}
//                             </div>
//                         </div>
//                     </div>

//                     {/* Phần thông tin sản phẩm bên phải */}
//                     <div className="md:w-2/3 w-full">
//                         <h2 className="text-xl md:text-2xl text-gray-800">{product.product.tenSanPham}</h2>

//                         {/* Đánh giá và số lượng đã bán */}
//                         <div className="flex items-center space-x-2 mt-2">
//                             <span className="text-yellow-500"><Rating name="half-rating-read" defaultValue={dataFill["6"]/dataFill["7"]} precision={0.5} readOnly /></span>
//                             <span className="text-gray-600">({dataFill["7"]} Đánh Giá | 124 Đã bán)</span>
//                         </div>

//                         <Promotion khuyenMai={product.khuyenMai} minPrice={product.product.minPrice} maxPrice={product.product.maxPrice} />
//                         <div class="mt-2 ">
//                             <h3 className="text-gray-500  text-sm">Voucher shop:</h3>
//                             <div class="flex space-x-2 mt-2">
//                                 {vouchers.map((v) => (
//                                     <span class="bg-red-100 text-red-500 px-2 py-1 rounded-full text-sm font-medium">
//                                         Giảm {v.loaiVoucher === 1 ? '%' : 'đ'} {v.giaTriGiam}
//                                     </span>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Phân loại sản phẩm */}
//                         <div className="mt-4">
//                             <h3 className="text-gray-500  text-sm">Màu sắc:</h3>
//                             <div className="flex space-x-2 mt-2">
//                                 {[...product.product.productDetails.values()].map((value, index) => (
//                                     <button
//                                         onClick={() => {
//                                             setProductDetails(value.productDetails);
//                                         }}
//                                         className="border border-gray-300 px-4 py-2 rounded-md"
//                                     >
//                                         {value.kichThuoc.tenKichThuoc}
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>

//                         {/* Tùy chọn */}
//                         <div className="mt-4">
//                             <h3 className="text-gray-500 text-sm ">Kích cỡ:</h3>
//                             <div className="flex space-x-2 mt-2">
//                                 {productDetails.map((mauSac) => {
//                                     return (
//                                         <button
//                                             onClick={() => {
//                                                 cart.product = mauSac;
//                                                 setFlag(flag + 1);
//                                             }}
//                                             class="flex items-center space-x-2 p-2 bg-white rounded-sm border border-transparent hover:border-red-500 focus:outline-none focus:border-red-500"
//                                         >
//                                             <img style={{ width: '30px' }} src={mauSac.hinhAnh} />
//                                             <span class="text-gray-800 font-semibold">
//                                                 {mauSac.mauSac.tenMau} - {mauSac.kichThuoc.tenKichThuoc}
//                                             </span>
//                                         </button>
//                                     );
//                                 })}
//                             </div>
//                         </div>

//                         {/* Số lượng */}
//                         <div className="mt-4 flex items-center space-x-2">
//                             <span className="text-gray-700 font-semibold">Số lượng:</span>
//                             <div className="flex items-center border border-gray-300 rounded-md">
//                                 <button
//                                     onClick={() => {
//                                         if (cart.soLuong > 1) {
//                                             cart.soLuong -= 1;
//                                             setFlag(flag + 1);
//                                         }
//                                     }}
//                                     className="px-3 py-1 text-gray-700"
//                                 >
//                                     -
//                                 </button>
//                                 <input
//                                     onChange={(e) => {
//                                         let a = e.target.value;
//                                         if (a > 0) {
//                                             cart.soLuong = e.target.value;
//                                             setFlag(flag + 1);
//                                         }
//                                     }}
//                                     type="text"
//                                     value={cart.soLuong}
//                                     className="w-10 text-center border-l border-r border-gray-300 outline-none"
//                                 />
//                                 <button
//                                     onClick={() => {
//                                         cart.soLuong += 1;
//                                         setFlag(flag + 1);
//                                     }}
//                                     className="px-3 py-1 text-gray-700"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                             <span>{cart.product.soLuong} sản phẩm có sẵn</span>
//                         </div>

//                         {/* Các nút Thêm vào giỏ hàng và Mua ngay */}
//                         <div className="mt-4 flex space-x-2 ">
//                             <StyledWrapper>
//                                 <button onClick={() => addToCart()} className="button ">
//                                     <svg
//                                         viewBox="0 0 16 16"
//                                         className="bi bi-cart-check"
//                                         height={15}
//                                         width={15}
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="#fff"
//                                     >
//                                         <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z" />
//                                         <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
//                                     </svg>
//                                     <p className="text mt-2">Thêm vào giỏ hàng</p>
//                                 </button>
//                             </StyledWrapper>
//                             <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex-1">Mua ngay</button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Phần dưới */}
//                 <div className="bg-gray-100 min-h-screen p-4">
//                     {/* Header */}
//                     <div className="bg-white p-4 rounded-lg shadow-md">
//                         <div className="flex items-center space-x-4">
//                             <img src="path/to/your-avatar.jpg" alt="avatar" className="w-12 h-12 rounded-full" />
//                             <div>
//                                 <h1 className="text-lg font-semibold">rkwy666.vn</h1>
//                                 <p className="text-sm text-gray-600">Online 42 phút trước</p>
//                             </div>
//                             <button className="ml-auto bg-blue-500 text-white px-4 py-1 rounded">Theo Dõi</button>
//                         </div>
//                         <div className="mt-4 flex space-x-8">
//                             <p>
//                                 Lượt Đánh Giá: <span className="font-semibold">7.2K</span>
//                             </p>
//                             <p>
//                                 Tỉ Lệ Phản Hồi: <span className="font-semibold">90%</span>
//                             </p>
//                             <p>
//                                 Tham Gia Vào: <span className="font-semibold">12 tháng trước</span>
//                             </p>
//                             <p>
//                                 Sản Phẩm: <span className="font-semibold">128</span>
//                             </p>
//                             <p>
//                                 Số Người Theo Dõi: <span className="font-semibold">3.4K</span>
//                             </p>
//                         </div>
//                     </div>

//                     {/* Product Details */}
//                     <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
//                         <h2 className="text-xl font-semibold">CHI TIẾT SẢN PHẨM</h2>
//                         <div className="mt-4 grid grid-cols-2 gap-4">
//                             <div>
//                                 <p>
//                                     <span className="font-semibold">Danh mục:</span> {product.product.category.tenLoai}
//                                 </p>
//                                 <p>
//                                     <span className="font-semibold">Thương hiệu:</span> {product.product.thuongHieu.tenThuongHieu}
//                                 </p>
//                                 <p>
//                                     <span className="font-semibold">Số Sản Phẩm Còn Lại:</span> 373737373
//                                 </p>
//                                 <p>
//                                     <span className="font-semibold">Số lược đã bán:</span> 98k
//                                 </p>
//                             </div>
//                             <div className="bg-blue-100 p-4 rounded-lg text-center">
//                                 <p className="font-semibold">Mã giảm giá của Shop</p>
//                                 <div className="mt-2 space-y-2">
//                                     <button className="bg-blue-500 text-white py-1 px-4 rounded">
//                                         Giảm 49.000đ Đơn tối thiểu 300.000đ
//                                     </button>
//                                     <button className="bg-blue-500 text-white py-1 px-4 rounded">
//                                         Giảm 50.000đ Đơn tối thiểu 400.000đ
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Product Description */}
//                     <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
//                         <h2 className="text-xl font-semibold">MÔ TẢ SẢN PHẨM</h2>

//                         <p>{product.product.moTa}</p>
//                     </div>
//                 </div>

//                 <div className="bg-gray-100 p-4 min-h-screen">
//                     {/* Header */}
//                     <div className="bg-white p-4 rounded-lg shadow-md">
//                         <h2 className="text-2xl font-semibold">Đánh Giá Sản Phẩm</h2>
//                         {dataFill["7"]==0? <h2 className="text-lg text-red-600 font-semibold"> Chưa có đánh giá</h2>:<h2 className="text-lg text-red-600 font-semibold">{dataFill["6"]/dataFill["7"]} trên 5</h2>}
//                         <div className="flex items-center mt-2">
//                             <span className="text-yellow-500">
//                             <Rating size="large" name="half-rating-read" defaultValue={dataFill["6"]/dataFill["7"]} precision={0.5} readOnly /></span>
//                             <span className="text-gray-600 ml-2">({dataFill["7"]} đánh giá)</span>
//                         </div>
//                     </div>

//                     {/* Bộ lọc đánh giá */}
//                     <div className="bg-white p-4 mt-4 rounded-lg shadow-md flex space-x-2">
//                         <button className="px-4 py-2 rounded-md border border-blue-500 text-blue-500">Tất Cả ({dataFill["7"]})</button>
//                         <button className="px-4 py-2 rounded-md border border-gray-300">5 Sao ({dataFill["5"]})</button>
//                         <button className="px-4 py-2 rounded-md border border-gray-300">4 Sao ({dataFill["4"]})</button>
//                         <button className="px-4 py-2 rounded-md border border-gray-300">3 Sao ({dataFill["3"]})</button>
//                         <button className="px-4 py-2 rounded-md border border-gray-300">2 Sao ({dataFill["2"]})</button>
//                         <button className="px-4 py-2 rounded-md border border-gray-300">1 Sao ({dataFill["1"]})</button>
//                         {/* <button className="px-4 py-2 rounded-md border border-gray-300">Có Bình Luận ({dataFill["7"]})</button> */}
//                     </div>

//                     {/* Danh sách đánh giá */}
//                     <div className="mt-4 space-y-4">
//                         <Reviews flag={flag} productMap={productMap} />
//                     </div>

//                     {/* Phân trang */}
                   
//                 </div>
//             </div>
//         </>
//     );
// };

// export default DetailProduct;

// const Promotion = ({ khuyenMai, minPrice, maxPrice }) => {
//     return (
//         <>
//             {khuyenMai.giaTriKhuyenMai!=null&&<>
//                 <div class="bg-orange-500 text-white p-2 flex items-center justify-between">
//                 <div class="flex items-center">
//                     <span class="font-bold text-lg">⚡ Giảm giá</span>
//                 </div>
//                 <div class="flex items-center space-x-2">
//                     <span class="text-sm">KẾT THÚC TRONG</span>
//                     <div class="bg-black text-white px-2 py-1 rounded">00</div>
//                     <div class="bg-black text-white px-2 py-1 rounded">28</div>
//                     <div class="bg-black text-white px-2 py-1 rounded">38</div>
//                 </div>
//             </div>

//             <div class="bg-red-50 p-4 flex items-center space-x-4">
//                 <div>
//                     <span class="text-md  text-red-600">
//                         ₫{minPrice} - đ{maxPrice}
//                     </span>
//                     <span class="text-gray-500 line-through ml-2">
//                         đ{minPrice - (minPrice * khuyenMai.giaTriKhuyenMai) / 100} -đ
//                         {maxPrice - (maxPrice * khuyenMai.giaTriKhuyenMai) / 100}
//                     </span>
//                     <span class="text-red-600 ml-2">-{khuyenMai.giaTriKhuyenMai}%</span>
//                 </div>
//             </div>
//             </> }
//         </>
//     );
// };

// const Reviews = ({ productMap,flag}) => {
//     const [reviews, setReviews] = useState([]);
//     const [filter,setFilter]=useState({
//         page:0,
//         numPage:0
//     })
//     const getReview=()=>{
//         apiUser.post(
//             "/danhgia/getbyproductid",
//             [...Array.from(productMap.keys())], 
//             {
//                 headers: {
//                     "Content-Type": "application/json"
//                 }
//             }
//         )
//         .then(v => v.data)
//         .then(vv => {
//             vv.content.forEach(v => {
//                 v.productCate = productMap.get(v.productId);
//             });
//             filter.numPage=vv.totalPages
//             setReviews(vv.content)
//         })
//         .catch(error => {
//             console.log("Error:", error);
//         });
//     }
//     useEffect(()=>{
//         getReview()
//     },[flag])
//     return (
//         <>
//             {reviews.map((v) => {
//                 return (
//                     <div className="bg-white p-4 rounded-lg shadow-md">
//                         <div className="flex items-start space-x-4">
//                             <img src="https://via.placeholder.com/50" alt="avatar" className="w-12 h-12 rounded-full" />
//                             <div className="flex-1">
//                                 <div className="flex items-center justify-between">
//                                     <div className="font-semibold">{v.account.hoVaTen}</div>
//                                 </div>
//                                 <div className="text-yellow-500"> <Rating name="size-small" defaultValue={v.soSao} size="small" /></div>
//                                 <p className="text-xs text-gray-500">2024-09-18 17:28 | Phân loại hàng: Mô Hình {v.productCate}</p>
//                                 <p className="mt-2">{v.noiDungDanhGia}</p>
//                                 <div className="flex space-x-2 mt-2">
//                                     {v.chiTietDanhGias!=null&&v.chiTietDanhGias.map(v=>{
//                                         return v.type==="IMAGE"?<img src={v.link}
//                                         alt="product"
//                                         style={{width:"50px"}}
//                                         className="w-16 h-16 border border-gray-300 rounded-md"
//                                     />:<video src={"https://down-aka-sg.vod.susercontent.com/api/v4/11110103/mms/vn-11110103-6ke17-lt0n10f1olok32.16000051710742320.mp4"}
//                                     style={{width:"50px"}}
//                                     controls
//                                     loop 
//                                     className="w-16 h-16 border border-gray-300 rounded-md"
//                                      />
//                                     })}
//                                 </div>

//                                 <div className="bg-gray-100 p-2 mt-2 rounded-md">
//                                     <p className="text-sm text-gray-700 font-semibold">Phản Hồi Của Người Bán:</p>
//                                     <p className="text-sm text-gray-600">{v.shopPhanHoi}</p>
//                                 </div>
//                             </div>
//                         </div>
                        
//                     </div>
//                 );
//             })}
//             <Stack spacing={4}>
//                 <Pagination
//                     onChange={(event, value) => {
//                         filter.page = value - 1;
//                         getReview()
//                     }}
//                     count={filter.numPage}
//                     renderItem={(item) => (
//                         <PaginationItem slots={{ previous: IoArrowBackCircleOutline, next: IoArrowForwardCircleOutline }} {...item} />
//                     )}
//                 />
//             </Stack>
//         </>
//     );
// };
