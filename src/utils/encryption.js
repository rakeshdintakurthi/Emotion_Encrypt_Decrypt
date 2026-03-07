import CryptoJS from 'crypto-js';

// Encrypt
export function encryptText(text, emotions) {
    if (!text) return '';
    const emotionKey = emotions.length > 0 ? emotions.join('+').toUpperCase() : 'NEUTRAL';
    const encryptionKey = btoa(emotionKey + '_EMOCIPHER_2025');
    const encrypted = CryptoJS.AES.encrypt(text, encryptionKey).toString();
    return `[${emotionKey}]::${encrypted}`;
}

// Decrypt
export function decryptText(cipherText) {
    try {
        const match = cipherText.match(/\[([^\]]+)\]/);
        if (!match) throw new Error("Invalid cipher format. Missing emotion tag.");

        const emotionTag = match[1];
        const encrypted = cipherText.split('::')[1];
        if (!encrypted) throw new Error("Invalid cipher format. Missing encrypted data.");

        const encryptionKey = btoa(emotionTag + '_EMOCIPHER_2025');
        const decrypted = CryptoJS.AES.decrypt(encrypted, encryptionKey).toString(CryptoJS.enc.Utf8);

        if (!decrypted) throw new Error("Decryption failed. Invalid text or key.");

        return { text: decrypted, emotions: emotionTag.split('+') };
    } catch (error) {
        console.error("Decryption error:", error);
        return { error: error.message };
    }
}
