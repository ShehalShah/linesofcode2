import 'dart:convert';
import 'dart:io';

import 'package:comparify/models/product_item.dart';
import 'package:comparify/screens/filterpage.dart';
import 'package:comparify/server/product.dart';
import 'package:comparify/widgets/product_card.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:image_picker/image_picker.dart';

class Searchscreen extends StatefulWidget {
  const Searchscreen(
      {super.key,
      required this.searchController,
      required this.userId,
      required this.searchResults});
  final TextEditingController searchController;
  final userId;
  final List<ProductItem> searchResults;
  @override
  State<Searchscreen> createState() => _SearchscreenState();
}

class _SearchscreenState extends State<Searchscreen> {
  Product productcontroller = Product();

  String title = '';

  Product prod = Product();

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
    File? selectedImage;
    final returnedImage =
        await ImagePicker().pickImage(source: ImageSource.camera);

    if (returnedImage == null) return;
    selectedImage = File(returnedImage.path);
    // _uploadImageToServer(selectedImage!);

    return returnedImage;
  }

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;

    return Scaffold(
      body: SingleChildScrollView(
          child: Padding(
              padding:
                  const EdgeInsets.symmetric(horizontal: 20.0, vertical: 50),
              child: Column(children: [
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
                                controller: widget.searchController,
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
                widget.searchResults.isEmpty
                    ? Center(
                        child: CircularProgressIndicator(
                          color: Colors.blue,
                        ),
                      )
                    : SizedBox(
                        height: 800,
                        child: ListView.builder(
                            itemCount: widget.searchResults.length,
                            itemBuilder: (context, index) {
                              return ProductCard(
                                item: widget.searchResults[index],
                                userId: widget.userId,
                              );
                            }),
                      )
              ]))),
    );
  }
}
