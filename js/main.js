document.addEventListener('DOMContentLoaded',()=>{
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
         tabsParents = document.querySelector('.tabheader__items');

        function hideTabContent(){
            tabsContent.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('show', 'fade');
            });
            tabs.forEach(item =>{
                item.classList.remove('tabheader__item_active');
            });
        }
        function showTabContent(i=0){
            tabsContent[i].classList.add('show','fade');
            tabsContent[i].classList.remove('hide');
            tabs[i].classList.add('tabheader__item_active');
        }
        tabsParents.addEventListener('click', (event) =>{
            const target = event.target;
            if(target && target.classList.contains('tabheader__item')){
                tabs.forEach((item,i)=>{
                    if(target === item){
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
            'lastDay': new Date('2023-01-12'),
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
            //           if (dates.now - dates.lastDay<0) clearInterval(timerId);
            elems.timerBLocks[0].textContent = Math.floor((dates.lastDay - dateNow) / 1000 / 3600 / 24);
            elems.timerBLocks[1].textContent = Math.floor((dates.lastDay - dateNow) / 1000 / 3600 % 24);
            elems.timerBLocks[2].textContent = Math.floor((dates.lastDay - dateNow) / 1000 / 60 % 60);
            elems.timerBLocks[3].textContent = Math.floor((dates.lastDay - dateNow) / 1000 % 60);
        }
        let timerId = setInterval(renderTimer, 1000);
        promotionText();
        renderTimer();
    }



    function modalWindow(){
        const elems = {
            "open": document.querySelectorAll('[data-modal]'),
            "modal" : document.querySelector('.modal'),
            "close" : document.querySelectorAll('[data-close]')
        }
        elems.open.forEach(item => {
            item.addEventListener('click', openModal);
        })
        elems.close.forEach(item => {
            item.addEventListener('click', closeModal);
            elems.modal.classList.remove('show');
            elems.modal.classList.add('hide');
        })
        elems.modal.addEventListener('click', (event)=>{
            if(event.target === elems.modal){
                closeModal();
            }
        })
        function closeModal() {
            elems.modal.classList.remove('show');
            elems.modal.classList.add('hide');
            document.body.style.overflow = '';
        }
        function openModal(){
            elems.modal.classList.remove('hide');
            elems.modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
        document.addEventListener('keydown',(e) =>{
            if(e.code ==="Escape" && elems.modal.classList.contains('show')){
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

    function menuBlock(){
        class MenuCard{
            constructor(title,descr,img,alt,price, parentSelector, ... classes){
                this.title = title;
                this.descr = descr;
                this.img = img;
                this.price = price;
                this.alt = alt;
                this.transfer = 420;
                this.classes = classes;
                this.changeToTG();
                this.parentSelector = document.querySelector(parentSelector);
            }
            changeToTG(){
                this.price = this.price*this.transfer;
            }
            render(){
                const elem = document.createElement('div');
                if(this.classes.length ===0){
                    this.element = 'menu__item';
                    elem.classList.add(this.element);
                }else this.classes.forEach(className=>elem.classList.add(className));
                elem.innerHTML = `
                                <img src=${this.img} alt=${this.alt}>
                                <h3 class="menu__item-subtitle">Меню "${this.title}"</h3>
                                <div class="menu__item-descr">${this.descr}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> тенге/день</div>
                                </div>
                            `;
                            this.parentSelector.append(elem);
            }
        };

        new MenuCard(
            "Фитнес",
            "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
            "\"img/tabs/vegy.jpg\"",
            "vegy",
            9,
            ".menu .container",
        ).render();
        new MenuCard(
            "Постное",
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
            "\"img/tabs/post.jpg\"",
            "post",
            13.9,
            ".menu .container",
            'menu__item'
        ).render();
        new MenuCard(
            "Премиум",
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
            "\"img/tabs/elite.jpg\"",
            "elite",
            51,
            ".menu .container",
            'menu__item'
        ).render();


    }





    menuBlock();
    nutritionStyle();
    timer();
    modalWindow();

})
