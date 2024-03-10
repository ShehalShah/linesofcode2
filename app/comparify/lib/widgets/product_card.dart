import 'package:comparify/models/product_item.dart';
import 'package:comparify/screens/home.dart';
import 'package:comparify/server/product.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:url_launcher/url_launcher.dart';

import '../constants.dart';

class ProductCard extends ConsumerStatefulWidget {
  final ProductItem item;
  final int userId;
  const ProductCard({Key? key, required this.item, required this.userId})
      : super(key: key);

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _ProductCardState();
}

class _ProductCardState extends ConsumerState<ProductCard> {
  bool isChecked = false;
  bool isFav = false;

  Future<void> _launchUrl(String url) async {
    if (!await launchUrl(Uri.parse(url))) {
      throw Exception('Could not launch $url');
    }
  }

  Product productInstance = Product();
  var result = "";

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Container(
          margin: const EdgeInsets.symmetric(vertical: 8, horizontal: 16),
          decoration: BoxDecoration(
            color: Colors.white70,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.black54, width: 1.0),
            boxShadow: [
              BoxShadow(
                color: Colors.grey.withOpacity(0.1),
                blurRadius: 300,
                spreadRadius: 2,
                offset: Offset(8, 4),
              ),
            ],
          ),
          child: Column(
            children: [
              ListTile(
                onTap: () {
                  // print("itemmmmmm");
                  _launchUrl(widget.item.url);
                },
                contentPadding: const EdgeInsets.fromLTRB(16, 16, 16, 0),
                leading: ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: Image.network(
                    widget.item.image,
                    // scale: 1.2,
                    width: 80,
                    height: 200,
                    fit: BoxFit.cover,
                  ),
                ),
                title: Text(
                  widget.item.title,
                  style: const TextStyle(
                    fontWeight: FontWeight.bold,
                  ),
                  overflow: TextOverflow.ellipsis,
                  maxLines: 3,
                ),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Text(
                          widget.item.price,
                          style: TextStyle(
                            color: Colors.grey[700],
                            fontSize: 16,
                          ),
                        ),
                        // favourites icon
                        const Spacer(),
                        IconButton(
                          onPressed: () async {
                            if (isFav) {
                              ref
                                      .read(favouriteListProvider)
                                      .contains(widget.item)
                                  ? ref
                                          .watch(favouriteListProvider.notifier)
                                          .state =
                                      ref
                                          .read(favouriteListProvider)
                                          .where((element) =>
                                              element != widget.item)
                                          .toList()
                                  : print("Not in list");
                            }
                            // print(widget.item);

                            else {
                              ref.watch(favouriteListProvider.notifier).state =
                                  [
                                ...ref.read(favouriteListProvider),
                                widget.item
                              ];

                              // store in db
                              result = await productInstance.addFavourite(
                                  widget.item, widget.userId);
                              print(result);
                            }
                            print(ref.read(favouriteListProvider));

                            setState(() {
                              isFav = !isFav;
                            });
                          },
                          icon: Icon(
                            isFav ? Icons.favorite : Icons.favorite_border,
                            color: isFav ? Colors.red[700] : Colors.red[700],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 0),
                    Row(
                      children: [
                        const Icon(Icons.star, color: Colors.amber, size: 16),
                        const SizedBox(width: 5),
                        Text(
                          widget.item.rating,
                          style: const TextStyle(
                            color: Colors.black54,
                            fontSize: 12,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 4),
                  ],
                ),
              ),
              Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
                child: Row(
                  children: [
                    GestureDetector(
                        onTap: () {},
                        child: Text(
                          "View More",
                          style: TextStyle(
                            color: Pallete.linkBlue,
                          ),
                        )),

                    Spacer(),

                    // compare checkbox
                    Row(
                      children: [
                        Text("Compare"),
                        Checkbox(
                          value: isChecked,
                          onChanged: (value) {
                            if (isChecked) {
                              ref.read(listProvider).contains(widget.item)
                                  ? ref.watch(listProvider.notifier).state = ref
                                      .read(listProvider)
                                      .where(
                                          (element) => element != widget.item)
                                      .toList()
                                  : print("Not in list");
                            } else {
                              ref.watch(listProvider.notifier).state = [
                                ...ref.read(listProvider),
                                widget.item
                              ];
                            }
                            print(ref.read(listProvider));

                            setState(() {
                              isChecked = value!;
                            });
                          },
                          activeColor: Pallete.primaryPurple,
                        ),
                      ],
                    )
                  ],
                ),
              ),
            ],
          ),
        ),
        Positioned(
          top: 0,
          left: 0,
          child: SizedBox(
            width: 48, // Adjust the width as needed
            height: 48, // Adjust the height as needed
            child: Image.asset(
              "assets/${widget.item.from}.png",
              fit: BoxFit.cover,
            ),
          ),
        ),
      ],
    );
    ;
  }
}
