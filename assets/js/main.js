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
        "https://imgs.search.brave.com/G8OGEbjJhm8UXQRHEsqU2P4Zf9xFq5jb7lU5ZsYpuVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXIuZG9nL2xh/cmdlLzE3MTk3NzEy/LmpwZw", // image 2
        "https://imgs.search.brave.com/0zEdJopYYZnu73JRplm296S1QcfbT0HoqvPRsno9TD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbS5p/Z24uY29tL3QvaWdu/X2luL3ZpZGVvL2Mv/Y2xhaXItb2JzYy9j/bGFpci1vYnNjdXIt/ZXhwZWRpdGlvbi0z/My00MC1taW51dGVz/LW9mLWdhbWVwbGF5/LTRrLTYwZnBzLXVf/cjlydS4xMjAwLmpw/Zw",  // image 3
        "https://imgs.search.brave.com/MTzYkiMohlyLxWvusscPdH_10FJOkS0MYEPW3G0I9B0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjQvMTIv/aW5kaWFuYS1qb25l/cy1hbmQtdGhlLWdy/ZWF0LWNpcmNsZS1i/ZXN0LXBjLXNldHRp/bmdzLmpwZw", //image 4
        "https://imgs.search.brave.com/3vqAQlZgAXNcvjzPQ6zBneS2ESNJTpnWmmQtna7_Mww/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vdHdpc3Rl/ZHZveGVsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyNC8w/MS9maW5hbC1mYW50/YXN5LXh2aS5qcGc_/cmVzaXplPTExNzAs/NjU5JnNzbD0x", //image 5
        "https://imgs.search.brave.com/xAGWaIC3R5IOkLnM4e9RrOj7g68SN42Y3jd_yq4f7fw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZGVh/ZC1pc2xhbmQyLXBv/b2xzaWRlLWNoaWxs/LXlmOG94cG45M3dp/OXp5b24uanBn", //image 6
        "https://imgs.search.brave.com/jMBsUY2NXaBCfDgiJWdL7YRPz7X22EHPgCFtfj9zXE0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5hcGkucGxheXN0/YXRpb24uY29tL3Z1/bGNhbi9hcC9ybmQv/MjAyMzAzLzAxMTYv/OTA5NjZmOGMzMzky/NmQxZmZkMTQ0YjU2/MDMyMjg3M2Y5NDM1/ZjQ4MGQyOTYwNmQ4/LmpwZw", //image 7
        "https://imgs.search.brave.com/587RIvVPD-P9r00d0ojl5sSy_bp7Dy-3IGDRniZiVIs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/dG9kYXktdGhlLXRl/cy12aS10cmFpbGVy/LXR1cm5zLTctYW5k/LWlzLWFzLW9sZC1h/cy1za3lyaW0tdjAt/ZWc4cHczcHQyMjZm/MS5qcGVnP3dpZHRo/PTY0MCZjcm9wPXNt/YXJ0JmF1dG89d2Vi/cCZzPWU4ZDA1ZGJl/YTA2NzVhYzE0MjJi/MzZmZjU2ODg2ZjJi/NTk1YmM2MTU", //image 8
        "https://imgs.search.brave.com/H82RzlGkfiDko26-idG4xFZ4HrSVmisUmO7jGo2hlLw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNicmltYWdl/cy5jb20vd29yZHBy/ZXNzL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzA3L3N0YXIt/d2Fycy1vdXRsYXdz/LmpwZw", //image 9
        "https://imgs.search.brave.com/8uivN7SSnpovwzkQ1xDQn9OhvgZvza2z2BwwuVdMuq4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY3li/ZXJwdW5rLTIwNzct/aGQtdHNzcjliM3Fk/bnhldnVtZi5qcGc" //image 10
    ];

    let index = 0;

    setInterval(() => {
        index = (index + 1) % images.length;
        heroSection.style.backgroundImage = `url('${images[index]}')`;
    }, 3000); // 2000ms = 2 seconds
