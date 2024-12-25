import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, Paper, Select,TableContainer,} from '@mui/material';
import { AiOutlineEdit, AiOutlineFundView } from 'react-icons/ai';
import { BiAnalyse, BiMoney } from 'react-icons/bi';
import { BsGear } from 'react-icons/bs';
import ListProductNotInLive from './ListProductNotInLive';
import AnimationsLoader from './Loader';
const LiveViewProduct = React.lazy(() => import('./LivViewProduct'));
const ThietLapGia = React.lazy(() => import('./ThietLapGia'));
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


 function ManageLive({ products, setProducts, sendMessage,conner, liveId, socket }) {
    const [open, setOpen] = React.useState(false);
    const [tabValue, setTabValue] = React.useState(0);

    
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const toggleDrawer = (isOpen) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(isOpen);
    };
    const [age, setAge] = React.useState({ age:1,  time:-1});

    const handleChange = (event) => {
      setAge(prevState => ({
        ...prevState,
        age: event.target.value,
      }));
    };
    const handleChange2 = (event) => {
      setAge(prevState => ({
        ...prevState,
        time: event.target.value,
      }));
    };
    return (
        <div>
            <BsGear size={20} color="yellow" onClick={toggleDrawer(true)} />
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
                <Box className="w-full lg:w-8/12 mx-auto" sx={{ backgroundColor: 'background.paper', p: 2 }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example" centered>
                        <Tab  className='text-xs' color="green" label="Quản lý giá" icon={<BiMoney />} />
                        <Tab className='text-xs' label="Thiết lập hiển thị" icon={<AiOutlineFundView />} />
                        <Tab label="Sản phẩm" icon={<BiAnalyse />} />
                    </Tabs>
                    <TabPanel value={tabValue} index={0}>
                        <TableContainer component={Paper}>
                        <React.Suspense fallback={<AnimationsLoader/>}>
                                <ThietLapGia socket={socket} liveId={liveId} products={products}/>
                                </React.Suspense>
                        </TableContainer>
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <Button
                            onClick={() => {
                                socket.emit('message', { type: 6 });
                            }}
                            className="mb-2 mt-2"
                            variant="outlined"
                        >
                            Ẩn hiển thị <AiOutlineEdit size={20} color="blue" />
                        </Button>
                        {/* <FormControl fullWidth> */}
                        <FormControl className="mb-2" sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Góc</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={age.age}
                                label="Góc"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Trái</MenuItem>
                                <MenuItem value={2}>Phải</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className="mb-2" sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">Timeline</InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={age.time}
                                label="Timeline"
                                onChange={handleChange2}
                            >
                                <MenuItem value={-1}>No time</MenuItem>
                                <MenuItem value={5000}>5s</MenuItem>
                                <MenuItem value={10000}>10s</MenuItem>
                                <MenuItem value={120000}>2'</MenuItem>
                                
                            </Select>
                        </FormControl>
                        {/* </FormControl> */}
                        <React.Suspense fallback={<AnimationsLoader/>}>
                            <LiveViewProduct sendMessage={sendMessage} conner={age} products={products} />
                        </React.Suspense>
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        <ListProductNotInLive liveId={liveId} setProducts={setProducts} socket={socket}/>
                    </TabPanel>
                </Box>
            </Drawer>
        </div>
    );
}

export default React.memo(ManageLive)