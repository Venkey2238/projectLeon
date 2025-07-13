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

const heroSection = document.getElementById('hero-section');

    const images = [
        "https://imgs.search.brave.com/1iX1vg1PRwthNyQgo4Hr4_7lUNxZOgpKJHHeMp1DT-o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEzMjU4/MzY2LmpwZw", // image 1
        "https://wallpapercave.com/wp/wp9427087.jpg", // image 2
        "https://wallpapercave.com/wp/wp11311472.jpg"  // image 3
    ];

    let index = 0;

    setInterval(() => {
        index = (index + 1) % images.length;
        heroSection.style.backgroundImage = `url('${images[index]}')`;
    }, 2000); // 2000ms = 2 seconds
