document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const keywordsInput = document.getElementById('keywords');
    const categorySelect = document.getElementById('category');
    const generateBtn = document.getElementById('generateBtn');
    const loadingElement = document.getElementById('loading');
    const resultsArea = document.getElementById('resultsArea');
    const nameGrid = document.getElementById('nameGrid');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const copyToast = document.getElementById('copyToast');
    const visualization = document.getElementById('visualization');
    const totalNamesElement = document.getElementById('totalNames');
    const avgLengthElement = document.getElementById('avgLength');
    const categoryLabelElement = document.getElementById('categoryLabel');
    
    // Event Listeners
    generateBtn.addEventListener('click', generateNames);
    copyAllBtn.addEventListener('click', copyAllNames);
    keywordsInput.addEventListener('input', validateInput);
    categorySelect.addEventListener('change', updateCategoryLabel);
    
    // Initial validation
    validateInput();
    updateCategoryLabel();
    
    // Validate input field
    function validateInput() {
        const keywordsValue = keywordsInput.value.trim();
        generateBtn.disabled = keywordsValue === '';
    }
    
    // Update category label
    function updateCategoryLabel() {
        const categoryValue = categorySelect.value;
        const categoryText = categoryValue ? 
            categorySelect.options[categorySelect.selectedIndex].text : 
            'General';
        categoryLabelElement.textContent = categoryText;
    }
    
    // Generate names based on keywords and category
    function generateNames() {
        const keywordsValue = keywordsInput.value.trim();
        const categoryValue = categorySelect.value;
        
        if (!keywordsValue) return;
        
        // Show loading indicator
        loadingElement.style.display = 'block';
        resultsArea.style.display = 'none';
        visualization.style.display = 'none';
        
        // Split keywords by spaces or commas
        const keywordList = keywordsValue
            .split(/[,\s]+/)
            .filter(word => word.trim() !== '')
            .map(word => word.trim().toLowerCase());
        
        if (keywordList.length === 0) {
            loadingElement.style.display = 'none';
            return;
        }
        
        // Simulate processing time
        setTimeout(() => {
            // Generate names based on keywords and category
            const names = generateNamesList(keywordList, categoryValue);
            
            // Calculate stats
            totalNamesElement.textContent = names.length;
            const totalLength = names.reduce((sum, name) => sum + name.length, 0);
            avgLengthElement.textContent = (totalLength / names.length).toFixed(1);
            
            // Hide loading and show results
            loadingElement.style.display = 'none';
            displayResults(names);
            
            // Show visualization
            visualization.style.display = 'block';
        }, 1500);
    }
    
    // Generate a list of names based on keywords and category
    function generateNamesList(keywordList, category) {
        const names = [];
        const prefixes = ['Neo', 'Evo', 'Zen', 'Aura', 'Lumi', 'Eco', 'Vibe', 'Pulse', 'Nova', 'Meta'];
        const suffixes = ['ify', 'ly', 'io', 'ium', 'ize', 'era', 'ology', 'scape', 'wave', 'sync'];
        
        for (let i = 0; i < 12; i++) {
            let name = '';
            
            // Apply category-specific modifications
            if (category === 'tech') {
                // Tech names tend to be shorter, modern
                const randomKeyword = keywordList[Math.floor(Math.random() * keywordList.length)];
                const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                
                if (Math.random() > 0.5) {
                    name = prefix + randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1, 4);
                } else {
                    name = randomKeyword.slice(0, 4) + suffixes[Math.floor(Math.random() * suffixes.length)];
                }
            } else if (category === 'nature') {
                // Nature names often combine natural elements
                const natureElements = ['Leaf', 'River', 'Sky', 'Earth', 'Wind', 'Sun', 'Moon', 'Star'];
                const randomKeyword = keywordList[Math.floor(Math.random() * keywordList.length)];
                const natureElement = natureElements[Math.floor(Math.random() * natureElements.length)];
                
                if (Math.random() > 0.5) {
                    name = natureElement + randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1, 4);
                } else {
                    name = randomKeyword.slice(0, 4) + natureElement.toLowerCase();
                }
            } else if (category === 'fantasy') {
                // Fantasy names tend to be more whimsical
                const fantasyPrefixes = ['Elv', 'Myth', 'Fae', 'Glimm', 'Whisp', 'Dream', 'Myst'];
                const fantasySuffixes = ['aria', 'oria', 'wyn', 'eth', 'ora', 'aran', 'ith'];
                
                const randomKeyword = keywordList[Math.floor(Math.random() * keywordList.length)];
                const prefix = fantasyPrefixes[Math.floor(Math.random() * fantasyPrefixes.length)];
                const suffix = fantasySuffixes[Math.floor(Math.random() * fantasySuffixes.length)];
                
                name = prefix + randomKeyword.slice(0, 3) + suffix;
            } else {
                // Default naming strategy for all categories or when none selected
                // Randomly select word combination strategy
                const strategy = Math.floor(Math.random() * 4);
                
                if (strategy === 0 && keywordList.length >= 2) {
                    // Combine parts of two keywords
                    const keyword1 = keywordList[Math.floor(Math.random() * keywordList.length)];
                    const keyword2 = keywordList[Math.floor(Math.random() * keywordList.length)];
                    name = keyword1.slice(0, 4) + keyword2.slice(-3);
                } else if (strategy === 1) {
                    // Use prefix + keyword
                    const randomKeyword = keywordList[Math.floor(Math.random() * keywordList.length)];
                    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
                    name = prefix + randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1);
                } else if (strategy === 2) {
                    // Use keyword + suffix
                    const randomKeyword = keywordList[Math.floor(Math.random() * keywordList.length)];
                    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
                    name = randomKeyword.charAt(0).toUpperCase() + randomKeyword.slice(1) + suffix;
                } else {
                    // Mix letters from multiple keywords
                    if (keywordList.length >= 2) {
                        const keyword1 = keywordList[Math.floor(Math.random() * keywordList.length)];
                        const keyword2 = keywordList[Math.floor(Math.random() * keywordList.length)];
                        name = keyword1.slice(0, 3) + keyword2.slice(0, 3);
                    } else {
                        const keyword = keywordList[0];
                        name = keyword.charAt(0).toUpperCase() + keyword.slice(1);
                        name += suffixes[Math.floor(Math.random() * suffixes.length)];
                    }
                }
            }
            
            // Capitalize first letter
            name = name.charAt(0).toUpperCase() + name.slice(1);
            
            // Ensure names are unique
            if (!names.includes(name)) {
                names.push(name);
            } else {
                // If duplicate, try adding a number
                names.push(name + Math.floor(Math.random() * 100));
            }
        }
        
        return names;
    }
    
    // Display the results
    function displayResults(names) {
        // Clear previous results
        nameGrid.innerHTML = '';
        
        // Add each name as a card
        names.forEach(name => {
            const nameCard = document.createElement('div');
            nameCard.className = 'name-card';
            
            const nameText = document.createElement('span');
            nameText.className = 'name-text';
            nameText.textContent = name;
            
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '📋';
            copyBtn.setAttribute('title', 'Copy to clipboard');
            copyBtn.addEventListener('click', () => copyToClipboard(name));
            
            nameCard.appendChild(nameText);
            nameCard.appendChild(copyBtn);
            nameGrid.appendChild(nameCard);
        });
        
        // Show results area
        resultsArea.style.display = 'block';
    }
    
    // Copy a single name to clipboard
    function copyToClipboard(name) {
        navigator.clipboard.writeText(name).then(() => {
            showToast(`"${name}" copied to clipboard!`);
        });
    }
    
    // Copy all names to clipboard
    function copyAllNames() {
        const names = Array.from(document.querySelectorAll('.name-text')).map(el => el.textContent);
        navigator.clipboard.writeText(names.join('\n')).then(() => {
            showToast('All names copied to clipboard!');
        });
    }
    
    // Show toast message
    function showToast(message) {
        copyToast.textContent = message;
        copyToast.classList.add('show');
        
        setTimeout(() => {
            copyToast.classList.remove('show');
        }, 2000);
    }
});