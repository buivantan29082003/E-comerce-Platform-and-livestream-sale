import {useContext, useEffect, useState } from "react";
import HoaDonTab from "./Tab";
// import ChoThanhToan from "./ChoThanhToan";
import ChuanBiHang from "./hoaDonState/HoaDonChoLay";
import OrderDefaault from "./OrderDefault";
import DonHuy from "./DonHuy";
import OrderFinish from "./OrderFinish";
import OrderGiaoThanhCong from "./OrderGiaoThanhCong";
import { AppContext } from "../../../App";
import api from '../../../config/APISeller';
const HoaDonView=()=>{   
    const [orderTab,setOrderTab]=useState(2)
    const {setFloadingPage } = useContext(AppContext);
    useEffect(()=>{
        setFloadingPage()
        api.get("/order/getcountorderbystatus").then(v => v.data).then(v => {
            setCountOrder(v.data);
          });
    },[])
    const [countOrder, setCountOrder] = useState(new Map());
    return <>
        <div  className="bg-light container mx-auto p-4  bg-white rounded-[7px]">
            {/* <p className="text-blue-800 font-semibold">Kênh người bán &gt; Hóa đơn &gt; Danh sách hóa đơn</p> */}
            <HoaDonTab countOrder={countOrder} setTab={setOrderTab} />
            {(() => {
                        switch (orderTab) {
                            // case 1:
                            //     return <ChoThanhToan />
                            case 2:
                                return <ChuanBiHang setCountOrder={setCountOrder}  />
                            case 3:
                                return <OrderDefaault key={1} trangThai={3} />
                            case 4:
                                return <OrderDefaault key={2} trangThai={4}/>
                            case 5:
                                return <OrderGiaoThanhCong key={5} trangThai={5}/>
                            case 6:
                                return <OrderFinish key={3} trangThai={6}/>
                            case 7:
                                return <OrderDefaault key={4} trangThai={7}/>
                            default:
                                return <DonHuy />
                        }
            })()}
            <br/>
        </div>
    </>
}
export default HoaDonView;