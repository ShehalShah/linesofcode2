import 'package:comparify/models/product_item.dart';
import 'package:comparify/screens/home.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_sliders/sliders.dart';

class Filter extends ConsumerStatefulWidget {
  const Filter({
    super.key,
    required this.userId,
    // required this.callback,
    // required this.low,
    // required this.high,
    // required this.online,
    // required this.offline,
    // required this.mode,
    // required this.isChanged
  });

  final userId;

  // final Function(int, int, bool, bool, String mode, bool isChanged) callback;
  // final int low, high;
  // final bool online, offline;
  // final String mode;
  // final bool isChanged;

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _FilterState();
}

List<ProductItem> filtered = [];
final filteredList = StateProvider<List<ProductItem>>((ref) {
  return filtered;
});

class _FilterState extends ConsumerState<Filter> {
  bool _isPriceChanged = false;
  bool _isRatingChanged = false;
  // bool _isPriceChanged = false;

  bool _isFlipkartSelected = false;
  bool _isAmazonSelected = false;
  bool _isAliExpressSelected = false;
  List<String> services = [];
  double low = 0.0, high = 50000.0;
  double lowr = 1.0, highr = 5.0;

  // bool _isCorrected = false;
  SfRangeValues _values = const SfRangeValues(0.0, 50000.0);
  SfRangeValues _ratingValues = const SfRangeValues(1.0, 5.0);

  // int low = 0, high = 50000;

  @override
  void initState() {
    // TODO: implement initState
    print("yash");
    super.initState();
    // _isChecked = widget.offline;
    // _isCorrected = widget.online;
    // low = widget.low;
    // high = widget.high;
    // _values = SfRangeValues(widget.low.toDouble(), widget.high.toDouble());
    // print("Online" + _isCorrected.toString());
    // print("Offline" + _isChecked.toString());
    // print("low" + widget.low.toString());
    // print("high" + widget.high.toString());

    // low = widget.low;
    // high = widget.high;
  }

