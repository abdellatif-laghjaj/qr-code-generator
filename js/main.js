const code_input = document.querySelector('.code-input');
const generate_btn = document.querySelector('.generate-btn');
const qrcode = document.querySelector('.qr-code');
const alert_container = document.querySelector('.alert-container');
const save_btn = document.getElementById('save-btn');

//API
const qrcode_size = 200;
var api_url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrcode_size}&data=`;

//Add event listener to generate button
generate_btn.addEventListener('click', function() {
    const code = code_input.value;
    if(code.length > 0) {
        generateQRcode(code);
        showAlert('QR code generated successfully', 'success');
    }else showAlert('Please enter text to generate QR code', 'error');
});

//Check if the user click enter key
code_input.addEventListener('keyup', function(e) {
    if(e.keyCode === 13 && code_input.value.length > 0) {
        generateQRcode(code_input.value);
    }else if(e.keyCode === 13 && code_input.value.length === 0) {
        showAlert('Please enter text to generate QR code', 'error');
    }
});

// Generate QR code
function generateQRcode(text) {
    let img = `<img src="${api_url}${text}" alt="QR code">`;
    let download_btn = `
        <button class="btn btn-primary download-btn" id="save-btn" onclick="downloadQRcode('${text}')">
            <ion-icon name="arrow-down-outline" class="text-2xl py-3 text-white"></ion-icon>
        </button> `;
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


//Show ALert Message
function showAlert(message, type) {
    let alert = `
        <div class="alert alert-${type} shadow-lg">
            <div>
                ${type === 'success' ? '<ion-icon name="checkmark-circle-outline" class="text-2xl"></ion-icon>' : '<ion-icon name="close-circle-outline" class="text-2xl"></ion-icon>'}
                <span>
                    ${message}
                </span>
            </div>
        </div>
    `;
    alert_container.innerHTML = alert;

    //Remove alert after 3 seconds
    setTimeout(function() {
        alert_container.innerHTML = '';
    }, 3000);
}

//Download QR code
function downloadQRcode(text) {
    let img_src = `${api_url}${text}`;
    let file_name = `${getFirst10Characters(text)}.png`;
    saveAs(img_src, file_name);
}