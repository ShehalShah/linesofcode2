import 'dart:convert';
import 'dart:io';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;

class AuthController {
  Future<String> login(
    String username,
    String password,
  ) async {
    Uri uri = Uri.parse('https://colback.adaptable.app/api/users/login');
    final res = await http.post(uri,
        body: jsonEncode({
          "email": username.toString(),
          "password": password.toString(),
        }),
        headers: {'Content-Type': 'application/json'});
    final body = res.body;
    print(body);
    if (res.statusCode != 200) {
      print('incorrect');
      return "incorrect_user_details";
    }
    print(res.body);
    final response = jsonDecode(body);
    init(response);
    return "Success";
  }

  Future<String> register(
    String name,
    String email,
    String password,
  ) async {
    print("HI" + name);
    print("HI" + email);
    print("HI" + password);

    Uri uri = Uri.parse('https://colback.adaptable.app/api/users/signup');
    final res = await http.post(uri,
        body: jsonEncode({
          "name": name.toString(),
          "email": email.toString(),
          "password": password.toString(),
        }),
        headers: {'Content-Type': 'application/json'});
    final body = res.body;
    print(body);
    if (res.statusCode != 200) {
      print('incorrect');
      return "incorrect_user_details";
    }
    print(res.body);
    final response = jsonDecode(body);
    init(response);
    return "Success";
  }

  Future<String> resetPassword(
      String username, String password, String confirmpassword) async {
    Uri uri =
        Uri.parse('https://acm-if.onrender.com/api/acm-if/forgot-password');
    final res = await http.post(uri,
        body: jsonEncode({
          "email": username.toString(),
          "password": password.toString(),
          "confirmPassword": confirmpassword.toString()
        }),
        headers: {'Content-Type': 'application/json'});
    final body = res.body;
    print(res.statusCode);
    if (res.statusCode != 200) {
      // print('incorrect');
      return "User not found";
    }

    // print(res.body);
    // final response = jsonDecode(body);

    // init(response);
    return "password changed successfully";
  }

  void init(res) async {
    try {
      final box = GetStorage();
      box.write('token', res['token']);
      box.write('id', res['data']['id']);
    } catch (e) {
      print(e);
    }
  }
}
