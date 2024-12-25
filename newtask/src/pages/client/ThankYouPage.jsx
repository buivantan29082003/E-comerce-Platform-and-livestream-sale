function ThankYouPage() {
    return (
        <div className="container mx-auto text-center py-20">
            <h1 className="text-4xl font-bold text-green-600">Cảm ơn bạn đã mua hàng!</h1>
            <p className="text-lg text-gray-700 mt-4">Đơn hàng của bạn đang được xử lý và chúng tôi sẽ giao đến bạn sớm thôi.</p>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoyp3iIIGmWOp4GgDSXyfQy4I_01yATmfY1Hhy6KYewV_ojFZ7YBos0VJsd7XZXbnyi_U&usqp=CAU"
                alt="Thank You"
                className="mx-auto mt-8 w-1/2 opacity-75 transition-opacity duration-500 hover:opacity-100"
            />
            <p className="text-gray-600 mt-4">
                Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi tại{' '}
                <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-800 underline">
                    modelworld@gmail.shop.com
                </a>
                .
            </p>
            <button
                onClick={() => (window.location.href = '/')}
                className="mt-10 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
            >
                Tiếp tục mua sắm
            </button>
        </div>
    );
}

export default ThankYouPage;
