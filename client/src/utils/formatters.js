export const cleanUsername = (url, type) => {
    if (!url) return "";
    // Remove protocol and www
    let clean = url.toString().replace(/^https?:\/\/(www\.)?/, "");
    
    if (type === 'linkedin') {
        // Handle linkedin.com/in/user, linkedin.com/profile/user, linkedin/user, or just user
        clean = clean.replace(/(linkedin(\.com)?\/(in\/|profile\/)?)/, "");
    } else if (type === 'github') {
        clean = clean.replace(/(github(\.com)?\/)/, "");
    }
    
    // Remove trailing slash
    return clean.replace(/\/$/, "");
};

export const getContrastText = (hexcolor) => {
    if (!hexcolor || hexcolor.startsWith('linear-gradient')) return 'text-white';
    
    // If it's a hex color
    const hex = hexcolor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'text-gray-900' : 'text-white';
};
