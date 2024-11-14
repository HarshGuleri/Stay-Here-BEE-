import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Services from './components/services';
import Login from './components/login';
import Register from './components/register';
import RoomDetails from './components/RoomDetails';
import CustomSlider from './components/CustomSlider';

const items = [
    // {
    //     id: 1,
    //     image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww',
    //     title: 'Hotel Aroma Executive',
    //     description: 'Room Type: Deluxe King Room size: 400 sq. ft. Bed: Plush king-size bed Bathroom: Modern en-suite with premium toiletries View: Scenic city views Connectivity: Free high-speed Wi-Fi Entertainment: 42-inch flat-screen TV Amenities: Mini-bar, coffee/tea maker, in-room safe Services: Daily housekeeping, 24-hour room service',
    //     price: '1600',
    //     roomType: 'Deluxe King Room',
    //     size: '400 sq. ft.',
    //     bed: 'Plush king-size bed',
    //     bathroom: 'Modern en-suite with premium toiletries',
    //     view: 'Scenic city views',
    //     connectivity: 'Free high-speed Wi-Fi',
    //     entertainment: '42-inch flat-screen TV',
    //     amenities: 'Mini-bar, coffee/tea maker, in-room safe',
    //     services: 'Daily housekeeping, 24-hour room service',
    // },
    // {
    //     id: 2,
    //     image: 'https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=',
    //     title: 'Hyatt Centric Candolim',
    //     description: 'Calangute| 3-4 minutes walk from Candolim Beach',
    //     price: '2200',
    //     roomType: 'Luxury Suite',
    //     size: '500 sq. ft.',
    //     bed: 'Queen-size bed',
    //     bathroom: 'Spacious bathroom with a bathtub',
    //     view: 'Beach view',
    //     connectivity: 'Free high-speed Wi-Fi',
    //     entertainment: '50-inch flat-screen TV',
    //     amenities: 'Mini-bar, coffee maker',
    //     services: 'Daily housekeeping, laundry service',
    // },
    // {
    //     id: 3,
    //     image: 'https://img.freepik.com/free-photo/cozy-studio-apartment-with-bedroom-living-space_1262-12323.jpg?size=626&ext=jpg&ga=GA1.1.1395880969.1708992000&semt=ais',
    //     title: 'Taurus Sarovar Portico',
    //     description: 'Mahipalpur, Delhi | 4.0 km from Indira Gandhi  Airport.',
    //     price: '2750',
    //     roomType: 'Luxury Suite',
    //     size: '700 sq. ft.',
    //     bed: 'Luxurious California king-size bed',
    //     bathroom: 'Spa-like en-suite with Jacuzzi tub and deluxe toiletries',
    //     view: 'Panoramic ocean views',
    //     connectivity: 'Complimentary high-speed Wi-Fi',
    //     entertainment: '55-inch LED premium channels',
    //     amenities: 'Fully stocked minibar, Nespresso machinee',
    //     services: 'Twice-daily housekeeping, personalized  service',

    // },
    // {
    //     id: 4,
    //     image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg',
    //     title: 'The Leela Palace Chennai',
    //     roomType: 'Mahipalpur, Delhi | 4.0 km from Indira Gandhi  Airport.',
    //     price: '2750',
    //     size: '600 sq. ft.',
    //     bed: 'Custom-designed queen-size bed with memory foam mattress',
    //     bathroom: 'Rainfall shower and designer toiletries',
    //     view: 'City skyline vistas',
    //     connectivity: 'High-speed Wi-Fi included',
    //     entertainment: '50-inch Smart TV with streaming services',
    //     amenities: 'Mini-fridge, espresso machine, laptop-sized safe',
    //     services: 'Daily housekeeping, express laundry service',

    // },
    // {
    //     id: 5,
    //     image: 'https://www.thespruce.com/thmb/2_Q52GK3rayV1wnqm6vyBvgI3Ew=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/put-together-a-perfect-guest-room-1976987-hero-223e3e8f697e4b13b62ad4fe898d492d.jpg',
    //     title: 'Hotel Delhi Thirty Seven',
    //     description: 'Mahipalpur, Delhi | 4.3 km from Indira Gandhi Airport',
    //     price: '2000',
    //     roomType: 'Luxury Suite',
    //     size: ' 800 sq. ft.',
    //     bed: 'King-size bed plus bunk beds for kids',
    //     bathroom: 'Dual vanity and child-friendly amenities',
    //     view: 'Garden courtyard views',
    //     connectivity: 'Free Wi-Fi throughout',
    //     entertainment: '65-inch HDTV with gaming console',
    //     amenities: ' Microwave, mini-bar, childproofed room, in-room safe',
    //     services: 'Daily maid service, kids activity program',

    // },
    // {
    //     id: 6,
    //     image: 'https://images.oyoroomscdn.com/uploads/hotel_image/227533/large/fmninlrtgrbo.jpg',
    //     title: 'Goldfinch Hotel Mumbai ',
    //     description: 'Bandra Kurla Complex, Mumbai | 2.0 km from British Consulate',
    //     price: '1800',
    //     roomType: 'Luxury Suite',
    //     size: '1000 sq. ft.',
    //     bed: 'Grand four-poster king-size bed',
    //     bathroom: 'Marble-clad en-suite with oversized soaking tub',
    //     view: 'Mountain range panoramas',
    //     connectivity: 'Complimentary high-speed Wi-Fi',
    //     entertainment: 'Home theater system with surround sound',
    //     amenities: 'Full kitchen, wine fridge, personal safe',
    //     services: 'Twice-daily housekeeping, private chef option',

    // },
    // {
    //     id: 7,
    //     image: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHJvb218ZW58MHx8MHx8fDA%3D',
    //     title: 'Sahara Star residence',
    //     description: 'Near Mumbai Airpot|760 m from T1- Chhatrapati Shivaji International Airpot',
    //     price: '2500',
    //     size: '500 sq. ft.',
    //     bed: 'Queen-size bed with luxury linens',
    //     bathroom: 'Walk-in rain shower and designer toiletries',
    //     view: 'Panoramic ocean views',
    //     connectivity: 'Complimentary high-speed Wi-Fi',
    //     entertainment: '40-inch LED TV with cable channels',
    //     amenities: 'Mini-fridge, coffee/tea maker, laptop safe',
    //     services: 'daily housekeeping, personalized concierge service',

    // },
    // {
    //     id: 8,
    //     image: 'https://www.theparkhotels.com/images/site-specific/chennai/rooms-suites-min.jpg',
    //     title: 'Lemon tree Hotel, Chandigarh',
    //     description: 'Zirakpur Panchkula | 9.6 km from Chandigarh International Airport',
    //     price: '3700',
    //     size: '550 sq. ft.',
    //     bed:  'King-size organic cotton bed',
    //     bathroom: 'Solar-powered hot water, eco-friendly toiletries',
    //     view: 'Sustainable garden views',
    //     connectivity: 'Green-certified Wi-Fi access',
    //     entertainment: 'LED TV with energy-efficient features',
    //     amenities: 'Fully stocked minibar, Nespresso machine, personal safe',
    //     services: 'Twice-daily housekeeping, personalized concierge service',

    // },
    // {
    //     id: 9,
    //     image: 'https://img.freepik.com/free-photo/room-interior-hotel-bedroom_23-2150683427.jpg',
    //     title: 'Hotel Downtown 17, Chandigarh',
    //     description: 'Sector 17, Chandigarh | 900 m from Sector 17 Market',
    //     price: '2600',
    //     size: '450 sq. ft.',
    //     bed: 'Canopy king-size bed with silk drapes',
    //     bathroom: 'Spa-like en-suite with Jacuzzi tub and deluxe toiletries',
    //     view: 'Intimate courtyard or garden views',
    //     connectivity: 'Complimentary Wi-Fi',
    //     entertainment: '55-inch LED TV with premium channels',
    //     amenities: 'Fully stocked minibar, Nespresso machine, personal safe',
    //     services: 'Turndown service, in-room dining for couples',

    // },
    // {
    //     id: 10,
    //     image: 'https://images.unsplash.com/photo-1551105378-78e609e1d468?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjN8fHJvb218ZW58MHx8MHx8fDA%3D',
    //     title: 'Hyatt Regency Chd',
    //     description: 'Industrial Area phase|9.2 km from Chd',
    //     price: '2100',
    //     size: '700 sq. ft.',
    //     bed: 'Luxurious California king-size bed',
    //     bathroom: 'Spa-like en-suite with Jacuzzi tub and deluxe toiletries',
    //     view: 'Panoramic ocean views',
    //     connectivity: 'Complimentary high-speed Wi-Fi',
    //     entertainment: '55-inch LED TV with premium channels',
    //     amenities: 'Fully stocked minibar, Nespresso machine, personal safe',
    //     services: 'Twice-daily housekeeping, personalized concierge service',

    // },
    // {
    //     id: 11,
    //     image: 'https://media.designcafe.com/wp-content/uploads/2023/06/01112443/designer-bedroom.jpg',
    //     title: 'Wildflower Hall, Shimla',
    //     description: 'Sector 8, Chandigarh',
    //     price: '1500',
    //     size: ' 350 sq. ft.',
    //     bed: 'Queen-size bed with plush bedding',
    //     bathroom: 'Spa-like en-suite with Jacuzzi tub and deluxe toiletries',
    //     view: 'Panoramic ocean views',
    //     connectivity: 'Complimentary high-speed Wi-Fi',
    //     entertainment: '55-inch LED TV with premium channels',
    //     amenities: 'Fully stocked minibar, Nespresso machine, personal safe',
    //     services: 'Twice-daily housekeeping, personalized concierge service',

    // },
    // {
    //     id: 12,
    //     image: 'https://cdn.pixabay.com/photo/2017/01/28/08/13/master-bedroom-2014865_1280.jpg',
    //     title: 'Radisson Blu Jaipur',
    //     description: 'Tonk road | 3.0 kilometers from jaipur Airport',
    //     price: '3000',
    //     size: '700 sq. ft.',
    //     bed: 'Luxurious California king-size bed',
    //     bathroom: 'Spa-like en-suite with Jacuzzi tub and deluxe toiletries',
    //     view: 'Panoramic ocean views',
    //     connectivity: 'Complimentary high-speed Wi-Fi',
    //     entertainment: '55-inch LED TV with premium channels',
    //     amenities: 'Fully stocked minibar, Nespresso machine, personal safe',
    //     services: 'Twice-daily housekeeping, personalized concierge service',

    // },
    // {
    //     id: 13,
    //     image: 'https://img.freepik.com/free-photo/elegant-bedroom-interior-with-bedforniture-framefront-view-ai-generative_123827-23460.jpg',
    //     title: 'The Welcome Hotel',
    //     description: 'Mashobra| 10 kilo meters from Shimla Mall Road',
    //     price: '1900',
    //     size: '700 sq. ft.',
    //     bed: 'Luxurious California king-size bed',
    //     bathroom: 'Spa-like en-suite with Jacuzzi tub and deluxe toiletries',
    //     view: 'Panoramic ocean views',
    //     connectivity: 'Complimentary high-speed Wi-Fi',
    //     entertainment: '55-inch LED TV with premium channels',
    //     amenities: 'Fully stocked minibar, Nespresso machine, personal safe',
    //     services: 'Twice-daily housekeeping, personalized concierge service',

    // },
    // {
    //     id: 14,
    //     image: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     title: 'Everest Base Camp',
    //     description: 'Best comfortable Hotel in Leh',
    //     price: '1700',
    //     size: '350 sq. ft.',
    //     bed: 'Queen-size bed with plush bedding',
    //     bathroom: 'Spa-like en-suite with Jacuzzi tub and deluxe toiletries',
    //     view: 'Panoramic ocean views',
    //     connectivity: 'Complimentary high-speed Wi-Fi',
    //     entertainment: '55-inch LED TV with premium channels',
    //     amenities: 'Fully stocked minibar, Nespresso machine, personal safe',
    //     services: 'Daily housekeeping, wake-up call service',

    // },

    // Add more rooms as needed
];

function App() {
    return (
        <div className="App">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Body items={items} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/room-details/:id" element={<RoomDetails items={items} />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
