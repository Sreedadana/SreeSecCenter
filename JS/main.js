'use strict';

window.onload = function () {
    // Get Buttons
    var authHistory = document.querySelector('#authHistory-btn'),
        authSession = document.querySelector('#authSession-btn'),
        participants = document.querySelector('#participants-btn'),
        participantsForm = document.querySelector('#participantsForm-btn');

    authHistory.addEventListener('click', navigatePage);
    authSession.addEventListener('click', navigatePage);
    participants.addEventListener('click', navigatePage);
    participantsForm.addEventListener('click', navigatePage);

    function navigatePage() {
        console.log(this);
        var url = './index.html';
        switch (this.id) {
            case 'authHistory-btn':
                url = './authHistory.html';
                break;
            case 'authSession-btn':
                url = './authSession.html';
                break;
            case 'participants-btn':
                url = './participants.html';
                break;
            case 'participantsForm-btn':
                url = './participantsForm.html';
                break;
            default:
                url = './index.html';
        }
        window.location.assign(url);
    }
};
