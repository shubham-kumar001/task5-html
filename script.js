// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const mobileToggle = document.getElementById('mobile-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const addTaskBtn = document.getElementById('add-task-btn');
const addTaskModal = document.getElementById('add-task-modal');
const modalCloseBtns = document.querySelectorAll('.modal-close');
const filterTabs = document.querySelectorAll('.filter-tab');
const taskCards = document.querySelectorAll('.task-card');
const newTaskForm = document.getElementById('new-task-form');
const budgetRange = document.getElementById('budgetRange');
const budgetValue = document.getElementById('budgetValue');
const profileMenuLinks = document.querySelectorAll('.profile-menu-link');
const profileSections = document.querySelectorAll('.profile-section');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initTheme();
    initMobileMenu();
    initModals();
    initTaskFilters();
    initProfileTabs();
    loadProperties();
    updateBudgetValue();
    
    // Add event listeners
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (budgetRange) budgetRange.addEventListener('input', updateBudgetValue);
    if (newTaskForm) newTaskForm.addEventListener('submit', handleNewTask);
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    const theme = isDark ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Mobile Menu
function initMobileMenu() {
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Modals
function initModals() {
    // Add Task Modal
    if (addTaskBtn && addTaskModal) {
        addTaskBtn.addEventListener('click', () => {
            addTaskModal.classList.add('active');
        });
    }
    
    // Close modal buttons
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) modal.classList.remove('active');
        });
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
        }
    });
}

// Task Filters
function initTaskFilters() {
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter tasks
            const filter = tab.dataset.filter;
            filterTasks(filter);
        });
    });
}

function filterTasks(filter) {
    taskCards.forEach(card => {
        if (filter === 'all') {
            card.style.display = 'flex';
        } else if (filter === 'completed') {
            const isCompleted = card.dataset.status === 'completed';
            card.style.display = isCompleted ? 'flex' : 'none';
        } else {
            const matchesFilter = card.dataset[filter] !== undefined;
            card.style.display = matchesFilter ? 'flex' : 'none';
        }
    });
}

// Profile Tabs
function initProfileTabs() {
    profileMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active link
            profileMenuLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show corresponding section
            const targetId = link.getAttribute('href').substring(1) + '-tab';
            profileSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// Property Data
const properties = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '$2,500,000',
        title: 'Modern Luxury Villa',
        location: 'Beverly Hills, CA',
        beds: 4,
        baths: 5,
        sqft: '4,500'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '$3,800,000',
        title: 'Penthouse with City View',
        location: 'Manhattan, NY',
        beds: 3,
        baths: 3,
        sqft: '3,200'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '$1,200,000',
        title: 'Waterfront Contemporary Home',
        location: 'Miami, FL',
        beds: 4,
        baths: 3,
        sqft: '3,800'
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '$850,000',
        title: 'Modern Apartment',
        location: 'Chicago, IL',
        beds: 2,
        baths: 2,
        sqft: '1,800'
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '$1,500,000',
        title: 'Suburban Family Home',
        location: 'Austin, TX',
        beds: 5,
        baths: 4,
        sqft: '4,200'
    },
    {
        id: 6,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        price: '$5,200,000',
        title: 'Luxury Mountain Retreat',
        location: 'Aspen, CO',
        beds: 6,
        baths: 7,
        sqft: '8,500'
    }
];

