const subTypeOptions = {
    top: [
        { value: 'tshirt', text: 'T-Shirt' },
        { value: 'shirt', text: 'Button Shirt/Blouse' },
        { value: 'sweater', text: 'Sweater' },
        { value: 'hoodie', text: 'Hoodie/Sweatshirt' },
        { value: 'tank', text: 'Tank Top' },
        { value: 'polo', text: 'Polo' }
    ],
    bottom: [
        { value: 'jeans', text: 'Jeans' },
        { value: 'pants', text: 'Pants/Trousers' },
        { value: 'shorts', text: 'Shorts' },
        { value: 'skirt', text: 'Skirt' },
        { value: 'leggings', text: 'Leggings' }
    ],
    shoes: [
        { value: 'sneakers', text: 'Sneakers' },
        { value: 'boots', text: 'Boots' },
        { value: 'sandals', text: 'Sandals' },
        { value: 'heels', text: 'Heels' },
        { value: 'flats', text: 'Flats' },
        { value: 'loafers', text: 'Loafers' }
    ],
    outerwear: [
        { value: 'jacket', text: 'Jacket' },
        { value: 'coat', text: 'Coat' },
        { value: 'blazer', text: 'Blazer' },
        { value: 'cardigan', text: 'Cardigan' },
        { value: 'vest', text: 'Vest' }
    ],
    accessory: [
        { value: 'bag', text: 'Bag/Purse' },
        { value: 'hat', text: 'Hat' },
        { value: 'scarf', text: 'Scarf' },
        { value: 'belt', text: 'Belt' },
        { value: 'jewelry', text: 'Jewelry' },
        { value: 'sunglasses', text: 'Sunglasses' }
    ]
};

function updateSubtypes() {
    const categorySelect = document.getElementById('category');
    const subtypeSelect = document.getElementById('subtype');
    

    const selectedCategory = categorySelect.value;
    

    subtypeSelect.innerHTML = '<option value="">Select a sub-category</option>';


    if (subTypeOptions[selectedCategory]) {
        subTypeOptions[selectedCategory].forEach(option => {
            const newOption = document.createElement('option');
            newOption.value = option.value;
            newOption.textContent = option.text;
            subtypeSelect.appendChild(newOption);
        });
    }


    const savedValue = subtypeSelect.getAttribute('data-saved');
    if (savedValue) {
        subtypeSelect.value = savedValue;

        subtypeSelect.removeAttribute('data-saved');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    if (categorySelect) {

        updateSubtypes(); 
        
        categorySelect.addEventListener('change', updateSubtypes);
    }
});