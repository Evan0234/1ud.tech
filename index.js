<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VPN/Proxy Check</title>
    <style>
        #vpn-warning {
            display: none;
            color: red;
            font-size: 24px;
            text-align: center;
            margin-top: 50px;
        }
    </style>
</head>
<body>
    <h1 id="welcome-message">Welcome to the website!</h1>
    <h2 id="vpn-warning">Please disable your VPN or Proxy and try again.</h2>

    <script>
        const API_KEY = 'API_KEY_PLACEHOLDER'; // This will be replaced with the actual key during deployment

        async function checkVPN() {
            try {
                const response = await fetch(`https://proxycheck.io/v2/?key=${API_KEY}&vpn=1`);
                const data = await response.json();

                const ip = Object.keys(data)[0];
                const result = data[ip];

                if (result.proxy === "yes") {
                    document.getElementById('welcome-message').style.display = 'none';
                    document.getElementById('vpn-warning').style.display = 'block';
                }
            } catch (error) {
                console.error('Error checking VPN:', error);
            }
        }

        window.onload = checkVPN;
    </script>
</body>
</html>
