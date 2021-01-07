document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParents = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    tabsParents.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    })

    function nutritionStyle() {
        hideTabContent();
        showTabContent();
    }




    function timer() {
        const elems = {
            'text': document.querySelector('.promotion__descr'),
            'timerBLocks': document.querySelectorAll('.timer__block span'),
            'months': ['января', "февраля", "марта", "апреля", "мая", "июня", "июля", "сентября", "октября", "декабря"]
        };
        const dates = {
            'lastDay': new Date('2021-01-12'),
            'now': new Date()
        }
        dates.lastDay.setUTCHours(0);
        dates.now.setUTCHours(0);
        function promotionText() {
            elems.text.innerHTML = `Мы ценим каждого клиента и предлагаем вам стать одним из них на очень выгодных условиях. Каждому, кто закажет доставку питание на неделю, будет предоставлена скидка в размере <span> 20 % !</span><br><br> Акция закончится ${dates.lastDay.getUTCDate()}   ${elems.months[dates.lastDay.getUTCMonth()]} в `;

            if (dates.lastDay.getUTCHours() < 10) elems.text.innerHTML += '0';
            elems.text.innerHTML += dates.lastDay.getUTCHours() + ':';
            if (dates.lastDay.getUTCMinutes() < 10) elems.text.innerHTML += '0';
            elems.text.innerHTML += dates.lastDay.getUTCMinutes();
        }
        function renderTimer() {
            let dateNow = new Date();
            if (dates.now - dates.lastDay < 0) clearInterval(timerId);
            elems.timerBLocks[0].textContent = Math.floor((dates.lastDay - dateNow) / 1000 / 3600 / 24);
            elems.timerBLocks[1].textContent = Math.floor((dates.lastDay - dateNow) / 1000 / 3600 % 24);
            elems.timerBLocks[2].textContent = Math.floor((dates.lastDay - dateNow) / 1000 / 60 % 60);
            elems.timerBLocks[3].textContent = Math.floor((dates.lastDay - dateNow) / 1000 % 60);
        }
        let timerId = setInterval(renderTimer, 1000);
        promotionText();
        renderTimer();
    }


    function modalWindow() {
        const elems = {
            "open": document.querySelectorAll('[data-modal]'),
            "modal": document.querySelector('.modal'),
            "close": document.querySelectorAll('[data-close]')
        }
        elems.open.forEach(item => {
            item.addEventListener('click', openModal);
        })
        elems.close.forEach(item => {
            item.addEventListener('click', closeModal);
            elems.modal.classList.remove('show');
            elems.modal.classList.add('hide');
        })
        elems.modal.addEventListener('click', (event) => {
            if (event.target === elems.modal) {
                closeModal();
            }
        })
        function closeModal() {
            elems.modal.classList.remove('show');
            elems.modal.classList.add('hide');
            document.body.style.overflow = '';
        }
        function openModal() {
            elems.modal.classList.remove('hide');
            elems.modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && elems.modal.classList.contains('show')) {
                closeModal();
            }
        })
        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }

        }
        window.addEventListener('scroll', showModalByScroll);

    }


    nutritionStyle();
    timer();
    modalWindow();

})
