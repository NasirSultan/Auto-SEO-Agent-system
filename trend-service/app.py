from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/trends', methods=['POST'])
def get_trends():
    keyword = request.json.get('keyword')
    if not keyword:
        return jsonify({"error": "Keyword required"}), 400

    try:
        endpoint = f"https://trends.google.com/trends/api/autocomplete/{keyword}"
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(endpoint, headers=headers)
        if response.status_code != 200:
            return jsonify({"error": "Failed to fetch trends"}), 500

        # Cleanup Google’s weird prefix
        clean_text = response.text.replace(")]}',", '')
        json_data = eval(clean_text)

        trends = [
            {"query": s["title"], "type": s["type"]}
            for s in json_data.get("default", {}).get("topics", [])[:5]
        ]

        return jsonify({
            "keyword": keyword,
            "trends": trends
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002)
