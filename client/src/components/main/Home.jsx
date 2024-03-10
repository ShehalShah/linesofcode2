import React from "react";
import search from "../../assets/searchicon.svg";
import Frame19 from "../../assets/Frame19.svg";
import Frame20 from "../../assets/Frame20.svg";
import Frame21 from "../../assets/Frame21.svg";
import Banner from "../../assets/IllusBanner.svg";
import {useNavigate} from "react-router-dom"
import Amazon from "../../assets/amazon.png";
import Flipkart from "../../assets/flipkart.png";
import AliExpress from "../../assets/aliexpress.png";

const Home = ({ setSearch, search, setActiveLink }) => {
  const nav=useNavigate()
  const topdeals = [
    {
      "title": "Woven Kanjivaram Silk Blend, Jacquard Saree  (Dark Blue)",
      "url": "https://www.flipkart.com/deal-day-woven-kanjivaram-silk-blend-jacquard-saree/p/itm6a58ec1ab1635?pid=SARFNSZJBTCFCBDQ&lid=LSTSARFNSZJBTCFCBDQWMVQHT&marketplace=flipkart&store=clo&srno=b_1_9&otracker=browse&fm=organic&iid=03accbec-5562-4c29-93be-536ba5bb9a20.SARFNSZJBTCFCBDQ.SEARCH&ppt=browse&ppn=browse&ssid=mec38pmsa80000001709994159120",
      "price": "₹559",
      "image": "https://rukminim2.flixcart.com/image/832/832/k51cpe80/sari/b/d/q/free-banarasi-saree104-navy-deal-of-the-day-original-imafnt2vf7zgtjgv.jpeg?q=70&crop=false",
      "rating": "4.0",
      "from": "flipkart"
    },
    {
      "title": "Men Solid Ankle Length  (Pack of 3)",
      "url": "https://www.flipkart.com/brucella-men-solid-ankle-length/p/itm3fad9e61d0d6c?pid=SOCGWT2UFHY8VCAA&lid=LSTSOCGWT2UFHY8VCAAEBUAGG&marketplace=flipkart&store=clo&srno=b_1_8&otracker=browse&fm=organic&iid=en_OYuqP4c3pYHk-Or1jqOJHSppYQkmxKc_YEe1MpbTj6aV9-pHgAZ2o46S7REV0ONPI1YxFdgsRqFC25G3OGxJtQ%3D%3D&ppt=browse&ppn=browse&ssid=mec38pmsa80000001709994159120",
      "price": "₹224",
      "image": "https://rukminim2.flixcart.com/image/832/832/xif0q/sock/o/o/n/free-socks-m-d4-brucella-original-imagwt2sa2jmwkez.jpeg?q=70&crop=false",
      "rating": "3.7",
      "from": "flipkart"
    },
    {
      "title": "MY International Stainless Steel Blade System 450 ML Vegetable Chopper  (1)",
      "url": "https://www.flipkart.com/my-international-stainless-steel-blade-system-450-ml-vegetable-chopper/p/itmb8fe97df374d4?pid=CPRGGBFYMCP7TCC3&lid=LSTCPRGGBFYMCP7TCC3QWWHZT&marketplace=flipkart&q=todays+deals&store=search.flipkart.com&srno=s_1_27&otracker=search&otracker1=search&fm=Search&iid=f179763c-34ed-4cd4-b7a2-77646d751458.CPRGGBFYMCP7TCC3.SEARCH&ppt=sp&ppn=sp&ssid=rt6g6wm71c0000001709994397431&qH=579b34685bdf25e3",
      "price": "₹150",
      "image": "https://rukminim2.flixcart.com/image/832/832/xif0q/chopper/f/f/5/ke-chopper-green-750ml-kridha-original-imaggbfykn2rsggt.jpeg?q=70&crop=false",
      "rating": "4.1",
      "from": "flipkart"
    },
    {
      "title": "ANALOG DAY AND DATE WORKING DISPLAY BLUE DIAL&SILVER CHAIN WATCH Analog Watch - For Men D&D F95 BLUE SILVER CHAIN",
      "url": "https://www.flipkart.com/piraso-d-d-f95-blue-silver-chain-analog-day-date-working-display-dial-silver-watch-men/p/itm0ab734465b833?pid=WATGKYG5DHKMXG6V&lid=LSTWATGKYG5DHKMXG6VXBRDKZ&marketplace=flipkart&store=r18&srno=b_1_2&otracker=browse&fm=organic&iid=en_FvzM8GBbJDgoEMe9pYM7qIFnh9oH_ncqp4e3_b50YCpWT0DkssrN8fuQQFv4gk12DMjF4nnz5V9met5t3y5ZYg%3D%3D&ppt=browse&ppn=browse&ssid=zf2r293jv40000001709994172768",
      "price": "₹304",
      "image": "https://rukminim2.flixcart.com/image/832/832/xif0q/watch/j/r/u/1-d-d-f95-blue-silver-chain-piraso-men-original-imagkyg5gxufh2cp.jpeg?q=70&crop=false",
      "rating": "3.9",
      "from": "flipkart"
    },
    {
      "title": "SIYARAM FASHION Decorative White Wallpaper  (77 cm x 70 cm, Pack of 10)",
      "url": "https://www.flipkart.com/siyaram-fashion-decorative-white-wallpaper/p/itm810e2c258e592?pid=WLPGG4Z6DQFPVGYY&lid=LSTWLPGG4Z6DQFPVGYYBYSL7M&marketplace=flipkart&q=todays+deals&store=search.flipkart.com&srno=s_2_79&otracker=search&otracker1=search&fm=Search&iid=c71178f6-5661-401e-9ab3-a048bbc349c7.WLPGG4Z6DQFPVGYY.SEARCH&ppt=sp&ppn=sp&ssid=rt6g6wm71c0000001709994397431&qH=579b34685bdf25e3",
      "price": "₹1,490",
      "image": "https://rukminim2.flixcart.com/image/832/832/xif0q/sticker/l/m/q/medium-3d-brick-wallpaper-for-wall-fks-bricks-white-5-flipkart-original-imag2craxxm3u5yv.jpeg?q=70&crop=false",
      "rating": "4.7",
      "from": "flipkart"
    },
    {
      "title": "DEKABR Loafers Shoes Men Spring Clasicc Vintage Comfy Flat Moccasin Fashion Men Slip-on Boat Shoes For Men Casual Shoes",
      "url": "https://www.aliexpress.com/item/1005003962018760.html?spm=a2g0o.productlist.main.33.2f6aymExymExaC&algo_pvid=15847c8a-bf44-4e2d-9055-33829a0a0689&utparam-url=scene%3Asearch%7Cquery_from%3A",
      "price": "₹2,085.49",
      "image": "https://ae01.alicdn.com/kf/Sa172315390d2431c99a80773d4a1ece30/DEKABR-Loafers-Shoes-Men-Spring-Clasicc-Vintage-Comfy-Flat-Moccasin-Fashion-Men-Slip-on-Boat-Shoes.jpg",
      "rating": "4.7",
      "from": "aliexpress"
    },
    {
      "title": "230g American Men's 100% Cotton Oversized T-shirts Summer Quick Dry Tee Eco-friendly Screen Print Broadcloth Jersey Hip Hop Tops",
      "url": "https://www.aliexpress.com/item/1005006487185603.html?spm=a2g0o.productlist.main.11.2f6aymExymExaC&algo_pvid=15847c8a-bf44-4e2d-9055-33829a0a0689&utparam-url=scene%3Asearch%7Cquery_from%3A",
      "price": "₹411",
      "image": "https://ae01.alicdn.com/kf/Sf3c1e3099a464a3d940fbb0f968a8231o/Mens-100-Comb-Cotton-Blank-Oversized-T-Shirt-Graphic-Big-And-Tall-Custom-Print-High-Street.jpg",
      "rating": "4.3",
      "from": "aliexpress"
    },
    {
      "title": "Luxury Real PT950 Platinum Necklace Round 1 CT Moissanite Diamond Pendant Necklace For Women Wedding Party Bridal Fine Jewelry",
      "url": "https://www.aliexpress.com/item/1005005916327132.html?spm=a2g0o.productlist.main.59.2f6aymExymExaC&algo_pvid=15847c8a-bf44-4e2d-9055-33829a0a0689&utparam-url=scene%3Asearch%7Cquery_from%3A",
      "price": "₹8,558.60",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg7QKtQu4A-P-IYoWlo4qhRj8opGRRMUkPBoxOvokHuFyu0o34x-RSFM18GWSrXSWNYcM",
      "rating": "5.0",
      "from": "aliexpress"
    },
    {
      "title": "Natural African Amethyst Silver Women's Ring 2.39 Carat Octagon Cut Purple Crystal Classic Design Women Birthday Christmas Gift",
      "url": "https://www.aliexpress.com/item/1005001405124022.html?spm=a2g0o.productlist.main.65.2f6aymExymExaC&algo_pvid=15847c8a-bf44-4e2d-9055-33829a0a0689&utparam-url=scene%3Asearch%7Cquery_from%3A",
      "price": "₹1,736.72",
      "image": "https://ae01.alicdn.com/kf/H7b7bec760b974d67acb10eb5ff023348Q/Natural-African-Amethyst-Silver-Women-s-Ring-2-39-Carat-Octagon-Cut-Purple-Crystal-Classic-Design.png",
      "rating": "4.7",
      "from": "aliexpress"
    },
    {
      "title": "Stainless Steel Witch Knot Earrings for Women Celtic knot Hoop Earrings Fashion Gold Silver Color Ear Jewelry Christmas Gift",
      "url": "https://www.aliexpress.com/item/1005004881330052.html?spm=a2g0o.productlist.main.33.2f6a7Jod7JodUG&algo_pvid=e832cafe-d2a5-45f9-983a-449b912cfe0b&utparam-url=scene%3Asearch%7Cquery_from%3A",
      "price": "₹181.39",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0HtU-0sHR-gBA9_4bJF5bK_eir7av8iv6X7nVhqxXFgIRpAUXVtSBeeUyoYO7hY7i2c",
      "rating": "4.3",
      "from": "aliexpress"
    },
    {
      "title": "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
      "url": "https://www.amazon.in/OnePlus-Nord-Pastel-128GB-Storage/dp/B0BY8JZ22K?ref=dlx_deals_gd_dcl_img_0_cd684552_dt_sl15_50",
      "price": "₹17,999",
      "image": "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
      "rating": "4.2",
      "from": "amazon"
    },
    {
      "title": "OnePlus Nord Buds 2 TWS in Ear Earbuds with Mic,Upto 25dB ANC 12.4mm Dynamic Titanium Drivers, Playback:Upto 36hr case, 4-Mic Design, IP55 Rating, Fast Charging [Thunder Gray]",
      "url": "https://www.amazon.in/OnePlus-Wireless-Earbuds-Titanium-Playback/dp/B0BYJ6ZMTS?ref_=Oct_DLandingS_D_3d028392_2",
      "price": "₹2,599",
      "image": "https://m.media-amazon.com/images/I/61-ZYvldY+L._SX679_.jpg",
      "rating": "4.3",
      "from": "amazon"
    },
    {
      "title": "Paradigm Pictures Wind Chimes for Home || Home Decor Items (Golden Color)",
      "url": "https://www.amazon.in/Paradigm-Originals-Decoration-Positive-Balcony/dp/B074QMXCDQ?ref_=Oct_DLandingS_D_f6b1a791_71",
      "price": "₹793",
      "image": "https://m.media-amazon.com/images/I/71OmZf14VrL._SY879_.jpg",
      "rating": "4.3",
      "from": "amazon"
    },
    {
      "title": "Kellogg's Oats, Rolled Oats, High in Protein and Fibre, Low in Sodium, 900g/990g Pack",
      "url": "https://www.amazon.in/Kelloggs-Rolled-Protein-Fibre-Sodium/dp/B0B15HXLHQ?ref_=Oct_DLandingS_D_5e21b606_13",
      "price": "₹151",
      "image": "https://m.media-amazon.com/images/I/81vL-XgBztL._SX679_.jpg",
      "rating": "4.3",
      "from": "amazon"
    },
    {
      "title": "Yamaha FS100C Acoustic Guitar, Natural",
      "url": "https://www.amazon.in/Yamaha-FS100C-Acoustic-Guitar-Natural/dp/B08Z3DVN8N?ref_=Oct_DLandingS_D_9d7e6b78_5",
      "price": "₹9,989",
      "image": "https://m.media-amazon.com/images/I/71nzdkpUcWL._SY879_.jpg",
      "rating": "4.1",
      "from": "amazon"
    }
  ]

  function openImageUpload() {
    const input = document.getElementById("imageUploadInput");
    input.click();
  }
  
  function handleImageUpload(event) {
    // Handle image upload logic here
    console.log("Image uploaded:", event.target.files[0]);
  
    // Create form data
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
  
    // Make a POST request to upload the image
    fetch('http://localhost:5001/api/products/upload-image', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      return response.json();
    })
    .then(data => {
      // Handle response data
      console.log('Response:', data);
      localStorage.setItem('watchlist', JSON.stringify(data));
      nav("/image", { state: { data } });
      // nav('/image')
    })
    .catch(error => {
      // Handle error
      console.error('Error:', error);
    });
  }
  

  return (
    <div className="h-full w-full px-16 flex flex-col gap-8 items-center bg-[#FFFFFF] overflow-y-auto">
      <div className="py-5 w-full mt-24 bg-[#C1DCDC] rounded-lg flex ">
        <div className="w-[40%] flex flex-col ml-8 justify-center gap-10 py-12">
          <div className="px-16">
            <h2 className=" text-5xl font-black">Get the</h2>
            <h2 className=" text-7xl font-black"> BEST DEALS</h2>
          </div>
          <div className="flex px-16">
            <div className="w-32 h-16 border-r border-[#1E1E1E]">
              <h2 className="text-xl font-bold">10+ </h2>
              <h2 className="text-md">Platforms</h2>
            </div>
            <div className="w-32 h-16 ml-8">
              <h2 className="text-xl font-bold">1000+ </h2>
              <h2 className="text-md">Active Users</h2>
            </div>
          </div>

          <div class="relative ml-8 flex items-center justify-center">
            <input
              type="text"
              placeholder="What are you looking for?"
              class="py-2 pr-8 pl-4 rounded-xl w-[90%] h-16 border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setActiveLink("search");
                  console.log("hi");
                }
              }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-camera absolute right-10 top-4" viewBox="0 0 16 16" onClick={()=>openImageUpload()}>
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
            </svg>
            <input
              id="imageUploadInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={()=>handleImageUpload(event)}
            />
          </div>

        </div>
        <div className="w-[60%]">
          <img src={Banner} alt="" />
        </div>
      </div>

      <div className="w-full grid grid-cols-4">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full">
            <h2 className="text-5xl font-black">Top</h2>
            <h2 className="text-5xl font-black">Deals</h2>
          </div>
          <div className="text-lg text-[#1E1E1E80]">
            <h2>Easiest Way to</h2>
            <h2>Compare products</h2>
            <h2>Across the web</h2>
          </div>
          <div className="relative w-40 bg-[#C1DCDC] h-12 rounded-lg flex items-center justify-between p-8">
            See more
            <svg
              className="absolute right-3 h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M9.707 15.707a1 1 0 01-1.414-1.414L11.586 10 8.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-.707.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <div className="overflow-auto flex flex-1 w-[61rem] gap-7">
          {topdeals.map((deal, index) => (
            <div key={index} className="flex flex-col gap-2 relative">
              <div className="w-80 h-96 rounded-lg bg-[#B6B5B5] flex image-center justify-center">
                <img src={deal.image} alt="" className="rounded-lg" />
              </div>
              <div className="font-semibold">{deal.title.split(' ').slice(0, 4).join(' ')}</div>
              <div className="font-semibold text-[#1E1E1E80]">{deal.price}</div>
              <img
          src={
            deal.from === "amazon"
              ? Amazon
              : deal.from === "flipkart"
              ? Flipkart
              : AliExpress
          }
          className="absolute top-1 left-1 shadow-md shadow-gray-500 w-[2.5rem] h-[2.5rem] rounded-full"
        />
            </div>
            
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <div className=" text-3xl font-black">About us</div>
        <div className="w-full grid grid-cols-3 mt-8 p-6">
          <img src={Frame19} alt="" className="" />
          <img src={Frame20} alt="" />
          <img src={Frame21} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
