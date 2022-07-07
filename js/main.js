const code_input = document.querySelector('.code-input');
const generate_btn = document.querySelector('.generate-btn');
const qrcode = document.querySelector('.qr-code');

//API
const qrcode_size = 200;
var api_url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrcode_size}&data=`;

//Add event listener to generate button
generate_btn.addEventListener('click', function() {
    const code = code_input.value;
    if(code.length > 0) {
        generateQRcode(code);
    }else {
        alert('Please enter a code');
    }
});


// Generate QR code
function generateQRcode(text) {
    let img = `<img src="${api_url}${text}" alt="QR code">`;
    let title = getFirst10Characters(text);
    let download_btn = `
        <a href="${api_url}${text}" download="${title}.png" class="btn btn-primary text-white text-xl download-btn">
            <ion-icon name="arrow-down-outline"></ion-icon>
        </a>`;
    let content = `${img}${download_btn}`;
    qrcode.innerHTML = content;
}


//get 10 first characters of text
function getFirst10Characters(text) {
    if(text.length > 10) {
        return text.substring(0, 10);
    }
    return text;
}