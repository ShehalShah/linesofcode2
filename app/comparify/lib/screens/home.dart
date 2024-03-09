import 'package:comparify/constants.dart';
import 'package:flutter/material.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  TextEditingController searchController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Row(
            children: [
              Text(
                "Hey ",
                textScaleFactor: 1.15,
              ),
              // GetUserName(userID: user.uid),
              Text(
                "Het!",
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
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0),
            child: Column(
              children: [
                SizedBox(height: 20),
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
                                  hintText: "Search food, categories...",
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
                    SizedBox(width: 10),
                    GestureDetector(
                      onTap: () {},
                      child: Padding(
                        padding: const EdgeInsets.all(12.0),
                        child: Icon(Icons.camera),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ));
  }
}
