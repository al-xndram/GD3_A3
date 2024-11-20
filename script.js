// Select the elements for 'genocide' and 'war' sections
const democratElement = document.getElementById('genocide');
const iframeElement = document.getElementById('genocideWeb');

const warElements = document.getElementById('republican'); // Select all elements with class 'war'
const warIframeElement = document.getElementById('warWeb'); // The iframe for 'war'

// Log the selected elements for debugging
console.log('Democrat element:', democratElement);
console.log('Iframe element:', iframeElement);
console.log('War elements:', warElements);
console.log('War iframe element:', warIframeElement);

let isClickedDemocrat = false; // Flag to track click state for 'genocide' section
let isClickedWar = false; // Flag to track click state for 'war' section

// Logic for 'genocide' section
if (democratElement && iframeElement) {
    console.log('Elements found for genocide:', democratElement, iframeElement);

    // Hover logic for 'genocide'
    democratElement.addEventListener('mouseenter', () => {
        if (!isClickedDemocrat) {
            iframeElement.style.display = 'block'; // Show iframe on hover
        }
    });

    democratElement.addEventListener('mouseleave', () => {
        if (!isClickedDemocrat) {
            iframeElement.style.display = 'none'; // Hide iframe on hover leave
        }
    });

    // Click logic for 'genocide'
    democratElement.addEventListener('click', () => {
        isClickedDemocrat = !isClickedDemocrat; // Toggle click state
        if (isClickedDemocrat) {
            iframeElement.style.display = 'block'; // Keep visible on click
        } else {
            iframeElement.style.display = 'none'; // Hide on click
        }
        console.log('Iframe visibility toggled for genocide. isClickedDemocrat:', isClickedDemocrat);
    });
} else {
    console.error('Required elements for genocide are missing!');
}

// Logic for 'war' section
if (warIframeElement) {
    // Loop over all elements with class 'war'
    warElements.forEach(warElement => {
        let isClickedWarLocal = false; // Local flag for individual war element click state

        // Hover logic for 'war' elements
        warElement.addEventListener('mouseenter', () => {
            if (!isClickedWarLocal) {
                warIframeElement.style.display = 'block'; // Show iframe on hover
            }
        });

        warElement.addEventListener('mouseleave', () => {
            if (!isClickedWarLocal) {
                warIframeElement.style.display = 'none'; // Hide iframe on hover leave
            }
        });

        // Click logic for 'war' elements
        warElement.addEventListener('click', () => {
            isClickedWarLocal = !isClickedWarLocal; // Toggle click state for each element
            if (isClickedWarLocal) {
                warIframeElement.style.display = 'block'; // Keep iframe visible on click
            } else {
                warIframeElement.style.display = 'none'; // Hide iframe on click
            }
            console.log('Iframe visibility toggled for war. isClickedWarLocal:', isClickedWarLocal);
        });
    });
} else {
    console.error('Required iframe for war is missing!');
}