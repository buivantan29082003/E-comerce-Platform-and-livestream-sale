import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';
import productData from './productData';
import ProductReviews from './ProductReviews';
import { useNavigate } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const product = productData.find((item) => item.id === parseInt(id)) || {};
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();
    if (!product) {
        return <div className="text-center text-2xl mt-10">Product not found</div>;
    }

    const productDetailItem = {
        images: product.images
            ? product.images.map((img) => ({ original: img, thumbnail: img }))
            : [{ original: product.image, thumbnail: product.image }],
        title: product.name,
        price: product.price,
        previousPrice: product.oldPrice,
        discount: product.discount,
        description: product.description,
    };

    const handleQuantityChange = (type) => {
        if (type === 'increment') {
            setQuantity((prev) => prev + 1);
        } else if (type === 'decrement' && quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleAddToCart = () => {
        alert('bạn đã dô trang giỏ hàng!');
    };

    const handleToPay = () => {
        navigate('/checkout');
        alert('ban đã vào thanh toán!');
    };

    return (
        <section className="container mx-auto max-w-6xl py-10 px-4 mt-4 bg-gray-50 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Thong tin SP */}
                <div className="space-y-6">
                    <div className="border rounded-lg shadow-md overflow-hidden group">
                        <div className="relative">
                            <img
                                className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
                                src={productDetailItem.images[0].original}
                                alt={productDetailItem.title}
                            />
                        </div>
                        <hr />
                        {/* Thumbnails */}
                        <div className="flex justify-center my-2 space-x-2">
                            {productDetailItem.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image.thumbnail}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 object-cover border-2 border-transparent rounded-lg hover:border-violet-900 transition-all duration-300 hover:scale-105"
                                />
                            ))}
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold">{productDetailItem.title}</h1>

                    <div className="flex items-center space-x-3">
                        <Rater total={5} rating={4.5} interactive={false} />
                        <p className="text-sm text-gray-500">(34 đánh giá)</p>
                        <p className="text-sm text-blue-500 hover:underline cursor-pointer">124 đã bán</p>
                    </div>

                    <div className="space-y-2">
                        <p className="text-4xl font-bold text-violet-900">{productDetailItem.price} VNĐ</p>
                        <p className="text-sm text-gray-400 line-through">{productDetailItem.previousPrice} VNĐ</p>
                        <p className="text-sm text-red-600 font-medium">{productDetailItem.discount} Giảm giá!</p>

                        {/*  */}
                        <div className="mt-8 space-y-4">
                            <div>
                                <h4 className="text-lg font-semibold">Chính Sách Trả Hàng</h4>
                                <p className="text-sm text-gray-600">Trả hàng trong 15 ngày</p>
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold">Vận Chuyển</h4>
                                <p className="text-sm text-gray-600">Miễn phí vận chuyển</p>
                            </div>
                        </div>
                    </div>

                    {/*  */}
                    <div className="flex flex-col lg:flex-row gap-4 mt-6">
                        <button
                            onClick={handleAddToCart}
                            className="flex-grow bg-violet-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition duration-300"
                        >
                            Thêm vào giỏ
                        </button>
                        <button
                            onClick={handleToPay}
                            className="flex-grow bg-amber-400 py-2 px-4 text-white rounded hover:bg-yellow-300 transition duration-300"
                        >
                            Mua ngay
                        </button>
                    </div>
                </div>

                {/* Product Details Section */}
                <div className="bg-white p-5 border rounded-lg shadow-lg space-y-6">
                    <h3 className="text-2xl font-semibold text-center mb-4">Chi Tiết Sản Phẩm</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="mb-4 lg:mb-0">
                            <p className="mb-2">
                                <strong>• Danh mục:</strong> {product.category}
                            </p>
                            <p className="mb-2">
                                <strong>• Mô hình:</strong> {product.brand}
                            </p>
                            <p className="mb-2">
                                <strong>• Số Lượng khuyến mãi:</strong> {product.promotion}
                            </p>
                        </div>
                        <div className="mb-4 lg:mb-0">
                            <p className="mb-2">
                                <strong>• Số sản phẩm còn lại:</strong> {product.remaining}
                            </p>
                            <p className="mb-2">
                                <strong>• Gửi từ:</strong> {product.shipFrom}
                            </p>
                        </div>
                    </div>
                    <hr className="my-4 border-t border-gray-300" />
                    <div>
                        <h4 className="text-xl font-semibold text-center mb-3">Mô Tả Sản Phẩm</h4>
                        <p className="text-gray-800">{product.description}</p>
                    </div>

                    {/* Product Reviews Section */}
                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold text-center mb-4">Đánh Giá Sản Phẩm</h3>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <Rater total={5} rating={4.5} interactive={false} />
                                <p className="text-sm text-gray-500 ml-2">(34 đánh giá)</p>
                            </div>
                            <p className="text-sm text-blue-500 cursor-pointer hover:underline">Xem tất cả đánh giá</p>
                        </div>
                        <ProductReviews reviews={product.reviews || []} />
                    </div>

                    {/* Special offer section */}
                    <div className="bg-amber-50 p-5 border rounded-lg shadow-lg space-y-6">
                        <h3 className="text-2xl font-semibold text-center mb-4">Ưu Đãi Đặc Biệt Dành Cho Bạn!</h3>
                        <p className="text-center text-lg">Mua ngay và nhận kèm theo quà tặng miễn phí!</p>
                        <ul className="list-disc list-inside text-gray-700">
                            <li>Miễn phí vận chuyển toàn quốc</li>
                            <li>Tặng kèm voucher giảm giá 10% cho lần mua tiếp theo</li>
                            <li>Bao bì sang trọng, thích hợp làm quà tặng</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetails;
