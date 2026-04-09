async function testApi() {
    try {
        // Login
        console.log("Logging in...");
        const loginRes = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'testuser@resumebuilder.com', password: 'Test@123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log("Token received:", token ? token.substring(0, 15) + "..." : "No Token");

        if (!token) return;

        // Analyze
        console.log("Analyzing...");
        const analyzeRes = await fetch('http://localhost:5000/api/analyze/69d769cd5f61c6eb5c4f658e', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        const status = analyzeRes.status;
        const data = await analyzeRes.text();
        console.log("STATUS:", status);
        console.log("DATA:", data);
    } catch (e) {
        console.error("ERROR:", e);
    }
}
testApi();
