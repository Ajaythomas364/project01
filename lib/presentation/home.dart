import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:project01/presentation/authentication.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        alignment: Alignment.bottomCenter,
        children: [
          Container(
            decoration: BoxDecoration(
                image: DecorationImage(
                    image: AssetImage('assets/images/welcome.jpg'),
                    fit: BoxFit.cover)),
          ),
          Padding(
            padding: EdgeInsets.only(bottom: 100),
            child: Positioned(
                child: MaterialButton(
              elevation: 10,
              color: Color.fromARGB(151, 121, 29, 29),
              height: 50,
              minWidth: 200,
              onPressed: () {
                Navigator.push(
                    context,
                    CupertinoPageRoute(
                        builder: (context) => SignupScreen(),
                        fullscreenDialog: true));
              },
              child: Text(
                "GET STARTED",
                style: TextStyle(color: Colors.white),
              ),
            )),
          )
        ],
      ),
    );
  }
}
