import 'package:comparify/server/product.dart';
import 'package:flutter/material.dart';

import '../models/product_item.dart';
import '../widgets/product_card.dart';

class Favourite extends StatefulWidget {
  final int userId;
  const Favourite({super.key, required this.userId});

  @override
  State<Favourite> createState() => _FavouriteState();
}

class _FavouriteState extends State<Favourite> {
  ScrollController _scrollController = ScrollController();
  List<ProductItem> allFavProducts = [];
  Product productInstance = Product();


  @override
  initState() {
    super.initState();
    productInstance.getFavourites(widget.userId).then((value) {
      setState(() {
        allFavProducts = value;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text('Favourite', style: TextStyle(fontWeight: FontWeight.bold)),
          centerTitle: true,
        ),
        body: SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              children: [
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
                      itemCount: allFavProducts.length,
                      itemBuilder: (context, index) {
                        var item = allFavProducts[index];
                        return ProductCard(item: item, userId: widget.userId);
                      },
                    ),
                  ),
                ),

                const SizedBox(height: 20),
              ],
            ),
          ),
        ));
  }
}
