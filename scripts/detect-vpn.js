// The correct URL to use for IP detection with your token
const IPINFO_URL = 'https://ipinfo.io/json?token=899f12fa5133df';

// Function to detect if the user is using a VPN or Proxy
async function detectVPNorProxy() {
    try {
        const response = await fetch(IPINFO_URL);
        const data = await response.json();

        console.log('IP info response:', data); // Debugging line

        // Check if privacy information is available and contains VPN or Proxy info
        if (data.privacy) {
            const isVPN = data.privacy.vpn || false;
            const isProxy = data.privacy.proxy || false;

            let warningMessage = '';

            // Determine if VPN or Proxy is detected
            if (isVPN || isProxy) {
                warningMessage = 'Please turn off your VPN or Proxy.';
                const warningDiv = document.getElementById('warning');
                warningDiv.innerHTML = `<p>${warningMessage}</p>`;
                warningDiv.style.display = 'block';
            }
        } else {
            console.error('Privacy information not available in API response.');
        }
    } catch (error) {
        console.error('Error fetching IP info:', error);
    }
}

// Call the function to detect VPN or Proxy
detectVPNorProxy();
