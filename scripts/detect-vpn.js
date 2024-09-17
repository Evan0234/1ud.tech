// Your IPinfo token here
const IPINFO_TOKEN = '899f12fa5133df';

// Function to detect if user is using VPN, Proxy, or Tor
async function detectVPNorProxy() {
    const url = `https://ipinfo.io?token=${IPINFO_TOKEN}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Check if VPN, Proxy, or Tor flag exists
        if (data.privacy) {
            let warningMessage = 'Please disable your ';

            if (data.privacy.proxy) {
                warningMessage += 'proxy';
            } else if (data.privacy.vpn) {
                warningMessage += 'VPN';
            } else if (data.privacy.tor) {
                warningMessage += 'Tor';
            } else {
                // No VPN, proxy, or Tor detected
                return;
            }

            // Display the warning message on the screen
            document.getElementById('warning').innerHTML = `<p style="color: red;">${warningMessage}</p>`;
        }
    } catch (error) {
        console.error('Error fetching IP info:', error);
    }
}

// Call the function to detect VPN or Proxy
detectVPNorProxy();
