import 'dart:convert';
import 'dart:io';

import 'package:comparify/constants.dart';
import 'package:comparify/models/product_item.dart';
import 'package:comparify/screens/filterpage.dart';
import 'package:comparify/server/product.dart';
import 'package:comparify/widgets/product_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:http/http.dart' as http;

import 'favourite.dart';

final listProvider = StateProvider<List<ProductItem>>(
  (ref) {
    List<ProductItem> indexList = [];
    return indexList;
  },
);

final selectedProvider = StateProvider<List<ProductItem>>(
  (ref) {
    List<ProductItem> indexList = [];
    return indexList;
  },
);
final favouriteListProvider = StateProvider<List<ProductItem>>(
  (ref) {
    List<ProductItem> favouriteList = [];

    return favouriteList;
  },
);
List<ProductItem> allTopProducts = [
  ProductItem(
    title: "Woven Kanjivaram Silk Blend, Jacquard Saree  (Dark Blue)",
    url:
        "https://www.flipkart.com/deal-day-woven-kanjivaram-silk-blend-jacquard-saree/p/itm6a58ec1ab1635?pid=SARFNSZJBTCFCBDQ&lid=LSTSARFNSZJBTCFCBDQWMVQHT&marketplace=flipkart&store=clo&srno=b_1_9&otracker=browse&fm=organic&iid=03accbec-5562-4c29-93be-536ba5bb9a20.SARFNSZJBTCFCBDQ.SEARCH&ppt=browse&ppn=browse&ssid=mec38pmsa80000001709994159120",
    price: "₹559",
    image:
        "https://rukminim2.flixcart.com/image/832/832/k51cpe80/sari/b/d/q/free-banarasi-saree104-navy-deal-of-the-day-original-imafnt2vf7zgtjgv.jpeg?q=70&crop=false",
    rating: "4.0",
    from: "flipkart",
  ),
  ProductItem(
    title: "Men Solid Ankle Length  (Pack of 3)",
    url:
        "https://www.flipkart.com/brucella-men-solid-ankle-length/p/itm3fad9e61d0d6c?pid=SOCGWT2UFHY8VCAA&lid=LSTSOCGWT2UFHY8VCAAEBUAGG&marketplace=flipkart&store=clo&srno=b_1_8&otracker=browse&fm=organic&iid=en_OYuqP4c3pYHk-Or1jqOJHSppYQkmxKc_YEe1MpbTj6aV9-pHgAZ2o46S7REV0ONPI1YxFdgsRqFC25G3OGxJtQ%3D%3D&ppt=browse&ppn=browse&ssid=mec38pmsa80000001709994159120",
    price: "₹224",
    image:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/sock/o/o/n/free-socks-m-d4-brucella-original-imagwt2sa2jmwkez.jpeg?q=70&crop=false",
    rating: "3.7",
    from: "flipkart",
  ),
  ProductItem(
    title:
        "MY International Stainless Steel Blade System 450 ML Vegetable Chopper  (1)",
    url:
        "https://www.flipkart.com/my-international-stainless-steel-blade-system-450-ml-vegetable-chopper/p/itmb8fe97df374d4?pid=CPRGGBFYMCP7TCC3&lid=LSTCPRGGBFYMCP7TCC3QWWHZT&marketplace=flipkart&q=todays+deals&store=search.flipkart.com&srno=s_1_27&otracker=search&otracker1=search&fm=Search&iid=f179763c-34ed-4cd4-b7a2-77646d751458.CPRGGBFYMCP7TCC3.SEARCH&ppt=sp&ppn=sp&ssid=rt6g6wm71c0000001709994397431&qH=579b34685bdf25e3",
    price: "₹150",
    image:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/chopper/f/f/5/ke-chopper-green-750ml-kridha-original-imaggbfykn2rsggt.jpeg?q=70&crop=false",
    rating: "4.1",
    from: "flipkart",
  ),
  ProductItem(
    title:
        "ANALOG DAY AND DATE WORKING DISPLAY BLUE DIAL&SILVER CHAIN WATCH Analog Watch - For Men D&D F95 BLUE SILVER CHAIN",
    url:
        "https://www.flipkart.com/piraso-d-d-f95-blue-silver-chain-analog-day-date-working-display-dial-silver-watch-men/p/itm0ab734465b833?pid=WATGKYG5DHKMXG6V&lid=LSTWATGKYG5DHKMXG6VXBRDKZ&marketplace=flipkart&store=r18&srno=b_1_2&otracker=browse&fm=organic&iid=en_FvzM8GBbJDgoEMe9pYM7qIFnh9oH_ncqp4e3_b50YCpWT0DkssrN8fuQQFv4gk12DMjF4nnz5V9met5t3y5ZYg%3D%3D&ppt=browse&ppn=browse&ssid=zf2r293jv40000001709994172768",
    price: "₹304",
    image:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/watch/j/r/u/1-d-d-f95-blue-silver-chain-piraso-men-original-imagkyg5gxufh2cp.jpeg?q=70&crop=false",
    rating: "3.9",
    from: "flipkart",
  ),
  ProductItem(
    title:
        "SIYARAM FASHION Decorative White Wallpaper  (77 cm x 70 cm, Pack of 10)",
    url:
        "https://www.flipkart.com/siyaram-fashion-decorative-white-wallpaper/p/itm810e2c258e592?pid=WLPGG4Z6DQFPVGYY&lid=LSTWLPGG4Z6DQFPVGYYBYSL7M&marketplace=flipkart&q=todays+deals&store=search.flipkart.com&srno=s_2_79&otracker=search&otracker1=search&fm=Search&iid=c71178f6-5661-401e-9ab3-a048bbc349c7.WLPGG4Z6DQFPVGYY.SEARCH&ppt=sp&ppn=sp&ssid=rt6g6wm71c0000001709994397431&qH=579b34685bdf25e3",
    price: "₹1,490",
    image:
        "https://rukminim2.flixcart.com/image/832/832/xif0q/sticker/l/m/q/medium-3d-brick-wallpaper-for-wall-fks-bricks-white-5-flipkart-original-imag2craxxm3u5yv.jpeg?q=70&crop=false",
    rating: "4.7",
    from: "flipkart",
  ),
  ProductItem(
    title:
        "DEKABR Loafers Shoes Men Spring Clasicc Vintage Comfy Flat Moccasin Fashion Men Slip-on Boat Shoes For Men Casual Shoes",
    url:
        "https://www.aliexpress.com/item/1005003962018760.html?spm=a2g0o.productlist.main.33.2f6aymExymExaC&algo_pvid=15847c8a-bf44-4e2d-9055-33829a0a0689&utparam-url=scene%3Asearch%7Cquery_from%3A",
    price: "₹2,085.49",
    image:
        "https://ae01.alicdn.com/kf/Sa172315390d2431c99a80773d4a1ece30/DEKABR-Loafers-Shoes-Men-Spring-Clasicc-Vintage-Comfy-Flat-Moccasin-Fashion-Men-Slip-on-Boat-Shoes.jpg",
    rating: "4.7",
    from: "aliexpress",
  ),
  ProductItem(
    title:
        "230g American Men's 100% Cotton Oversized T-shirts Summer Quick Dry Tee Eco-friendly Screen Print Broadcloth Jersey Hip Hop Tops",
    url:
        "https://www.aliexpress.com/item/1005006487185603.html?spm=a2g0o.productlist.main.11.2f6aymExymExaC&algo_pvid=15847c8a-bf44-4e2d-9055-33829a0a0689&utparam-url=scene%3Asearch%7Cquery_from%3A",
    price: "₹411",
    image:
        "https://ae01.alicdn.com/kf/Sf3c1e3099a464a3d940fbb0f968a8231o/Mens-100-Comb-Cotton-Blank-Oversized-T-Shirt-Graphic-Big-And-Tall-Custom-Print-High-Street.jpg",
    rating: "4.3",
    from: "aliexpress",
  ),
  ProductItem(
    title:
        "Luxury Real PT950 Platinum Necklace Round 1 CT Moissanite Diamond Pendant Necklace For Women Wedding Party Bridal Fine Jewelry",
    url:
        "https://www.aliexpress.com/item/1005005916327132.html?spm=a2g0o.productlist.main.59.2f6aymExymExaC&algo_pvid=15847c8a-bf44-4e2d-9055-33829a0a0689&utparam-url=scene%3Asearch%7Cquery_from%3A",
    price: "₹8,558.60",
    image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg7QKtQu4A-P-IYoWlo4qhRj8opGRRMUkPBoxOvokHuFyu0o34x-RSFM18GWSrXSWNYcM",
    rating: "5.0",
    from: "aliexpress",
  ),
  ProductItem(
    title:
        "Natural African Amethyst Silver Women's Ring 2.39 Carat Octagon Cut Purple Crystal Classic Design Women Birthday Christmas Gift",
    url:
        "https://www.aliexpress.com/item/1005001405124022.html?spm=a2g0o.productlist.main.65.2f6aymExymExaC&algo_pvid=15847c8a-bf44-4e2d-9055-33829a0a0689&utparam-url=scene%3Asearch%7Cquery_from%3A",
    price: "₹1,736.72",
    image:
        "https://ae01.alicdn.com/kf/H7b7bec760b974d67acb10eb5ff023348Q/Natural-African-Amethyst-Silver-Women-s-Ring-2-39-Carat-Octagon-Cut-Purple-Crystal-Classic-Design.png",
    rating: "4.7",
    from: "aliexpress",
  ),
  ProductItem(
    title:
        "Stainless Steel Witch Knot Earrings for Women Celtic knot Hoop Earrings Fashion Gold Silver Color Ear Jewelry Christmas Gift",
    url:
        "https://www.aliexpress.com/item/1005004881330052.html?spm=a2g0o.productlist.main.33.2f6a7Jod7JodUG&algo_pvid=e832cafe-d2a5-45f9-983a-449b912cfe0b&utparam-url=scene%3Asearch%7Cquery_from%3A",
    price: "₹181.39",
    image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd0HtU-0sHR-gBA9_4bJF5bK_eir7av8iv6X7nVhqxXFgIRpAUXVtSBeeUyoYO7hY7i2c",
    rating: "4.3",
    from: "aliexpress",
  ),
  ProductItem(
    title: "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
    url:
        "https://www.amazon.in/OnePlus-Nord-Pastel-128GB-Storage/dp/B0BY8JZ22K?ref=dlx_deals_gd_dcl_img_0_cd684552_dt_sl15_50",
    price: "₹17,999",
    image: "https://m.media-amazon.com/images/I/61QRgOgBx0L._SX679_.jpg",
    rating: "4.2",
    from: "amazon",
  ),
  ProductItem(
    title:
        "OnePlus Nord Buds 2 TWS in Ear Earbuds with Mic,Upto 25dB ANC 12.4mm Dynamic Titanium Drivers, Playback:Upto 36hr case, 4-Mic Design, IP55 Rating, Fast Charging [Thunder Gray]",
    url:
        "https://www.amazon.in/OnePlus-Wireless-Earbuds-Titanium-Playback/dp/B0BYJ6ZMTS?ref_=Oct_DLandingS_D_3d028392_2",
    price: "₹2,599",
    image: "https://m.media-amazon.com/images/I/61-ZYvldY+L._SX679_.jpg",
    rating: "4.3",
    from: "amazon",
  ),
  ProductItem(
    title:
        "Paradigm Pictures Wind Chimes for Home || Home Decor Items (Golden Color)",
    url:
        "https://www.amazon.in/Paradigm-Originals-Decoration-Positive-Balcony/dp/B074QMXCDQ?ref_=Oct_DLandingS_D_f6b1a791_71",
    price: "₹793",
    image: "https://m.media-amazon.com/images/I/71OmZf14VrL._SY879_.jpg",
    rating: "4.3",
    from: "amazon",
  ),
  ProductItem(
    title:
        "Kellogg's Oats, Rolled Oats, High in Protein and Fibre, Low in Sodium, 900g/990g Pack",
    url:
        "https://www.amazon.in/Kelloggs-Rolled-Protein-Fibre-Sodium/dp/B0B15HXLHQ?ref_=Oct_DLandingS_D_5e21b606_13",
    price: "₹151",
    image: "https://m.media-amazon.com/images/I/81vL-XgBztL._SX679_.jpg",
    rating: "4.3",
    from: "amazon",
  ),
  ProductItem(
    title: "Yamaha FS100C Acoustic Guitar, Natural",
    url:
        "https://www.amazon.in/Yamaha-FS100C-Acoustic-Guitar-Natural/dp/B08Z3DVN8N?ref_=Oct_DLandingS_D_9d7e6b78_5",
    price: "₹9,989",
    image: "https://m.media-amazon.com/images/I/71nzdkpUcWL._SY879_.jpg",
    rating: "4.1",
    from: "amazon",
  ),
];

