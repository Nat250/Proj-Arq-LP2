import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;



class HtmlStorageServiceApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Html Storage Service',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HtmlStorageServicePage(),
    );
  }
}

class HtmlStorageServicePage extends StatelessWidget {
  final TextEditingController htmlContentController = TextEditingController();
  String savedPageId = '';

  Future<void> savePage() async {
    try {
      var response = await http.post(
        Uri.parse('http://localhost:4000/save'),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: {'htmlContent': htmlContentController.text},
      );

      var data = response.body;
      savedPageId = data;
      print('Página salva com sucesso. ID: $savedPageId');
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
        title: Text('Html Storage Service'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
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
            if (savedPageId.isNotEmpty)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Página salva com sucesso. ID: $savedPageId'),
                  ElevatedButton(
                    onPressed: () => loadPage(savedPageId),
                    child: Text('Carregar Página'),
                  ),
                ],
              ),
          ],
        ),
      ),
    );
  }
}
