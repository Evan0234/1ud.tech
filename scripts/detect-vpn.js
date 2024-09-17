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

            let warningMessage = '';

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
        const warningDiv = document.getElementById('warning');
        warningDiv.innerHTML = `<p>Failed to check VPN/Proxy status.</p>`;
        warningDiv.style.display = 'block';
    }
}

detectVPNorProxy();
