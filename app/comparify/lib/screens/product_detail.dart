import 'package:comparify/server/gemini.dart';
import 'package:comparify/server/product.dart';
import 'package:flutter/material.dart';

import '../models/product_item.dart';
import 'package:google_generative_ai/google_generative_ai.dart';

class ProductDetail extends StatefulWidget {
  const ProductDetail({super.key, required this.item});
  final ProductItem item;

  @override
  State<ProductDetail> createState() => _ProductDetailState();
}

class _ProductDetailState extends State<ProductDetail> {
  List<String> reviews = [
    "This is my first laptop gifted by my father so its a special one❤READ MORE: Good quality product",
    "I am using this laptop for coding. nice product 😍READ MORE: Just wow!",
    "GoodREAD MORE: Fabulous!",
    "Nice & fastREAD MORE: Worth every penny",
    "Good one🤟READ MORE: Excellent",
    "This is my first lappy thanku Flipkart ☺☺READ MORE: Wonderful",
    "Diaplay is not good. And battery indicator always shown 99% hp slove this problem.Performance is good in this price range.If you buy this for normal use if you are a student you can buy this.READ MORE: Very Good",
    "This is my first laptop 😅 loved it 😍❤ thank you flipkart for this lovely product 😁 this is awesome laptop... Value of money is 5 star ✨READ MORE: Value-for-money",
    "Amazing product..value for moneyREAD MORE: Worth the money",
  ];

  final ScrollController _scrollController = ScrollController();
  // String insights = "";

  // @override
  // void initState() {
  //   // TODO: implement initState
  //   super.initState();
  //   setState(() async {
  //     insights = await geminiInsight(widget.item.title, reviews);
  //   });
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 40,
        backgroundColor: Colors.transparent,
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),
              Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.transparent,
                  // boxShadow: [
                  //   BoxShadow(
                  //     color: Colors.grey.withOpacity(0.3),
                  //     blurRadius: 200,
                  //     spreadRadius: 2,
                  //     offset: const Offset(8, 4),
                  //   ),
                  // ],
                ),
                child: Image.network(widget.item.image, height: 200),
              ),
              const SizedBox(height: 20),
              Text(
                widget.item.title,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 10),
              Text(
                "⭐ " + widget.item.rating,
                style: const TextStyle(
                  fontSize: 16,
                  fontWeight: FontWeight.w500,
                  color: Colors.grey,
                ),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Text(
                    widget.item.price,
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                  Spacer(),
                  SizedBox(
                    width: 48, // Adjust the width as needed
                    height: 48, // Adjust the height as needed
                    child: Image.asset(
                      "assets/${widget.item.from}.png",
                      fit: BoxFit.cover,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 24),

              // reviews
              Text(
                "Reviews",
                style: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  decoration: TextDecoration.underline,
                ),
              ),

              // vertical list of reviews
              Scrollbar(
                controller: _scrollController,
                thumbVisibility: true,
                radius: const Radius.circular(4),
                thickness: 4,
                child: ListView.builder(
                  shrinkWrap: true,
                  controller: _scrollController,
                  itemCount: reviews.length,
                  itemBuilder: (context, index) {
                    return Padding(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      child: Text(
                        reviews[index].toString(),
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w400,
                        ),
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
