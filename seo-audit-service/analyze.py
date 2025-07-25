from flask import Flask, request, jsonify
from bs4 import BeautifulSoup
from urllib.request import urlopen

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        url = request.json['url']
        html = urlopen(url).read()
        soup = BeautifulSoup(html, 'html.parser')

        title = soup.title.string if soup.title else ''
        meta_desc = soup.find('meta', attrs={'name': 'description'})
        h1 = soup.find('h1')

        result = {
            "url": url,
            "title": title,
            "meta": meta_desc['content'] if meta_desc else '',
            "h1": h1.text if h1 else '',
            "missing": {
                "title": not bool(title),
                "meta": not bool(meta_desc),
                "h1": not bool(h1)
            }
        }
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
