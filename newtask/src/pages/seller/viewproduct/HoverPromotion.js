import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { format } from 'date-fns';
import React from 'react';

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    
  },
}));

function CustomizedTooltips({ khuyenMai }) {
  return (
    <div >
      <HtmlTooltip arrow
        backgroundColor="white" className='shadow-md'
        title={
          <div className="p-2 " style={{ height: "200px", overflow: "auto" }}>
            {khuyenMai.map((v, index) => (
              <React.Fragment key={index}>
                <div>
                  <p className='text-blue-600 font-semibold'>{v.tenKhuyenMai}</p>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <p>Giá trị giảm</p>
                    <p className="text-red-500">{v.giaTriKhuyenMai}%</p>
                  </div>
                  <p>{format(new Date(v.ngayBatDau), 'HH:mm dd/MM/yyyy')} - {format(new Date(v.ngayKetThuc), 'HH:mm dd/MM/yyyy')}</p>
                </div>
                <hr />
              </React.Fragment>
            ))}
          </div>
        }
      >
        <span className='p-2 pl-3 font-bold cursor-pointer pr-3 bg-red-50 rounded-xl'>
        {khuyenMai.length + ' Ưu đãi'}
        <svg
          className="inline w-4 h-4 ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
        </span>
      </HtmlTooltip>
    </div>
  );
}

export default React.memo(CustomizedTooltips);
