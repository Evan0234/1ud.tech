const IPINFO_URL = 'https://ipinfo.io/json?token=899f12fa5133df';

async function detectVPNorProxy() {
    try {
        console.log('Fetching IP info...');
        const response = await fetch(IPINFO_URL);
        console.log('Response received:', response);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('IP info response:', data); // Debugging line
        
        if (data.privacy) {
            const isVPN = data.privacy.vpn || false;
            const isProxy = data.privacy.proxy || false;
            console.log('Is VPN:', isVPN);
            console.log('Is Proxy:', isProxy);
            
            if (isVPN || isProxy) {
                console.log('Redirecting to 1ud.website');
                window.location.href = 'https://1ud.website';
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

// Call the function to detect VPN or Proxy
detectVPNorProxy();
