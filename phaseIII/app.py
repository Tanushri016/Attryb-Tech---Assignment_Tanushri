from flask import Flask, jsonify, request
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('oem_specs.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/api/oem/count', methods=['GET'])
def get_oem_count():
    conn = get_db_connection()
    count = conn.execute('SELECT COUNT(*) as total FROM OEM_Specs').fetchone()['total']
    conn.close()
    return jsonify({'total_oem_models': count})
@app.route('/api/oem/search', methods=['GET'])
def search_oem():
    model = request.args.get('model')
    year = request.args.get('year')

    if not model or not year:
        return jsonify({'error': 'Please provide model and year'}), 400

    conn = get_db_connection()
    car = conn.execute(
        'SELECT * FROM OEM_Specs WHERE model_name = ? AND year = ?',
        (model, year)
    ).fetchone()
    conn.close()

    if car:
        return jsonify(dict(car))
    else:
        return jsonify({'error': 'Car not found'}), 404

if __name__ == '__main__':
    app.run(debug=True)
