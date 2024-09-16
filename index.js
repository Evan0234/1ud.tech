async function checkVPN() {
  try {
    const response = await fetch('/api/check-vpn');  // Call the backend server
    const data = await response.json();
    if (data && data.vpn === 'yes') {
      document.getElementById('vpn-warning').style.display = 'block';
    }
  } catch (error) {
    console.error('Error checking VPN:', error);
  }
}

checkVPN();
