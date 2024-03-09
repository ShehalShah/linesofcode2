import 'package:animate_do/animate_do.dart';
import 'package:flutter/material.dart';
import 'package:comparify/constants.dart';
import 'package:comparify/screens/login.dart';
import 'package:comparify/server/auth.dart';
import 'package:motion_toast/motion_toast.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _email = TextEditingController();
  final TextEditingController _password = TextEditingController();
  final TextEditingController _name = TextEditingController();

  AuthController authController = AuthController();

  @override
  Widget build(BuildContext context) {
    void register(String name, String email, String password,
        BuildContext context) async {
      // Navigator.of(context).push(
      //     MaterialPageRoute(builder: (context) => const JobProfile()));

      // Loader.show(context,
      //     progressIndicator: CircularProgressIndicator(color: blackTeal));
      String status = '';

      try {
        status = await authController.register(name, email, password);
      } on Exception catch (e) {
        // Loader.hide();
        print(e);
      }
      // Loader.hide();

      if (status == "Success") {
        Navigator.pushReplacement(context,
            MaterialPageRoute(builder: ((context) => const Placeholder())));
      } else {
        MotionToast.error(
                toastDuration: Duration(milliseconds: 500),
                height: 65,
                borderRadius: 10,
                // width: 400,
                padding: EdgeInsets.zero,
                title: Text(
                  "Error",
                  style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 16),
                ),
                description: Text("Enter all your details"))
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
          Colors.green.shade500,
          Colors.green.shade800,
          Colors.green.shade400
        ])),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            SizedBox(
              height: 80,
            ),
            Padding(
              padding: EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  FadeInUp(
                      duration: Duration(milliseconds: 1000),
                      child: Text(
                        "Sign Up",
                        style: TextStyle(color: Colors.white, fontSize: 40),
                      )),
                  SizedBox(
                    height: 10,
                  ),
                  FadeInUp(
                      duration: Duration(milliseconds: 1300),
                      child: Text(
                        "Join the Food Truck family!",
                        style: TextStyle(color: Colors.white, fontSize: 18),
                      )),
                ],
              ),
            ),
            SizedBox(height: 20),
            Expanded(
                child: Container(
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.only(
                            topLeft: Radius.circular(60),
                            topRight: Radius.circular(60))),
                    child: Padding(
                        padding: EdgeInsets.all(30),
                        child: Column(
                          children: <Widget>[
                            SizedBox(
                              height: 60,
                            ),
                            FadeInUp(
                                duration: Duration(milliseconds: 1400),
                                child: Column(
                                  children: <Widget>[
                                    Container(
                                      padding: EdgeInsets.all(10),
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: Colors
                                              .grey.shade400, // Border color
                                        ),
                                        borderRadius: BorderRadius.circular(
                                            10), // Optional: adds rounded corners
                                      ),
                                      child: TextField(
                                        controller: _name,
                                        onChanged: (value) {
                                          _name.text = value;
                                        },
                                        decoration: InputDecoration(
                                          hintText: "Name ",
                                          hintStyle:
                                              TextStyle(color: Colors.grey),
                                          border: InputBorder
                                              .none, // Hides default border
                                        ),
                                      ),
                                    ),
                                    SizedBox(
                                      height: 20,
                                    ),
                                    Container(
                                      padding: EdgeInsets.all(10),
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: Colors
                                              .grey.shade400, // Border color
                                        ),
                                        borderRadius: BorderRadius.circular(
                                            10), // Optional: adds rounded corners
                                      ),
                                      child: TextField(
                                        controller: _email,
                                        onChanged: (value) {
                                          _email.text = value;
                                        },
                                        // obscureText: true,
                                        decoration: InputDecoration(
                                            hintText: "Email",
                                            hintStyle:
                                                TextStyle(color: Colors.grey),
                                            border: InputBorder.none),
                                      ),
                                    ),
                                    SizedBox(
                                      height: 20,
                                    ),
                                    Container(
                                      padding: EdgeInsets.all(10),
                                      decoration: BoxDecoration(
                                        border: Border.all(
                                          color: Colors
                                              .grey.shade400, // Border color
                                        ),
                                        borderRadius: BorderRadius.circular(
                                            10), // Optional: adds rounded corners
                                      ),
                                      child: TextField(
                                        controller: _password,
                                        onChanged: (value) {
                                          _password.text = value;
                                        },
                                        obscureText: true,
                                        decoration: InputDecoration(
                                            hintText: "Password",
                                            hintStyle:
                                                TextStyle(color: Colors.grey),
                                            border: InputBorder.none),
                                      ),
                                    ),
                                  ],
                                )),
                            SizedBox(
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
                                duration: Duration(milliseconds: 1600),
                                child: MaterialButton(
                                  onPressed: () {
                                    register(_name.text, _email.text,
                                        _password.text, context);
                                  },

                                  height: 50,
                                  // margin: EdgeInsets.symmetric(horizontal: 50),
                                  color: Colors.green[400],
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(50),
                                  ),
                                  // decoration: BoxDecoration(
                                  // ),
                                  child: Center(
                                    child: Text(
                                      "Signup",
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold),
                                    ),
                                  ),
                                )),
                            SizedBox(
                              height: 50,
                            ),
                            FadeInUp(
                                duration: Duration(milliseconds: 1500),
                                child: Row(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  children: [
                                    Text('Already Have an Account? '),
                                    // SizedBox(
                                    //   width: 10,
                                    // ),
                                    InkWell(
                                      onTap: () => Navigator.of(context).push(
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              const LoginScreen(),
                                        ),
                                      ),
                                      child: Text(
                                        'Sign In',
                                        style: TextStyle(
                                            color: Pallete.gradient3,
                                            fontSize: 16),
                                      ),
                                    )
                                  ],
                                )),
                          ],
                        ))))
          ],
        ),
      ),
    );
  }
}
