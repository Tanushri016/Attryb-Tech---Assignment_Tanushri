from flask import Flask, g, request, jsonify
def search_oem():
manufacturer = request.args.get('manufacturer')
model = request.args.get('model')
year = request.args.get('year')
if not (manufacturer and model and year):
return jsonify({'error': 'provide manufacturer, model, year'}), 400
rows = query_db('SELECT * FROM oem_specs WHERE manufacturer=? AND model=? AND year=?', (manufacturer, model, int(year)))
items = [dict(r) for r in rows]
return jsonify({'results': items})


@app.route('/api/inventory', methods=['POST'])
def add_inventory():
payload = request.json
required = ['dealer_id','title','price']
if not all(k in payload for k in required):
return jsonify({'error':'missing fields'}), 400
db = get_db()
cur = db.execute('''INSERT INTO marketplace_inventory (dealer_id,oem_id,title,description,price,kms_on_odometer,major_scratches,original_paint,accidents_reported,previous_buyers,registration_place)
VALUES (?,?,?,?,?,?,?,?,?,?,?)''', (
payload.get('dealer_id'), payload.get('oem_id'), payload.get('title'), payload.get('description'), payload.get('price'), payload.get('kms_on_odometer'), payload.get('major_scratches',0), payload.get('original_paint',1), payload.get('accidents_reported',0), payload.get('previous_buyers',1), payload.get('registration_place')
))
db.commit()
new_id = cur.lastrowid
return jsonify({'inserted_id': new_id}), 201

@app.route('/api/inventory', methods=['GET'])
def list_inventory():
dealer_id = request.args.get('dealer_id')
if dealer_id:
rows = query_db('SELECT * FROM marketplace_inventory WHERE dealer_id=?', (int(dealer_id),))
else:
rows = query_db('SELECT * FROM marketplace_inventory')
return jsonify({'items':[dict(r) for r in rows]})

@app.route('/api/inventory/<int:item_id>', methods=['PUT'])
def edit_inventory(item_id):
payload = request.json
fields = []
vals = []
for k,v in payload.items():
fields.append(f"{k}=?")
vals.append(v)
if not fields:
return jsonify({'error':'no fields to update'}), 400
vals.append(item_id)
db = get_db()
db.execute(f"UPDATE marketplace_inventory SET {', '.join(fields)} WHERE id=?", vals)
db.commit()
return jsonify({'updated_id': item_id})

@app.route('/api/inventory/bulk-delete', methods=['POST'])
def bulk_delete():
payload = request.json
ids = payload.get('ids', [])
if not ids:
return jsonify({'error':'no ids provided'}), 400
db = get_db()
q = 'DELETE FROM marketplace_inventory WHERE id IN ({})'.format(','.join('?' for _ in ids))
db.execute(q, ids)
db.commit()
return jsonify({'deleted': len(ids)})


if __name__ == '__main__':
app.run(debug=True)