https://mullvad.net/en/help/how-encrypt-file-symmetric-encryption/

Encrypt: `gpg -c -a --cipher-algo AES256 .env`
Decrypt: `gpg -d -a -o .env .env.asc`
