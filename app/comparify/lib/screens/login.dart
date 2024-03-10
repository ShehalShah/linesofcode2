import 'package:animate_do/animate_do.dart';
import 'package:comparify/screens/home.dart';
import 'package:flutter/material.dart';
import 'package:comparify/constants.dart';
import 'package:comparify/screens/register.dart';
import 'package:comparify/server/auth.dart';
import 'package:motion_toast/motion_toast.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();
  AuthController authController = AuthController();

  @override
  Widget build(BuildContext context) {
    void signIn(String email, String password) async {
      // print("HI " + email);
      // print("HI " + password);

      // Navigator.of(context).push(
      //     MaterialPageRoute(builder: (context) => const JobProfile()));
      // Loader.show(context, progressIndicator: CircularProgressIndicator(color: blackTeal));
      // String status = '';
      int userId = -1;

      try {
        userId = await authController.login(email, password);
        // print("Login screen user id: $userId");
      } on Exception catch (e) {
        // Loader.hide();
        print(e);
      }
      // Loader.hide();

      if (userId != -1) {
        Navigator.pushReplacement(context,
            MaterialPageRoute(builder: ((context) => Home(userId: userId))));
      } else {
        MotionToast.error(
                toastDuration: Duration(milliseconds: 500),
                height: 65,
                borderRadius: 10,
                // width: 400,
                padding: EdgeInsets.zero,
                title: Text(
                  "Incorrect user details",
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16),
                ),
                description: Text("Enter registered email and password"))
            .show(context);
      }
      // authController.login(email, password);
      // Navigator.push(context, MaterialPageRoute(builder: (context) {
      //   return const JobProfile();
      // }));
    }

    return Scaffold(
      body: Container(
        width: double.infinity,
        decoration: BoxDecoration(
            gradient: LinearGradient(begin: Alignment.topCenter, colors: [
          Colors.deepPurple.shade300,
          Colors.deepPurple.shade600,
          Colors.deepPurple.shade900
        ])),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            const SizedBox(
              height: 80,
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  FadeInUp(
                      duration: const Duration(milliseconds: 700),
                      child: const Text(
                        "Login",
                        style: TextStyle(color: Colors.white, fontSize: 40),
                      )),
                  const SizedBox(
                    height: 10,
                  ),
                  FadeInUp(
                      duration: const Duration(milliseconds: 1000),
                      child: const Text(
                        "Welcome Back!",
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      )),
                ],
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: Container(
                decoration: const BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(60),
                        topRight: Radius.circular(60))),
                child: Padding(
                  padding: const EdgeInsets.all(30),
                  child: Column(
                    children: <Widget>[
                      const SizedBox(
                        height: 60,
                      ),
                      FadeInUp(
                          duration: const Duration(milliseconds: 1100),
                          child: Column(
                            children: <Widget>[
                              Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  border: Border.all(
                                    color: Colors.grey.shade400, // Border color
                                  ),
                                  borderRadius: BorderRadius.circular(
                                      10), // Optional: adds rounded corners
                                ),
                                child: TextField(
                                  onChanged: (value) {
                                    _email.text = value;
                                  },
                                  decoration: const InputDecoration(
                                    hintText: "Email or Phone number",
                                    hintStyle: TextStyle(color: Colors.grey),
                                    border: InputBorder
                                        .none, // Hides default border
                                  ),
                                ),
                              ),
                              const SizedBox(
                                height: 40,
                              ),
                              Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  border: Border.all(
                                    color: Colors.grey.shade400, // Border color
                                  ),
                                  borderRadius: BorderRadius.circular(
                                      10), // Optional: adds rounded corners
                                ),
                                child: TextField(
                                  onChanged: (value) {
                                    _password.text = value;
                                  },
                                  // obscureText: true,
                                  decoration: InputDecoration(
                                      hintText: "Password",
                                      hintStyle: TextStyle(color: Colors.grey),
                                      border: InputBorder.none),
                                ),
                              ),
                            ],
                          )),
                      const SizedBox(
                        height: 40,
                      ),
                      // FadeInUp(
                      //     duration: Duration(milliseconds: 1500),
                      //     child: Text(
                      //       "Forgot Password?",
                      //       style: TextStyle(color: Colors.grey),
                      //     )),
                      // SizedBox(
                      //   height: 40,
                      // ),
                      FadeInUp(
                          duration: const Duration(milliseconds: 1300),
                          child: MaterialButton(
                            onPressed: () {
                              signIn(_email.text, _password.text);
                            },
                            height: 50,
                            // margin: EdgeInsets.symmetric(horizontal: 50),
                            color: Colors.deepPurple[400],
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(50),
                            ),
                            // decoration: BoxDecoration(
                            // ),
                            child: const Center(
                              child: Text(
                                "Login",
                                style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.bold),
                              ),
                            ),
                          )),
                      const SizedBox(
                        height: 50,
                      ),
                      FadeInUp(
                          duration: const Duration(milliseconds: 1200),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              const Text('Don\'t Have An Account Yet? '),
                              // SizedBox(
                              //   width: 10,
                              // ),
                              InkWell(
                                onTap: () => Navigator.of(context).push(
                                  MaterialPageRoute(
                                    builder: (context) =>
                                        const RegisterScreen(),
                                  ),
                                ),
                                child: const Text(
                                  'Sign Up',
                                  style: TextStyle(
                                      color: Pallete.linkBlue, fontSize: 16),
                                ),
                              )
                            ],
                          )),
                    ],
                  ),
                ),
              ),
            )
          ],
        ),
      ),
    );
  }
}
