import 'dart:collection';
import 'dart:convert';

import 'package:comparify/models/favourite.dart';
import 'package:comparify/screens/favourite.dart';
import 'package:http/http.dart' as http;

import '../models/product_item.dart';


class Product {
  Future<List<ProductItem>> getProduct(String query) async {
    Uri uri = Uri.parse('http://10.120.133.92:5001/api/products/search');
    try {
      final res = await http.post(
        uri,
        body: jsonEncode({"query": query}),
        headers: {'Content-Type': 'application/json'},
      );

      if (res.statusCode == 200) {
        final decoded = jsonDecode(res.body);
        List<dynamic> products = decoded["combinedProducts"];

        List<ProductItem> allFetchedProducts = [];

        for (var product in products) {
          print("Product ID: ${product['title']}");
          print("Product Name: ${product['url']}");
          print("Product Price: ${product['price']}");
          print("Product Image: ${product['image']}");
          print("Product Rating: ${product['rating']}");
          print("Product From: ${product['from']}");

          // Check for valid data before adding the product
          if (product['title'] != 'No title found' &&
              product['price'] != 'No price found' &&
              product['url'] != null &&
              product['rating'] != 'No rating found') {
            allFetchedProducts.add(ProductItem(
              title: product['title'],
              url: product['url'],
              price: product['price'].toString(),
              image: product['image'],
              rating: product['rating'].toString(),
              from: product['from'],
            ));
          }
        }

        print("RESPONSE FROM FETCH: $allFetchedProducts");
        return allFetchedProducts;
      } else {
        print('Request failed with status: ${res.statusCode}');
        // Return an empty list if the request fails
        return [];
      }
    } catch (e) {
      // Catch any exceptions that occur during the HTTP request
      print('Error: $e');
      // Return an empty list if an error occurs
      return [];
    }
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
    Uri uri = Uri.parse('https://colback.adaptable.app/api/products/watchlist');
    final res = await http.post(
      uri,
      body: jsonEncode({"userId": userId}),
      headers: {'Content-Type': 'application/json'},
    );
    final body = res.body;
    var response = jsonDecode(body);
    if (res.statusCode != 200) {
      // Handle error here if needed
      throw Exception('Failed to load data');
    }

    List<ProductItem> allFavProducts = [];

    if (response.containsKey("watchlist")) {
      List<dynamic> watchlistJson = response["watchlist"];

      for (var item in watchlistJson) {
        allFavProducts.add(ProductItem(
          title: item['title'],
          url: item['url'],
          price: item['price'],
          image: item['image'],
          rating: item['rating'],
          from: item['from'],
        ));
      }
    }

    return allFavProducts;
  }

  Future<Map<String, dynamic>> getSingleProduct(String url) async {
    try {
      Uri uri =
          Uri.parse('http://10.120.133.92:5001/api/products/singleproduct');
      final res = await http.post(
        uri,
        body: jsonEncode({"url": url}),
        headers: {'Content-Type': 'application/json'},
      );

      if (res.statusCode == 200) {
        final decoded = jsonDecode(res.body);
        print(decoded);

        return decoded;
      } else {
        print('Request failed with status: ${res.statusCode}');
        // Return null or throw an exception if the request fails
        throw Exception('Failed to load product');
      }
    } catch (e) {
      // Catch any exceptions that occur during the HTTP request
      print('Error: $e');
      // Rethrow the exception to the caller
      throw e;
    }
  }
}
