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
        const logo = document.getElementById('leongrayj-logo');
        const liveBadge = document.getElementById('live-badge');
        const logoContainer = document.getElementById('logo-container');

        try {
            const res = await fetch('/.netlify/functions/live-status');
            const data = await res.json();
            const { isLive, liveUrl, latestVideo } = data;

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

            // --- AI Dialogue Box Logic ---
            const aiDialogueBox = document.getElementById('ai-dialogue-box');
            const aiDialogueContent = document.getElementById('ai-dialogue-content');
            const aiVideoContainer = document.getElementById('ai-video-container');
            const aiVideoIframe = document.getElementById('ai-video-iframe');
            const aiDialogueCloseBtn = document.getElementById('ai-dialogue-close-btn');

            if (latestVideo && !localStorage.getItem('aiDialogueShown')) { // Show only once per session
                const apiKey = 'YOUR_GEMINI_API_KEY'; // REPLACE WITH YOUR ACTUAL GEMINI API KEY
                const prompt = `You are an enthusiastic gaming blog AI. Write a short, exciting, and unique message (around 2-3 sentences) to welcome a visitor to "LeongrayJ's Game Priority List" blog. Mention that LeongrayJ recently streamed or will be streaming a game titled "${latestVideo.title}". Encourage them to check it out! Make it sound like a friendly, almost quirky AI.`;

                try {
                    const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: prompt
                                }]
                            }]
                        }),
                    });

                    const aiData = await aiRes.json();
                    if (aiData.candidates && aiData.candidates[0] && aiData.candidates[0].content && aiData.candidates[0].content.parts[0]) {
                        aiDialogueContent.textContent = aiData.candidates[0].content.parts[0].text;
                        
                        // Extract video ID from YouTube URL for embedding
                        const videoIdMatch = latestVideo.url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                        if (videoIdMatch && videoIdMatch[1]) {
                            aiVideoIframe.src = `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=0&controls=1`;
                            aiVideoContainer.classList.remove('hidden');
                        } else {
                            aiVideoContainer.classList.add('hidden'); // Hide if no valid video ID
                        }

                        aiDialogueBox.classList.add('show');
                        localStorage.setItem('aiDialogueShown', 'true'); // Mark as shown
                    }
                } catch (aiError) {
                    console.error("AI message generation failed:", aiError);
                    // Fallback or just don't show the AI box if it fails
                }
            }

            aiDialogueCloseBtn.addEventListener('click', () => {
                aiDialogueBox.classList.remove('show');
            });

        } catch (error) {
            console.error("Live status check failed:", error);
        }
    }

    // Call the function initially and set an interval for updates
    updateLivestreamStatus();
    setInterval(updateLivestreamStatus, 30000); // Check every 30 seconds

    // Hero Section Image Carousel (existing code, no changes needed here)
    const heroSection = document.getElementById('hero-section'); // Ensure your hero section has this ID

    const images = [
        
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
