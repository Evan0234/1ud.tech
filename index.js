<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VPN Check</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
            margin: 0;
        }
        #message {
            display: none;
            text-align: center;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        #message h1 {
            font-size: 24px;
            color: #ff3333;
        }
        #message p {
            font-size: 16px;
            color: #333;
        }
        #message small {
            font-size: 14px;
            color: #666;
        }
    </style>
</head>
<body>

<div id="message">
    <h1>Please disable your VPN/Proxy</h1>
    <p>We don't allow VPNs or proxies because you could be a bot and we don't want bots 😔</p>
    <small>Thank you for understanding!</small>
</div>

<script>
    // The ProxyCheck API key will be injected during the build process as an environment variable
    const apiKey = process.env.VPNCHECKAPI;

    // Fetch the user's IP using ipify and then check it against ProxyCheck.io
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIP = data.ip;

            // Check the IP against ProxyCheck.io using the injected API key
            return fetch(`https://proxycheck.io/v2/${userIP}?key=${apiKey}&vpn=1`);
        })
        .then(response => response.json())
        .then(data => {
            const result = data[Object.keys(data)[0]]; // Get the first IP result from the response

            if (result.proxy === "yes") {
                // If the user is detected to be using a VPN or Proxy, display the message
                document.getElementById('message').style.display = 'block';
                document.body.style.backgroundColor = '#fff'; // Optional: Change the background color
            }
        })
        .catch(error => {
            console.error('Error checking VPN status:', error);
        });
</script>

</body>
</html>