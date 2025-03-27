import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:project01/firebase_options.dart';
import 'package:project01/presentation/authentication.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(MaterialApp(
    debugShowCheckedModeBanner: false,
    home: (SignupScreen()),
  ));
}
