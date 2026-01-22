// TaskFlow Pro - Main JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileToggle.innerHTML = mobileMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
    
    // Feature Tabs (for task5.html)
    const featureTabs = document.querySelectorAll('.feature-tab');
    if (featureTabs.length > 0) {
        featureTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                featureTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all feature contents
                const featureContents = document.querySelectorAll('.feature-content');
                featureContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Show selected feature content
                const tabId = this.getAttribute('data-tab');
                const selectedContent = document.getElementById(`${tabId}Content`);
                if (selectedContent) {
                    selectedContent.classList.add('active');
                }
            });
        });
    }
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Animate stats counters
                if (entry.target.classList.contains('stat-number')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
    
    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number:not(.profile-stat .stat-number)');
    statNumbers.forEach(number => {
        observer.observe(number);
    });
    
    // Task card hover effects
    const taskCards = document.querySelectorAll('.task-card');
    taskCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Form validation for contact forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (!form.id || !form.id.includes('Task') && !form.id.includes('profile') && !form.id.includes('password')) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                // Basic validation
                const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
                let valid = true;
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        valid = false;
                        input.style.borderColor = 'var(--danger)';
                    } else {
                        input.style.borderColor = '';
                    }
                });
                
                if (valid) {
                    // In a real app, you would submit the form here
                    console.log('Form submitted successfully');
                    
                    // Show success message
                    showNotification('Form submitted successfully!', 'success');
                    
                    this.reset();
                } else {
                    showNotification('Please fill in all required fields.', 'error');
                }
            });
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Counter animation for stats
    function animateCounter(element) {
        if (element.dataset.animated) return;
        
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        if (isNaN(target)) return;
        
        element.dataset.animated = 'true';
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current).toLocaleString() + (element.textContent.includes('%') ? '%' : '');
        }, 30);
    }
    
    // Theme toggle (dark mode)
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 100;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').className = 'fas fa-sun';
    }
    
    // Add dark mode styles dynamically
    const darkModeStyles = `
        <style>
            body.dark-mode {
                --dark: #e0e0e0;
                --gray-900: #f8f9fa;
                --gray-800: #e9ecef;
                --gray-700: #dee2e6;
                --gray-600: #ced4da;
                --gray-500: #adb5bd;
                --gray-400: #6c757d;
                --gray-300: #495057;
                --gray-200: #343a40;
                --gray-100: #212529;
                --white: #121212;
                background-color: var(--white);
                color: var(--dark);
            }
            
            body.dark-mode .navbar {
                background-color: rgba(18, 18, 18, 0.95);
                border-bottom: 1px solid var(--gray-300);
            }
            
            body.dark-mode .feature-card,
            body.dark-mode .dashboard-preview,
            body.dark-mode .ai-dashboard-preview,
            body.dark-mode .tasks-sidebar,
            body.dark-mode .sidebar,
            body.dark-mode .profile-card,
            body.dark-mode .dashboard-card,
            body.dark-mode .stat-card,
            body.dark-mode .modal-content,
            body.dark-mode .testimonial-card,
            body.dark-mode .workflow-preview,
            body.dark-mode .analytics-preview {
                background-color: var(--gray-100);
                border-color: var(--gray-300);
                color: var(--dark);
            }
            
            body.dark-mode .hero {
                background: linear-gradient(135deg, var(--gray-100) 0%, var(--white) 100%);
            }
            
            body.dark-mode .footer {
                background-color: var(--gray-100);
            }
            
            body.dark-mode p,
            body.dark-mode .stat-label,
            body.dark-mode .task-info p,
            body.dark-mode .feature-description,
            body.dark-mode .section-subtitle,
            body.dark-mode .hero-subtitle,
            body.dark-mode .dashboard-subtitle,
            body.dark-mode .preference-info p,
            body.dark-mode .footer-description,
            body.dark-mode .footer-link,
            body.dark-mode .copyright {
                color: var(--gray-600);
            }
            
            body.dark-mode .comparison-table td {
                border-color: var(--gray-300);
            }
            
            body.dark-mode .comparison-table tr:hover {
                background-color: var(--gray-200);
            }
            
            body.dark-mode .search-box input,
            body.dark-mode .sort-select,
            body.dark-mode .filter-select,
            body.dark-mode .form-group input,
            body.dark-mode .form-group select,
            body.dark-mode .form-group textarea {
                background-color: var(--gray-200);
                border-color: var(--gray-400);
                color: var(--dark);
            }
            
            body.dark-mode .btn-text {
                color: var(--gray-600);
            }
            
            body.dark-mode .btn-text:hover {
                color: var(--primary);
            }
            
            body.dark-mode .tasks-content,
            body.dark-mode .tasks-table,
            body.dark-mode .board-column,
            body.dark-mode .calendar-day {
                background-color: var(--gray-100);
            }
            
            body.dark-mode .table-header {
                background-color: var(--gray-200);
            }
            
            body.dark-mode .task-row:hover {
                background-color: var(--gray-200);
            }
            
            body.dark-mode .priority-task,
            body.dark-mode .deadline-item,
            body.dark-mode .session-item,
            body.dark-mode .preference-item,
            body.dark-mode .activity-item {
                background-color: var(--gray-200);
            }
            
            body.dark-mode .priority-task:hover,
            body.dark-mode .deadline-item:hover {
                background-color: var(--gray-300);
            }
            
            body.dark-mode .ai-conversation,
            body.dark-mode .ai-suggestion-btn {
                background-color: var(--gray-200);
            }
            
            body.dark-mode .message-content p {
                background-color: var(--gray-100);
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', darkModeStyles);
    
    // Initialize any tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            tooltip.style.cssText = `
                position: absolute;
                background-color: var(--dark);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 0.8rem;
                z-index: 1000;
                white-space: nowrap;
                transform: translateY(-100%);
                margin-top: -10px;
            `;
            
            this.appendChild(tooltip);
            
            // Position tooltip
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.width/2 - tooltip.offsetWidth/2}px`;
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.id = 'pageLoader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.3s ease;
    `;
    
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div style="margin-top: 20px; font-weight: 600; color: var(--primary);">Loading TaskFlow Pro...</div>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    // Add spinner styles
    const spinnerStyles = `
        <style>
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid var(--gray-300);
                border-top-color: var(--primary);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', spinnerStyles);
    
    // Remove loader after page loads
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }, 500);
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobileMenu');
            const mobileToggle = document.getElementById('mobileToggle');
            if (mobileMenu && mobileToggle) {
                mobileMenu.classList.remove('active');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }, 250);
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--danger)' : 'var(--primary)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 350px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Export utility functions for use in other scripts
window.TaskFlowUtils = {
    showNotification: showNotification,
    
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    },
    
    formatTime: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit'
        });
    },
    
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Initialize any chart.js charts if available
window.initCharts = function() {
    const chartElements = document.querySelectorAll('canvas');
    chartElements.forEach(canvas => {
        if (!canvas.chart) {
            const ctx = canvas.getContext('2d');
            const chartType = canvas.dataset.chartType || 'line';
            
            // Default chart configuration
            const config = {
                type: chartType,
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Tasks Completed',
                        data: [12, 19, 8, 15, 22, 10, 18],
                        borderColor: 'var(--primary)',
                        backgroundColor: 'rgba(67, 97, 238, 0.1)',
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)'
                            }
                        },
                        x: {
                            grid: {
                                display: false
                            }
                        }
                    }
                }
            };
            
            canvas.chart = new Chart(ctx, config);
        }
    });
};

// Call initCharts on pages with charts
if (document.querySelector('canvas')) {
    document.addEventListener('DOMContentLoaded', initCharts);
}
