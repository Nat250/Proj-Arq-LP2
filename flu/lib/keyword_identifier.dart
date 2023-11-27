import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;




class KeywordIdentifierApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Keyword Identifier',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: KeywordIdentifierPage(),
    );
  }
}

class KeywordIdentifierPage extends StatelessWidget {
  final TextEditingController textController = TextEditingController();
  final TextEditingController keywordsController = TextEditingController();
  String result = '';

  Future<void> identifyKeywords() async {
    try {
      var response = await http.post(
        Uri.parse('http://localhost:4000/identify'),
        headers: {'Content-Type': 'application/json'},
        body: {'text': textController.text, 'keywords': keywordsController.text.split(',')},
      );

      var data = response.body;
      result = data;
    } catch (error) {
      print('Erro ao identificar palavras-chave: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Keyword Identifier'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Identificador de Palavras-Chave'),
            TextField(
              maxLines: 4,
              minLines: 1,
              controller: textController,
              decoration: InputDecoration(labelText: 'Insira seu texto:'),
            ),
            SizedBox(height: 16),
            TextField(
              controller: keywordsController,
              decoration: InputDecoration(labelText: 'Palavras-Chave (separadas por vírgulas):'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => identifyKeywords(),
              child: Text('Identificar Palavras-Chave'),
            ),
            SizedBox(height: 16),
            Text('Resultado: $result'),
          ],
        ),
      ),
    );
  }
}
