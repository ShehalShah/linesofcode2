import 'dart:collection';
import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/product_item.dart';

class Product {
  Future<void> getProduct(String query) async {
    Uri uri = Uri.parse('http://10.120.133.103:5001/api/products/search');
    final res =
        await http.post(uri, body: jsonEncode({"query": query.toString()}));
    print("res success");

    // headers: {'Content-Type': 'application/json'});
    final body = res.body;
    final decoded = jsonDecode(body);
    print(decoded);
    if (res.statusCode != 200) {
      print('incorrect');
      return;
    }
    print(res.body);
    final response = jsonDecode(body);
    print("RESPONSE" + response);

    return;
  }

  Future<String> addFavourite(ProductItem item, int userId) async {
    // print(item.title);
    // print(item.url);
    // print(item.price);
    // print(item.image);
    // print(item.rating);
    // print(item.from);
    Uri uri = Uri.parse(
        'https://colback.adaptable.app/api/products/add-to-watchlist');

    print("before post");
    final res = await http.post(uri,
        body: jsonEncode({
          "userId": userId,
          "product": {
            "title": item.title.toString(),
            "url": item.url.toString(),
            "price": item.price.toString(),
            "image": item.image.toString(),
            "rating": item.rating.toString(),
            "from": item.from.toString(),
          }
        }),
        headers: {'Content-Type': 'application/json'});
    print("after post");

    if (res.statusCode != 200) {
      print('incorrect');
      return "Didn't get added to Favourites";
    }
    print(res.body);
    return "Added to Favourites";
  }

  Future<List<ProductItem>> getFavourites(int userId) async {
    Uri uri = Uri.parse('http://colback.adaptable.app/api/products/watchlist');
    final res = await http.post(
      uri,
      body: jsonEncode({"userId": userId}),
      headers: {'Content-Type': 'application/json'},
    );
    final body = res.body;
    print(body);
    if (res.statusCode != 200) {
      print('incorrecttttttttttt');
      return [];
    }
    print(res.body);
    var response = jsonDecode(body);
    print(response);

    List<ProductItem> allFavProducts = [];

    if (response is Map<String, dynamic>) {
      // Convert the object to a list of one item
      response = [response];
    }
    
    for (LinkedHashMap item in response) {
      allFavProducts.add(ProductItem(
        title: item['title'],
        url: item['url'],
        price: item['price'],
        image: item['image'],
        rating: item['rating'],
        from: item['from'],
      ));
    }
    print(allFavProducts);
    return allFavProducts;
  }
}
