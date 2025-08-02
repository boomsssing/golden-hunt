// ===============================
// GOLDEN HUNT JEWELRY - LUXURY ANIMATIONS
// ===============================

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to day mode
const savedTheme = localStorage.getItem('theme') || 'day';
body.classList.toggle('night-mode', savedTheme === 'night');

// Initialize navbar theme on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNavbarTheme();
});

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('night-mode');
    const currentTheme = body.classList.contains('night-mode') ? 'night' : 'day';
    localStorage.setItem('theme', currentTheme);
    
    // Update navbar theme immediately after toggle
    updateNavbarTheme();
    
    // Add smooth transition effect
    body.style.transition = 'all 0.3s ease';
    setTimeout(() => {
        body.style.transition = '';
    }, 300);
});

// Scroll to top functionality
const scrollToTopBtn = document.getElementById('scrollToTop');

// Initialize scroll to top button as hidden
scrollToTopBtn.classList.remove('visible');

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Smooth scroll to top when button is clicked
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Page loaded - no loading screen

// Smooth scroll function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Enhanced navbar effects
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

// Function to update navbar theme colors
function updateNavbarTheme() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isNightMode = body.classList.contains('night-mode');
    
    // Remove any inline styles that might interfere with CSS
    navbar.style.background = '';
    navbar.style.boxShadow = '';
    
    // Add/remove classes for scrolled state instead of inline styles
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Update navbar theme classes
    updateNavbarTheme();
    
    // Hide/show navbar on scroll
    if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .sell-category, .trust-item, .feature, .info-card').forEach(el => {
    observer.observe(el);
});

// Add staggered animation for sell categories
document.querySelectorAll('.sell-category').forEach((category, index) => {
    category.style.animationDelay = `${index * 0.2}s`;
});

// Counter animation for trust indicators
const animateCounters = () => {
    document.querySelectorAll('.trust-number').forEach(counter => {
        const target = counter.textContent;
        const isNumeric = target.match(/\d+/);
        
        if (isNumeric) {
            const number = parseInt(isNumeric[0]);
            const increment = number / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    counter.textContent = target;
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current) + target.replace(/\d+/, '');
                }
            }, 30);
        }
    });
};

// Trigger counter animation when trust section is visible
const trustSection = document.querySelector('.trust-indicators');
const trustObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            trustObserver.unobserve(entry.target);
        }
    });
});

if (trustSection) {
    trustObserver.observe(trustSection);
}

// Simple contact - no form to handle

// Enhanced mobile video handling
function setupMobileVideo() {
    const video = document.querySelector('.hero-video-bg video');
    if (!video) return;
    
    // Remove any controls attributes that might appear
    video.removeAttribute('controls');
    video.controls = false;
    
    // Force playsinline for mobile devices (except Firefox)
    if (!navigator.userAgent.includes('Firefox')) {
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
    }
    
    // Disable context menu on video
    video.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Prevent video from being clicked/tapped
    video.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    // Prevent touch events on video
    video.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
    });
    
    // Ensure video plays on mobile
    video.addEventListener('loadedmetadata', () => {
        video.muted = true;
        video.play().catch(err => {
            console.log('Video autoplay was prevented:', err);
            // Create fallback static background if video fails
            const heroSection = document.querySelector('.hero');
            if (heroSection) {
                heroSection.style.background = 'linear-gradient(135deg, #0A0A0A 0%, #2A2A2A 50%, #0A0A0A 100%)';
            }
        });
    });
    
    // Monitor for any unwanted control appearances
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'controls') {
                video.removeAttribute('controls');
                video.controls = false;
            }
        });
    });
    
    observer.observe(video, { attributes: true, attributeFilter: ['controls'] });
}

// Initialize mobile video setup when DOM is loaded
document.addEventListener('DOMContentLoaded', setupMobileVideo);

// Additional mobile detection and handling
if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.addEventListener('DOMContentLoaded', () => {
        const video = document.querySelector('.hero-video-bg video');
        if (video) {
            // Additional mobile-specific attributes
            video.style.pointerEvents = 'none';
            video.style.touchAction = 'none';
            
            // Ensure video container doesn't interfere
            const videoContainer = document.querySelector('.hero-video-bg');
            if (videoContainer) {
                videoContainer.style.pointerEvents = 'none';
                videoContainer.style.touchAction = 'none';
            }
        }
    });
}

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Luxury cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #FFD700, #D4AF37);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(newCursor);
    }
    
    document.querySelector('.cursor').style.left = e.clientX - 10 + 'px';
    document.querySelector('.cursor').style.top = e.clientY - 10 + 'px';
});

