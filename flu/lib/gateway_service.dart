// gateway_service.dart
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class GatewayApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Gateway Service',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: GatewayHomePage(),
    );
  }
}

class GatewayHomePage extends StatelessWidget {
  final TextEditingController textController = TextEditingController();
  final TextEditingController keywordsController = TextEditingController();
  final TextEditingController htmlContentController = TextEditingController();
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

  Future<void> savePage() async {
    try {
      var response = await http.post(
        Uri.parse('http://localhost:4000/save'),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: {'htmlContent': htmlContentController.text},
      );

      var data = response.body;
      print('Página salva com sucesso. ID: $data');
    } catch (error) {
      print('Erro ao salvar a página: $error');
    }
  }

  Future<void> loadPage(String pageId) async {
    try {
      var response = await http.get(Uri.parse('http://localhost:4000/page/$pageId'));
      if (response.statusCode == 200) {
        var loadedHtmlContent = response.body;
        htmlContentController.text = loadedHtmlContent;
        print('Página carregada com sucesso.');
      } else {
        throw Exception('Erro ao carregar a página.');
      }
    } catch (error) {
      print('Erro ao carregar a página: $error');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Gateway Service'),
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
            SizedBox(height: 32),
            Text('Armazenamento de HTML'),
            TextField(
              maxLines: 4,
              minLines: 1,
              controller: htmlContentController,
              decoration: InputDecoration(labelText: 'Conteúdo HTML:'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => savePage(),
              child: Text('Salvar Página'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () => loadPage(result),
              child: Text('Carregar Página'),
            ),
          ],
        ),
      ),
    );
  }
}
