import * as React from 'react';
import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { List, ListItem } from '@mui/material';
import formatToVND from '../../client/FormatVnd';
import { BiBorderRadius } from 'react-icons/bi';

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  BorderRadius:"7px",
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Dùng React.memo để memoize component
const SpringModal = React.memo(({ cart }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div>
      <span onClick={handleOpen}>Xem chi tiết</span>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <span className='text-blue-700 font-bold' id="spring-modal-title" variant="h6" component="h2">
              Danh sách sản phẩm
            </span>
            <Typography id="spring-modal-description" sx={{ mt: 1 }}>
              <List>
                {cart.map((item) => (
                  <ListItem sx={{ display: 'flex', alignItems: 'center', gap: 2 }} key={item.product.id}>
                    <img src={item.product.hinhAnh} alt={item.product.name} style={{ width: 50, height: 50 }} className='rounded-md' />
                    <Box sx={{ flexGrow: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        {item.product.product.tenSanPham}
                        {/* <span className='text-red-500'>
                          {3 > 0 ? " Giảm " + 3 + " %" : ""}
                        </span> */}
                      </div>
                      <div style={{ fontSize: '12px', color: '#777' }}>
                        Phân loại {item.product.mauSac.tenMau} - {item.product.kichThuoc.tenKichThuoc}
                      </div>
                      <div style={{ fontSize: '12px', color: '#777' }}>
                        {item.soLuong} x {formatToVND(item.giaBan)}
                      </div>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
});

export default SpringModal;
