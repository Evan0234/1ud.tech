// The correct URL to use for IP detection with your token
const IPINFO_URL = 'https://ipinfo.io/json?token=899f12fa5133df';

// Function to detect if the user is using a VPN, Proxy, or Tor
async function detectVPNorProxy() {
    try {
        const response = await fetch(IPINFO_URL);
        const data = await response.json();

        console.log('IP info response:', data); // Debugging line

        // Check if VPN, Proxy, or Tor flag exists
        if (data.privacy) {
            const isVPN = data.privacy.vpn;
            const isProxy = data.privacy.proxy;
            const isTor = data.privacy.tor;

            let warningMessage = '';

            if (isVPN || isProxy || isTor) {
                warningMessage = 'Please disable your VPN, proxy, or Tor browser.';
                const warningDiv = document.getElementById('warning');
                warningDiv.innerHTML = `<p>${warningMessage}</p>`;
                warningDiv.style.display = 'block';
            }
        } else {
            console.log('Privacy information not available in API response.');
        }
    } catch (error) {
        console.error('Error fetching IP info:', error);
    }
}

// Call the function to detect VPN or Proxy
detectVPNorProxy();
