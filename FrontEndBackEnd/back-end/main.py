from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

#Simple Rest API which returns Hello World as a message.
@app.route('/hello', methods=['GET', 'POST'])
def welcome():
    return jsonify({"message":'Hello World from the Flask Rest API'}), 200
    #return "Hello World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0' , debug=True, port=5000)

