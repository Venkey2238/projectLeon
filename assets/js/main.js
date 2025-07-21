/*
    main.js
    This file contains JavaScript for the LeongrayJ Game Priority List website.
    It handles interactive elements, enhances user experience, and fetches
    the latest YouTube livestream link and AI-generated content.
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
        const liveBadge = document.getElementById('live-badge');
        // FIX: Changed from 'logo-link' to 'logo-livestream-link' to match index.html
        const logoLink = document.getElementById('logo-livestream-link');
        const defaultLogoHref = "#hero-section"; // Default link for the logo

        // Ensure elements exist before trying to manipulate them
        if (!liveBadge || !logoLink) {
            console.warn("Live badge or logo link element not found. Skipping live status update.");
            // Set default href even if elements are missing to avoid further errors if possible
            if (logoLink) logoLink.href = defaultLogoHref;
            return; // Exit if elements are missing
        }

        try {
            // Fetch live status from your Netlify function
            const response = await fetch('/.netlify/functions/live-status');
            if (!response.ok) {
                // Log the full error response from Netlify function if available
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
            }
            const data = await response.json();

            if (data.isLive) {
                liveBadge.classList.remove('hidden'); // Show the LIVE badge
                logoLink.href = data.liveUrl; // Update logo link to live stream
                logoLink.setAttribute('target', '_blank'); // Open in new tab
                logoLink.setAttribute('rel', 'noopener noreferrer'); // Security best practice
            } else {
                liveBadge.classList.add('hidden'); // Hide the LIVE badge
                logoLink.href = defaultLogoHref; // Reset logo link
                logoLink.removeAttribute('target');
                logoLink.removeAttribute('rel');
            }
        } catch (error) {
            console.error('Error fetching livestream status:', error);
            // Ensure elements are hidden/reset even on error
            if (liveBadge) liveBadge.classList.add('hidden');
            if (logoLink) {
                logoLink.href = defaultLogoHref;
                logoLink.removeAttribute('target');
                logoLink.removeAttribute('rel');
            }
        }
    }

    // Call the livestream status update function on page load
    updateLivestreamStatus();
    // Optionally, poll for live status updates every few minutes
    setInterval(updateLivestreamStatus, 5 * 60 * 1000); // Every 5 minutes

    // --- News Scroller Logic ---
    const newsScroller = document.getElementById('news-scroller');
    const newsScrollerSection = document.getElementById('news-scroller-section');

    async function fetchGamingNews() {
        // Ensure news scroller element exists
        if (!newsScroller) {
            console.warn("News scroller element not found. Skipping news fetch.");
            return;
        }

        try {
            // Construct a more specific prompt for current gaming news
            const prompt = "Provide 3-5 concise, headline-style updates on the latest significant gaming news (e.g., major game releases, big announcements, esports events) as a comma-separated list. Exclude specific dates or times. For example: 'New Cyberpunk 2077 expansion announced, Elden Ring DLC details revealed, Valorant Champions schedule confirmed'.";
            
            const response = await fetch('/.netlify/functions/ai-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`AI function error: ${response.status} - ${errorData.body || response.statusText}`);
            }

            const data = await response.json();
            const rawNews = data.message;
            console.log("Raw AI news response:", rawNews); // Log the raw response

            if (rawNews) {
                const newsItems = rawNews.split(',').map(item => item.trim()).filter(item => item.length > 0);
                populateNewsScroller(newsItems);
            } else {
                newsScroller.innerHTML = `<span class="news-item text-red-400">Failed to fetch news or no news content.</span>`;
            }

        } catch (error) {
            console.error('Error fetching gaming news:', error);
            newsScroller.innerHTML = `<span class="news-item text-red-400">Error loading news: ${error.message}.</span>`;
        }
    }

    function populateNewsScroller(newsArray) {
        if (!newsScroller) return; // Ensure element exists

        newsScroller.innerHTML = ''; // Clear previous content

        if (newsArray.length === 0) {
            newsScroller.innerHTML = `<span class="news-item">No news updates available at the moment.</span>`;
            return;
        }

        // Duplicate the news items to create a continuous loop effect
        // Repeat multiple times to ensure continuous scrolling without gaps
        const duplicatedNews = [...newsArray, ...newsArray, ...newsArray, ...newsArray, ...newsArray]; 

        duplicatedNews.forEach(newsText => {
            const span = document.createElement('span');
            span.classList.add('news-item', 'inline-block', 'text-lg', 'text-gray-200', 'mr-8'); // Add Tailwind classes
            span.textContent = newsText;
            newsScroller.appendChild(span);
        });

        // Calculate animation duration based on content length for consistent speed
        // A longer content string needs a longer animation duration
        const contentWidth = newsScroller.scrollWidth; // Get the total width of the content
        const parentWidth = newsScroller.parentElement.offsetWidth; // Get the width of the visible container
        const speed = 50; // pixels per second (adjust as needed for desired speed)
        const duration = (contentWidth + parentWidth) / speed; // Time in seconds

        newsScroller.style.animationDuration = `${duration}s`;
        newsScroller.style.animationPlayState = 'running'; // Ensure it's running
    }

    // Initialize news fetching when the page loads
    fetchGamingNews();

    // You might want to refresh news periodically, e.g., every hour
    // setInterval(fetchGamingNews, 3600000); // Fetch every hour (3600000 ms)

    // Optional: Section fade-in animation for the news section itself
    const sectionFadeInObserverOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the section must be visible
    };

    const newsSectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, sectionFadeInObserverOptions);

    if (newsScrollerSection) {
        newsSectionObserver.observe(newsScrollerSection);
    }

    // --- Back to Top Button Logic ---
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                backToTopButton.classList.remove('hidden');
            } else {
                backToTopButton.classList.add('hidden');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Scroll Progress Bar Logic ---
    const scrollProgress = document.getElementById('scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPosition = window.scrollY;
            const progress = (scrollPosition / totalHeight) * 100;
            scrollProgress.style.width = `${progress}%`;
        });
    }

    // --- AI Dialogue Widget Logic ---
    const aiDialogueWidget = document.getElementById('ai-dialogue-widget');
    const openAiDialogueButton = document.getElementById('open-ai-dialogue'); // Assuming you have a button to open it
    const closeAiDialogueButton = document.getElementById('close-ai-dialogue');
    const aiQueryForm = document.getElementById('ai-query-form');
    const userAiInput = document.getElementById('user-ai-input');
    const aiResponseArea = document.getElementById('ai-response-area');

    // Show/Hide AI widget (you'll need a button in your HTML for 'open-ai-dialogue')
    if (openAiDialogueButton) {
        openAiDialogueButton.addEventListener('click', () => {
            if (aiDialogueWidget) {
                aiDialogueWidget.classList.remove('hidden');
                aiDialogueWidget.classList.add('flex'); // Use flex for column layout
            }
        });
    }

    if (closeAiDialogueButton) {
        closeAiDialogueButton.addEventListener('click', () => {
            if (aiDialogueWidget) {
                aiDialogueWidget.classList.add('hidden');
                aiDialogueWidget.classList.remove('flex');
            }
        });
    }

    if (aiQueryForm) {
        aiQueryForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const prompt = userAiInput.value.trim();
            if (!prompt) return;

            if (aiResponseArea) {
                aiResponseArea.innerHTML = '<p class="text-purple-300">AI is thinking...</p>'; // Loading indicator
            }
            userAiInput.value = ''; // Clear input

            try {
                const response = await fetch('/.netlify/functions/ai-message', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: prompt })
                });

                if (!response.ok) {
                    const errorDetails = await response.json();
                    throw new Error(`AI response error: ${response.status} - ${errorDetails.body || response.statusText}`);
                }

                const data = await response.json();
                if (aiResponseArea) {
                    aiResponseArea.innerHTML = `<p>${data.message}</p>`; // Display AI response
                }
            } catch (error) {
                console.error('Error fetching AI response for chat:', error);
                if (aiResponseArea) {
                    aiResponseArea.innerHTML = `<p class="text-red-400">Error: ${error.message}. Please try again.</p>`;
                }
            }
        });
    }

    // Hero Section Image Carousel (existing code, no changes needed here)
    const heroSection = document.getElementById('hero-section'); // Ensure your hero section has this ID

    const images = [
        "https://imgs.search.brave.com/1iX1vg1PRwthNyQgo4Hr4_7lUNxZOgpKJHHeMp1DT-o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDEzMjU4/MzY2LmpwZw", // image 1
        "https://imgs.search.brave.com/G8OGEbjJhm8UXQRHEsqU2P4Zf9xFq5jb7lU5ZsYpuVM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXIuZG9nL2xh/cmdlLzE3MTk3NzEy/LmpwZw", // image 2
        "https://imgs.search.brave.com/0zEdJopYYZnu73JRplm296S1QcfbT0HoqvPRsno9TD8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zbS5p/Z24uY29tL3QvaWdu/X2luL3ZpZGVvL2Mv/Y2xhaXItb2JzY3Vy/L2NsYWlyLW9ic2N1/ci1leHBlZGl0aW9u/LTMzLTQwLW1pbnV0/ZXMtb2YtZ2FtZXBs/YXktNGstNjBmcHMt/dXJfcjlydS4xMjAw/LmpwZw", // image 3
        "https://imgs.search.brave.com/MTzYkiMohlyLxWvusscPdH_10FJOkS0MYEPW3G0I9B0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcGFwZXNzL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LzEy/L2luZGlhbmEtam9u/ZXMtYW5kLXRoZS1n/cmVhdC1jaXJjbGUtYm/VzdC1wYy1zZXR0aW5n/cy5qcGc", //image 4
        "https://imgs.search.brave.com/3vqAQlZgAXNcvjzPQ6zBneS2ESNJTpnWmmQtna7_Mww/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cGNvbS90d2lzdGVk/dm94ZWwuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDI0LTAx/L2ZpbmFsLWZhbnRh/c3kteHZpLmpwZz9y/ZXNpemU9MTE3MCw2/NTkmbWFpbD0x", //image 5
        "https://imgs.search.brave.com/xAGWaIC3R5IOkLnM4e9RrOj7g68SN42Y3jd_yq4f7fw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZGVh/ZC1pc2xhbmQyLXBv/b2xzaWRlLWNoaWxs/LXlmOG94cG45M3dp/OXp5b24uanBn", //image 6
        "https://imgs.search.brave.com/jMBsUY2NXaBCfDgiJWdL7YRPz7X22EHPgCFtfj9zXE0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZS5hcGkucGxheXN0/YXRpb24uY29tL3Z1/bGNhbi9hcC9ybmQv/MjAyMzAzLzAxMTYv/OTA5NjZmOGMzMzky/NmQxZmZkMTQ0YjU2/MDMyMjg3M2Y5NDM1/ZjQ4MGQyOTYwNmQ4/LmpwZw", //image 7
        "https://imgs.search.brave.com/587RIvVPD-P9r00d0ojl5sSy_bp3Dy-3IGDRniZiVIs/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/dG9kYXktdGhlLXRl/cy12aS10cmFpbGVy/LXR1cm5zLTctYW5k/LWlzLWFzLW9sZC1h/cy1za3lyaW0tdjAt/ZWc4cHczcHQyMjZm/MS5qcGVnP3dpZHRo/PTY0MCZjcm9wPXNt/YXJ0JmF1dG89d2Vi/cCZzPWU4ZDA1ZGJl/YTA2NzVhYzE0MjJi/MzZmZjU2ODg2ZjJi/NTk1YmM2NjE1", // image 8
        "https://imgs.search.brave.com/H82RzlGkfiDko26-idG4xFZ4HrSVmisUmO7jGo2hlLw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmNicmltYQdl/cy5jb20vd29yZHBy/ZXNzL3dwLWNvbnRl/bnQvdXBsbyBhZHMv/MjAyNC8wNy9zdGFy/LXdhcnMt b3V0bGF3cy5qcGc", // image 9
        "https://imgs.search.brave.com/8uivN7SSnpovwzkQ1xDQn9OhvgZvza2z2BwwuVdMuq4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvY3li/ZXJwdW50LTIwNzct/aGQtdHNzcjliM3Fk/bnhldmFtZi5qcGc" // image 10
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