final topProductProvider = StateProvider<List<ProductItem>>((ref) {
  return allTopProducts;
});

class Home extends ConsumerStatefulWidget {
  const Home({
    super.key,
    required this.userId,
  });

  final userId;

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeState();
}

class _HomeState extends ConsumerState<Home> {
  TextEditingController searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();

  File? selectedImage;
  Product productcontroller = Product();
  String title = '';
  // Future<void> _uploadImageToServer(File imageFile) async {
  //   try {
  //     var url = Uri.parse(
  //         "https://colback.adaptable.app/api/products/upload-imageonlytit");
  //     print("1");

  //     // Create a multipart request
  //     var request = http.MultipartRequest('POST', url);
  //     print("2");
  //     http.MultipartFile multipartFile = await http.MultipartFile.fromPath(
  //       'image',
  //       imageFile.path,
  //       contentType: MediaType("image", "*"),
  //     );

  //     // Add the image file to the request
  //     request.files.add(multipartFile);
  //     print("3");

  //     // Send the request
  //     var response = await request.send();
  //     print("4");

  //     // Read and print the response
  //     var responseData = await response.stream.bytesToString();
  //     title = responseData;

  //     print("5");
  //     print("Response: $responseData");
  //     print("Status code: ${response.statusCode}");
  //     // return responseData;
  //   } catch (e) {
  //     print(e);
  //   }
  // }

