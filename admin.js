// Admin Portal Functionality
class AdminPortal {
    constructor() {
        this.isLoggedIn = false;
        this.inquiries = [];
        this.activeChats = new Map(); // Map of sessionId to chat data
        this.stats = {
            activeChats: 0,
            pendingInquiries: 0,
            resolvedToday: 0,
            totalCustomers: 0
        };

        // Connection status
        this.isConnected = true;
        this.heartbeatInterval = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;

        // Create notification sound
        this.notificationSound = new Audio('data:audio/wav;base64,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');
        
        this.initializeElements();
        this.bindEvents();
        this.setupWebSocket();
        this.setupCustomerMessageHandling();
        this.setupNotifications();
        this.startHeartbeat();
    }

    initializeElements() {
        // Login elements
        this.loginSection = document.getElementById('loginSection');
        this.loginForm = document.getElementById('loginForm');
        this.adminDashboard = document.getElementById('adminDashboard');
        this.logoutBtn = document.getElementById('logoutBtn');
        this.refreshBtn = document.getElementById('refreshBtn');

        // Stats elements
        this.activeChatsElement = document.getElementById('activeChats');
        this.pendingInquiriesElement = document.getElementById('pendingInquiries');
        this.resolvedTodayElement = document.getElementById('resolvedToday');
        this.totalCustomersElement = document.getElementById('totalCustomers');

        // Lists
        this.inquiryList = document.getElementById('inquiryList');
        this.chatList = document.getElementById('chatList');

        // Notification badges
        this.newInquiriesBadge = document.getElementById('newInquiries');
        this.activeChatsCountBadge = document.getElementById('activeChatsCount');

        // Chat conversation elements
        this.chatConversation = document.getElementById('chatConversation');
        this.conversationMessages = document.getElementById('conversationMessages');
        this.adminMessageInput = document.getElementById('adminMessageInput');
        this.sendMessageBtn = document.getElementById('sendMessageBtn');
        this.closeChatBtn = document.getElementById('closeChatBtn');
        this.customerName = document.getElementById('customerName');
        this.customerStatus = document.getElementById('customerStatus');
        this.quickResponses = document.querySelectorAll('.quick-response');
        
        // Track current chat
        this.currentChatId = null;
    }

