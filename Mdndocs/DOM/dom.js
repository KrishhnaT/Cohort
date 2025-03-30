/**
 * DOM CONCEPTS IN JAVASCRIPT
 * =========================
 * A comprehensive guide to working with the Document Object Model
 */

// ===================================================
// 1. ACCESSING DOM ELEMENTS
// ===================================================

// Get element by ID (returns a single element)
const headerElement = document.getElementById('header');

// Get elements by class name (returns HTMLCollection - array-like object)
const paragraphs = document.getElementsByClassName('paragraph');

// Get elements by tag name (returns HTMLCollection)
const allDivs = document.getElementsByTagName('div');

// Query selector (returns first matching element)
const firstButton = document.querySelector('.btn');

// Query selector all (returns NodeList - array-like object)
const allButtons = document.querySelectorAll('.btn');

// Accessing forms and form elements
const mainForm = document.forms['mainForm'];
const emailInput = mainForm.elements['email'];

// ===================================================
// 2. TRAVERSING THE DOM
// ===================================================

// Parent relationships
const parent = headerElement.parentNode; // or parentElement
const grandParent = headerElement.parentNode.parentNode;

// Child relationships
const children = headerElement.childNodes; // includes text nodes, comments, etc.
const elementChildren = headerElement.children; // only element nodes
const firstChild = headerElement.firstChild; // might be a text node
const firstElementChild = headerElement.firstElementChild;
const lastElementChild = headerElement.lastElementChild;

// Sibling relationships
const nextSibling = headerElement.nextSibling; // might be a text node
const nextElementSibling = headerElement.nextElementSibling;
const previousSibling = headerElement.previousSibling;
const previousElementSibling = headerElement.previousElementSibling;

// ===================================================
// 3. MANIPULATING DOM ELEMENTS
// ===================================================

// Creating new elements
const newDiv = document.createElement('div');
const textNode = document.createTextNode('Hello World');
const commentNode = document.createComment('This is a comment');

// Adding elements to the DOM
newDiv.appendChild(textNode); // Adds as last child
document.body.appendChild(newDiv);

// Insert before a specific element
const referenceElement = document.getElementById('reference');
document.body.insertBefore(newDiv, referenceElement);

// Modern insertion methods
referenceElement.after(newDiv); // Insert after
referenceElement.before(newDiv); // Insert before
referenceElement.append(newDiv, textNode); // Can append multiple nodes
referenceElement.prepend(newDiv); // Insert as first child

// Replacing nodes
const oldElement = document.getElementById('old');
const newElement = document.createElement('p');
newElement.textContent = 'Replacement text';
oldElement.parentNode.replaceChild(newElement, oldElement);

// Modern replacement
oldElement.replaceWith(newElement);

// Removing elements
const elementToRemove = document.getElementById('remove');
elementToRemove.parentNode.removeChild(elementToRemove);

// Modern removal
elementToRemove.remove();

// Cloning nodes
const original = document.getElementById('original');
const clone = original.cloneNode(); // Shallow clone (just the element)
const deepClone = original.cloneNode(true); // Deep clone (element and all descendants)

// ===================================================
// 4. MODIFYING ELEMENT CONTENT AND ATTRIBUTES
// ===================================================

// Changing text content
headerElement.textContent = 'New Header Text'; // Text only
headerElement.innerHTML = '<span>HTML Content</span>'; // HTML content (security risk with user input)
headerElement.innerText = 'Visible Text'; // Only visible text (respects CSS)
headerElement.outerHTML = '<h2>Replaces the entire element</h2>'; // Replaces the element itself

// Working with attributes
headerElement.setAttribute('class', 'highlight');
const classValue = headerElement.getAttribute('class');
const hasAttribute = headerElement.hasAttribute('id');
headerElement.removeAttribute('style');

// Direct attribute access (for standard attributes)
headerElement.id = 'newId';
headerElement.className = 'new-class another-class';
headerElement.href = 'https://example.com'; // For anchor tags

// Data attributes
headerElement.dataset.customValue = '123'; // Sets data-custom-value="123"
const dataValue = headerElement.dataset.customValue; // Gets value of data-custom-value

// ===================================================
// 5. WORKING WITH CSS AND STYLES
// ===================================================

// Inline styles
headerElement.style.color = 'blue';
headerElement.style.fontSize = '24px'; // camelCase for CSS properties
headerElement.style.display = 'flex';

// Getting computed styles
const computedStyle = window.getComputedStyle(headerElement);
const fontSize = computedStyle.fontSize;

// CSS classes
headerElement.className = 'header highlighted'; // Replaces all classes

// Modern class manipulation
headerElement.classList.add('active');
headerElement.classList.remove('highlighted');
headerElement.classList.toggle('visible'); // Adds if absent, removes if present
headerElement.classList.replace('old-class', 'new-class');
const hasClass = headerElement.classList.contains('active');

// ===================================================
// 6. EVENT HANDLING
// ===================================================

// Basic event handling
function clickHandler(event) {
  console.log('Button clicked!', event.target);
}
const button = document.getElementById('myButton');
button.onclick = clickHandler; // Only one handler can be assigned this way