// Load Properties
function loadProperties() {
    const propertiesGrid = document.querySelector('.properties-grid');
    if (!propertiesGrid) return;
    
    propertiesGrid.innerHTML = properties.map(property => `
        <div class="property-card">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-overlay">
                    <button class="btn-wishlist"><i class="far fa-heart"></i></button>
                </div>
            </div>
            <div class="property-content">
                <div class="property-price">${property.price}</div>
                <h3 class="property-title">${property.title}</h3>
                <div class="property-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${property.location}</span>
                </div>
                <div class="property-features">
                    <div class="property-feature">
                        <span class="feature-value">${property.beds}</span>
                        <span class="feature-label">Beds</span>
                    </div>
                    <div class="property-feature">
                        <span class="feature-value">${property.baths}</span>
                        <span class="feature-label">Baths</span>
                    </div>
                    <div class="property-feature">
                        <span class="feature-value">${property.sqft}</span>
                        <span class="feature-label">Sq Ft</span>
                    </div>
                </div>
                <div class="property-actions">
                    <button class="btn btn-primary btn-block">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Budget Range
function updateBudgetValue() {
    if (!budgetRange || !budgetValue) return;
    
    const value = parseInt(budgetRange.value);
    if (value >= 1000000) {
        budgetValue.textContent = `$${(value / 1000000).toFixed(1)}M`;
    } else {
        budgetValue.textContent = `$${(value / 1000).toFixed(0)}k`;
    }
}

// New Task Handler
function handleNewTask(e) {
    e.preventDefault();
    
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const dueDate = document.getElementById('task-due-date').value;
    const priority = document.getElementById('task-priority').value;
    const category = document.getElementById('task-category').value;
    
    // Create new task card
    const taskId = Date.now();
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.status = 'pending';
    taskCard.dataset.priority = priority;
    taskCard.innerHTML = `
        <div class="task-checkbox">
            <input type="checkbox" id="task${taskId}">
            <label for="task${taskId}"></label>
        </div>
        
        <div class="task-content">
            <div class="task-header">
                <h3>${title}</h3>
                <span class="task-priority ${priority}">${priority.charAt(0).toUpperCase() + priority.slice(1)} Priority</span>
            </div>
            <p class="task-description">${description}</p>
            
            <div class="task-meta">
                <span class="task-date">
                    <i class="far fa-calendar"></i> Due: ${new Date(dueDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span class="task-category">
                    <i class="fas fa-${getCategoryIcon(category)}"></i> ${getCategoryLabel(category)}
                </span>
                <span class="task-assigned">
                    <i class="fas fa-user"></i> Assigned to: You
                </span>
            </div>
            
            <div class="task-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 0%;"></div>
                </div>
                <span>0% complete</span>
            </div>
        </div>
        
        <div class="task-actions">
            <button class="task-action-btn" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="task-action-btn" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
            <button class="task-action-btn" title="View Details">
                <i class="fas fa-external-link-alt"></i>
            </button>
        </div>
    `;
    
    // Add to tasks list
    const tasksList = document.querySelector('.tasks-list');
    if (tasksList) {
        tasksList.prepend(taskCard);
    }
    
    // Close modal and reset form
    addTaskModal.classList.remove('active');
    e.target.reset();
    
    // Show notification
    showNotification('Task added successfully!', 'success');
}

function getCategoryIcon(category) {
    const icons = {
        'viewing': 'home',
        'documentation': 'file-contract',
        'financial': 'money-check-alt',
        'legal': 'gavel',
        'planning': 'paint-roller'
    };
    return icons[category] || 'tasks';
}

function getCategoryLabel(category) {
    const labels = {
        'viewing': 'Property Viewing',
        'documentation': 'Documentation',
        'financial': 'Financial',
        'legal': 'Legal',
        'planning': 'Planning'
    };
    return labels[category] || 'General';
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles for notification
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                border-radius: var(--border-radius);
                padding: 1rem 1.5rem;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
                z-index: 10000;
                animation: slideIn 0.3s ease;
                max-width: 400px;
            }
            .dark-mode .notification {
                background-color: var(--gray-light);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }
            .notification-success {
                border-left: 4px solid var(--success-color);
            }
            .notification-error {
                border-left: 4px solid var(--danger-color);
            }
            .notification-warning {
                border-left: 4px solid var(--warning-color);
            }
            .notification-info {
                border-left: 4px solid var(--primary-color);
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.25rem;
                color: var(--gray-dark);
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: var(--transition);
            }
            .notification-close:hover {
                background-color: var(--gray-light);
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

// Search functionality
function initSearch() {
    const searchInput = document.querySelector('.search-input input');
    if (searchInput) {
        searchInput.addEventListener('keyup', debounce(function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filterProperties(searchTerm);
        }, 300));
    }
}

function filterProperties(searchTerm) {
    const propertyCards = document.querySelectorAll('.property-card');
    
    propertyCards.forEach(card => {
        const title = card.querySelector('.property-title').textContent.toLowerCase();
        const location = card.querySelector('.property-location span').textContent.toLowerCase();
        const price = card.querySelector('.property-price').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || location.includes(searchTerm) || price.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Utility: Debounce function
function debounce(func, wait) {
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

// Initialize search on home page
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
    initSearch();
}

// Task completion tracking
document.addEventListener('change', function(e) {
    if (e.target.matches('.task-checkbox input[type="checkbox"]')) {
        const taskCard = e.target.closest('.task-card');
        const progressFill = taskCard.querySelector('.progress-fill');
        const progressText = taskCard.querySelector('.task-progress span');
        
        if (e.target.checked) {
            taskCard.dataset.status = 'completed';
            progressFill.style.width = '100%';
            progressText.textContent = '100% complete';
            
            // Add completion animation
            taskCard.style.opacity = '0.7';
            
            // Show notification
            const taskTitle = taskCard.querySelector('.task-header h3').textContent;
            showNotification(`Task "${taskTitle.substring(0, 30)}..." completed!`, 'success');
        } else {
            taskCard.dataset.status = 'pending';
            progressFill.style.width = '0%';
            progressText.textContent = '0% complete';
            taskCard.style.opacity = '1';
        }
    }
});

// Form validation
document.addEventListener('input', function(e) {
    if (e.target.matches('input[required], textarea[required], select[required]')) {
        validateField(e.target);
    }
});

function validateField(field) {
    const value = field.value.trim();
    const isValid = value.length > 0;
    
    if (!isValid) {
        field.style.borderColor = 'var(--danger-color)';
    } else {
        field.style.borderColor = 'var(--gray-medium)';
    }
    
    return isValid;
}
