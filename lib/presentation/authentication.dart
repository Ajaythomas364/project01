import 'package:flutter/material.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  String isclicked = "signup";
  TextEditingController name = TextEditingController();
  TextEditingController email = TextEditingController();
  TextEditingController phone = TextEditingController();
  TextEditingController pass = TextEditingController();
  TextEditingController cpass = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          const Padding(
            padding: EdgeInsets.only(top: 50),
            child: Text(
              "GET STARTED NOW",
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: 20,
              ),
            ),
          ),
          const Text("create an account or log in to explore about our apps"),
          const SizedBox(height: 20),
          Row(
            children: [
              const Spacer(),
              ElevatedButton(
                  style: ButtonStyle(
                      backgroundColor: MaterialStatePropertyAll(
                          isclicked == "signup"
                              ? Colors.green[400]
                              : Colors.green[200]),
                      minimumSize:
                          const MaterialStatePropertyAll(Size(150, 60))),
                  onPressed: () {
                    setState(() {
                      isclicked = "signup";
                    });
                  },
                  child: const Text("SIGN UP",
                      style: TextStyle(
                        color: Colors.white,
                      ))),
              const Spacer(),
              ElevatedButton(
                  style: ButtonStyle(
                      backgroundColor: MaterialStatePropertyAll(
                          isclicked == "login"
                              ? Colors.green[400]
                              : Colors.green[200]),
                      minimumSize:
                          const MaterialStatePropertyAll(Size(150, 60))),
                  onPressed: () {
                    setState(() {
                      isclicked = "login";
                    });
                  },
                  child: const Text("LOG IN",
                      style: TextStyle(
                        color: Colors.white,
                      ))),
              const Spacer(),
            ],
          ),
          const SizedBox(height: 20),
          isclicked == "signup"
              ? Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Enter Fullname : "),
                      const SizedBox(height: 5),
                      TextField(
                        controller: name,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                                borderSide:
                                    const BorderSide(color: Colors.black))),
                      ),
                      const Text("Enter phone number : "),
                      const SizedBox(height: 5),
                      TextField(
                        controller: phone,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                                borderSide:
                                    const BorderSide(color: Colors.black))),
                      ),
                      const SizedBox(height: 5),
                      const Text("Enter Email Address : "),
                      const SizedBox(height: 5),
                      TextField(
                        controller: email,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                                borderSide:
                                    const BorderSide(color: Colors.black))),
                      ),
                      const SizedBox(height: 5),
                      const Text("Enter  password : "),
                      const SizedBox(height: 5),
                      TextField(
                        controller: pass,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                                borderSide:
                                    const BorderSide(color: Colors.black))),
                      ),
                      const SizedBox(height: 5),
                      const Text("Confirm password : "),
                      const SizedBox(height: 5),
                      TextField(
                        controller: cpass,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                                borderSide:
                                    const BorderSide(color: Colors.black))),
                      ),
                      const SizedBox(height: 40),
                      Center(
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStatePropertyAll(Colors.green[900]),
                            minimumSize:
                                const MaterialStatePropertyAll(Size(350, 50)),
                          ),
                          onPressed: () {},
                          child: const Text("SIGN UP",
                              style: TextStyle(color: Colors.white)),
                        ),
                      ),
                    ],
                  ),
                )
              : Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text("Enter Email Address : "),
                      const SizedBox(height: 5),
                      TextField(
                        controller: email,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                                borderSide:
                                    const BorderSide(color: Colors.black))),
                      ),
                      const SizedBox(height: 5),
                      const Text("Enter  password : "),
                      const SizedBox(height: 5),
                      TextField(
                        controller: pass,
                        decoration: InputDecoration(
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(20),
                                borderSide:
                                    const BorderSide(color: Colors.black))),
                      ),
                      const SizedBox(height: 20),
                      Center(
                        child: ElevatedButton(
                          style: ButtonStyle(
                            backgroundColor:
                                MaterialStatePropertyAll(Colors.green[900]),
                            minimumSize:
                                const MaterialStatePropertyAll(Size(350, 50)),
                          ),
                          onPressed: () {},
                          child: const Text("LOG IN",
                              style: TextStyle(color: Colors.white)),
                        ),
                      ),
                    ],
                  ),
                ),
        ],
      ),
    );
  }
}
