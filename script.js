function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show selected tab content
    document.getElementById(tabName).classList.add('active');

    // Add active class to clicked tab
    event.target.classList.add('active');
}

function changeProfilePic() {
    /*const initials = ['YN', 'AB', 'CD', 'EF', 'GH', 'IJ'];
    const current = document.getElementById('profileInitials').textContent;
    const currentIndex = initials.indexOf(current);
    const nextIndex = (currentIndex + 1) % initials.length;
    document.getElementById('profileInitials').textContent = initials[nextIndex];*/
    const imageArray = [
        "./assets/my-notion-face-portrait.png",
        "./assets/SN.svg",
        "./assets/my-notion-face-portrait.png",
        "./assets/SN.svg"
    ];

    const current = document.getElementById("profileImage").src;
    let currentIndex = imageArray.indexOf(current);
    //const profileImg = document.getElementById("profileImage");
    let nextIndex = (currentIndex + 1) % imageArray.length;
    document.getElementById("profileImage").src = imageArray[nextIndex];

}

function contactMe() {
    alert('Contact functionality would connect to your email or contact form!');
}

// Add smooth scrolling and interaction effects
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});