// Popup functionality
function openPopup(category) {
    const popup = document.getElementById('categoryPopup');
    const popupBody = document.getElementById('popupBody');
    
    let content = '';
    
    switch(category) {
        case 'jewelry':
            content = `
                <div class="popup-header">
                    <h2>Fine Jewelry Collection</h2>
                    <p>Discover our exquisite selection of necklaces, bracelets, rings, and earrings</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Gold Jewelry</h3>
                        <p>14K, 18K, and 24K gold pieces in various styles</p>
                    </div>
                    <div class="popup-item">
                        <h3>Silver Jewelry</h3>
                        <p>Sterling silver and fine silver collections</p>
                    </div>
                    <div class="popup-item">
                        <h3>Gemstone Jewelry</h3>
                        <p>Precious and semi-precious stone jewelry</p>
                    </div>
                    <div class="popup-item">
                        <h3>Custom Design</h3>
                        <p>Bespoke jewelry created to your specifications</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Visit Our Store Today</h3>
                </div>
            `;
            break;
        case 'engagement':
            content = `
                <div class="popup-header">
                    <h2>Engagement & Bridal</h2>
                    <p>Make your special moment unforgettable with our stunning collection</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Diamond Rings</h3>
                        <p>Certified diamonds in classic and modern settings</p>
                    </div>
                    <div class="popup-item">
                        <h3>Wedding Bands</h3>
                        <p>Matching sets and individual wedding bands</p>
                    </div>
                    <div class="popup-item">
                        <h3>Bridal Sets</h3>
                        <p>Complete engagement and wedding ring sets</p>
                    </div>
                    <div class="popup-item">
                        <h3>Custom Proposals</h3>
                        <p>Design the perfect ring for your proposal</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Start Your Love Story</h3>
                </div>
            `;
            break;
        case 'coins':
            content = `
                <div class="popup-header">
                    <h2>Coins & Currency</h2>
                    <p>Rare collectibles, bullion, and historical currency pieces</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Gold Coins</h3>
                        <p>American Eagles, Krugerrands, and rare gold coins</p>
                    </div>
                    <div class="popup-item">
                        <h3>Silver Coins</h3>
                        <p>Morgan dollars, Peace dollars, and silver eagles</p>
                    </div>
                    <div class="popup-item">
                        <h3>Rare Currency</h3>
                        <p>Historical paper money and collectible bills</p>
                    </div>
                    <div class="popup-item">
                        <h3>Bullion</h3>
                        <p>Investment-grade precious metal bars and rounds</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Explore Our Collection</h3>
                </div>
            `;
            break;
        case 'goldbars':
            content = `
                <div class="popup-header">
                    <h2>Gold Bars</h2>
                    <p>Premium investment-grade gold bullion bars and ingots</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>1 oz Gold Bars</h3>
                        <p>Perfect for smaller investments and gifts</p>
                    </div>
                    <div class="popup-item">
                        <h3>10 oz Gold Bars</h3>
                        <p>Mid-range investment with excellent liquidity</p>
                    </div>
                    <div class="popup-item">
                        <h3>1 kg Gold Bars</h3>
                        <p>Large investment bars with certified purity</p>
                    </div>
                    <div class="popup-item">
                        <h3>PAMP Suisse & Credit Suisse</h3>
                        <p>World-renowned Swiss refiners with assay cards</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Invest in Physical Gold Today</h3>
                </div>
            `;
            break;
        case 'gemstones':
            content = `
                <div class="popup-header">
                    <h2>Precious Gemstones</h2>
                    <p>Exquisite collection of certified precious and semi-precious stones</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Rubies & Sapphires</h3>
                        <p>Natural and heated stones with certification</p>
                    </div>
                    <div class="popup-item">
                        <h3>Emeralds</h3>
                        <p>Colombian, Zambian, and Brazilian emeralds</p>
                    </div>
                    <div class="popup-item">
                        <h3>Tanzanite & Tourmaline</h3>
                        <p>Rare and exotic gemstones for collectors</p>
                    </div>
                    <div class="popup-item">
                        <h3>Pearls</h3>
                        <p>Natural saltwater and freshwater pearls</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Explore Our Gemstone Collection</h3>
                </div>
            `;
            break;
    }
    
    popupBody.innerHTML = content;
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closePopup() {
    const popup = document.getElementById('categoryPopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close popup when clicking outside
document.getElementById('categoryPopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

// Close popup with escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePopup();
        closeServicePopup();
    }
});

// Service card popup functionality
function openServicePopup(service) {
    const popup = document.getElementById('servicePopup');
    const popupBody = document.getElementById('servicePopupBody');
    
    let content = '';
    
    switch(service) {
        case 'diamonds':
            content = `
                <div class="popup-header">
                    <h2>💎 Diamonds & Gemstones</h2>
                    <p>GIA certified appraisals, fair market pricing, immediate cash offers</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>All Carat Sizes</h3>
                        <p>From small accent stones to large statement pieces</p>
                    </div>
                    <div class="popup-item">
                        <h3>Certified & Uncertified</h3>
                        <p>We evaluate both certified and uncertified diamonds</p>
                    </div>
                    <div class="popup-item">
                        <h3>Loose or Mounted</h3>
                        <p>Whether your diamonds are set in jewelry or loose stones</p>
                    </div>
                    <div class="popup-item">
                        <h3>Expert Evaluation</h3>
                        <p>Professional grading using industry standard methods</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Get Your Diamond Appraised Today</h3>
                    <p>Visit our store for a professional evaluation</p>
                </div>
            `;
            break;
        case 'gold':
            content = `
                <div class="popup-header">
                    <h2>🏆 Gold & Platinum</h2>
                    <p>Current market rates, professional testing, transparent pricing</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>10K, 14K, 18K, 24K</h3>
                        <p>All karat weights accepted with accurate testing</p>
                    </div>
                    <div class="popup-item">
                        <h3>Broken or Unwanted Pieces</h3>
                        <p>Even damaged jewelry has value - we buy it all</p>
                    </div>
                    <div class="popup-item">
                        <h3>Coins & Bullion</h3>
                        <p>Gold and silver coins, bars, and investment pieces</p>
                    </div>
                    <div class="popup-item">
                        <h3>Platinum Jewelry</h3>
                        <p>Premium prices for platinum pieces and settings</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Get Current Market Value</h3>
                    <p>Bring your gold and platinum for immediate evaluation</p>
                </div>
            `;
            break;
        case 'watches':
            content = `
                <div class="popup-header">
                    <h2>⌚ Luxury Watches</h2>
                    <p>Rolex, Cartier, Omega specialists with authenticated valuations</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Swiss Luxury Brands</h3>
                        <p>Rolex, Patek Philippe, Audemars Piguet, and more</p>
                    </div>
                    <div class="popup-item">
                        <h3>Vintage Timepieces</h3>
                        <p>Collectible and rare vintage watches of all eras</p>
                    </div>
                    <div class="popup-item">
                        <h3>Working or Non-Working</h3>
                        <p>We buy luxury watches in any condition</p>
                    </div>
                    <div class="popup-item">
                        <h3>Authentication Service</h3>
                        <p>Expert authentication and valuation services</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Watch Appraisal Experts</h3>
                    <p>Get your luxury timepiece professionally evaluated</p>
                </div>
            `;
            break;
        case 'goldbars-buy':
            content = `
                <div class="popup-header">
                    <h2>🏆 We Buy Gold Bars</h2>
                    <p>Top prices for all sizes of gold bullion bars and ingots</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>All Sizes Accepted</h3>
                        <p>From 1 gram to 1 kilogram bars - we buy them all</p>
                    </div>
                    <div class="popup-item">
                        <h3>Certified & Assayed</h3>
                        <p>PAMP, Credit Suisse, Royal Canadian Mint, and more</p>
                    </div>
                    <div class="popup-item">
                        <h3>Current Market Rates</h3>
                        <p>Fair pricing based on live gold spot prices</p>
                    </div>
                    <div class="popup-item">
                        <h3>Immediate Payment</h3>
                        <p>Cash on the spot for verified gold bars</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Get Your Gold Bars Appraised</h3>
                    <p>Bring your gold bars for professional evaluation</p>
                </div>
            `;
            break;
        case 'gemstones-buy':
            content = `
                <div class="popup-header">
                    <h2>💎 We Buy Gemstones</h2>
                    <p>Expert evaluation and fair pricing for all precious and semi-precious stones</p>
                </div>
                <div class="popup-grid">
                    <div class="popup-item">
                        <h3>Precious Stones</h3>
                        <p>Rubies, sapphires, emeralds - certified and uncertified</p>
                    </div>
                    <div class="popup-item">
                        <h3>Semi-Precious Stones</h3>
                        <p>Tanzanite, tourmaline, garnet, and more</p>
                    </div>
                    <div class="popup-item">
                        <h3>Pearls</h3>
                        <p>Natural and cultured pearls of all varieties</p>
                    </div>
                    <div class="popup-item">
                        <h3>Estate Gemstone Jewelry</h3>
                        <p>Vintage and antique pieces with gemstones</p>
                    </div>
                </div>
                <div class="popup-cta">
                    <h3>Gemstone Appraisal Service</h3>
                    <p>Bring your gemstones for professional evaluation</p>
                </div>
            `;
            break;
    }
    
    popupBody.innerHTML = content;
    popup.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeServicePopup() {
    const popup = document.getElementById('servicePopup');
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close service popup when clicking outside
document.getElementById('servicePopup').addEventListener('click', function(e) {
    if (e.target === this) {
        closeServicePopup();
    }
});

// ===============================
// INTELLIGENT CHATBOT SYSTEM
// ===============================

class GoldenHuntChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isTyping = false;
        this.conversationContext = {};
        this.userName = null;
        
        this.initializeElements();
        this.bindEvents();
        this.initializeKnowledgeBase();
    }
    
    initializeElements() {
        this.chatToggle = document.getElementById('chatToggle');
        this.chatContainer = document.getElementById('chatContainer');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
        this.chatMinimize = document.getElementById('chatMinimize');
        this.quickActions = document.querySelectorAll('.quick-action');
    }
    
    bindEvents() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.chatMinimize.addEventListener('click', () => this.toggleChat());
        this.chatSend.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        
        this.quickActions.forEach(action => {
            action.addEventListener('click', () => {
                const actionType = action.getAttribute('data-action');
                this.handleQuickAction(actionType);
            });
        });
    }
    
    initializeKnowledgeBase() {
        this.businessInfo = {
            hours: {
                colorado: "Mon-Fri 9AM-7PM, Sat 9AM-6PM, Sun 11AM-5PM",
                edinburgh: "Mon-Fri 10AM-6PM, Sat 10AM-5PM, Sun 12PM-4PM"
            },
            contact: {
                colorado: "(719) 555-0123",
                edinburgh: "+44 131 555-0789"
            },
            addresses: {
                colorado: "123 Luxury Lane, Colorado Springs, CO 80901",
                edinburgh: "45 Royal Mile, Edinburgh, Scotland EH1 1RE"
            }
        };
    }
    
    toggleChat() {
        this.isOpen = !this.isOpen;
        this.chatToggle.classList.toggle('active', this.isOpen);
        this.chatContainer.classList.toggle('active', this.isOpen);
        
        if (this.isOpen) {
            this.chatInput.focus();
        }
    }
    
    async sendMessage() {
        const userInput = this.chatInput.value.trim();
        if (!userInput || this.isTyping) return;
        
        this.addMessage(userInput, 'user');
        this.chatInput.value = '';
        
        await this.processUserMessage(userInput);
    }
    
    addMessage(content, sender = 'bot', isHTML = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'bot' ? '👨‍💼' : '👤';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        if (isHTML) {
            messageContent.innerHTML = content;
        } else {
            // Handle newlines by creating separate paragraphs
            const lines = content.split('\n').filter(line => line.trim());
            lines.forEach(line => {
                const p = document.createElement('p');
                p.textContent = line;
                messageContent.appendChild(p);
            });
        }
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        this.chatMessages.appendChild(messageDiv);
        
        this.scrollToBottom();
    }
    
    async processUserMessage(userInput) {
        this.showTyping();
        
        // Simulate natural response time
        await this.delay(500 + Math.random() * 800);
        
        this.hideTyping();
        
        const response = this.generateResponse(userInput.toLowerCase());
        this.addMessage(response, 'bot');
    }
    
    generateResponse(input) {
        // Handle name introductions
        if (input.includes('my name is') || input.includes("i'm ")) {
            const nameMatch = input.match(/(?:my name is|i'm)\s+([a-zA-Z]+)/);
            if (nameMatch) {
                this.userName = nameMatch[1];
                return `Nice to meet you, ${this.userName}! I'm Alex, your jewelry expert. How can I assist you today?`;
            }
        }
        
        // General conversation and greetings
        if (input.includes('how are you') || input.includes('how are things') || input.includes('how\'s it going')) {
            const responses = [
                "I'm doing great, thank you for asking! I'm excited to help you with your jewelry needs today.",
                "I'm wonderful! Always happy to chat about our beautiful collection. What can I help you with?",
                "Excellent, thanks for asking! I've been helping clients find their perfect pieces all day. How can I assist you?"
            ];
            return responses[Math.floor(Math.random() * responses.length)];
        }

        // Greetings with time context
        if (input.includes('good morning')) {
            return "Good morning! Starting the day with jewelry always makes it better. How can I help you today?";
        }
        if (input.includes('good afternoon')) {
            return "Good afternoon! Hope your day is going well. What brings you to Golden Hunt Jewelry today?";
        }
        if (input.includes('good evening')) {
            return "Good evening! There's always time for luxury. What can I help you discover today?";
        }
        
        // Basic greetings
        if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
            const greetings = [
                "Hi there! I'm Alex, your jewelry expert. What can I help you with today?",
                "Hello! Welcome to Golden Hunt Jewelry. How may I assist you?",
                "Hi! I'm here to help you find the perfect piece. What are you looking for?"
            ];
            return greetings[Math.floor(Math.random() * greetings.length)];
        }
        
        // Hours - more specific patterns
        if (input.includes('hours') || input.includes('open') || input.includes('close') || 
            input.includes('when are you') || input.includes('what time')) {
            return `Store Hours:\n\nColorado Springs: ${this.businessInfo.hours.colorado}\n\nEdinburgh: ${this.businessInfo.hours.edinburgh}`;
        }
        
        // Contact info
        if (input.includes('phone') || input.includes('number') || input.includes('call') || input.includes('contact')) {
            return `Contact Information:\n\nColorado Springs: ${this.businessInfo.contact.colorado}\n\nEdinburgh: ${this.businessInfo.contact.edinburgh}`;
        }
        
        // Location/address
        if (input.includes('location') || input.includes('address') || input.includes('where are you') || 
            input.includes('directions') || input.includes('find you')) {
            return `Our Locations:\n\nColorado Springs: ${this.businessInfo.addresses.colorado}\n\nEdinburgh: ${this.businessInfo.addresses.edinburgh}`;
        }
        
        // Selling items (what they want to sell to you) - improved logic
        const sellingKeywords = ['sell my', 'selling', 'get rid of', 'cash for', 'want to sell'];
        const hasSellingIntent = sellingKeywords.some(keyword => input.includes(keyword)) || 
                               (input.includes('have') && input.includes('old') && 
                                (input.includes('gold') || input.includes('jewelry') || input.includes('watch'))) ||
                               (input.includes('inherited') && (input.includes('jewelry') || input.includes('ring')));
        
        if (hasSellingIntent) {
            if (input.includes('diamond') || input.includes('ring')) {
                return "We buy diamonds and rings of all sizes! Bring them in for a free professional evaluation. We offer competitive market rates.";
            }
            if (input.includes('gold') && !input.includes('gold bar')) {
                return "We buy all gold jewelry - 10K, 14K, 18K, 24K, even broken pieces. Current market rates with instant cash payment.";
            }
            if (input.includes('watch')) {
                return "We buy luxury watches like Rolex, Cartier, Omega, Breitling. Working condition or not - we'll evaluate them all.";
            }
            if (input.includes('coin')) {
                return "We buy gold and silver coins, rare currency, and collectible coins. Bring them in for evaluation.";
            }
            return "We buy jewelry, diamonds, gold, watches, coins, and more. Free professional appraisal with fair market pricing!";
        }
        
        // Buying items (what they want to purchase) - improved logic
        const buyingKeywords = ['buy', 'purchase', 'looking for', 'need', 'want to get', 'shopping for'];
        const hasBuyingIntent = buyingKeywords.some(keyword => input.includes(keyword)) && 
                               !sellingKeywords.some(keyword => input.includes(keyword));
        
        if (hasBuyingIntent) {
            if (input.includes('engagement') || input.includes('wedding') || input.includes('proposal')) {
                return "We have a beautiful collection of engagement rings and wedding bands! Visit our showroom to see certified diamonds and custom options.";
            }
            if (input.includes('gold bar') || input.includes('bullion') || input.includes('investment')) {
                return "We sell certified investment-grade gold bars in various sizes (1oz to 1kg). All bars come with authenticity certificates.";
            }
            if (input.includes('necklace') || input.includes('bracelet') || input.includes('earring')) {
                return "We have an extensive fine jewelry collection including necklaces, bracelets, and earrings in gold, silver, and platinum.";
            }
            if (input.includes('coin')) {
                return "We sell collectible coins, gold and silver eagles, and rare currency. Stop by to see our numismatic collection.";
            }
            return "We sell fine jewelry, engagement rings, gold bars, collectible coins, and luxury timepieces. Visit our showroom to explore our collection!";
        }
        
        // Custom design
        if (input.includes('custom') || input.includes('design') || input.includes('create') || input.includes('make')) {
            return "We specialize in custom jewelry design! Bring your ideas and we'll create something unique just for you. From concept to completion.";
        }
        
        // Appraisal questions
        if (input.includes('appraisal') || input.includes('worth') || input.includes('value') || 
            input.includes('evaluate') || input.includes('estimate')) {
            return "We offer free professional appraisals! Just bring your items to either location and our certified experts will evaluate them.";
        }
        
        // Appointment
        if (input.includes('appointment') || input.includes('schedule') || input.includes('book')) {
            return "No appointment needed! Just walk in during business hours and we'll help you right away. First come, first served.";
        }
        
        // Services overview
        if (input.includes('services') || input.includes('what do you do') || input.includes('help with')) {
            return "Our services include: buying jewelry/gold/watches, selling fine jewelry/engagement rings/gold bars, custom design, and free appraisals. What interests you?";
        }
        
        // Pricing questions
        if (input.includes('price') || input.includes('cost') || input.includes('expensive') || input.includes('cheap')) {
            return "We offer competitive market pricing on all items. Prices vary based on current market rates. Visit us for current pricing on specific items.";
        }
        
        // Thanks
        if (input.includes('thank') || input.includes('thanks') || input.includes('appreciate')) {
            return this.userName ? `You're very welcome, ${this.userName}! Anything else I can help you with?` : "You're welcome! Anything else I can help you with?";
        }
        
        // Goodbye
        if (input.includes('bye') || input.includes('goodbye') || input.includes('see you') || input.includes('talk later')) {
            return this.userName ? `Goodbye, ${this.userName}! Thanks for chatting. We look forward to seeing you soon!` : "Thanks for chatting! Have a great day and we look forward to seeing you soon!";
        }
        
        // Personal questions about the bot
        if (input.includes('who are you') || input.includes('what are you') || input.includes('are you real') || input.includes('are you a bot')) {
            return "I'm Alex, your virtual jewelry expert at Golden Hunt Jewelry! While I'm an AI assistant, I'm here to provide expert guidance on our collections, services, and help you with any questions you have about fine jewelry.";
        }

        // What's your name
        if (input.includes('your name') || input.includes('who am i talking to')) {
            return "I'm Alex, your dedicated jewelry expert at Golden Hunt Jewelry! How can I assist you today?";
        }

        // Small talk about jewelry
        if (input.includes('like jewelry') || input.includes('love jewelry')) {
            return "I share your passion for fine jewelry! There's something magical about each piece, whether it's a stunning diamond engagement ring or a vintage gold necklace. What kind of pieces interest you the most?";
        }

        // Handling compliments
        if (input.includes('you are helpful') || input.includes('you are great') || input.includes('you are good') || input.includes('you are amazing')) {
            return this.userName ? 
                `Thank you, ${this.userName}! I really enjoy helping our clients find their perfect pieces. What else can I assist you with?` :
                "Thank you! I really enjoy helping our clients find their perfect pieces. What else can I assist you with?";
        }

        // Fun facts about jewelry
        if (input.includes('fun fact') || input.includes('tell me something') || input.includes('interesting fact')) {
            const funFacts = [
                "Did you know? The word 'carat' comes from the carob seed, which was used as a standard weight for trading gold in ancient times!",
                "Here's something interesting: Diamonds aren't rare in nature - they're rare in high quality. Only about 30% of diamonds mined are gem-quality!",
                "Fun fact: The largest cut diamond in the world is the Golden Jubilee Diamond, weighing 545.67 carats!",
                "Interesting fact: Pure 24K gold is actually too soft for jewelry - that's why we mix it with other metals to make it more durable!",
                "Did you know? Pearls are the only gemstones made by living creatures!",
                "Here's a fascinating fact: The tradition of engagement rings dates back to ancient Egypt, where circles symbolized eternity!",
                "Did you know? The rarest gemstone in the world isn't a diamond - it's red beryl, which is over 1,000 times rarer!",
                "Fun fact: The largest gold nugget ever found was the 'Welcome Stranger' in Australia, weighing 2,316 troy ounces!"
            ];
            return funFacts[Math.floor(Math.random() * funFacts.length)];
        }

        // Handle emotional expressions
        if (input.includes('excited') || input.includes('can\'t wait')) {
            return this.userName ? 
                `I share your excitement, ${this.userName}! There's nothing quite like finding that perfect piece of jewelry. What are you most looking forward to?` :
                "I share your excitement! There's nothing quite like finding that perfect piece of jewelry. What are you most looking forward to?";
        }

        // Handle expressions of uncertainty
        if (input.includes('not sure') || input.includes('confused') || input.includes('don\'t know what')) {
            return "That's completely normal! Jewelry can be overwhelming with so many beautiful options. Let's narrow it down - are you looking for something specific like rings, necklaces, or perhaps an investment piece?";
        }

        // Handle budget discussions sensitively
        if (input.includes('expensive') || input.includes('cost') || input.includes('budget') || input.includes('afford')) {
            return "We have beautiful pieces across all price points, and I'm happy to help you find something that matches both your style and budget. Would you like to explore specific price ranges?";
        }

        // Handle specific jewelry preferences
        if (input.includes('favorite') || input.includes('prefer')) {
            if (input.includes('gold') || input.includes('silver') || input.includes('platinum')) {
                return "Each precious metal has its own unique beauty! Gold offers warmth and timeless elegance, silver provides versatile sophistication, and platinum represents the ultimate in luxury. Which qualities matter most to you?";
            }
            if (input.includes('stone') || input.includes('gem') || input.includes('diamond')) {
                return "Every gemstone has its own character and story! While diamonds are classic, colored gems like sapphires, emeralds, and rubies can be equally stunning. What draws you to particular stones?";
            }
        }

        // Handle specific occasion inquiries
        if (input.includes('anniversary') || input.includes('birthday') || input.includes('special occasion')) {
            return "Special occasions deserve special pieces! I'd be happy to help you find something meaningful. What kind of message or feeling would you like the piece to convey?";
        }

        // Handle investment inquiries
        if (input.includes('investment') || input.includes('value') || input.includes('worth')) {
            return "Fine jewelry can indeed be a wonderful investment. While pieces like gold bars and certified diamonds typically hold value well, I always recommend choosing something you'll also love wearing or displaying. Would you like to explore our investment-grade pieces?";
        }

        // Handle care and maintenance questions
        if (input.includes('clean') || input.includes('care') || input.includes('maintain')) {
            return "Proper care is essential for keeping your jewelry beautiful! Each piece needs specific care - for example, gold can be cleaned with mild soap and warm water, while pearls need special attention. Would you like specific care tips for your pieces?";
        }

        // Handle comparison questions
        if (input.includes('difference between') || input.includes('better') || input.includes('compare')) {
            return "That's a great question! Each piece has its unique characteristics and benefits. To give you the most helpful comparison, could you tell me specifically what you're looking to compare?";
        }

        // Handle requests for recommendations
        if (input.includes('recommend') || input.includes('suggest') || input.includes('what should')) {
            return "I'd love to make some personalized recommendations! To help you best, could you tell me a bit about the occasion, style preferences, or any specific requirements you have in mind?";
        }

        // Handle questions about authenticity and certification
        if (input.includes('authentic') || input.includes('real') || input.includes('certified') || input.includes('fake')) {
            return "We take authenticity very seriously at Golden Hunt Jewelry. All our pieces come with proper certification, and we use industry-standard testing methods. Would you like to know more about our authentication process?";
        }

        // Handle questions about current trends
        if (input.includes('trending') || input.includes('popular') || input.includes('fashion') || input.includes('style')) {
            return "Current jewelry trends include mixed metal pieces, sustainable materials, and vintage-inspired designs. However, I always recommend choosing pieces that speak to your personal style rather than just following trends. What styles catch your eye?";
        }

        // Handle expressions of indecision between options
        if ((input.includes('or') || input.includes('versus') || input.includes('vs')) && 
            (input.includes('should i') || input.includes('better to'))) {
            return "Making choices between beautiful pieces can be challenging! To help you make the best decision, let's consider a few factors: your lifestyle, when you'll wear it, and your personal style preferences. Which aspects are most important to you?";
        }

        // Handle questions about gift giving
        if (input.includes('gift') || input.includes('present') || (input.includes('buying') && input.includes('for'))) {
            return "Jewelry makes such a thoughtful gift! To help you find the perfect piece, could you tell me a bit about the recipient? Things like their style preferences, what kind of jewelry they usually wear, or the occasion can help us make the best choice.";
        }

        // Handle questions about customization
        if (input.includes('custom') || input.includes('personalize') || input.includes('make my own')) {
            return "Creating custom pieces is one of our specialties! We can help you design something truly unique, from engagement rings to family heirlooms. What kind of custom piece did you have in mind?";
        }

        // Handle questions about jewelry history
        if (input.includes('history') || input.includes('vintage') || input.includes('antique') || input.includes('old')) {
            return "The history of jewelry is fascinating! Each era has its own distinctive styles and techniques. Are you interested in a particular period or type of historical jewelry? We have expertise in pieces from various eras.";
        }

        // Handle questions about gemstone meanings
        if (input.includes('meaning') || input.includes('symbolize') || input.includes('represent')) {
            return "Gemstones and jewelry often carry beautiful meanings! For example, sapphires symbolize wisdom and loyalty, while roses represent love. Would you like to know about the meaning of a specific stone or piece?";
        }

        // Handle questions about jewelry storage
        if (input.includes('store') || input.includes('keep') || input.includes('box') || input.includes('safe')) {
            return "Proper storage is crucial for preserving your jewelry! Different pieces need different care - for instance, pearls should be stored separately from harder gems, and silver needs anti-tarnish protection. Would you like specific storage tips for your pieces?";
        }

        // Handle questions about jewelry insurance
        if (input.includes('insurance') || input.includes('insure') || input.includes('protected')) {
            return "Protecting your investment is important! While we don't provide insurance directly, we can provide detailed appraisals and documentation for insurance purposes. Would you like to know more about getting your pieces appraised?";
        }

        // Handle questions about repairs
        if (input.includes('repair') || input.includes('fix') || input.includes('broken') || input.includes('damaged')) {
            return "We offer expert repair services for all types of jewelry! From simple chain repairs to complex restoration work, our skilled craftsmen can help. What type of repair service do you need?";
        }

        // Handle questions about metal purity
        if (input.includes('karat') || input.includes('pure') || input.includes('quality') || input.includes('grade')) {
            return "We deal exclusively in fine jewelry with verified purity. For gold, we offer 10K to 24K, and our platinum is 950-grade. Each piece comes with certification of authenticity. Would you like to learn more about metal purity standards?";
        }

        // Handle questions about payment options
        if (input.includes('payment') || input.includes('pay') || input.includes('finance') || input.includes('credit')) {
            return "We offer various payment options to make your purchase convenient! This includes major credit cards, financing plans for qualified buyers, and layaway options. Would you like details about a specific payment method?";
        }

        // Handle questions about return policy
        if (input.includes('return') || input.includes('exchange') || input.includes('refund')) {
            return "We want you to be completely satisfied with your purchase! Our return policy allows returns within 30 days with original documentation. Would you like me to explain our return process in detail?";
        }

        // Handle casual conversation starters
        if (input.includes('what\'s up') || input.includes('wassup') || input.includes('what are you up to')) {
            const casualResponses = [
                "Just helping our lovely clients find their dream jewelry! What brings you by today? 💎",
                "Oh you know, just hanging out with some gorgeous diamonds and gems! What can I help you discover? ✨",
                "Having a great day chatting about beautiful jewelry! What's on your mind? 💫"
            ];
            return casualResponses[Math.floor(Math.random() * casualResponses.length)];
        }

        // Handle expressions of frustration or past experiences
        if (input.includes('hate') || input.includes('bad experience') || input.includes('terrible') || input.includes('awful')) {
            return "Oh no, I'm sorry to hear that! 😟 Everyone deserves a positive jewelry experience. Let me help make things right - what kind of experience are you looking for?";
        }

        // Handle casual compliments about jewelry
        if (input.includes('pretty') || input.includes('beautiful') || input.includes('gorgeous') || input.includes('love it')) {
            const admirationResponses = [
                "Right?! 😍 It's absolutely stunning! Would you like to know more about the piece?",
                "I totally agree! 🤩 The craftsmanship is amazing. What caught your eye about it?",
                "It's breathtaking, isn't it? ✨ I can tell you have great taste! Would you like to see similar pieces?"
            ];
            return admirationResponses[Math.floor(Math.random() * admirationResponses.length)];
        }

        // Handle casual browsing
        if (input.includes('just looking') || input.includes('browsing') || input.includes('window shopping')) {
            return "That's totally cool! 😊 Sometimes it's fun just to explore and get inspired. If anything catches your eye, just let me know - I love chatting about our pieces!";
        }

        // Handle expressions of surprise about prices
        if (input.includes('wow') || input.includes('whoa') || input.includes('omg') || input.includes('oh my god')) {
            return "I know, right? 😊 Whether it's the stunning design or the price point, jewelry can definitely spark reactions! Want to talk about what you're seeing?";
        }

        // Handle casual date-related queries
        if (input.includes('date') || input.includes('romantic') || input.includes('proposal')) {
            return "Ooh, how exciting! 💕 Nothing adds sparkle to a special moment like the perfect piece of jewelry. Want to tell me more about what you're planning?";
        }

        // Handle casual style discussions
        if (input.includes('my style') || input.includes('not my thing') || input.includes('too flashy') || input.includes('too simple')) {
            return "Hey, personal style is totally unique to you! 🌟 There's no right or wrong - it's all about finding pieces that make YOU feel amazing. What kind of styles usually catch your eye?";
        }

        // Handle indecisive browsing
        if (input.includes('maybe') || input.includes('might') || input.includes('thinking about')) {
            return "Take your time! 😊 It's good to explore options. I'm here whenever you want to bounce ideas around or need more details about anything!";
        }

        // Handle casual time-related queries
        if (input.includes('how long') || input.includes('wait time') || input.includes('when will')) {
            return "Let me check that for you! ⏱️ Timing can vary depending on what you're looking for. Mind sharing a bit more about what you're interested in?";
        }

        // Handle expressions of being overwhelmed
        if (input.includes('overwhelming') || input.includes('too many') || input.includes('so much')) {
            return "I totally get it! 😅 There's a lot to take in with jewelry. Let's break it down into smaller bits - what's the most important thing you're looking for?";
        }

        // Handle casual price inquiries
        if (input.includes('how much') || input.includes('price range') || input.includes('costs')) {
            return "Let's find something that works for you! 💫 We have beautiful pieces across different price points. What kind of range did you have in mind?";
        }

        // Handle expressions of urgency
        if (input.includes('asap') || input.includes('urgent') || input.includes('hurry') || input.includes('quick')) {
            return "Don't worry, I've got you! 🏃‍♂️ Let's find what you need quickly. What's the occasion you're shopping for?";
        }

        // Handle casual opinions
        if (input.includes('what do you think') || input.includes('your opinion') || input.includes('would you')) {
            return "Well, in my experience... 🤔 Actually, why don't you tell me what YOU like about it? That way I can better understand your style and give more personalized suggestions!";
        }

        // Handle "why" questions about the business
        if (input.startsWith('why') && (input.includes('golden hunt') || input.includes('your') || input.includes('you'))) {
            return "At Golden Hunt Jewelry, we pride ourselves on our 25+ years of expertise, international presence, and commitment to exceptional quality. We believe every piece of jewelry tells a story, and we're here to help you find or create yours.";
        }

        // Default helpful response with personality
        const defaultResponses = [
            "I'd love to help you explore our collection! We can discuss buying, selling, custom designs, or anything else jewelry-related. What interests you?",
            "I'm here to assist with all your jewelry needs - whether you're buying, selling, or just curious about our services. What would you like to know?",
            "From engagement rings to gold bars, I'm knowledgeable about all our products and services. How can I guide you today?",
            "I can help you with anything from store hours to detailed product information. What aspect of Golden Hunt Jewelry would you like to explore?"
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    handleQuickAction(actionType) {
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            
            switch (actionType) {
                case 'hours':
                    this.addMessage(`Colorado Springs: ${this.businessInfo.hours.colorado}\nEdinburgh: ${this.businessInfo.hours.edinburgh}`, 'bot');
                    break;
                    
                case 'services':
                    this.addMessage("We buy: diamonds, gold, watches, jewelry, gemstones\nWe sell: engagement rings, jewelry, gold bars, coins\nWe also do custom design and free appraisals!", 'bot');
                    break;
                    
                case 'contact':
                    this.addMessage(`Colorado Springs: ${this.businessInfo.contact.colorado}\nEdinburgh: ${this.businessInfo.contact.edinburgh}`, 'bot');
                    break;
            }
            
        }, 600);
    }
    
    showTyping() {
        if (this.isTyping) return;
        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">👨‍💼</div>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        this.isTyping = false;
        const typingIndicator = this.chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the chatbot when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.goldenHuntChatbot = new GoldenHuntChatbot();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.8s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-links.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.98);
        padding: 2rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    
    body.night-mode .nav-links.active {
        background: rgba(26, 26, 26, 0.98);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    body.night-mode .nav-links.active a {
        color: #FFFFFF !important;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;
document.head.appendChild(style); 