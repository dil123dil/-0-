export function showPasswordModal(onSuccess) {
    const correctHash = 'e99a18c428cb38d5f260853678922e03'; // SHA-256 от "123456"

    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    modal.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;">
            <h2>Введите пароль</h2>
            <input type="password" id="passwordInput" style="margin-bottom: 10px; padding: 10px; width: 80%;" />
            <br />
            <button id="confirmButton" style="padding: 10px 20px;">Подтвердить</button>
            <button id="cancelButton" style="padding: 10px 20px; margin-left: 10px;">Отмена</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector('#confirmButton').onclick = async () => {
        const password = modal.querySelector('#passwordInput').value;
        const hash = await hashPassword(password);
        if (hash === correctHash) {
            modal.remove();
            onSuccess();
        } else {
            alert('Неверный пароль');
        }
    };

    modal.querySelector('#cancelButton').onclick = () => {
        modal.remove();
    };
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}