  @override
  Widget build(BuildContext context) {
    // double _currentValue = 5000.0;
    var size = MediaQuery.of(context).size;
    double sizefont = size.width * 0.04;
    double _rating = 1.0;

    List<ProductItem> filterProductsByPrice(
        double minPrice, double maxPrice, double minr, doublemaxr) {
      setState(() {
        filtered = allTopProducts
            .where((product) =>
                double.parse(product.price.substring(1).replaceAll(',', '')) >=
                    minPrice &&
                double.parse(product.price.substring(1).replaceAll(',', '')) <=
                    maxPrice)
            .toList();
      });
      return filtered;
    }

    List<ProductItem> filterProductsByPriceAndRating(
        double minPrice, double maxPrice, double minRating, double maxRating) {
      setState(() {
        filtered = allTopProducts
            .where((product) =>
                double.parse(
                        product.price.substring(1).replaceAll(',', '')) >=
                    minPrice &&
                double.parse(product.price.substring(1).replaceAll(',', '')) <=
                    maxPrice &&
                double.parse(product.rating) >= minRating &&
                double.parse(product.rating) <= maxRating)
            .toList();
      });
      return filtered;
    }

    List<ProductItem> filterProductsByPriceAndRatingandSources(
        double minPrice,
        double maxPrice,
        double minRating,
        double maxRating,
        List<String> sources) {
      setState(() {
        filtered = allTopProducts
            .where((product) =>
                double.parse(
                        product.price.substring(1).replaceAll(',', '')) >=
                    minPrice &&
                double.parse(product.price.substring(1).replaceAll(',', '')) <=
                    maxPrice &&
                double.parse(product.rating) >= minRating &&
                double.parse(product.rating) <= maxRating &&
                sources.contains(product.from))
            .toList();
      });
      ref.watch(topProductProvider.notifier).state = filtered;
      return filtered;
    }

    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                /*IconButton(
                  icon: Icon(Icons.arrow_back_ios_new_outlined,
                      color: blackColor),
                  iconSize: sizefont * 1.5,
                  onPressed: () => Navigator.pop(context),
                ),*/
                Icon(Icons.filter_alt_sharp, color: Colors.teal),
                SizedBox(width: size.width * 0.01),
                SizedBox(height: size.height * 0.12),
                Text(
                  "Filters",
                  style: TextStyle(
                    fontFamily: 'Poppins',
                    fontSize: sizefont * 1.7,
                    fontWeight: FontWeight.normal,
                  ),
                ),
              ],
            ),
            Padding(
              padding: EdgeInsets.only(top: size.width * 0.013),
              child: Column(
                children: [
                  /* Padding(
                    padding: EdgeInsets.only(
                        right: size.width * 0.62, bottom: size.height * 0.01),
                    child: const Text(
                      "CATEGORY",
                      style: TextStyle(
                        fontFamily: 'Poppins',
                        fontWeight: FontWeight.normal,
                      ),
                    ),
                  ),*/
                  /* Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(4.0),
                      border: Border.all(
                        width: 2.0,
                        color: blackTeal,
                      ),
                    ),
                    child: TextField(
                      controller: _textEditingController,
                    ),
                  ),*/
                ],
              ),
            ),
            Padding(
              padding: EdgeInsets.only(
                right: size.width * 0.68,
                // top: size.height * 0.02,
              ),
              child: const Text(
                "PRICE",
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.normal,
                ),
              ),
            ),
            SizedBox(
              width: size.width * 0.958,
              child: SfRangeSlider(
                labelFormatterCallback:
                    (dynamic actualValue, String formattedText) {
                  var formattedText = NumberFormat.compactCurrency(
                    symbol: '₹',
                    decimalDigits: 0,
                  ).format(actualValue);
                  return ' $formattedText';
                },
                showDividers: true,
                // showTicks: true,
                enableTooltip: true,
                tooltipTextFormatterCallback:
                    (dynamic actualValue, String formattedText) {
                  actualValue = actualValue.round() - actualValue.round() % 500;
                  return actualValue.toStringAsFixed(00);
                },

                // inactiveColor: darkgrey,
                // activeColor: blackTeal,
                min: 0.0,
                max: 50000.0,
                values: _values,
                interval: 10000.0,
                showLabels: true,
                onChanged: (SfRangeValues newValues) {
                  setState(() {
                    _isPriceChanged = true;
                    _values = newValues;
                  });
                  low = _values.start.round().toDouble() -
                      _values.start.round().toDouble() % 500;
                  high = _values.end.round().toDouble() -
                      _values.end.round().toDouble() % 500;
                  print("New values: $newValues");
                  print("Low range: $low");
                  print("High range: $high");
                },
              ),
            ),
            SizedBox(
              height: 25,
            ),
            Padding(
              padding: EdgeInsets.only(
                top: size.width * 0.013,
                right: size.width * 0.68,
              ),
              child: const Text(
                "RATING",
                style: TextStyle(
                  fontFamily: 'Poppins',
                  fontWeight: FontWeight.normal,
                ),
              ),
            ),
            SfRangeSlider(
              onChanged: (SfRangeValues newValues) {
                setState(() {
                  _isRatingChanged = true;
                  _ratingValues = newValues;
                });
                lowr = _ratingValues.start.toDouble();
                highr = _ratingValues.end.toDouble();

                // print("New values: $newValues");
                // print("Low range: $lowr");
                // print("High range: $highr");
              },
              min: 1.0,
              max: 5.0,
              values: _ratingValues,
              showDividers: true,
              enableTooltip: true,
              interval: 0.5,
              showLabels: true,
            ),
            Column(
              children: [
                SizedBox(height: size.height * 0.05),
                // Padding(
                //   padding: EdgeInsets.only(
                //       right: size.width * 0.63, bottom: size.height * 0.01),
                //   child: const Text(
                //     "COMPANY",
                //     style: TextStyle(
                //       fontFamily: 'Poppins',
                //       fontWeight: FontWeight.normal,
                //     ),
                //   ),
                // ),
                // Container(
                //   decoration: BoxDecoration(
                //       borderRadius: BorderRadius.circular(4.0),
                //       border: Border.all(
                //         width: 2.0,
                //         color: blackTeal,
                //       )),
                //   child: TextField(
                //     controller: _textEditingController2,
                //   ),
                // ),
                Padding(
                  padding: EdgeInsets.only(
                    right: size.width * 0.7,
                    top: size.height * 0.0005,
                  ),
                  child: const Text(
                    "SOURCE",
                    style: TextStyle(
                      fontFamily: 'Poppins',
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),

                Padding(
                  padding: EdgeInsets.only(left: size.width * 0.01),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      ChoiceChip(
                        label: const Text('Flipkart'),
                        selected: _isFlipkartSelected,
                        onSelected: (bool selected) {
                          print(selected);
                          print("Before update: $services");
                          setState(() {
                            _isFlipkartSelected = selected;
                            if (_isFlipkartSelected) services.add('flipkart');
                            print("After update: $services");
                          });
                        },
                      ),
                      SizedBox(
                        width: 15,
                      ),
                      ChoiceChip(
                        label: Text('Amazon'),
                        selected: _isAmazonSelected,
                        onSelected: (bool selected) {
                          print(selected);
                          print("Before update: $services");

                          setState(() {
                            _isAmazonSelected = selected;
                            if (_isAmazonSelected) services.add('amazon');
                            print("After update: $services");
                          });
                        },
                      ),
                      SizedBox(
                        width: 15,
                      ),
                      ChoiceChip(
                          label: Text('AliExpress'),
                          selected: _isAliExpressSelected,
                          onSelected: (bool selected) {
                            print(selected);
                            print("Before update: $services");

                            setState(() {
                              _isAliExpressSelected = selected;
                              if (_isAliExpressSelected)
                                services.add('aliexpress');
                              print("After update: $services");
                            });
                          }),
                    ],
                  ),
                ),
                // Padding(
                //   padding: EdgeInsets.only(left: size.width * 0.01),
                //   child: Row(
                //     mainAxisAlignment: MainAxisAlignment.start,
                //     children: [
                //       Checkbox(
                //         value: _isCorrected,
                //         onChanged: (bool? value) {
                //           setState(() {
                //             _isCorrected = value ?? false;
                //           });
                //         },
                //         activeColor: Colors.teal,
                //         checkColor: Colors.white,
                //       ),
                //       const Text(
                //         'Online',
                //         style: TextStyle(
                //           fontFamily: 'Poppins',
                //           fontWeight: FontWeight.normal,
                //         ),
                //       ),
                //     ],
                //   ),
                // ),
              ],
            ),
            Padding(
              padding: EdgeInsets.symmetric(
                horizontal: size.width * 0.005,
              ),
              child: Row(
                children: [
                  ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors
                            .transparent, // Set the background color to transparent
                        elevation:
                            0, // Set the elevation to 0 to remove the shadow
                      ),
                      onPressed: () async {
                        // widget.callback(low, high, _isChecked, _isCorrected);
                        if (_isPriceChanged) {
                          filterProductsByPrice(low, high, lowr, highr);
                        } else if (_isPriceChanged && _isRatingChanged) {
                          filterProductsByPriceAndRating(
                              low, high, lowr, highr);
                        } else {
                          filterProductsByPriceAndRatingandSources(
                              low, high, lowr, highr, services);
                        }
                        Navigator.pushReplacement(
                            context,
                            MaterialPageRoute(
                                builder: ((context) => Home(
                                      userId: widget.userId,
                                    ))));

                        print(filtered);
                      },
                      child: FittedBox(
                        child: Text(
                          "Apply",
                          style: TextStyle(
                              fontSize: sizefont * 1.11,
                              fontFamily: 'Poppins',
                              fontWeight: FontWeight.normal,
                              color: Colors.teal),
                        ),
                      )),
                  SizedBox(
                    width: size.width * 0.39,
                  ),
                  ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors
                            .transparent, // Set the background color to transparent
                        elevation:
                            0, // Set the elevation to 0 to remove the shadow
                      ),
                      onPressed: () {
                        Navigator.pop(context);
                        ref.watch(topProductProvider.notifier).state =
                            allTopProducts;
                        setState(() {
                          _isPriceChanged = false;
                          _isRatingChanged = false;
                          _isFlipkartSelected = false;
                          _isAmazonSelected = false;
                          _isAliExpressSelected = false;
                          services = [];
                          low = 0.0;
                          high = 50000.0;
                          lowr = 0.0;
                          highr = 5.0;
                        });
                      },
                      // onPressed: () {
                      //   Navigator.pop(context);
                      //   widget.callback(0, 50000, false, false, 'null', true);
                      // },
                      child: FittedBox(
                        child: Text(
                          "Clear All",
                          style: TextStyle(
                              fontSize: sizefont * 1.11,
                              fontFamily: 'Poppins',
                              fontWeight: FontWeight.normal,
                              color: Colors.teal),
                        ),
                      )),
                ],
              ),
            )
          ],
        ),
      ),
    );
  }
}