    setupNotifications() {
        // Request notification permission
        if (Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    console.log("Notification permission granted");
                }
            });
        }
    }

    playNotificationSound() {
        // Play the notification sound
        if (this.notificationSound) {
            this.notificationSound.play().catch(err => {
                console.log("Error playing notification sound:", err);
            });
        }
    }

    bindEvents() {
        // Login form submission
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Logout button
        this.logoutBtn.addEventListener('click', () => this.handleLogout());

        // Refresh button
        this.refreshBtn.addEventListener('click', () => this.handleRefresh());

        // Handle inquiry actions
        this.inquiryList.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn')) {
                const inquiryId = e.target.closest('.inquiry-item').dataset.id;
                if (e.target.classList.contains('btn-primary')) {
                    this.respondToInquiry(inquiryId);
                } else if (e.target.classList.contains('btn-secondary')) {
                    this.markInquiryResolved(inquiryId);
                }
            }
        });

        // Direct click handler on chat items
        this.chatList.addEventListener('click', (e) => {
            console.log('Chat list clicked', e.target); // Debug log
            
            // Find the clicked chat item
            const chatItem = e.target.closest('.chat-item');
            if (!chatItem) return;
            
            // Get the session ID
            const sessionId = chatItem.dataset.id;
            console.log('Clicked chat session ID:', sessionId);
            
            if (!sessionId) {
                console.error('No session ID found on chat item');
                return;
            }
            
            // Highlight the selected chat
            const allChatItems = this.chatList.querySelectorAll('.chat-item');
            allChatItems.forEach(item => item.classList.remove('active'));
            chatItem.classList.add('active');
            
            // Set current chat ID immediately
            this.currentChatId = sessionId;
            
            // Update the chat interface
            this.chatConversation.style.display = 'flex';
            this.customerName.textContent = chatItem.querySelector('.chat-name').textContent;
            this.customerStatus.textContent = 'Online';
            this.customerStatus.style.background = '#4CAF50';
            
            // Clear any existing messages and show loading
            this.conversationMessages.innerHTML = `
                <div style="text-align: center; padding: 1rem;">
                    Loading chat history...
                </div>
            `;
            
            // Enable and focus input
            this.adminMessageInput.disabled = false;
            this.adminMessageInput.value = '';
            this.adminMessageInput.focus();
            
            // Load the chat
            this.selectChat(sessionId);
        });

        // Make chat items clickable with cursor pointer
        const style = document.createElement('style');
        style.textContent = `
            .chat-item {
                cursor: pointer;
                transition: background-color 0.3s;
            }
            .chat-item:hover {
                background-color: rgba(212, 175, 55, 0.1);
            }
            .chat-item.active {
                background-color: #D4AF37;
                color: white;
            }
        `;
        document.head.appendChild(style);

        // Handle admin message sending
        this.sendMessageBtn.addEventListener('click', () => this.sendAdminMessage());
        this.adminMessageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendAdminMessage();
        });
        
        // Add typing indicator when admin is typing
        let typingTimer;
        this.adminMessageInput.addEventListener('input', () => {
            if (this.currentChatId && this.adminMessageInput.value.trim()) {
                // Send typing indicator
                this.sendCustomerResponse({
                    type: 'adminTyping',
                    sessionId: this.currentChatId,
                    timestamp: new Date().toISOString()
                });
                
                // Clear previous timer
                clearTimeout(typingTimer);
                
                // Set timer to stop typing indicator
                typingTimer = setTimeout(() => {
                    // Stop typing indicator after 2 seconds of no typing
                }, 2000);
            }
        });

        // Handle quick responses - use delegation since buttons might not exist yet
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-response')) {
                const message = e.target.getAttribute('data-message');
                if (this.adminMessageInput) {
                    this.adminMessageInput.value = message;
                    this.sendAdminMessage();
                }
            }
        });

        // Handle close chat
        this.closeChatBtn.addEventListener('click', () => this.closeConversation());
    }

    setupWebSocket() {
        // Real-time connection using multiple methods for instant communication
        this.ws = {
            send: (message) => {
                console.log('WebSocket message sent:', message);
            }
        };
        
        // Setup BroadcastChannel for instant cross-tab communication
        if (window.BroadcastChannel) {
            try {
                this.broadcastChannel = new BroadcastChannel('golden-hunt-chat');
                this.broadcastChannel.onmessage = (event) => {
                    if (event.data.type === 'customerMessage') {
                        this.receiveCustomerMessage(event.data.data);
                    }
                };
            } catch (e) {
                console.log('BroadcastChannel not available');
            }
        }
        
        // Listen for custom events (same-window communication)
        window.addEventListener('adminMessageReceived', (e) => {
            this.receiveCustomerMessage(e.detail);
        });

        // Simulate receiving messages - disabled as we want real messages only
        // this.simulateIncomingMessages();
    }

    handleLogin() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // In a real implementation, this would validate against your backend
        if (username === 'admin' && password === 'admin123') {
            this.isLoggedIn = true;
            this.loginSection.style.display = 'none';
            this.adminDashboard.style.display = 'block';
            this.loadInitialData();
        } else {
            alert('Invalid credentials');
        }
    }

    handleLogout() {
        this.isLoggedIn = false;
        this.loginSection.style.display = 'block';
        this.adminDashboard.style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        
        // Clear all data
        this.activeChats.clear();
        this.inquiries = [];
        this.currentChatId = null;
    }

    handleRefresh() {
        // Show loading indicator
        this.showConnectionStatus('Refreshing...', 'warning');
        
        // Refresh all data without logging out
        this.refreshData();
        this.loadInitialData();
        
        // Reset current chat selection
        if (this.currentChatId) {
            this.closeConversation();
        }
        
        // Show success message
        setTimeout(() => {
            this.showConnectionStatus('Refreshed successfully!', 'success');
        }, 500);
    }

    loadInitialData() {
        // Clear existing lists
        this.inquiryList.innerHTML = '';
        this.chatList.innerHTML = '';
        
        // Update stats with real data only
        this.updateStats({
            activeChats: this.activeChats.size,
            pendingInquiries: this.inquiries.length,
            resolvedToday: 0, // Real resolved count would come from backend
            totalCustomers: this.activeChats.size
        });

        // Re-add real inquiries to the list (if any)
        this.inquiries.forEach(inquiry => {
            this.addInquiryToDOM(inquiry);
        });

        // Re-add active chats to the list
        this.activeChats.forEach((chat, sessionId) => {
            const chatElement = document.createElement('div');
            chatElement.className = 'chat-item';
            chatElement.dataset.id = sessionId;
            
            const customerName = chat.customerInfo?.name || 'Anonymous Customer';
            const lastMessage = chat.messages.length > 0 ? 
                chat.messages[chat.messages.length - 1].message : 
                'New chat session';
            
            chatElement.innerHTML = `
                <div class="chat-header">
                    <span class="chat-name">${customerName}</span>
                    <span class="chat-time">${new Date(chat.timestamp).toLocaleTimeString()}</span>
                </div>
                <div class="chat-preview">${lastMessage}</div>
                <div class="notification-badge" style="display: ${chat.unreadCount > 0 ? 'block' : 'none'}">${chat.unreadCount}</div>
            `;
            
            this.chatList.appendChild(chatElement);
        });

        // Show welcome message
        this.showWelcomeMessage();
        
        // Show empty state message for inquiries if none exist
        if (this.inquiries.length === 0) {
            this.inquiryList.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: #666;">
                    <h4>📬 No Customer Inquiries</h4>
                    <p>Customer inquiries will appear here when they contact you through the website.</p>
                </div>
            `;
        }
    }

    showWelcomeMessage() {
        this.customerName.textContent = 'No Customer Selected';
        this.customerStatus.textContent = 'Waiting';
        this.customerStatus.style.background = '#ccc';
        
        this.conversationMessages.innerHTML = `
            <div class="welcome-message" style="text-align: center; padding: 2rem; color: #666;">
                <h3>👋 Welcome to Live Chat Support</h3>
                <p>Customers will appear on the left when they request live support.</p>
                <p>Click on any customer to view their chat history and respond in real-time.</p>
                <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 5px; border-left: 4px solid #D4AF37;">
                    <strong>💡 Tip:</strong> When customers type phrases like "live chat support" or "speak to agent", 
                    they'll appear here with urgent notifications!
                </div>
            </div>
        `;
    }

    updateStats(stats) {
        this.stats = { ...this.stats, ...stats };
        this.activeChatsElement.textContent = this.stats.activeChats;
        this.pendingInquiriesElement.textContent = this.stats.pendingInquiries;
        this.resolvedTodayElement.textContent = this.stats.resolvedToday;
        this.totalCustomersElement.textContent = this.stats.totalCustomers;

        this.newInquiriesBadge.textContent = `${this.stats.pendingInquiries} New`;
        this.activeChatsCountBadge.textContent = `${this.stats.activeChats} Active`;
    }

    addInquiry(inquiry) {
        this.inquiries.push(inquiry);
        this.addInquiryToDOM(inquiry);
    }

    addInquiryToDOM(inquiry) {
        const inquiryElement = document.createElement('li');
        inquiryElement.className = 'inquiry-item';
        inquiryElement.dataset.id = inquiry.id;
        
        inquiryElement.innerHTML = `
            <div class="inquiry-info">
                <div class="inquiry-header">
                    <span class="inquiry-name">${inquiry.name}</span>
                    <span class="inquiry-time">${inquiry.time}</span>
                </div>
                <div class="inquiry-message">${inquiry.message}</div>
            </div>
            <div class="inquiry-actions">
                <button class="btn btn-primary">Respond</button>
                <button class="btn btn-secondary">Mark Resolved</button>
            </div>
        `;

        this.inquiryList.appendChild(inquiryElement);
    }

    addChat(chat) {
        console.log('Adding chat:', chat); // Debug log
        
        // Don't add duplicate chats
        if (this.activeChats.has(chat.sessionId)) {
            console.log('Chat already exists, skipping');
            return;
        }

        this.activeChats.set(chat.sessionId, {
            ...chat,
            messages: [],
            unreadCount: 0
        });
        
        const chatElement = document.createElement('div');
        chatElement.className = 'chat-item';
        chatElement.dataset.id = chat.sessionId;
        chatElement.role = 'button';
        chatElement.tabIndex = '0';
        
        // Make it obviously clickable
        chatElement.style.cssText = `
            cursor: pointer;
            user-select: none;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        `;
        
        const customerName = chat.customerInfo?.name || 'Anonymous Customer';
        const previewMessage = chat.message || 'New chat session started';
        
        chatElement.innerHTML = `
            <div class="chat-header">
                <span class="chat-name">${customerName}</span>
                <span class="chat-time">${new Date(chat.timestamp).toLocaleTimeString()}</span>
            </div>
            <div class="chat-preview">${previewMessage}</div>
            <div class="notification-badge" style="display: none">0</div>
        `;

        // Add both click and touch handlers
        const handleSelect = (e) => {
            e.preventDefault(); // Prevent any default behavior
            e.stopPropagation(); // Stop event bubbling
            console.log('Chat selected:', chat.sessionId);
            this.currentChatId = chat.sessionId; // Set ID immediately
            this.openConversation(chat.sessionId); // Use openConversation instead of selectChat
        };

        chatElement.addEventListener('click', handleSelect);
        chatElement.addEventListener('touchend', handleSelect);
        
        // Add keyboard support
        chatElement.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                handleSelect(e);
            }
        });

        // Add to the top of the list
        this.chatList.insertBefore(chatElement, this.chatList.firstChild);
        
        console.log('Chat added successfully with ID:', chat.sessionId);
    }

    respondToInquiry(inquiryId) {
        // In a real implementation, this would open a chat or email interface
        alert(`Responding to inquiry ${inquiryId}`);
    }

    markInquiryResolved(inquiryId) {
        const inquiryElement = this.inquiryList.querySelector(`[data-id="${inquiryId}"]`);
        if (inquiryElement) {
            inquiryElement.remove();
            this.stats.pendingInquiries--;
            this.stats.resolvedToday++;
            this.updateStats(this.stats);
        }
    }

    selectChat(sessionId) {
        console.log('Selecting chat:', sessionId); // Debug log
        
        if (!sessionId) {
            console.error('No sessionId provided to selectChat');
            return;
        }

        // Get the chat data
        const chat = this.activeChats.get(sessionId);
        if (!chat) {
            console.error('No chat found for sessionId:', sessionId);
            return;
        }

        // Update active chat styling
        const previousActive = this.chatList.querySelector('.active');
        if (previousActive) {
            previousActive.classList.remove('active');
        }

        const chatElement = this.chatList.querySelector(`[data-id="${sessionId}"]`);
        if (!chatElement) {
            console.error('No chat element found for sessionId:', sessionId);
            return;
        }

        // Set this chat as active
        chatElement.classList.add('active');
        this.currentChatId = sessionId; // IMPORTANT: Set the current chat ID
        
        // Reset unread count
        chat.unreadCount = 0;
        const badge = chatElement.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
            badge.textContent = '0';
        }

        // Update customer info
        this.customerName.textContent = chat.customerInfo?.name || 'Anonymous Customer';
        this.customerStatus.textContent = 'Online';
        this.customerStatus.style.background = '#4CAF50';

        // Show conversation interface
        this.chatConversation.style.display = 'flex';
        
        // Display chat history
        this.displayChatHistory(sessionId);
        
        // Enable and focus input
        if (this.adminMessageInput) {
            this.adminMessageInput.disabled = false;
            this.adminMessageInput.focus();
        }
        
        console.log('Chat successfully opened:', {
            sessionId,
            customerName: chat.customerInfo?.name || 'Anonymous',
            messageCount: chat.messages.length
        });
    }

    openConversation(sessionId) {
        const chat = this.activeChats.get(sessionId);
        if (!chat) return;

        this.currentChatId = sessionId;
        
        // Update customer info in header
        this.customerName.textContent = chat.customerInfo?.name || 'Anonymous Customer';
        this.customerStatus.textContent = 'Online';
        this.customerStatus.style.background = '#4CAF50';

        // Display chat history
        this.displayChatHistory(sessionId);
        
        // Focus on input for immediate typing
        this.adminMessageInput.focus();
        
        // Clear unread notifications
        const chatElement = this.chatList.querySelector(`[data-id="${sessionId}"]`);
        if (chatElement) {
            chatElement.classList.remove('urgent');
            const badge = chatElement.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
                badge.classList.remove('urgent');
            }
        }
        
        // Update chat unread count
        chat.unreadCount = 0;

        // Send admin joined notification
        this.sendCustomerResponse({
            type: 'adminJoined',
            sessionId: sessionId,
            timestamp: new Date().toISOString()
        });
    }

    displayChatHistory(sessionId) {
        const chat = this.activeChats.get(sessionId);
        if (!chat) return;

        this.conversationMessages.innerHTML = '';
        
        // Add system message showing this is a live support session
        this.conversationMessages.innerHTML = `
            <div class="message-item system">
                <div class="message-bubble" style="background: #e8f5e8; color: #2e7d2e; border-left: 4px solid #4CAF50; text-align: center;">
                    ✅ <strong>Live Support Session Active</strong><br>
                    You are now connected with the customer. Type your response below.
                </div>
            </div>
        `;
        
        // Filter out initial system messages and add remaining chat messages
        chat.messages.forEach(message => {
            // Skip the initial "live chat" messages and system response
            if (message.message === "live chat" || 
                message.message.includes("I'll connect you with a live customer support agent")) {
                return;
            }
            this.addMessageToConversation(message);
        });

        // Scroll to bottom
        this.conversationMessages.scrollTop = this.conversationMessages.scrollHeight;
        
        // Add a helpful prompt if no real messages yet (excluding filtered ones)
        const realMessageCount = chat.messages.filter(msg => 
            msg.message !== "live chat" && 
            !msg.message.includes("I'll connect you with a live customer support agent")
        ).length;
        
        if (realMessageCount === 0) {
            this.conversationMessages.innerHTML += `
                <div class="message-item system">
                    <div class="message-bubble" style="background: #fff3cd; color: #856404; border-left: 4px solid #ffc107;">
                        💬 <strong>Start the conversation</strong><br>
                        The customer is waiting for your response. Say hello!
                    </div>
                </div>
            `;
        }
    }

    addMessageToConversation(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-item ${message.sender}`;
        
        const time = new Date(message.timestamp).toLocaleTimeString();
        const statusIcon = message.sender === 'admin' ? '<span class="message-status">⚡</span>' : '';
        
        // Add sender label for clarity
        const senderLabel = message.sender === 'customer' ? 
            '<div class="sender-label">Customer:</div>' : 
            '<div class="sender-label">You:</div>';
        
        messageDiv.innerHTML = `
            <div class="message-bubble">
                ${message.sender === 'customer' ? senderLabel : ''}
                ${message.message}
                <div class="message-time">
                    ${time} ${statusIcon}
                </div>
            </div>
        `;
        
        // Add instant animation with different effects for customer vs admin
        messageDiv.style.opacity = '0';
        if (message.sender === 'customer') {
            messageDiv.style.transform = 'translateX(-20px)';
            messageDiv.style.borderLeft = '3px solid #2196F3';
        } else {
            messageDiv.style.transform = 'translateY(10px)';
        }
        
        this.conversationMessages.appendChild(messageDiv);
        
        // Animate in with specific timing
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateX(0) translateY(0)';
        }, 10);
        
        // Auto-scroll to bottom
        setTimeout(() => {
            this.conversationMessages.scrollTop = this.conversationMessages.scrollHeight;
        }, 50);
        
        return messageDiv; // Return element for status updates
    }

    sendAdminMessage() {
        const message = this.adminMessageInput.value.trim();
        console.log('Sending message:', message, 'Chat ID:', this.currentChatId); // Debug log
        
        if (!message) {
            console.log('No message to send');
            return;
        }
        
        if (!this.currentChatId) {
            console.log('No chat selected');
            alert('Please select a customer chat first');
            return;
        }

        // Show sending indicator
        this.showSendingIndicator();

        // Add message to conversation immediately with sending status
        const adminMessage = {
            sender: 'admin',
            message: message,
            timestamp: new Date().toISOString(),
            sessionId: this.currentChatId,
            status: 'sending'
        };

        console.log('Adding admin message to conversation:', adminMessage);
        const messageElement = this.addMessageToConversation(adminMessage);

        // Add to chat history
        const chat = this.activeChats.get(this.currentChatId);
        if (chat) {
            chat.messages.push(adminMessage);
            console.log('Added to chat history. Total messages:', chat.messages.length);
        }

        // Send to customer with proper format and lightning speed
        console.log('Sending to customer with lightning speed...');
        this.sendCustomerResponse({
            type: 'adminMessage',
            sessionId: this.currentChatId,
            message: message,
            timestamp: new Date().toISOString(),
            isHTML: false
        });

        // Mark message as sent immediately
        setTimeout(() => {
            if (messageElement) {
                messageElement.classList.add('message-sent');
                const statusIcon = messageElement.querySelector('.message-status');
                if (statusIcon) {
                    statusIcon.textContent = '✓✓';
                    statusIcon.style.color = '#4CAF50';
                }
            }
            this.hideSendingIndicator();
        }, 50); // Near-instant feedback

        // Update chat preview in the list
        const chatElement = this.chatList.querySelector(`[data-id="${this.currentChatId}"]`);
        if (chatElement) {
            const previewElement = chatElement.querySelector('.chat-preview');
            const timeElement = chatElement.querySelector('.chat-time');
            if (previewElement) {
                previewElement.textContent = `You: ${message}`;
            }
            if (timeElement) {
                timeElement.textContent = new Date().toLocaleTimeString();
            }
            
            // Add brief highlight to show message was sent
            chatElement.style.animation = 'messageSentFlash 0.3s ease-out';
            setTimeout(() => {
                chatElement.style.animation = '';
            }, 300);
        }

        // Clear input and keep focus
        this.adminMessageInput.value = '';
        this.adminMessageInput.focus();
        
        console.log('Message sent with lightning speed!');
    }
    
    showSendingIndicator() {
        // Add visual feedback that message is being sent
        this.sendMessageBtn.innerHTML = '⚡';
        this.sendMessageBtn.disabled = true;
        this.sendMessageBtn.style.animation = 'spin 0.5s linear infinite';
    }
    
    hideSendingIndicator() {
        // Reset send button
        this.sendMessageBtn.innerHTML = 'Send';
        this.sendMessageBtn.disabled = false;
        this.sendMessageBtn.style.animation = '';
    }

    closeConversation() {
        this.currentChatId = null;
        
        // Clear active chat selection
        const activeChat = this.chatList.querySelector('.active');
        if (activeChat) {
            activeChat.classList.remove('active');
        }
        
        // Show welcome message
        this.showWelcomeMessage();
    }

    setupCustomerMessageHandling() {
        // Check for pending messages in localStorage
        const pendingMessages = JSON.parse(localStorage.getItem('pendingAdminMessages') || '[]');
        pendingMessages.forEach(message => this.receiveCustomerMessage(message));
        localStorage.removeItem('pendingAdminMessages');

        // Make this instance available globally for the chat widget
        window.adminPortal = this;
    }

    receiveCustomerMessage(message) {
        switch (message.type) {
            case 'chatStart':
                this.handleChatStart(message);
                break;
            case 'chatEnd':
                this.handleChatEnd(message);
                break;
            case 'newMessage':
                this.handleNewMessage(message);
                break;
            case 'liveSupport':
                this.handleLiveSupportRequest(message);
                break;
        }
    }

    handleChatStart(message) {
        if (!this.activeChats.has(message.sessionId)) {
            this.addChat(message);
            this.stats.activeChats++;
            this.stats.totalCustomers++;
            this.updateStats(this.stats);
        }
    }

    handleChatEnd(message) {
        const chatElement = this.chatList.querySelector(`[data-id="${message.sessionId}"]`);
        if (chatElement) {
            chatElement.remove();
            this.activeChats.delete(message.sessionId);
            this.stats.activeChats--;
            this.updateStats(this.stats);
        }
    }

    handleLiveSupportRequest(message) {
        // First ensure chat exists
        if (!this.activeChats.has(message.sessionId)) {
            this.handleChatStart(message);
        }

        // Play notification sound
        this.playNotificationSound();
        
        // Show browser notification
        if (Notification.permission === "granted") {
            new Notification("Live Support Request", {
                body: `Customer needs assistance: ${message.message}`,
                icon: "/store.png"
            });
        }
        
        // Find or create chat element
        let chatElement = this.chatList.querySelector(`[data-id="${message.sessionId}"]`);
        if (!chatElement) {
            this.addChat(message);
            chatElement = this.chatList.querySelector(`[data-id="${message.sessionId}"]`);
        }
        
        // Add urgent visual notification
        if (chatElement) {
            chatElement.classList.add('urgent');
            const badge = chatElement.querySelector('.notification-badge');
            if (badge) {
                badge.classList.add('urgent');
                badge.textContent = 'URGENT';
                badge.style.display = 'block';
            }
            
            // Update preview text
            const previewElement = chatElement.querySelector('.chat-preview');
            if (previewElement) {
                previewElement.textContent = `🔴 LIVE SUPPORT NEEDED: ${message.message}`;
            }
            
            // Move to top
            this.chatList.insertBefore(chatElement, this.chatList.firstChild);
        }
        
        // Add to chat messages
        const chat = this.activeChats.get(message.sessionId);
        if (chat) {
            chat.messages.push({
                ...message,
                sender: 'customer',
                message: message.message
            });
        }
    }

    handleNewMessage(message) {
        // Check if this message has already been processed
        let chat = this.activeChats.get(message.sessionId);
        if (!chat) {
            // If chat doesn't exist, create it
            this.handleChatStart(message);
            chat = this.activeChats.get(message.sessionId);
        }

        // Check for duplicate message by comparing timestamp and content
        const isDuplicate = chat.messages.some(existingMsg => 
            existingMsg.timestamp === message.timestamp && 
            existingMsg.message === message.message
        );

        if (isDuplicate) {
            console.log('Duplicate message detected, skipping:', message);
            return;
        }

        // Add message to chat history
        chat.messages.push(message);
        
        // If this is the currently active chat, add message to conversation immediately
        if (this.currentChatId === message.sessionId) {
            console.log('Adding customer message to active conversation');
            this.addMessageToConversation(message);
        }

        // Update chat preview
        const chatElement = this.chatList.querySelector(`[data-id="${message.sessionId}"]`);
        if (chatElement) {
            const previewElement = chatElement.querySelector('.chat-preview');
            const timeElement = chatElement.querySelector('.chat-time');
            if (previewElement) {
                previewElement.textContent = `Customer: ${message.message}`;
            }
            if (timeElement) {
                timeElement.textContent = new Date(message.timestamp).toLocaleTimeString();
            }

            // Update unread count if this isn't the active chat
            if (!chatElement.classList.contains('active')) {
                chat.unreadCount++;
                const badge = chatElement.querySelector('.notification-badge');
                if (badge) {
                    badge.style.display = 'block';
                    badge.textContent = chat.unreadCount;
                }
                
                // Play notification sound for new message
                this.playNotificationSound();
            } else {
                // If it's the active chat, still play a softer notification
                this.playSoftNotification();
            }

            // Move chat to top of list
            this.chatList.insertBefore(chatElement, this.chatList.firstChild);
        }
    }
    
    playSoftNotification() {
        // Softer notification for active chat messages
        try {
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = context.createOscillator();
            const gainNode = context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(context.destination);
            
            oscillator.frequency.setValueAtTime(600, context.currentTime);
            gainNode.gain.setValueAtTime(0.1, context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.1);
            
            oscillator.start(context.currentTime);
            oscillator.stop(context.currentTime + 0.1);
        } catch (e) {
            console.log('Could not play soft notification');
        }
    }

    sendCustomerResponse(response) {
        console.log('Sending response to customer:', response);
        
        try {
            // Method 1: Direct reference (if chatbot is in same window)
            if (window.goldenHuntChatbot) {
                window.goldenHuntChatbot.handleAdminResponse(response);
            }
            
            // Method 2: BroadcastChannel for instant cross-tab communication
            if (this.broadcastChannel) {
                this.broadcastChannel.postMessage({
                    type: 'adminResponse',
                    data: response
                });
            }
            
            // Method 3: Custom event for same-window communication
            window.dispatchEvent(new CustomEvent('customerResponseReceived', { detail: response }));
            
            // Method 4: localStorage with instant notification (fallback)
            localStorage.setItem('adminResponse', JSON.stringify(response));
            
            // Method 5: Multiple localStorage writes to ensure detection
            setTimeout(() => {
                localStorage.setItem('adminResponse', JSON.stringify(response));
                localStorage.removeItem('adminResponse');
            }, 10);
            
            console.log('Response sent via all channels');
        } catch (error) {
            this.handleError(error);
        }
    }

    startHeartbeat() {
        // Start heartbeat to check connection status
        this.heartbeatInterval = setInterval(() => {
            this.checkConnection();
        }, 30000); // Check every 30 seconds
    }

    checkConnection() {
        // In a real implementation, this would ping the server
        // For demo, we'll simulate occasional disconnections
        if (Math.random() > 0.95) {
            this.handleConnectionLoss();
        }
    }

    handleConnectionLoss() {
        if (this.isConnected) {
            this.isConnected = false;
            this.showConnectionStatus('Disconnected', 'error');
            this.attemptReconnection();
        }
    }

    attemptReconnection() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            this.showConnectionStatus('Connection failed', 'error');
            return;
        }

        this.reconnectAttempts++;
        this.showConnectionStatus(`Reconnecting... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`, 'warning');

        setTimeout(() => {
            // Simulate reconnection
            if (Math.random() > 0.3) {
                this.handleReconnection();
            } else {
                this.attemptReconnection();
            }
        }, 2000 * this.reconnectAttempts); // Exponential backoff
    }

    handleReconnection() {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.showConnectionStatus('Connected', 'success');
        
        // Refresh data after reconnection
        this.refreshData();
    }

    showConnectionStatus(message, type) {
        // Create or update connection status indicator
        let statusElement = document.getElementById('connectionStatus');
        if (!statusElement) {
            statusElement = document.createElement('div');
            statusElement.id = 'connectionStatus';
            statusElement.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                padding: 10px 15px;
                border-radius: 5px;
                color: white;
                font-weight: bold;
                z-index: 10000;
                transition: all 0.3s ease;
            `;
            document.body.appendChild(statusElement);
        }

        statusElement.textContent = message;
        
        // Set color based on type
        switch (type) {
            case 'success':
                statusElement.style.backgroundColor = '#4CAF50';
                setTimeout(() => statusElement.remove(), 3000);
                break;
            case 'warning':
                statusElement.style.backgroundColor = '#FF9800';
                break;
            case 'error':
                statusElement.style.backgroundColor = '#F44336';
                break;
        }
    }

    refreshData() {
        // Check for any pending messages that might have been missed
        const pendingMessages = JSON.parse(localStorage.getItem('pendingAdminMessages') || '[]');
        pendingMessages.forEach(message => this.receiveCustomerMessage(message));
        localStorage.removeItem('pendingAdminMessages');
    }

    handleError(error) {
        console.error('Admin Portal Error:', error);
        this.showConnectionStatus('Error occurred', 'error');
    }

    // Note: sendCustomerResponse method is defined above with enhanced real-time capabilities

    simulateIncomingMessages() {
        // Completely disabled - only real customer messages will appear
        // This ensures no fake/duplicate data is generated
    }
}

// Initialize Admin Portal when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.adminPortal = new AdminPortal();
});