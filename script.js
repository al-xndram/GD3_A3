document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.getElementById("mainContainer");
    const words = document.querySelectorAll(".word");
    const alignButton = document.getElementById("alignButton");
    const topics = document.querySelectorAll(".topic");
    let aligned = false;

    // Initially hide the topic column divs
    topics.forEach(topic => {
        topic.style.display = "none";
    });

    // Function to randomly position words
    function randomizeWords() {
        const containerWidth = mainContainer.offsetWidth;
        const containerHeight = mainContainer.offsetHeight;

        words.forEach(word => {
            const randomX = Math.random() * (containerWidth - word.offsetWidth);
            const randomY = Math.random() * (containerHeight - word.offsetHeight);
            word.style.left = `${randomX}px`;
            word.style.top = `${randomY}px`;
        });
    }

    // Function to align words into columns and center vertically
    function alignWords() {
        const containerWidth = mainContainer.offsetWidth;
        const containerHeight = mainContainer.offsetHeight;

        const columnHeights = { topic: 0, left: 0, center: 0, right: 0 };

        // Make topics visible and calculate heights
        topics.forEach(topic => {
            topic.style.display = "block";
            columnHeights.topic += topic.offsetHeight + 10;
        });

        words.forEach(word => {
            const alignment = word.classList.contains("left")
                ? "left"
                : word.classList.contains("center")
                ? "center"
                : "right";
            columnHeights[alignment] += word.offsetHeight + 10;
        });

        const maxHeight = Math.max(...Object.values(columnHeights));
        const verticalOffset = (containerHeight - maxHeight) / 2;

        const currentHeights = { topic: verticalOffset, left: verticalOffset, center: verticalOffset, right: verticalOffset };

        // Position topics in a fourth column
        topics.forEach(topic => {
            topic.style.left = `${containerWidth * 0.05}px`;
            topic.style.top = `${currentHeights.topic}px`;
            currentHeights.topic += topic.offsetHeight + 10;
        });

        // Position words in their respective columns
        words.forEach(word => {
            let alignment;
            if (word.classList.contains("left")) {
                word.style.left = `${containerWidth * 0.2}px`;
                alignment = "left";
            } else if (word.classList.contains("center")) {
                word.style.left = `${containerWidth * 0.5}px`;
                alignment = "center";
            } else if (word.classList.contains("right")) {
                word.style.left = `${containerWidth * 0.8}px`;
                alignment = "right";
            }
            word.style.top = `${currentHeights[alignment]}px`;
            currentHeights[alignment] += word.offsetHeight + 10;
        });
    }

    // Toggle align/randomize functionality
    alignButton.addEventListener("click", () => {
        if (aligned) {
            topics.forEach(topic => (topic.style.display = "none"));
            randomizeWords();
            alignButton.classList.add("strikethrough");
        } else {
            alignWords();
            topics.forEach(topic => (topic.style.display = "block"));
            alignButton.classList.remove("strikethrough");
        }
        aligned = !aligned;
    });

    // Make words draggable
    words.forEach(word => {
        let isDragging = false;
        let offsetX, offsetY;

        word.addEventListener("mousedown", e => {
            isDragging = true;
            const rect = word.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            word.style.zIndex = 1000; // Bring dragged element to the front
        });

        document.addEventListener("mousemove", e => {
            if (isDragging) {
                const containerRect = mainContainer.getBoundingClientRect();
                const x = e.clientX - containerRect.left - offsetX;
                const y = e.clientY - containerRect.top - offsetY;

                // Ensure the word stays within the container boundaries
                word.style.left = `${Math.max(0, Math.min(x, containerRect.width - word.offsetWidth))}px`;
                word.style.top = `${Math.max(0, Math.min(y, containerRect.height - word.offsetHeight))}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
            word.style.zIndex = ""; // Reset z-index
        });
    });

    // Randomize word placement on page load
    randomizeWords();

    // Initialize button with strike-through
    alignButton.classList.add("strikethrough");

    // Hover effect for topic titles and corresponding word divs
    const topicTitles = [
        "topic1title", "topic2title", "topic3title", 
        "topic4title", "topic5title", "topic6title"
    ];

    topicTitles.forEach((titleId, index) => {
        const title = document.getElementById(titleId);

        // Select all corresponding "topic" divs
        const correspondingWords = document.querySelectorAll(`#topic${index + 1}`);

        title.addEventListener("mouseover", () => {
            title.style.fontStyle = "italic"; // Italicize the title
            correspondingWords.forEach(word => {
                word.style.backgroundColor = "black";
                word.style.color = "white";
            });
        });

        title.addEventListener("mouseout", () => {
            if (!title.classList.contains("active")) {
                title.style.fontStyle = "normal"; // Remove italics if not active
            }
            correspondingWords.forEach(word => {
                word.style.backgroundColor = "";
                word.style.color = "";
            });
        });

        // Add click functionality to toggle visibility of corresponding words
        title.addEventListener("click", () => {
            title.classList.toggle("active");
            if (title.classList.contains("active")) {
                title.style.fontStyle = "italic"; // Keep italic when active
                correspondingWords.forEach(word => {
                    word.style.backgroundColor = "black";
                    word.style.color = "white";
                });

                // Hide non-corresponding words
                words.forEach(word => {
                    if (![...correspondingWords].includes(word)) {
                        word.style.display = "none";
                    }
                });
            } else {
                title.style.fontStyle = "normal"; // Remove italics when deactivated
                correspondingWords.forEach(word => {
                    word.style.backgroundColor = "";
                    word.style.color = "";
                });

                // Show all words again
                words.forEach(word => {
                    word.style.display = "";
                });
            }
        });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.getElementById("mainContainer");
    const words = document.querySelectorAll(".word");
    const alignButton = document.getElementById("alignButton");

    // Create a black background element
    const blackBackground = document.createElement("div");
    blackBackground.id = "blackBackground";
    document.body.appendChild(blackBackground);

    let isAlignMode = false;
    let isolatedWord = null;

    // Toggle align mode
    alignButton.addEventListener("click", () => {
        isAlignMode = !isAlignMode;
    });

    // Click on a word to isolate it
    words.forEach(word => {
        word.addEventListener("click", (e) => {
            if (!isAlignMode) return;

            e.stopPropagation(); // Prevent blackBackground click event

            // Save the currently isolated word
            isolatedWord = word;

            // Move the word to the black background
            blackBackground.appendChild(word);

            // Reset styles for centering
            word.style.position = "static";
            word.style.margin = "0 auto";

            // Apply isolated styles
            word.classList.add("isolated");
            blackBackground.style.display = "flex";
        });
    });

    // Exit isolated mode when clicking on the black background
    blackBackground.addEventListener("click", () => {
        if (isolatedWord) {
            // Return the word back to the main container
            mainContainer.appendChild(isolatedWord);

            // Remove isolated styles
            isolatedWord.style.position = "absolute";
            isolatedWord.style.margin = "0";
            isolatedWord.classList.remove("isolated");
            isolatedWord = null;
        }

        // Hide the black background
        blackBackground.style.display = "none";
    });
});
