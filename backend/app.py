from flask import Flask, jsonify, request
from flask_cors import CORS
from database import init_db, get_db

app = Flask(__name__)
CORS(app)

init_db()


@app.route("/")
def home():
    return jsonify({
        "message": "BITE backend is running",
        "tagline": "Good food. Better mood."
    })


@app.route("/api/health")
def health():
    return jsonify({
        "status": "success",
        "message": "BITE API is working"
    })


@app.route("/api/orders", methods=["GET"])
def get_orders():
    db = get_db()

    orders = db.execute(
        "SELECT * FROM orders ORDER BY id DESC"
    ).fetchall()

    db.close()

    return jsonify([
        dict(order) for order in orders
    ])


@app.route("/api/orders", methods=["POST"])
def create_order():
    data = request.get_json()

    customer_name = data.get("customer_name", "")
    phone = data.get("phone", "")
    address = data.get("address", "")
    total = data.get("total", 0)
    payment = data.get("payment", "COD")

    db = get_db()

    cursor = db.execute(
        """
        INSERT INTO orders
        (customer_name, phone, address, total, payment, status)
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            customer_name,
            phone,
            address,
            total,
            payment,
            "Confirmed"
        )
    )

    db.commit()

    order_id = cursor.lastrowid

    db.close()

    return jsonify({
        "message": "Order created successfully",
        "order_id": order_id
    }), 201


@app.route("/api/orders/<int:order_id>", methods=["PUT"])
def update_order(order_id):
    data = request.get_json()
    status = data.get("status")

    db = get_db()

    db.execute(
        """
        UPDATE orders
        SET status = ?
        WHERE id = ?
        """,
        (status, order_id)
    )

    db.commit()
    db.close()

    return jsonify({
        "message": "Order updated successfully"
    })


@app.route("/api/orders/<int:order_id>", methods=["DELETE"])
def delete_order(order_id):
    db = get_db()

    db.execute(
        "DELETE FROM orders WHERE id = ?",
        (order_id,)
    )

    db.commit()
    db.close()

    return jsonify({
        "message": "Order deleted successfully"
    })


if __name__ == "__main__":
    app.run(debug=True)