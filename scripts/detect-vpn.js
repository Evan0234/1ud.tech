// The correct URL to use for IP detection with your token
const IPINFO_URL = 'https://ipinfo.io/json?token=899f12fa5133df';

// Function to detect if the user is using a VPN, Proxy, or Tor
async function detectVPNorProxy() {
    try {
        const response = await fetch(IPINFO_URL);
        const data = await response.json();

        // Check if VPN, Proxy, or Tor flag exists
        if (data.privacy) {
            let warningMessage = 'Please disable your ';

            if (data.privacy.proxy || data.privacy.vpn || data.privacy.tor) {
                warningMessage += 'VPN, proxy, or Tor browser.';
                
                // Display the warning message on the screen
                document.getElementById('warning').innerHTML = `<p>${warningMessage}</p>`;
                document.getElementById('warning').style.display = 'block';
            }
        }
    } catch (error) {
        console.error('Error fetching IP info:', error);
    }
}

// Call the function to detect VPN or Proxy
detectVPNorProxy();
