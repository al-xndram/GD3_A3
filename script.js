// document.addEventListener("DOMContentLoaded", () => {
//     const mainContainer = document.getElementById("mainContainer");
//     const words = document.querySelectorAll(".word");
//     const alignButton = document.getElementById("alignButton");
//     const topicColumn = document.getElementById("topicColumn");
//     const blackOverlay = document.getElementById("blackOverlay");
//     const isolatedWord = document.getElementById("isolatedWord");
//     const cellButton = document.getElementById("cellButton");
//     const organButton = document.getElementById("organButton");
//     const organismButton = document.getElementById("organismButton");
//     const broadcastStations = document.querySelectorAll(".broadcast-station");
//     const iframes = document.querySelectorAll("iframe");
//     const imgs = document.querySelectorAll("img");

//     let aligned = false;
//     let currentState = "cell"; // Default state is "cell"
    
//     // Function to randomize positions of the words
//     function randomizeWords() {
//         const containerWidth = mainContainer.offsetWidth;
//         const containerHeight = mainContainer.offsetHeight;

//         words.forEach(word => {
//             const maxX = containerWidth - word.offsetWidth;
//             const maxY = containerHeight - word.offsetHeight;

//             const randomX = Math.random() * maxX;
//             const randomY = Math.random() * maxY;

//             word.style.left = `${randomX}px`;
//             word.style.top = `${randomY}px`;
//             word.style.position = "absolute"; // Ensure absolute positioning
//         });
//     }

//     // Function to align words into columns
//     function alignWords() {
//         const containerWidth = mainContainer.offsetWidth;
//         const containerHeight = mainContainer.offsetHeight;

//         const columnHeights = { left: 0, center: 0, right: 0 };
//         words.forEach(word => {
//             const alignment = word.classList.contains("left")
//                 ? "left"
//                 : word.classList.contains("center")
//                 ? "center"
//                 : "right";
//             columnHeights[alignment] += word.offsetHeight + 10;
//         });

//         const maxHeight = Math.max(columnHeights.left, columnHeights.center, columnHeights.right);
//         const verticalOffset = Math.max((containerHeight - maxHeight) / 2, 0);

//         const currentHeights = { left: verticalOffset, center: verticalOffset, right: verticalOffset };
//         words.forEach(word => {
//             let alignment;
//             if (word.classList.contains("left")) {
//                 word.style.left = `${containerWidth * 0.1}px`;
//                 alignment = "left";
//             } else if (word.classList.contains("center")) {
//                 word.style.left = `${containerWidth * 0.4}px`;
//                 alignment = "center";
//             } else if (word.classList.contains("right")) {
//                 word.style.left = `${containerWidth * 0.7}px`;
//                 alignment = "right";
//             }
//             word.style.top = `${currentHeights[alignment]}px`;
//             currentHeights[alignment] += word.offsetHeight + 10;
//         });
//     }

//     // Toggle between different states
//     function toggleState(newState) {
//         if (currentState === newState) return;

//         if (newState === "organ") {
//             document.body.style.backgroundColor = "black";
//             blackOverlay.classList.remove("visible");
//             mainContainer.style.display = "none"; // Hide the main container
//             words.forEach(word => {
//                 word.style.opacity = "0"; // Hide words visually
//                 word.style.pointerEvents = "none"; // Disable click events
//             });
//             // Show iframes and imgs and position them randomly
//             iframes.forEach(iframe => {
//                 iframe.style.display = "block";
//                 const randomX = Math.random() * (window.innerWidth - iframe.offsetWidth);
//                 const randomY = Math.random() * (window.innerHeight - iframe.offsetHeight);
//                 iframe.style.left = `${randomX}px`;
//                 iframe.style.top = `${randomY}px`;
//                 iframe.style.position = "absolute";
//             });
//             imgs.forEach(img => {
//                 img.style.display = "block";
//                 const randomX = Math.random() * (window.innerWidth - img.offsetWidth);
//                 const randomY = Math.random() * (window.innerHeight - img.offsetHeight);
//                 img.style.left = `${randomX}px`;
//                 img.style.top = `${randomY}px`;
//                 img.style.position = "absolute";
//             });
//         } else if (newState === "organism") {
//             document.body.style.backgroundColor = "black";
//             blackOverlay.classList.remove("visible");
//             broadcastStations.forEach(station => station.style.display = "block"); // Show broadcast stations
//         } else {
//             document.body.style.backgroundColor = ""; // Reset background color
//             broadcastStations.forEach(station => station.style.display = "none"); // Hide broadcast stations
//             words.forEach(word => {
//                 word.style.opacity = "1"; // Make words visible again
//                 word.style.pointerEvents = "auto"; // Re-enable click events
//             });
//             mainContainer.style.display = "block"; // Show the main container
//             iframes.forEach(iframe => iframe.style.display = "none"); // Hide all iframes
//             imgs.forEach(img => img.style.display = "none"); // Hide all images
//         }

//         currentState = newState;
//     }

//     // Add click event listeners to the state buttons
//     cellButton.addEventListener("click", () => toggleState("cell"));
//     organButton.addEventListener("click", () => toggleState("organ"));
//     organismButton.addEventListener("click", () => toggleState("organism"));

//     // Align button toggles
//     alignButton.addEventListener("click", () => {
//         if (aligned) {
//             randomizeWords();
//             alignButton.classList.add("strikethrough");
//             topicColumn.style.display = "none"; // Hide topic column
//         } else {
//             alignWords();
//             alignButton.classList.remove("strikethrough");
//             topicColumn.style.display = "block"; // Show topic column
//         }
//         aligned = !aligned;
//     });