  Future<String> _uploadImageToServer(
    File image,
    // int member,
  ) async {
    // try{}
    // print("request");
    var request = http.MultipartRequest(
      'POST',
      Uri.parse(
          "http://colback.adaptable.app/api/products/upload-imageonlytit"),
    );
    // print("request success");

    // print("multipart");

    http.MultipartFile multipartFile = await http.MultipartFile.fromPath(
      'image',
      image.path,
      // contentType: MediaType("image", "*"),
    );

    // print("success");

    // print("request add");

    request.files.add(
      multipartFile,
    );
    // print("success");

    // request.files.add(
    //   multipartFile,
    // );
    // print("sending ");
    var res = await request.send();
    // print("success");

    var responseBody = await res.stream.bytesToString();
    var response = jsonDecode(responseBody);
    // print(response);

    if (res.statusCode == 200) {
      // Handle success
      // init(response);
      title = response;
      // print('Form data submitted successfully');
      return "Success";
    } else {
      // Handle error
      // print('Error submitting form data. Status code: ${res.statusCode}');
      return "fail";
    }
  }

  Future _pickImageFromCamera() async {
    final returnedImage =
        await ImagePicker().pickImage(source: ImageSource.camera);

    if (returnedImage == null) return;
    selectedImage = File(returnedImage.path);
    // _uploadImageToServer(selectedImage!);

    return returnedImage;
  }

