<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Welcome </title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background-color: #007bff;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
            line-height: 1.6;
            font-size: 16px;
        }
        .email-footer {
            text-align: center;
            padding: 15px;
            font-size: 14px;
            color: #777;
            background-color: #f1f1f1;
        }
        .cta-button {
            display: inline-block;
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .cta-button:hover {
            background-color: #0056b3;
            color: #ffffff;

        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            Welcome to Our Website
        </div>
        <div class="email-body">
            <h1>Welcome {{ $user['name'] }}</h1>
            <p>Thanks for joining our website!</p>
            <p>We're excited to have you on board.</p>
            <a href="http://localhost:4200/show_products" class="cta-button">Start Shopping</a>
        </div>
        <div class="email-footer">
            &copy; {{ date('Y') }} Our Website. All rights reserved.
        </div>
    </div>
</body>
</html>