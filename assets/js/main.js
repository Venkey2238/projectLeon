/*
    main.js
    This file contains JavaScript for the LeongrayJ Game Priority List website.
    It handles interactive elements, enhances user experience, and fetches
    the latest YouTube livestream link from a Netlify Function.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
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

    // Function to fetch and update the latest YouTube livestream link and live indicator
    async function fetchAndUpdateLivestreamLink() {
        const livestreamButton = document.getElementById('livestream-button');
        const leongrayjLogo = document.getElementById('leongrayj-logo'); // Get the logo image
        const liveBadge = document.getElementById('live-badge');       // Get the LIVE badge

        if (!livestreamButton || !leongrayjLogo || !liveBadge) {
            console.error('Required elements for livestream feature not found. Ensure IDs are correct.');
            return;
        }

        // The URL for your Netlify Function
        // When deployed, this will automatically resolve to your function.
        const netlifyFunctionUrl = '/.netlify/functions/get-livestream'; // <<< Ensure this matches your Netlify Function path

        try {
            const response = await fetch(netlifyFunctionUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.isLive && data.streamUrl) {
                // --- Update Livestream Button ---
                livestreamButton.href = data.streamUrl;
                livestreamButton.innerHTML = `
                    <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fill-rule="evenodd" d="M19.812 5.056a3.75 3.75 0 0 0-2.124-2.124C16.322 2.5 12 2.5 12 2.5s-4.322 0-5.688.432a3.75 3.75 0 0 0-2.124 2.124c-.432 1.366-.432 4.225-.432 4.225v2.817c0 2.86.001 4.79.432 6.156a3.75 3.75 0 0 0 2.124 2.124c1.366.432 5.688.432 5.688.432s4.322 0 5.688-.432a3.75 3.75 0 0 0 2.124-2.124c.432-1.366.432-4.225.432-4.225V9.281c0-2.86-.001-4.79-.432-6.156ZM9.75 15.375V8.625L15.375 12l-5.625 3.375Z" clip-rule="evenodd" />
                    </svg>
                    Join the Livestream <span class="text-red-300 font-bold">NOW!</span>
                `;
                livestreamButton.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                livestreamButton.classList.add('bg-red-600', 'hover:bg-red-700', 'animate-pulse');

                // --- Update Logo Live Indicator ---
                leongrayjLogo.classList.remove('border-purple-600'); // Remove default border
                leongrayjLogo.classList.add('border-red-500', 'live-glow'); // Add red border and glowing effect
                liveBadge.classList.remove('hidden'); // Show the LIVE badge

                console.log('Livestream link and logo indicator updated:', data.streamUrl);

            } else {
                // --- Revert Livestream Button ---
                livestreamButton.href = 'https://www.youtube.com/@LeongrayJ/streams'; // Fallback to your channel's streams page
                livestreamButton.innerHTML = `
                    <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 11H8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"/>
                    </svg>
                    Check Latest Livestreams
                `;
                livestreamButton.classList.remove('bg-red-600', 'hover:bg-red-700', 'animate-pulse');
                livestreamButton.classList.add('bg-blue-600', 'hover:bg-blue-700');

                // --- Revert Logo Live Indicator ---
                leongrayjLogo.classList.remove('border-red-500', 'live-glow'); // Remove red border and glowing effect
                leongrayjLogo.classList.add('border-purple-600'); // Add back default border
                liveBadge.classList.add('hidden'); // Hide the LIVE badge

                console.log('No active livestream found, reverting logo indicator.');
            }
        } catch (error) {
            console.error('Error fetching livestream link:', error);
            // Fallback for button (already handled in previous version)
            livestreamButton.href = 'https://www.youtube.com/@LeongrayJ/streams';
            livestreamButton.innerHTML = `
                <svg class="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4 11H8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2z"/>
                </svg>
                Check Latest Livestreams
            `;
            livestreamButton.classList.remove('bg-red-600', 'hover:bg-red-700', 'animate-pulse');
            livestreamButton.classList.add('bg-blue-600', 'hover:bg-blue-700');

            // Also revert logo indicator on error
            leongrayjLogo.classList.remove('border-red-500', 'live-glow');
            leongrayjLogo.classList.add('border-purple-600');
            liveBadge.classList.add('hidden');
        }
    }

    // Call the function when the DOM is ready
    fetchAndUpdateLivestreamLink();

    // Loading Screen Functionality
    window.addEventListener('load', () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                loadingScreen.remove();
            }, 500);
        }
    });
});

// Hero Section Image Carousel
const heroSection = document.getElementById('hero-section'); // Ensure your hero section has this ID

const images = [
    "https://imgs.search.brave.com/1iX1vg1PRwthNyQgo4Hr4_7lUNxZOgpKJHHeMp1DT-o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEzMjU4/MzY2LmpwZw", // image 1
    "https://imgs.search.brave.com/G8OGEbjJhm8UXQRHEsqU2P4Zf9xFq5jb7lU5ZsYpuVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXIuZG9nL2xh/cmdlLzE3MTk3NzEy/LmpwZw", // image 2
    "https://imgs.search.brave.com/0zEdJopYYZnu73JRplm296S1QcfbT0HoqvPRsno9TD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbS5p/Z24uY29tL3QvaWdu/X2luL3ZpZGVvL2Mv/Y2xhaXItb2JzYy9j/bGFpci1vYnNjdXIt/ZXhwZWRpdGlvbi0z/My00MC1taW51dGVz/LW9mLWdhbWVwbGF5/LTRrLTYwZnBzLXVf/cjlydS4xMjAwLmpw/Zw",  // image 3
    "https://imgs.search.brave.com/MTzYkiMohlyLxWvusscPdH_10FJOkS0MYEPW3G0I9B0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMTIv/aW5kaWFuYS1qb25l/cy1hbmQtdGhlLWdy/ZWF0LWNpcmNsZS1i/ZXN0LXBjLXNldHRp/bmdzLmpwZw", //image 4
    "https://imgs.search.brave.com/3vqAQlZgAXNcvjzPQ6zBneS2ESNJTpnWmmQtna7_Mww/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cGNvbS90d2lzdGVk/dm94ZWwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzAx/L2ZpbmFsLWZhbnRh/c3kteHZpLmpwZz9y/ZXNpemU9MTE3MCw2/NTkmbWFpbD0x", //image 5
    "https://imgs.search.brave.com/xAGWaIC3R5IOkLnM4e9RrOj7g68SN42Y3jd_yq4f7fw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZGVh/ZC1pc2xhbmQyLXBv/b2xzaWRlLWNoaWxs/LXlmOG94cG45M3dp/OXp5b24uanBn", //image 6
    "https://imgs.search.brave.com/jMBsUY2NXaBCfDgiJWdL7YRPz7X22EHPgCFtfj9zXE0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5hcGkucGxheXN0/YXRpb24uY29tL3Z1/bGNhbi9hcC9ybmQv/MjAyMzAzLzAxMTYv/OTA5NjZmOGMzMzky/NmQxZmZkMTQ0YjU2/MDMyMjg3M2Y5NDM1/ZjQ4MGQyOTYwNmQ4/LmpwZw", //image 7
    "https://imgs.search.brave.com/587RIvVPD-P9r00d0ojl5sSy_bp7Dy-3IGDRniZiVIs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/dG9kYXktdGhlLXRl/cy12aS10cmFpbGVy/LXR1cm5zLTctYW5k/LWlzLWFzLW9sZC1h/cy1za3lyaW0tdjAt/ZWc4cHczcHQyMjZm/MS5qcGVnP3dpZHRo/PTY0MCZjcm9wPXNt/YXJ0JmF1dG89d2Vi/cCZzPWU4ZDA1ZGJl/YTA2NzVhYzE0MjJi/MzZmZjU2ODg2ZjJi/NTk1YmM2NjE1", //image 8
    "https://imgs.search.brave.com/H82RzlGkfiDko26-idG4xFZ4HrSVmisUmO7jGo2hlLw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNicmltYWdl/cy5jb20vd29yZHBy/ZXNzL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzA3L3N0YXIt/d2Fycy1vdXRsYXdz/LmpwZw", //image 9
    "https://imgs.search.brave.com/8uivN7SSnpovwzkQ1xDQn9OhvgZvza2z2BwwuVdMuq4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY3li/ZXJwdW5rLTIwNzct/aGQtdHNzcjliM3Fk/bnhldnVtZi5qcGc" //image 10
];

let index = 0;

// Ensure heroSection exists before trying to use it
if (heroSection) {
    // Set initial background image
    heroSection.style.backgroundImage = `url('${images[index]}')`;

    setInterval(() => {
        index = (index + 1) % images.length;
        heroSection.style.backgroundImage = `url('${images[index]}')`;
    }, 3000); // 3000ms = 3 seconds
} else {
    console.warn("Hero section with ID 'hero-section' not found. Image carousel will not run.");
}
