const { encrypt, decrypt } = require("./script");

const payload = {
    userId: "123456",
    role: "student",
};

try{
    const token = encrypt(payload);
    console.log("Encrypted Token:", token);

    const decoded = decrypt(token);
    console.log("Decrypted Payload:", decoded);

    console.log("✅ Success: JWT encrypted and decrypted correctly");
} catch(error){
    console.error("❌ Error:", error.message);
}