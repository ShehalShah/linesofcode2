import 'dart:convert';
import 'dart:io';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class AuthController {
  Future<int> login(
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
      return -1;
    }
    print(res.body);
    final response = jsonDecode(body);
    init(response);

    // final SharedPreferences prefs = await SharedPreferences.getInstance();
    // prefs.setString('userId', response['id']);
    // print("fetched user id: ${prefs.getInt('userId')}");

    print("Response user LLLLLLLLLLLLLLLLLLLLLLLLLLLL: ${response['id']}");

    return response['id'];
  }

  Future<int> register(
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
      return -1;
    }
    print(res.body);
    final response = jsonDecode(body);
    init(response);

    // final SharedPreferences prefs = await SharedPreferences.getInstance();
    // prefs.setString('userId', response['id']);
    // print("fetched user id: ${prefs.getInt('userId')}");

    print("Response user id RRRRRRRRRRRRRRRRRRRRRRRRRR: ${response['id']}");

    return response['id'];
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
