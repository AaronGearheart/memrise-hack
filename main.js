// Copyright         : 2024 Aaron Gearheart
// Validated         : Apr 18 2024
// Powered By Gearheart Studios

// Function to wait for spacebar key press
function waitForSpacebar() {
    return new Promise(resolve => {
        const handleKeyPress = (event) => {
            if (event.key === ' ') {
                document.removeEventListener('keydown', handleKeyPress);
                resolve();
            }
        };
        document.addEventListener('keydown', handleKeyPress);
    });
}

// Main Function
async function main() {
    generatePoweredByDiv();
    // Array to store references to button elements
    const buttonElements = [];

    while (true) {
        await waitForSpacebar(); // Wait for spacebar key press
        
        // Retrieve the questions dictionary from local storage
        const questionsDictString = localStorage.getItem('questionsDict');
        
        // Parse the JSON string into an object
        const questionsDict = JSON.parse(questionsDictString);
        
        // Check if the questions dictionary is available
        if (questionsDict) {
            // Select all buttons containing a div inside them
            const buttonsWithDiv = document.querySelectorAll('button > div');
            
            // Clear previous button references and save the button elements
            buttonElements.length = 0;
            buttonsWithDiv.forEach(button => {
                const buttonText = button.textContent.trim();
                if (!/^\d/.test(buttonText)) { // Check if the button text doesn't start with a number
                    buttonElements.push(button);
                }
            });

            // Log the button elements array for debugging
            console.log('Button Elements:', buttonElements);

            // Select the text of span inside h2
            let spanText = document.querySelector('h2 > span').textContent.trim();
        
            // Initialize index counter
            let index = 1;
        
            // Initialize an array to store the button text without numbers
            const buttonTextsWithoutNumbers = [];
        
            // Iterate over each button with div
            buttonsWithDiv.forEach((button) => {
                // Retrieve the text inside the div
                const buttonText = button.textContent.trim();
            
                // Check if the text contains numbers
                const containsNumber = /\d/.test(buttonText);
            
                // If the text doesn't contain numbers, log the index and text
                if (!containsNumber) {
                    buttonTextsWithoutNumbers.push(buttonText);
                    // Increment the index only if the text doesn't contain numbers
                    index++;
                }
            });
        
            // Log the text of span inside h2
            console.log(`Question Text: ${spanText}`);
        
            // Check if the question text matches any question in the dictionary
            const questionInDict = questionsDict.find(questionObj => questionObj.question === spanText);
        
            if (questionInDict) {
                // Find the answer that matches one of the button texts
                const answer = questionInDict.answers;
                const matchingButtonIndex = buttonTextsWithoutNumbers.findIndex(buttonText => buttonText === answer);
                
                if (matchingButtonIndex !== -1) {
                    // Log the matching button index
                    console.log(`Matching Button Index: ${matchingButtonIndex + 1}`);

                    // Update the text content of the span element
                    document.querySelector('h2 > span').textContent = spanText;

                    // Delete parent elements that are not at the matching index
                    buttonElements.forEach((button, i) => {
                        if (i !== matchingButtonIndex) {
                            const parentElement = button.parentElement;
                            parentElement.parentNode.removeChild(parentElement);
                        }
                    });
                } else {
                    alert('No matching button found for the answer. Try reloading the dictionary? See Troublshooting on GitHub for more info!');
                }
            } else {
                alert('Question not found in the dictionary. Try reloading the dictionary? See Troublshooting on GitHub for more info!');
            }
        } else {
            alert('Questions dictionary not found in local storage. Make sure to use the load.js script to save the key! See Troublshooting on GitHub for more info!');
        }
    }
}

// Function to generate "Powered By Gearheart Studios" div
function generatePoweredByDiv() {
    const poweredByDivWrapper = document.createElement('div');
    poweredByDivWrapper.style.position = 'fixed';
    poweredByDivWrapper.style.bottom = '0';
    poweredByDivWrapper.style.left = '0';
    poweredByDivWrapper.style.margin = '1em';
    poweredByDivWrapper.style.fontSize = '1em';

    const poweredByDiv = document.createElement('div');
    poweredByDiv.id = 'poweredBy';
    poweredByDiv.style.backgroundColor = 'black';
    poweredByDiv.style.color = 'white';
    poweredByDiv.style.padding = '5px';
    poweredByDiv.style.borderRadius = '5px';

    const poweredBySpan = document.createElement('span');
    poweredBySpan.textContent = 'Powered By ';
    poweredByDiv.appendChild(poweredBySpan);

    const poweredByLink = document.createElement('a');
    poweredByLink.href = 'https://gearheartstudios.com/?i=1';
    poweredByLink.target = '_blank';
    poweredByLink.style.color = 'white';
    poweredByLink.style.textDecoration = 'underline';
    poweredByLink.textContent = 'Gearheart Studios';
    poweredByDiv.appendChild(poweredByLink);

    poweredByDivWrapper.appendChild(poweredByDiv);
    document.body.appendChild(poweredByDivWrapper);
}

// Start the main loop
main();
