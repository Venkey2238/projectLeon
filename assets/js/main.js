/*
    main.js
    This file contains JavaScript for the LeongrayJ Game Priority List website.
    It handles interactive elements and enhances user experience.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    // This function ensures that when a navigation link is clicked,
    // the page scrolls smoothly to the target section instead of jumping.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default anchor click behavior

            const targetId = this.getAttribute('href'); // Get the target section's ID
            const targetElement = document.querySelector(targetId); // Find the target element

            if (targetElement) {
                // Calculate the offset to account for the fixed header
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px for a little extra padding

                // Scroll to the calculated position smoothly
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Optional: Add more JavaScript functionality here if needed.
    // For example:
    // - Lazy loading for images/iframes (though YouTube embeds handle some of this)
    // - Form submission handling for the newsletter (e.g., displaying a success message)
    // - Animations on scroll (if not using CSS animations for everything)
});