//     // Isolate word on click (should still work in "organ" state)
//     words.forEach(word => {
//         word.addEventListener("click", e => {
//             if (currentState !== "cell") return; // Only isolate in cell state

//             // Hide everything else
//             mainContainer.style.display = "none";
//             alignButton.style.display = "none";
//             topicColumn.style.display = "none";

//             // Show black overlay
//             blackOverlay.classList.add("visible");

//             // Populate isolatedWord with the clicked word and its iframe or image
//             isolatedWord.innerHTML = word.textContent; // Add word text

//             // Check for iframe or img and make it visible
//             const iframe = word.querySelector("iframe");
//             const img = word.querySelector("img");

//             if (iframe) {
//                 iframe.classList.add("visible");
//                 isolatedWord.appendChild(iframe);
//             } else if (img) {
//                 img.classList.add("visible");
//                 isolatedWord.appendChild(img);
//             }
//         });
//     });

//     // Restore align mode on black overlay click
//     blackOverlay.addEventListener("click", () => {
//         blackOverlay.classList.remove("visible");
//         mainContainer.style.display = "flex";
//         alignButton.style.display = "block";
//         topicColumn.style.display = "block";

//         // Hide any visible iframe or image
//         const visibleIframe = document.querySelector(".hidden-iframe.visible");
//         const visibleImg = document.querySelector(".hidden-image.visible");

//         if (visibleIframe) visibleIframe.classList.remove("visible");
//         if (visibleImg) visibleImg.classList.remove("visible");
//     });

//     // Randomize positions initially
//     randomizeWords();
// });


document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.getElementById("mainContainer");
    const words = document.querySelectorAll(".word");
    const alignButton = document.getElementById("alignButton");
    const topicColumn = document.getElementById("topicColumn");
    const topicItems = topicColumn.querySelectorAll(".topic-item");
    const blackOverlay = document.getElementById("blackOverlay");
    const isolatedWord = document.getElementById("isolatedWord");
    let aligned = false;

    // Function to randomize words' positions
    function randomizeWords() {
        const containerWidth = mainContainer.offsetWidth;
        const containerHeight = mainContainer.offsetHeight;

        words.forEach(word => {
            const randomX = Math.random() * (containerWidth - word.offsetWidth);
            const randomY = Math.random() * (containerHeight - word.offsetHeight);
            word.style.left = `${randomX}px`;
            word.style.top = `${randomY}px`;
            word.style.position = "absolute";
        });
    }

    // Function to align words in a 6-row by 4-column grid (including the topic column)
    function alignWords() {
        const containerWidth = mainContainer.offsetWidth;
        const containerHeight = mainContainer.offsetHeight;

        const rows = 6; // 6 rows
        const columns = 4; // 4 columns (1 for topics + 3 for words)
        const cellWidth = containerWidth / columns;
        const cellHeight = containerHeight / rows;

        // Align topic items in the first column
        topicItems.forEach((topic, rowIndex) => {
            topic.style.left = `${cellWidth / 2 - topic.offsetWidth / 2}px`; // Centered in the first column
            topic.style.top = `${rowIndex * cellHeight + cellHeight / 2 - topic.offsetHeight / 2}px`;
            topic.style.position = "absolute";
        });

        // Align words in the remaining 3 columns
        words.forEach((word, index) => {
            const row = index % rows;
            const column = Math.floor(index / rows) + 1; // Offset by 1 to account for the topic column
            word.style.left = `${column * cellWidth + cellWidth / 2 - word.offsetWidth / 2}px`;
            word.style.top = `${row * cellHeight + cellHeight / 2 - word.offsetHeight / 2}px`;
            word.style.position = "absolute";
        });
    }

    // Toggle align/randomize functionality
    alignButton.addEventListener("click", () => {
        if (aligned) {
            // Revert to default state
            randomizeWords();
            alignButton.classList.add("strikethrough");
            topicColumn.style.display = "none";
        } else {
            // Align state: Show grid and topics
            alignWords();
            alignButton.classList.remove("strikethrough");
            topicColumn.style.display = "block";
        }
        aligned = !aligned;
    });

    // Isolate word on click in "align" state
    words.forEach(word => {
        word.addEventListener("click", e => {
            if (!aligned) return; // Only isolate in align mode

            // Hide everything else
            mainContainer.style.display = "none";
            alignButton.style.display = "none";
            topicColumn.style.display = "none";

            // Show black overlay
            blackOverlay.classList.add("visible");

            // Populate isolatedWord with the clicked word and its iframe or image
            isolatedWord.innerHTML = word.textContent;

            const iframe = word.querySelector("iframe");
            const img = word.querySelector("img");

            if (iframe) {
                iframe.classList.add("visible");
                isolatedWord.appendChild(iframe);
            } else if (img) {
                img.classList.add("visible");
                isolatedWord.appendChild(img);
            }
        });
    });

    // Restore align mode on black overlay click
    blackOverlay.addEventListener("click", () => {
        blackOverlay.classList.remove("visible");
        mainContainer.style.display = "flex";
        alignButton.style.display = "block";
        topicColumn.style.display = "block";

        // Hide any visible iframe or image
        const visibleIframe = document.querySelector(".hidden-iframe.visible");
        const visibleImg = document.querySelector(".hidden-image.visible");

        if (visibleIframe) visibleIframe.classList.remove("visible");
        if (visibleImg) visibleImg.classList.remove("visible");
    });

    // Initialize with random positions
    randomizeWords();
});
