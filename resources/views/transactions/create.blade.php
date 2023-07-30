<!DOCTYPE html>
<html>
<head>
    <title>Test Transaction Form</title>
</head>
<body>
    <form method="POST" action="{{route('transactions.store', [$deal_id, $product_id])}}">
        @csrf

        <label for="seller_id">Seller ID:</label>
        <input type="text" name="seller_id" id="seller_id" required>

        <label for="buyer_id">Buyer ID:</label>
        <input type="text" name="buyer_id" id="buyer_id" required>

        <label for="payment_method">Payment Method:</label>
        <input type="text" name="payment_method" id="payment_method" required>


        <button type="submit">Submit</button>
    </form>
</body>
</html>
