export const generatePassword = (length = 8) => {
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '@#';
    
    if (length < 4) {
        throw new Error('Password length must be at least 4 to include all required characters.');
    }

    // Ensure we have at least one of each required character type
    const allChars = upperCaseLetters + lowerCaseLetters + numbers + specialChars;
    const passwordArray = [
        upperCaseLetters[Math.floor(Math.random() * upperCaseLetters.length)],
        lowerCaseLetters[Math.floor(Math.random() * lowerCaseLetters.length)],
        numbers[Math.floor(Math.random() * numbers.length)],
        specialChars[Math.floor(Math.random() * specialChars.length)]
    ];

    // Fill the rest of the password length with random characters
    for (let i = passwordArray.length; i < length; i++) {
        passwordArray.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle the array to ensure random distribution
    for (let i = passwordArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
    }

    return passwordArray.join('');
}
