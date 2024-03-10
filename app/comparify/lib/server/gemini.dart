// import 'dart:io';

// import 'package:google_generative_ai/google_generative_ai.dart';

// Future<String> geminiInsight(String title, List<String> reviews) async {
//   // Access your API key as an environment variable (see "Set up your API key" above)
//   final apiKey =
//       Platform.environment['AIzaSyCMHR4tsEDEle-oHz_x1X5eQfwUtadd6iU'];
//   if (apiKey == null) {
//     print('No \$API_KEY environment variable');
//     exit(1);
//   }
//   // For text-only input, use the gemini-pro model
//   final model = GenerativeModel(model: 'gemini-pro', apiKey: apiKey);
//   final content = [
//     Content.text(
//         'Analyze the following reviews and give me your insights based on it of a $title the reviews are as follows ${reviews.join(" ")}')
//   ];
//   final response = await model.generateContent(content);
//   print(response.text);

//   return response.text ?? "No insights found";
// }
