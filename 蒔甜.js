// ==========================================
// 1. 全域函數：輪播圖 (放在最外面供 HTML 調用)
// ==========================================
let slideIndex = 1;
let slideTimer;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1; }    
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";  
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active";
        }
    }

    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => { plusSlides(1); }, 5000);
}

// ==========================================
// 2. 頁面載入後執行的所有邏輯
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // --- A. 導覽列 Active 狀態自動判斷 ---
    const path = window.location.pathname;
    const currentLocation = path.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll('.top-nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentLocation) {
            link.classList.add('active');
        }
    });

    // --- B. 啟動輪播圖 ---
    if (document.getElementsByClassName("mySlides").length > 0) {
        showSlides(slideIndex);
    }

    // --- C. 常見問題 (FAQ) 展開/收合 ---
    const faqQuestions = document.querySelectorAll(".faq-question");
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener("click", function() {
                const currentItem = this.parentElement;
                // 關閉其他
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== currentItem) item.classList.remove("active");
                });
                // 切換自己
                currentItem.classList.toggle("active");
            });
        });
    }

    // --- D. 商品頁面 Tab 切換 ---
    const tabs = document.querySelectorAll('.tab-item');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetId = tab.getAttribute('data-target');
                const contents = document.querySelectorAll('.content-section');
                
                document.querySelectorAll('.tab-item').forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.classList.remove('active'));
                
                tab.classList.add('active');
                const targetContent = document.getElementById(targetId);
                if (targetContent) targetContent.classList.add('active');
            });
        });
    }

    // --- E. 購物車數量加減 ---
    const plusBtns = document.querySelectorAll('.plus');
    const minusBtns = document.querySelectorAll('.minus');

    plusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling;
            if (input) input.value = parseInt(input.value) + 1;
        });
    });

    minusBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.nextElementSibling;
            if (input && parseInt(input.value) > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });
});