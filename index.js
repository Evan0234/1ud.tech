const apiKey = process.env.VPNCHECKAPI;  // Use the environment variable

fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const userIP = data.ip;

    // Check the IP against ProxyCheck.io using the API key from the environment
    return fetch(`https://proxycheck.io/v2/${userIP}?key=${apiKey}&vpn=1`);
  })
  .then(response => response.json())
  .then(data => {
    const result = data[Object.keys(data)[0]];  // Getting the first IP result

    if (result.proxy === "yes") {
      // If the user is using a VPN or Proxy, show the message
      document.getElementById('message').style.display = 'block';
      document.body.style.backgroundColor = '#fff'; // Optional: Change background color
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
