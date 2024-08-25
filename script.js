// script.js
function submitJson() {
    const jsonInput = document.getElementById('jsonInput').value;
    const errorElement = document.getElementById('error');
    const dropdownSection = document.getElementById('dropdownSection');
    const responseSection = document.getElementById('responseSection');
    const responseDisplay = document.getElementById('responseDisplay');
    
    try {
        const parsedJson = JSON.parse(jsonInput);

        // Assuming API call here, mocked by a static response for this example
        const apiResponse = {
            alphabets: parsedJson.data.filter(item => /^[A-Za-z]+$/.test(item)),
            numbers: parsedJson.data.filter(item => /^[0-9]+$/.test(item)),
            highestLowercase: parsedJson.data.filter(item => /^[a-z]+$/.test(item)).sort().pop()
        };

        localStorage.setItem('apiResponse', JSON.stringify(apiResponse));

        errorElement.textContent = '';
        dropdownSection.classList.remove('hidden');
        responseSection.classList.add('hidden');
    } catch (e) {
        errorElement.textContent = 'Invalid JSON input';
        dropdownSection.classList.add('hidden');
        responseSection.classList.add('hidden');
    }
}

function filterResponse() {
    const selectedOptions = Array.from(document.getElementById('options').selectedOptions).map(option => option.value);
    const apiResponse = JSON.parse(localStorage.getItem('apiResponse'));
    const responseDisplay = document.getElementById('responseDisplay');
    const responseSection = document.getElementById('responseSection');
    
    let result = [];
    
    if (selectedOptions.includes('alphabets')) {
        result = result.concat(apiResponse.alphabets);
    }
    if (selectedOptions.includes('numbers')) {
        result = result.concat(apiResponse.numbers);
    }
    if (selectedOptions.includes('highest-lowercase')) {
        result = result.concat(apiResponse.highestLowercase);
    }
    
    responseDisplay.textContent = JSON.stringify(result, null, 2);
    responseSection.classList.remove('hidden');
}