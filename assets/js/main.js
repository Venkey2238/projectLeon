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
   async function updateLivestreamStatus() {
  const logo = document.getElementById('leongrayj-logo');
  const liveBadge = document.getElementById('live-badge');
  const logoContainer = document.getElementById('logo-container');

  try {
    const res = await fetch('/.netlify/functions/live-status');
    const { isLive, liveUrl } = await res.json();

    if (isLive) {
      logo.classList.add('live-glow', 'border-red-500');
      logo.classList.remove('border-purple-600');
      liveBadge.classList.remove('hidden');
      logoContainer.style.cursor = 'pointer';
      logoContainer.onclick = () => window.open(liveUrl, '_blank');
    } else {
      logo.classList.remove('live-glow', 'border-red-500');
      logo.classList.add('border-purple-600');
      liveBadge.classList.add('hidden');
      logoContainer.style.cursor = 'default';
      logoContainer.onclick = null;
    }
  } catch (error) {
    console.error("Live status check failed:", error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateLivestreamStatus();
  setInterval(updateLivestreamStatus, 30000); // every 30 seconds
});



    // Hero Section Image Carousel (existing code, no changes needed here)
    const heroSection = document.getElementById('hero-section'); // Ensure your hero section has this ID

    const images = [
        "https://imgs.search.brave.com/1iX1vg1PRwthNyQgo4Hr4_7lUNxZOgpKJHHeMp1DT-o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEzMjU4/MzY2LmpwZw", // image 1
        "https://imgs.search.brave.com/G8OGEbjJhm8UXQRHEsqU2P4Zf9xFq5jb7lU5ZsYpuVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXIuZG9nL2xh/cmdlLzE3MTk3NzEy/LmpwZw", // image 2
        "https://imgs.search.brave.com/0zEdJopYYZnu73JRplm296S1QcfbT0HoqvPRsno9TD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbS5p/Z24uY29tL3QvaWdu/X2luL3ZpZGVvL2Mv/Y2xhaXItb2JzY3Vy/L2NsYWlyLW9ic2N1/ci1leHBlZGl0aW9u/LTMzLTQwLW1pbnV0/ZXMtb2YtZ2FtZXBs/YXktNGstNjBmcHMt/dXJfcjlydS4xMjAw/LmpwZw",  // image 3
        "https://imgs.search.brave.com/MTzYkiMohlyLxWvusscPdH_10FJOkS0MYEPW3G0I9B0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcGFwZXNzL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzEy/L2luZGlhbmEtam9u/ZXMtYW5kLXRoZS1n/cmVhdC1jaXJjbGUtYm/VzdC1wYy1zZXR0aW5n/cy5qcGc", //image 4
        "https://imgs.search.brave.com/3vqAQlZgAXNcvjzPQ6zBneS2ESNJTpnWmmQtna7_Mww/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cGNvbS90d2lzdGVk/dm94ZWwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LTAx/L2ZpbmFsLWZhbnRh/c3kteHZpLmpwZz9y/ZXNpemU9MTE3MCw2/NTkmbWFpbD0x", //image 5
        "https://imgs.search.brave.com/xAGWaIC3R5IOkLnM4e9RrOj7g68SN42Y3jd_yq4f7fw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZGVh/ZC1pc2xhbmQyLXBv/b2xzaWRlLWNoaWxs/LXlmOG94cG45M3dp/OXp5b24uanBn", //image 6
        "https://imgs.search.brave.com/jMBsUY2NXaBCfDgiJWdL7YRPz7X22EHPgCFtfj9zXE0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5hcGkucGxheXN0/YXRpb24uY29tL3Z1/bGNhbi9hcC9ybmQv/MjAyMzAzLzAxMTYv/OTA5NjZmOGMzMzky/NmQxZmZkMTQ0YjU2/MDMyMjg3M2Y5NDM1/ZjQ4MGQyOTYwNmQ4/LmpwZw", //image 7
        "https://imgs.search.brave.com/587RIvVPD-P9r00d0ojl5sSy_bp3Dy-3IGDRniZiVIs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/dG9kYXktdGhlLXRl/cy12aS10cmFpbGVy/LXR1cm5zLTctYW5k/LWlzLWFzLW9sZC1h/cy1za3lyaW0tdjAt/ZWc4cHczcHQyMjZm/MS5qcGVnP3dpZHRo/PTY0MCZjcm9wPXNt/YXJ0JmF1dG89d2Vi/cCZzPWU4ZDA1ZGJl/YTA2NzVhYzE0MjJi/MzZmZjU2ODg2ZjJi/NTk1YmM2NjE1", //image 8
        "https://imgs.search.brave.com/H82RzlGkfiDko26-idG4xFZ4HrSVmisUmO7jGo2hlLw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNicmltYWdl/cy5jb20vd29yZHBy/ZXNzL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzA3L3N0YXIt/d2Fycy1vdXRsYXdz/LmpwZw", //image 9
        "https://imgs.search.brave.com/8uivN7SSnpovwzkQ1xDQn9OhvgZvza2z2BwwuVdMuq4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY3li/ZXJwdW50LTIwNzct/aGQtdHNzcjliM3Fk/bnhldmFtZi5qcGc" //image 10
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
});
