const modal = document.getElementById("modal");
const modalContent = document.querySelector(".modal-content");

const searchInput = document.getElementById('search-input');
const projects = Array.from(document.getElementsByClassName("content"));
const suggestionsContainer = document.getElementById('suggestions');

const allFilterItems = document.querySelectorAll('.education-box');
const allFilterBtns = document.querySelectorAll('.filter-btn');

function showModal(project) {
    modal.style.display = "block";
    document.querySelector(".modal-content h2").innerText = project.dataset.project;
    document.querySelector(".modal-content img").src = project.dataset.image;
    document.querySelector(".modal-content p").innerText = project.dataset.texte;
    setTimeout(function () {
        modal.style.opacity = "1";
        modalContent.style.transform = "scale(1)";
    }, 50);
}

function closeModal() {
    modal.style.opacity = "0";
    modalContent.style.transform = "scale(0.7)";
    setTimeout(function () {
        modal.style.display = "none";
    }, 300);
}

var projectCards = document.querySelectorAll(".button");
projectCards.forEach(function (projectCard) {
    projectCard.addEventListener("click", function () {
        showModal(projectCard);
    });
});

var closeButton = document.querySelector(".close");
closeButton.addEventListener("click", function () {
    closeModal();
});

window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[0].classList.add('active-btn');
});

allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

function showFilteredContent(btn){
    allFilterItems.forEach((item) => {
        if(item.classList.contains(btn.id)){
            resetActiveBtn();
            btn.classList.add('active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function resetActiveBtn(){
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}

document.querySelector('.search-icon').addEventListener('click', function () {
    filterElements(searchInput);
    clearSuggestionList();
});

document.querySelector('.return-icon').addEventListener('click', function () {
    resetInput();
});

suggestionsContainer.addEventListener('click', function (event) {
    const clickedSuggestion = event.target;
    if (clickedSuggestion.classList.contains('suggestion')) {
        searchInput.value = clickedSuggestion.textContent;
    }
    clearSuggestionList();
});

searchInput.addEventListener('input', function () {
    updateSuggestions(searchInput.value.toLowerCase());
});

function filterElements(searchInput) {
    const inputText = searchInput.value.toLowerCase();

    projects.forEach((project) => {
        const titleProject = project.querySelector(".title").textContent.toLowerCase();
        const titleTags = Array.from(project.querySelectorAll(".tag")).map(tag => tag.textContent.toLowerCase());
        let atLeastOneTag = false;

        titleTags.forEach((tags) => {
            if (tags == inputText) {
                atLeastOneTag = true;
            }
        });

        if (titleProject == inputText || inputText == "" || atLeastOneTag) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}

function updateSuggestions(inputText) {
    suggestionsContainer.innerHTML = '';
    const listSuggestions = new Set();

    if (inputText.length > 0) {
        projects.forEach((tab) => {
            const titleText = tab.querySelector(".title").textContent;
            const tags = Array.from(tab.querySelectorAll(".tag")).map(tag => tag.textContent);

            if (titleText.toLowerCase().includes(inputText)) {
                listSuggestions.add(titleText);
            }
            tags.forEach((tag) => {
                if (tag.toLowerCase().includes(inputText)) {
                    listSuggestions.add(tag);
                }
            });
        });

        listSuggestions.forEach(tag => {
            const suggestion = document.createElement('div');
            const highlightedText = tag.replace(new RegExp(inputText, 'gi'), match => `<span class="letterBold">${match}</span>`);
            suggestion.className = 'suggestion';
            suggestion.innerHTML = highlightedText;
            suggestionsContainer.appendChild(suggestion);
        });
    }
}

function clearSuggestionList() {
    while (suggestionsContainer.firstChild) {
        suggestionsContainer.removeChild(suggestionsContainer.firstChild);
    }
}

function restoreElements() {
    projects.forEach((tab) => {
        tab.style.display = "block";
    });
}

function resetInput() {
    searchInput.value = '';
    restoreElements();
    clearSuggestionList();
}