  @override
  Widget build(BuildContext context) {
    List<ProductItem> filtered = ref.watch(topProductProvider);
    // print("hi+${filtered}");

    Size size = MediaQuery.of(context).size;
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            // Text(
            //   "Hey ",
            //   textScaleFactor: 1.15,
            // ),
            // // GetUserName(userID: user.uid),
            Text(
              "Hey!",
              textScaleFactor: 1.15,
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
          ],
        ),
        leading: Container(
          padding: EdgeInsets.fromLTRB(12, 0, 0, 0),
          child: CircleAvatar(
            backgroundImage: AssetImage('assets/avatar png.png'),
            backgroundColor: const Color(0xFFDCE1FF).withOpacity(0.45),
            radius: 24,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () {
              Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => Favourite(userId: widget.userId)));
            },
            icon: Icon(Icons.favorite_border_rounded),
          ),
        ],
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20.0),
          child: Column(
            children: [
              const SizedBox(height: 20),

              // search and scan
              Row(
                children: [
                  Expanded(
                    flex: 3,
                    child: Container(
                      decoration: BoxDecoration(
                        // color: Colors.grey[100],
                        border: Border.all(color: Colors.black),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.grey.withOpacity(0.2),
                            blurRadius: 200,
                            spreadRadius: 2,
                            offset: Offset(8, 4),
                          ),
                        ],
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Row(
                        children: [
                          Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 10.0),
                            child: Icon(Icons.search_rounded),
                          ),
                          Expanded(
                            child: TextField(
                              controller: searchController,
                              decoration: InputDecoration(
                                border: InputBorder.none,
                                hintText: "Search",
                                hintStyle: TextStyle(
                                  color: Colors.grey.withOpacity(0.8),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(width: 8),
                  GestureDetector(
                    onTap: () async {
                      final returnedImage = await _pickImageFromCamera();

                      if (returnedImage != null) {
                        // String path = returnedImage!.path;
                        // File file = File(path);
                        // _uploadImageToServer(file);
                        // List<String> words = title.split(" ");
                        // String truncatedResponse =
                        //     words.sublist(0, 3).join(" ");

                        // print("1");
                        await productcontroller.getProduct("phone");
                        // print("2");
                      }
                    },
                    child: Padding(
                      padding: const EdgeInsets.all(12.0),
                      child: Icon(Icons.camera_alt_rounded, size: 32),
                    ),
                  ),
                  IconButton(
                      onPressed: () {
                        // Navigator.push(context, MaterialPageRoute(builder: (context) {
                        //   return const Filter();
                        // }));
                        showModalBottomSheet(
                          context: context,
                          builder: (context) {
                            // final screenHeight = MediaQuery.of(context).size.height;
                            // final modalHeight = screenHeight * 0.7; // set the height to 80% of the screen height

                            return Padding(
                              padding: EdgeInsets.symmetric(horizontal: 20),
                              child: Filter(
                                userId: widget.userId,
                                // callback: callback,
                                // low: lowVal,
                                // high: highVal,
                                // online: isOnline,
                                // offline: isOffline,
                                // mode: mode,
                                // isChanged: isChanged,
                              ),
                            );
                          },
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(size.width * 0.05),
                                topRight: Radius.circular(size.width * 0.05)),
                          ),
                        );
                      },
                      icon: const Icon(Icons.filter_alt_sharp,
                          color: Colors.black, size: 32)),
                ],
              ),

              const SizedBox(height: 32),

              // today's deals
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    "Today's Deals",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  // Text(
                  //   "See all",
                  //   style: TextStyle(
                  //     color: Pallete.primaryPurple,
                  //     fontSize: 16,
                  //   ),
                  // ),
                ],
              ),

              const SizedBox(height: 20),

              // vertical list of today's deals
              Scrollbar(
                controller: _scrollController,
                thumbVisibility: true,
                radius: const Radius.circular(4),
                thickness: 4,
                child: SizedBox(
                  height: MediaQuery.of(context).size.height * 0.64,
                  child: ListView.builder(
                    controller: _scrollController,
                    itemCount: filtered.length,
                    itemBuilder: (context, index) {
                      var item = filtered[index];
                      return ProductCard(
                        item: item,
                        userId: widget.userId,
                      );
                    },
                  ),
                ),
              ),

              const SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }
}
