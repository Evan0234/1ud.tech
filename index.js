// This code runs when the page is loaded

document.addEventListener("DOMContentLoaded", function() {
    const API_KEY = document.querySelector('meta[name="api-key"]').getAttribute('content');

    // Function to check if the user is using a VPN or proxy
    async function checkVPN() {
        try {
            // Call the ProxyCheck API using the fetched API key
            const response = await fetch(`https://proxycheck.io/v2/?key=${API_KEY}&vpn=1`);
            const data = await response.json();

            // Extract the IP address and result from the response
            const ip = Object.keys(data)[0];
            const result = data[ip];

            if (result.proxy === "yes") {
                // If the user is using a VPN/proxy, show the warning message
                document.getElementById('welcome-message').style.display = 'none';
                document.getElementById('vpn-warning').style.display = 'block';
            }
        } catch (error) {
            console.error('Error checking VPN:', error);
        }
    }

    // Run the VPN check when the page loads
    checkVPN();
});
