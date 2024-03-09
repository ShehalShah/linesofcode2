import 'dart:convert';

import 'package:http/http.dart' as http;

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
}
