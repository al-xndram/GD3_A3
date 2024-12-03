document.addEventListener("DOMContentLoaded", () => {
    const mainContainer = document.getElementById("mainContainer");
    const words = document.querySelectorAll(".word");
    const alignButton = document.getElementById("alignButton");
    let aligned = false;

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

        const columnHeights = { left: 0, center: 0, right: 0 };
        words.forEach(word => {
            const alignment = word.classList.contains("left")
                ? "left"
                : word.classList.contains("center")
                ? "center"
                : "right";
            columnHeights[alignment] += word.offsetHeight + 10;
        });

        const maxHeight = Math.max(columnHeights.left, columnHeights.center, columnHeights.right);
        const verticalOffset = (containerHeight - maxHeight) / 2;

        const currentHeights = { left: verticalOffset, center: verticalOffset, right: verticalOffset };
        words.forEach(word => {
            let alignment;
            if (word.classList.contains("left")) {
                word.style.left = `${containerWidth * 0.1}px`;
                alignment = "left";
            } else if (word.classList.contains("center")) {
                word.style.left = `${containerWidth * 0.4}px`;
                alignment = "center";
            } else if (word.classList.contains("right")) {
                word.style.left = `${containerWidth * 0.7}px`;
                alignment = "right";
            }
            word.style.top = `${currentHeights[alignment]}px`;
            currentHeights[alignment] += word.offsetHeight + 10;
        });
    }

    // Toggle align/randomize functionality
    alignButton.addEventListener("click", () => {
        if (aligned) {
            randomizeWords();
            alignButton.classList.add("strikethrough");
        } else {
            alignWords();
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
});
