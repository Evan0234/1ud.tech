const IPINFO_URL = 'https://ipinfo.io/json?token=899f12fa5133df';

async function detectVPNorProxy() {
    try {
        const response = await fetch(IPINFO_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('IP info response:', data); // Debugging line

        if (data.privacy) {
            const isVPN = data.privacy.vpn || false;
            const isProxy = data.privacy.proxy || false;

            if (isVPN || isProxy) {
                // Redirect to 1ud.website if VPN or Proxy is detected
                window.location.href = 'https://1ud.website';
            }
        } else {
            console.error('Privacy information not available in API response.');
        }
    } catch (error) {
        console.error('Error fetching IP info:', error);
        // Optionally, redirect or show a message in case of an error
        const warningDiv = document.getElementById('warning');
        warningDiv.innerHTML = `<p>Failed to check VPN/Proxy status.</p>`;
        warningDiv.style.display = 'block';
    }
}

// Call the function to detect VPN or Proxy
detectVPNorProxy();