// Modern event handling (preferred)
button.addEventListener('click', clickHandler);
button.addEventListener('click', function(event) {
  // Another handler for the same event
  event.stopPropagation(); // Stops event bubbling up
});

// Removing event listeners
button.removeEventListener('click', clickHandler);

// Event delegation (handling events for multiple elements)
document.getElementById('parent-container').addEventListener('click', function(event) {
  if (event.target.matches('.child-button')) {
    console.log('Child button clicked:', event.target);
  }
});

// Common events
/*
  - click: Mouse click
  - dblclick: Double click
  - mousedown/mouseup: Mouse button pressed/released
  - mouseover/mouseout: Mouse enters/leaves element
  - mousemove: Mouse moves over element
  - keydown/keyup/keypress: Keyboard key pressed/released
  - focus/blur: Element gains/loses focus
  - input/change: Form input values change
  - submit: Form submission
  - load: Resource and dependencies loaded
  - DOMContentLoaded: HTML document loaded and parsed
  - resize: Window resized
  - scroll: Element or document scrolled
*/

// Creating and dispatching custom events
const customEvent = new CustomEvent('userAction', {
  detail: { userId: 123 },
  bubbles: true,
  cancelable: true
});
button.dispatchEvent(customEvent);

// ===================================================
// 7. FORMS AND FORM VALIDATION
// ===================================================

const form = document.getElementById('signup-form');
const usernameInput = form.elements.username;

// Form submission
form.addEventListener('submit', function(event) {
  if (!usernameInput.value.trim()) {
    event.preventDefault(); // Prevent form submission
    showError(usernameInput, 'Username is required');
  }
});

// Form validation
usernameInput.addEventListener('input', function(event) {
  if (usernameInput.validity.tooShort) {
    usernameInput.setCustomValidity('Username must be at least 3 characters');
  } else {
    usernameInput.setCustomValidity('');
  }
});

// Form reset
form.reset();

// Helper function for form validation
function showError(input, message) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  input.parentNode.appendChild(errorElement);
  input.classList.add('error');
}

// ===================================================
// 8. DOM DIMENSIONS AND POSITION
// ===================================================

// Element size and position
const rect = headerElement.getBoundingClientRect();
console.log('Element dimensions:', {
  top: rect.top, // Distance from viewport top
  left: rect.left, // Distance from viewport left
  width: rect.width,
  height: rect.height,
  bottom: rect.bottom, // Distance from viewport top to element bottom
  right: rect.right // Distance from viewport left to element right
});

// Element dimensions (without position)
const width = headerElement.offsetWidth; // Includes padding and border
const height = headerElement.offsetHeight;
const innerWidth = headerElement.clientWidth; // Without border
const innerHeight = headerElement.clientHeight;

// Scroll position and dimensions
const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
const scrollHeight = document.documentElement.scrollHeight;
const clientHeight = document.documentElement.clientHeight;

// Setting scroll position
window.scrollTo(0, 100); // Scroll to position
window.scrollTo({
  top: 100,
  left: 0,
  behavior: 'smooth' // Smooth scrolling
});

headerElement.scrollIntoView(); // Scroll element into view
headerElement.scrollIntoView({behavior: 'smooth', block: 'center'});

// ===================================================
// 9. DYNAMIC DOCUMENT MANIPULATION
// ===================================================

// Creating an element with attributes and content
function createCustomElement(tag, attributes = {}, content = '') {
  const element = document.createElement(tag);
  
  // Set attributes
  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }
  
  // Set content
  if (content) {
    element.textContent = content;
  }
  
  return element;
}

// Usage
const card = createCustomElement('div', { class: 'card', id: 'user-card' });
const cardTitle = createCustomElement('h3', { class: 'card-title' }, 'User Profile');
const cardBody = createCustomElement('div', { class: 'card-body' });
const description = createCustomElement('p', {}, 'This is a user profile card.');

// Build the DOM tree
cardBody.appendChild(description);
card.appendChild(cardTitle);
card.appendChild(cardBody);
document.body.appendChild(card);

// Using DocumentFragment for batch insertions (better performance)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 10; i++) {
  const listItem = document.createElement('li');
  listItem.textContent = `Item ${i + 1}`;
  fragment.appendChild(listItem);
}
document.getElementById('my-list').appendChild(fragment);

// ===================================================
// 10. ADVANCED DOM FEATURES
// ===================================================

// DOM mutations observer
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log('DOM changed:', mutation.type, mutation.target);
  });
});

// Start observing
observer.observe(document.body, {
  childList: true, // Watch for changes to child elements
  attributes: true, // Watch for attribute changes
  characterData: true, // Watch for text content changes
  subtree: true // Watch all descendants too
});

// Stop observing
// observer.disconnect();

// Intersection Observer (detect when element is visible)
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is now visible!', entry.target);
      // Load images, trigger animations, etc.
    }
  });
}, {
  threshold: 0.1 // Fire when at least 10% visible
});

intersectionObserver.observe(document.getElementById('lazy-section'));

// ResizeObserver (detect element resize)
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    console.log('Element resized:', entry.target);
    console.log('New dimensions:', entry.contentRect);
  }
});

resizeObserver.observe(document.getElementById('responsive-element'));