// 重要：本地开发时，后端运行在 http://localhost:5001
const API_BASE_URL = 'http://localhost:5001';

document.getElementById('runStandard').addEventListener('click', () => runDemo('standard'));
document.getElementById('runDebias').addEventListener('click', () => runDemo('debias'));

async function runDemo(mode) {
    const promptSelect = document.getElementById('promptSelect');
    const userMessage = promptSelect.value;
    const standardBox = document.getElementById('standardResponse');
    const debiasBox = document.getElementById('debiasResponse');

    const targetBox = mode === 'standard' ? standardBox : debiasBox;
    targetBox.innerHTML = '<p><em>Generating response... (This may take a few seconds)</em></p>';

    try {
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: userMessage,
                mode: mode
            }),
        });

        const data = await response.json();

        if (data.response) {
            // 将回复中的换行符转换为HTML段落
            const formattedResponse = data.response.replace(/\n/g, '<br>');
            targetBox.innerHTML = `<p>${formattedResponse}</p>`;
        } else {
            targetBox.innerHTML = `<p><em>Error: ${data.error || 'Unknown error'}</em></p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        targetBox.innerHTML = '<p><em>Failed to connect to the server. Is the backend running? Check terminal.</em></p>';
    }
}