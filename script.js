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
                return `Nice to meet you, ${this.userName}! How can I help you today?`;
            }
        }
        
        // Greetings
        if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('good morning') || input.includes('good afternoon')) {
            const greetings = [
                "Hi there! What can I help you with today?",
                "Hello! I'm here to help with your jewelry needs.",
                "Hi! What questions do you have about our services?"
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
        
        // Default helpful response
        return "I can help with questions about buying or selling jewelry, store hours, locations, services, or pricing. What would you like to know?";
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