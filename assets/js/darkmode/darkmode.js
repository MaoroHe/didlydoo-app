export let darkmode = () => {
    const check = document.querySelector('.theme-switch__checkbox');
    check.addEventListener('change', (event) => {
    const checkeds = document.getElementById('darkmode').checked;

        if(checkeds) {
            document.body.className = 'darkmode';
            let darkState = true;

            window.localStorage.setItem('darkmod', darkState);
        } else {
            document.body.className = '';
            let darkState = false;

            window.localStorage.setItem('darkmod', darkState);
        }
    })
}

export let darkInit = () => {
    const check = document.querySelector('.theme-switch__checkbox');
    let darkStates = localStorage.getItem('darkmod');

    if(darkStates == 'true') {
        document.body.className = 'darkmode';
        check.checked = true;
        let darkState = true;
        
        window.localStorage.setItem('darkmod', darkState);
    } else {
        document.body.className = '';
        let darkState = false;

        window.localStorage.setItem('darkmod', darkState);
    }
}