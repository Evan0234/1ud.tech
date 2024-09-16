// The ProxyCheck API key will be injected during the build process as an environment variable
const apiKey = process.env.VPNCHECKAPI;

// Function to create and display the message when a VPN/Proxy is detected
function displayVPNMessage() {
    // Create the message container
    const messageDiv = document.createElement('div');
    messageDiv.style.textAlign = 'center';
    messageDiv.style.backgroundColor = '#fff';
    messageDiv.style.padding = '20px';
    messageDiv.style.borderRadius = '10px';
    messageDiv.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    messageDiv.style.position = 'absolute';
    messageDiv.style.top = '50%';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translate(-50%, -50%)';
    messageDiv.style.fontFamily = 'Arial, sans-serif';

    // Create and style the main message
    const mainMessage = document.createElement('h1');
    mainMessage.textContent = 'Please disable your VPN/Proxy';
    mainMessage.style.fontSize = '24px';
    mainMessage.style.color = '#ff3333';
    messageDiv.appendChild(mainMessage);

    // Create and style the subtext
    const subtext = document.createElement('p');
    subtext.textContent = "We don't allow VPNs or proxies because you could be a bot and we don't want bots 😔";
    subtext.style.fontSize = '16px';
    subtext.style.color = '#333';
    messageDiv.appendChild(subtext);

    // Create and style the small text
    const smallText = document.createElement('small');
    smallText.textContent = 'Thank you for understanding!';
    smallText.style.fontSize = '14px';
    smallText.style.color = '#666';
    messageDiv.appendChild(smallText);

    // Add the message to the body
    document.body.appendChild(messageDiv);

    // Optional: Change the background color of the body
    document.body.style.backgroundColor = '#f4f4f4';
}

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
            displayVPNMessage();
        }
    })
    .catch(error => {
        console.error('Error checking VPN status:', error);
    });