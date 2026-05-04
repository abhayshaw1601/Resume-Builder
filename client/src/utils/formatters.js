export const cleanUsername = (url, type) => {
    if (!url) return "";
    // Remove protocol and www
    let clean = url.toString().replace(/^https?:\/\/(www\.)?/, "");
    
    if (type === 'linkedin') {
        // Handle linkedin.com/in/user, linkedin.com/profile/user, or just linkedin.com/user
        clean = clean.replace(/linkedin\.com\/(in\/|profile\/)?/, "");
    } else if (type === 'github') {
        clean = clean.replace(/github\.com\//, "");
    }
    
    // Remove trailing slash
    return clean.replace(/\/$/, "");
};
