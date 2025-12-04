<!DOCTYPE html>
<html class="scroll-smooth" lang="en">
<head>
    <meta charset="utf-8"/>
    <meta content="ie=edge" http-equiv="x-ua-compatible"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <meta content="LeongrayJ's personal gaming blog tracking high-priority and exciting titles. Watch live, read highlights, and join the journey." name="description">
    <meta content="LeongrayJ Gaming Blog" property="og:title"/>
    <meta content="Explore game priorities, live streams, and more with LeonGrayJ." property="og:description"/>
    <meta content="https://yt3.googleusercontent.com/59TvMDmDxRIdLvHMcOq9Tz-1xIdnpTmNPvJPIGL1kboNHQ8zycO5bT29KlqvhggJ3hpSG5kx2Q=s160-c-k-c0x00ffffff-no-rj" property="og:image"/>
    <meta content="website" property="og:type"/>
    <meta content="summary_large_image" name="twitter:card"/>
    <title>LeonGrayJ Gaming Blog</title>
    <link href="https://yt3.googleusercontent.com/59TvMDmDxRIdLvHMcOq9Tz-1xIdnpTmNPvJPIGL1kboNHQ8zycO5bT29KlqvhggJ3hpSG5kx2Q=s160-c-k-c0x00ffffff-no-rj" rel="icon" type="image/x-icon"/>
    <link href="https://fonts.googleapis.com" rel="preconnect"/>
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet"/>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* CYBERPUNK NEON THEME */
        :root {
            --neon-pink: #ff00ff;
            --neon-blue: #00ffff;
            --neon-purple: #9d00ff;
            --dark-bg: #0a0a14;
            --glass-bg: rgba(255, 255, 255, 0.05);
        }
        
        body {
            background: var(--dark-bg);
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
            color: #ffffff;
        }
        
        .neon-text {
            text-shadow: 
                0 0 10px currentColor,
                0 0 20px currentColor,
                0 0 40px currentColor;
        }
        
        .neon-border {
            border: 2px solid;
            border-image: linear-gradient(45deg, var(--neon-pink), var(--neon-blue)) 1;
            box-shadow: 
                0 0 15px rgba(255, 0, 255, 0.3),
                0 0 30px rgba(0, 255, 255, 0.2),
                inset 0 0 15px rgba(255, 0, 255, 0.1);
        }
        
        .glass-effect {
            background: var(--glass-bg);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.36);
        }
        
        .cyber-grid {
            background-image: 
                linear-gradient(rgba(255, 0, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 0, 255, 0.1) 1px, transparent 1px);
            background-size: 50px 50px;
        }
        
        .pulse-glow {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        
        .live-glow {
            animation: live-pulse 1.5s infinite;
            box-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000;
        }
        
        @keyframes live-pulse {
            0%, 100% { box-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000; }
            50% { box-shadow: 0 0 30px #ff0000, 0 0 60px #ff0000; }
        }
        
        /* FIXED MARQUEE - NO GAPS */
        .marquee-container {
            width: 100vw;
            position: relative;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            overflow: hidden;
        }
        
        .marquee-content {
            display: inline-block;
            white-space: nowrap;
            animation: marquee-scroll 120s linear infinite;
            padding-left: 100%;
        }
        
        @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
        
        /* LIVE BADGE STYLES */
        .live-badge {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff0000, #ff4444);
            color: white;
            font-weight: 900;
            font-size: 0.7rem;
            padding: 2px 10px;
            border-radius: 12px;
            letter-spacing: 1px;
            z-index: 10;
            box-shadow: 0 0 15px rgba(255, 0, 0, 0.7);
        }
        
        .live-dot {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #ff0000;
            border-radius: 50%;
            margin-right: 5px;
            animation: live-dot-pulse 1s infinite;
        }
        
        @keyframes live-dot-pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
        }
        
        /* CUSTOM CURSOR */
        .cyber-cursor {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="%2300ffff" d="M12 2L2 22h20L12 2z"/></svg>'), auto;
        }
    </style>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        'neon-pink': '#ff00ff',
                        'neon-blue': '#00ffff',
                        'neon-purple': '#9d00ff',
                        'cyber-dark': '#0a0a14'
                    },
                    animation: {
                        'neon-glow': 'neon-glow 2s ease-in-out infinite',
                        'glitch': 'glitch 0.3s linear infinite',
                        'scan': 'scan 2s linear infinite'
                    },
                    keyframes: {
                        'neon-glow': {
                            '0%, 100%': { 'text-shadow': '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff' },
                            '50%': { 'text-shadow': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 15px #ff00ff' }
                        },
                        'glitch': {
                            '0%': { transform: 'translate(0)' },
                            '20%': { transform: 'translate(-2px, 2px)' },
                            '40%': { transform: 'translate(-2px, -2px)' },
                            '60%': { transform: 'translate(2px, 2px)' },
                            '80%': { transform: 'translate(2px, -2px)' },
                            '100%': { transform: 'translate(0)' }
                        },
                        'scan': {
                            '0%': { top: '0%' },
                            '100%': { top: '100%' }
                        }
                    }
                }
            }
        };
    </script>
