from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

messages = []

@app.route('/', methods=['POST'])
def addMessage():
    message = request.get_json()
    messages.append(message)
    return jsonify({"message":'Succesfully uploaded'}), 200
    


@app.route('/', methods=['GET'])
def showMessages():
    return jsonify({"messages":messages}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0' , debug=True, port=5000)