class Japa {
    constructor() {
        window.addEventListener('load', () => {
            this.closeDropdowns();
            this.openDropdowns();
            this.watchSearch();
            this.watchModal();
            // console.log("Im here bitch");
        });
    }


    openDropdowns() {
        const dropdownToggles = document.querySelectorAll('[data-dropdown]');

        for (const toggle of dropdownToggles) {
            toggle.addEventListener('click', e => {
                let target = e.currentTarget.dataset.dropdown;

                let dropdown = document.getElementById(`dropdown-${target}`);
                // console.log(dropdown);

                dropdown.classList.toggle('wj-dropdown--active');

                e.stopPropagation();
            });

        }

    }

    closeDropdowns(params) {
        document.addEventListener('click', e => {
            if (e.target.classList !== 'undefined' && !e.target.classList.contains(
                    'wj-dropdown') &&
                !this.isDescendant('wj-dropdown', e.target) && !this.isDescendant('wj-dropdown__toggle', e
                    .target)
            ) {
                const dropdowns = document.querySelectorAll('.wj-dropdown');
                for (const dropdown of dropdowns) {
                    dropdown.classList.remove('wj-dropdown--active');
                }
            }
        });
    }


    isDescendant(parent, child) {
        var parent = document.querySelector(`.${parent}`);
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    watchSearch() {
        const searchInput = document.querySelector('.wj-search__input');

        if (searchInput !== null) {
            searchInput.addEventListener('focus', e => {
                searchInput.closest('.wj-search').classList.add('active');
            });

            searchInput.addEventListener('blur', e => {
                searchInput.closest('.wj-search').classList.remove('active');
            });
        }
    }

    watchModal() {
        let modalToggles = document.querySelectorAll('[data-modal]');
        let modalOverlays = document.querySelectorAll('.wj-modal__overlay');
        let modalCloseButtons = document.querySelectorAll('.wj-modal--close');


        modalToggles.forEach(el => {
            el.addEventListener('click', e => {
                e.preventDefault();
                let modalId = el.dataset.modal;

                this.showModal(modalId);

            });
        })

        modalOverlays.forEach(el => {
            el.addEventListener('click', e => {
                if (e.target == e.currentTarget) {
                    let modalId = e.target.id;
                    this.closeModal(modalId);
                } else {
                    return;
                }
            });
        });

        modalCloseButtons.forEach(el => {
            el.addEventListener('click', e => {
                let modalId = e.target.closest('.wj-modal__overlay').id;
                console.log(modalId);
                this.closeModal(modalId);
            });
        });

    }

    showModal(modal) {
        let modalId = this.getModalId(modal);

        document.querySelector(modalId).classList.add('show-modal');
    }

    closeModal(modal) {
        let modalId = this.getModalId(modal);

        document.querySelector(modalId).classList.remove('show-modal');
    }

    closeModals() {
        let modals = document.querySelectorAll('.wj-modal__overlay');

        modals.forEach(el => {
            let modalId = el.id;

            this.closeModal(modalId);
        });
    }

    getModalId(modal) {
        let modalId;

        if (modal.includes("modal-")) {
            modalId = "#" + modal;
        } else {
            modalId = "#modal-" + modal;
        }

        return modalId;
    }

}

window.Japa = Japa;