</head>
<body class="cyber-cursor bg-cyber-dark text-white">
    <!-- LOADING SCREEN -->
    <div id="loading-screen" class="fixed inset-0 flex flex-col items-center justify-center bg-cyber-dark z-[9999]">
        <div class="relative mb-8">
            <div class="w-32 h-32 md:w-48 md:h-48 border-4 border-neon-blue rounded-full animate-spin"></div>
            <img src="./videos/loaderfour.webp" alt="Loading" class="absolute inset-0 w-32 h-32 md:w-48 md:h-48 object-contain"/>
        </div>
        <div class="text-neon-blue text-xl font-bold animate-pulse">INITIALIZING SYSTEM...</div>
        <div class="w-64 h-1 bg-gray-800 mt-4 overflow-hidden rounded-full">
            <div class="h-full bg-gradient-to-r from-neon-purple to-neon-blue animate-pulse"></div>
        </div>
    </div>

    <!-- SKIP TO CONTENT -->
    <a class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:bg-neon-pink focus:text-black focus:px-4 focus:py-2 focus:rounded" href="#main-content">Skip to content</a>

    <div class="min-h-screen flex flex-col">
        <!-- HEADER -->
        <header class="glass-effect fixed w-full z-50 py-4 px-6 border-b border-neon-purple/30">
            <nav class="container mx-auto flex justify-between items-center">
                <!-- LOGO WITH LIVE BADGE -->
                <div class="flex items-center gap-4">
                    <div class="relative" id="logo-container">
                        <div class="relative w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-neon-blue hover:border-neon-pink transition-all duration-300">
                            <img id="leongrayj-logo" 
                                 src="https://yt3.googleusercontent.com/59TvMDmDxRIdLvHMcOq9Tz-1xIdnpTmNPvJPIGL1kboNHQ8zycO5bT29KlqvhggJ3hpSG5kx2Q=s160-c-k-c0x00ffffff-no-rj"
                                 alt="LeongrayJ Logo"
                                 class="w-full h-full object-cover"/>
                        </div>
                        <!-- LIVE BADGE (DYNAMIC) -->
                        <div id="live-badge" class="live-badge hidden">
                            <span class="live-dot"></span>LIVE
                        </div>
                    </div>
                    
                    <h1 class="text-2xl font-bold">
                        <span class="text-neon-blue">Leon</span>
                        <span class="text-neon-pink">GrayJ</span>
                        <span class="text-xs ml-2 text-gray-400 font-normal">GAMING BLOG</span>
                    </h1>
                </div>

                <!-- NAVIGATION -->
                <ul class="hidden md:flex gap-6 font-semibold">
                    <li><a href="index.html#featured-playlists" class="text-neon-blue hover:text-neon-pink transition-colors">Featured</a></li>
                    <li><a href="arcade.html" class="hover:text-neon-blue transition-colors">Leon's Arcade</a></li>
                    <li><a href="high_priority.html" class="hover:text-neon-blue transition-colors">High Priority</a></li>
                    <li><a href="moderate_priority.html" class="hover:text-neon-blue transition-colors">Moderate</a></li>
                    <li><a href="low_priority.html" class="hover:text-neon-blue transition-colors">Low Priority</a></li>
                    <li><a href="index.html#about-me" class="text-neon-pink hover:text-neon-blue transition-colors">About</a></li>
                </ul>
            </nav>
        </header>

        <!-- FIXED MARQUEE - NO GAPS -->
        <section class="marquee-container mt-20 bg-black/50 py-3 border-y border-neon-purple/30">
            <div id="dynamic-marquee" class="marquee-content text-sm font-bold">
                <!-- Content will be loaded by JavaScript -->
                <span class="mx-8">🎮 Loading latest gaming news...</span>
            </div>
        </section>

        <!-- HERO SECTION -->
        <main class="flex-grow pt-32" id="main-content">
            <section class="relative h-[80vh] flex items-center justify-center overflow-hidden cyber-grid">
                <div class="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-blue/10"></div>
                <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 class="text-5xl md:text-7xl font-black mb-6 leading-tight">
                        <span class="text-neon-blue">CURATING THE</span><br/>
                        <span class="text-neon-pink neon-text">FUTURE OF GAMING</span>
                    </h1>
                    <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                        Welcome to the ultimate chronicle of gaming's most anticipated titles. 
                        Join me in exploring what's next on the horizon.
                    </p>
                    <a href="#featured-playlists" 
                       class="inline-block bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold py-4 px-10 rounded-full 
                              hover:shadow-[0_0_30px_var(--neon-pink)] transition-all duration-300 transform hover:scale-105">
                        EXPLORE MY LIST →
                    </a>
                </div>
            </section>

            <!-- FEATURED SECTION -->
            <section id="featured-playlists" class="py-20 px-4">
                <div class="container mx-auto">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl md:text-5xl font-bold mb-4">
                            <span class="text-neon-blue">FEATURED</span>
                            <span class="text-neon-pink"> PLAYLIST</span>
                        </h2>
                        <div class="w-32 h-1 bg-gradient-to-r from-neon-blue to-neon-pink mx-auto mb-6"></div>
                        <p class="text-gray-400 max-w-2xl mx-auto">
                            Dive into my current gaming obsession with full playthroughs and in-depth analysis
                        </p>
                    </div>

                    <!-- FEATURED GAME CARD -->
                    <div class="glass-effect rounded-2xl overflow-hidden max-w-6xl mx-auto">
                        <div class="md:flex">
                            <div class="md:w-2/3 p-8">
                                <div class="flex items-center gap-4 mb-6">
                                    <span class="px-4 py-1 bg-neon-pink/20 text-neon-pink text-sm font-bold rounded-full">NOW PLAYING</span>
                                    <span class="text-gray-400">🎮 Psychological Horror</span>
                                </div>
                                
                                <h3 class="text-3xl font-bold mb-4 text-neon-blue">SILENT HILL 2</h3>
                                <p class="text-gray-300 mb-6 leading-relaxed">
                                    Step into the fog‑shrouded town of Silent Hill, where fear sharpens into emotion 
                                    and every shadow hides the truth James Sunderland seeks. A haunting, atmospheric 
                                    journey into guilt, memory, and psychological terror.
                                </p>
                                
                                <div class="grid grid-cols-3 gap-4 mb-8">
                                    <div class="bg-black/50 p-4 rounded-lg border border-neon-purple/30 text-center">
                                        <div class="text-2xl mb-2">🌫️</div>
                                        <div class="text-sm font-bold">Atmospheric Fog</div>
                                    </div>
                                    <div class="bg-black/50 p-4 rounded-lg border border-neon-purple/30 text-center">
                                        <div class="text-2xl mb-2">🧠</div>
                                        <div class="text-sm font-bold">Psychological Horror</div>
                                    </div>
                                    <div class="bg-black/50 p-4 rounded-lg border border-neon-purple/30 text-center">
                                        <div class="text-2xl mb-2">🎵</div>
                                        <div class="text-sm font-bold">Iconic Soundtrack</div>
                                    </div>
                                </div>
                                
                                <a href="https://www.youtube.com/playlist?list=PLWia9WmNWzl10p6KfQdcMdmhr_XAVY14b" 
                                   target="_blank"
                                   class="inline-flex items-center gap-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-bold py-3 px-6 rounded-lg 
                                          hover:shadow-[0_0_20px_var(--neon-pink)] transition-all duration-300">
                                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.812 5.056a3.75 3.75 0 0 0-2.124-2.124C16.322 2.5 12 2.5 12 2.5s-4.322 0-5.688.432a3.75 3.75 0 0 0-2.124 2.124c-.432 1.366-.432 4.225-.432 4.225v2.817c0 2.86.001 4.79.432 6.156a3.75 3.75 0 0 0 2.124 2.124c1.366.432 5.688.432 5.688.432s4.322 0 5.688-.432a3.75 3.75 0 0 0 2.124-2.124c.432-1.366.432-4.225.432-4.225V9.281c0-2.86-.001-4.79-.432-6.156ZM9.75 15.375V8.625L15.375 12l-5.625 3.375Z"/>
                                    </svg>
                                    WATCH FULL PLAYLIST
                                </a>
                            </div>
                            
                            <div class="md:w-1/3 p-8 bg-black/30">
                                <div class="relative rounded-xl overflow-hidden neon-border aspect-video">
                                    <iframe 
                                        src="https://www.youtube.com/embed/videoseries?list=PLWia9WmNWzl10p6KfQdcMdmhr_XAVY14b" 
                                        class="absolute inset-0 w-full h-full"
                                        allowfullscreen>
                                    </iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ABOUT SECTION -->
            <section id="about-me" class="py-20 px-4 bg-black/30">
                <div class="container mx-auto max-w-4xl">
                    <div class="text-center mb-16">
                        <h2 class="text-4xl md:text-5xl font-bold mb-4">
                            <span class="text-neon-blue">ABOUT</span>
                            <span class="text-neon-pink"> LEONGRAYJ</span>
                        </h2>
                        <div class="w-32 h-1 bg-gradient-to-r from-neon-blue to-neon-pink mx-auto"></div>
                    </div>
                    
                    <div class="glass-effect rounded-2xl p-8 md:p-12">
                        <div class="flex flex-col md:flex-row items-center gap-8">
                            <div class="md:w-1/3">
                                <div class="relative w-48 h-48 mx-auto md:mx-0">
                                    <div class="absolute inset-0 border-4 border-neon-blue rounded-full animate-spin"></div>
                                    <img src="https://yt3.googleusercontent.com/59TvMDmDxRIdLvHMcOq9Tz-1xIdnpTmNPvJPIGL1kboNHQ8zycO5bT29KlqvhggJ3hpSG5kx2Q=s160-c-k-c0x00ffffff-no-rj"
                                         alt="LeongrayJ"
                                         class="relative w-full h-full rounded-full object-cover border-4 border-transparent"/>
                                </div>
                            </div>
                            
                            <div class="md:w-2/3">
                                <h3 class="text-2xl font-bold mb-6 text-neon-blue">Greetings, fellow gamers! 👋</h3>
                                <div class="space-y-4 text-gray-300">
                                    <p>
                                        I'm LeonGrayJ, your guide through the ever-expanding universe of video games. 
                                        This blog is my personal logbook, tracking and reviewing the most exciting titles 
                                        across all genres.
                                    </p>
                                    <p>
                                        My passion lies in discovering games that push boundaries and offer unforgettable 
                                        experiences. Join me as we uncover hidden gems and celebrate gaming masterpieces.
                                    </p>
                                    <p>
                                        Outside of gaming, I'm focused on building a welcoming creative community. 
                                        Let's connect on Discord or catch up during my YouTube livestreams!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- COMMUNITY SECTION -->
            <section class="py-20 px-4">
                <div class="container mx-auto max-w-6xl">
                    <h2 class="text-4xl md:text-5xl font-bold text-center mb-16">
                        <span class="text-neon-blue">JOIN THE</span>
                        <span class="text-neon-pink"> COMMUNITY</span>
                    </h2>
                    
                    <div class="grid md:grid-cols-3 gap-8">
                        <!-- YOUTUBE -->
                        <div class="glass-effect rounded-2xl p-8 text-center border border-neon-blue/30">
                            <div class="text-4xl mb-4">🎥</div>
                            <h3 class="text-xl font-bold mb-4 text-neon-blue">YouTube Channel</h3>
                            <p class="text-gray-400 mb-6">
                                Subscribe for daily gaming content, reviews, and live streams
                            </p>
                            <a href="https://www.youtube.com/@LeonGrayJ"
                               target="_blank"
                               class="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg 
                                      hover:shadow-[0_0_20px_#ff0000] transition-all">
                                SUBSCRIBE NOW
                            </a>
                        </div>
                        
                        <!-- DISCORD -->
                        <div class="glass-effect rounded-2xl p-8 text-center border border-neon-purple/30">
                            <div class="text-4xl mb-4">💬</div>
                            <h3 class="text-xl font-bold mb-4 text-neon-purple">Discord Server</h3>
                            <p class="text-gray-400 mb-6">
                                Join our active community for real-time discussions and events
                            </p>
                            <a href="https://discord.gg/XY66hCpFcB"
                               target="_blank"
                               class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg 
                                      hover:shadow-[0_0_20px_#6366f1] transition-all">
                                JOIN DISCORD
                            </a>
                        </div>
                        
                        <!-- LIVE STREAMS -->
                        <div class="glass-effect rounded-2xl p-8 text-center border border-neon-pink/30">
                            <div class="text-4xl mb-4">🔴</div>
                            <h3 class="text-xl font-bold mb-4 text-neon-pink">Live Streams</h3>
                            <p class="text-gray-400 mb-6">
                                Watch me play live and interact with the community in real-time
                            </p>
                            <a href="https://www.youtube.com/@LeonGrayJ/live"
                               target="_blank"
                               class="inline-block bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg 
                                      hover:shadow-[0_0_20px_var(--neon-pink)] transition-all">
                                WATCH LIVE
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>

        <!-- FOOTER -->
        <footer class="glass-effect mt-20 py-8 px-4 border-t border-neon-purple/30">
            <div class="container mx-auto text-center">
                <p class="text-gray-400 mb-6">© 2025 LeonGrayJ. All Rights Reserved.</p>
                <div class="flex justify-center gap-8">
                    <a href="https://discord.gg/XY66hCpFcB" class="text-gray-400 hover:text-neon-blue transition-colors">Discord</a>
                    <a href="https://www.youtube.com/@LeonGrayJ" class="text-gray-400 hover:text-neon-pink transition-colors">YouTube</a>
                    <a href="#" class="text-gray-400 hover:text-neon-purple transition-colors">Privacy Policy</a>
                </div>
            </div>
        </footer>
    </div>

    <!-- SCRIPTS -->
    <script>
        // LOADING SCREEN
        window.addEventListener('load', function() {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.transition = 'opacity 0.5s';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                    }, 500);
                }
            }, 2000);
        });

        // LIVE STATUS CHECK
        async function checkLiveStatus() {
            try {
                const response = await fetch('/.netlify/functions/check-live');
                const data = await response.json();
                
                const liveBadge = document.getElementById('live-badge');
                const logoContainer = document.getElementById('logo-container');
                
                if (data.isLive && data.liveUrl) {
                    // SHOW LIVE BADGE
                    liveBadge.classList.remove('hidden');
                    
                    // MAKE LOGO CLICKABLE
                    logoContainer.style.cursor = 'pointer';
                    logoContainer.onclick = () => window.open(data.liveUrl, '_blank');
                    
                    // ADD LIVE GLOW TO LOGO
                    const logo = document.getElementById('leongrayj-logo');
                    logo.parentElement.classList.add('live-glow');
                    logo.parentElement.classList.add('border-red-500');
                    logo.parentElement.classList.remove('border-neon-blue');
                    
                } else {
                    // HIDE LIVE BADGE
                    liveBadge.classList.add('hidden');
                    
                    // REMOVE CLICK FUNCTIONALITY
                    logoContainer.style.cursor = 'default';
                    logoContainer.onclick = null;
                    
                    // REMOVE LIVE GLOW
                    const logo = document.getElementById('leongrayj-logo');
                    logo.parentElement.classList.remove('live-glow');
                    logo.parentElement.classList.remove('border-red-500');
                    logo.parentElement.classList.add('border-neon-blue');
                }
            } catch (error) {
                console.error('Live status check failed:', error);
            }
        }

        // MARQUEE NEWS
        async function loadNewsMarquee() {
            const apiKey = 'b162f72fadcc5c39885332a7dcfa90ce';
            const marquee = document.getElementById('dynamic-marquee');
            
            try {
                const response = await fetch(`https://gnews.io/api/v4/search?q=gaming&lang=en&max=10&apikey=${apiKey}`);
                const data = await response.json();
                
                marquee.innerHTML = '';
                data.articles.slice(0, 5).forEach(article => {
                    const span = document.createElement('span');
                    span.className = "mx-8 text-neon-blue";
                    span.innerHTML = `📰 ${article.title} • `;
                    marquee.appendChild(span);
                });
            } catch (error) {
                console.error('Failed to load news:', error);
                marquee.innerHTML = '<span class="mx-8 text-gray-500">⚠️ Failed to load news. Check connection.</span>';
            }
        }

        // INITIALIZE EVERYTHING
        document.addEventListener('DOMContentLoaded', () => {
            // Check live status immediately and every 30 seconds
            checkLiveStatus();
            setInterval(checkLiveStatus, 30000);
            
            // Load news marquee
            loadNewsMarquee();
            
            // Smooth scrolling for anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const headerOffset = 100;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });
    </script>
</body>
</html>
