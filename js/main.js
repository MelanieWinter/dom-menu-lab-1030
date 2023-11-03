const menuLinks = [
        {text: 'about', href: '/about'},
        {text: 'catalog', href: '#', subLinks: [
        {text: 'all', href: '/catalog/all'},
        {text: 'top selling', href: '/catalog/top'},
        {text: 'search', href: '/catalog/search'},
    ]},
        {text: 'orders', href: '#' , subLinks: [
        {text: 'new', href: '/orders/new'},
        {text: 'pending', href: '/orders/pending'},
        {text: 'history', href: '/orders/history'},
    ]},
        {text: 'account', href: '#', subLinks: [
        {text: 'profile', href: '/account/profile'},
        {text: 'sign out', href: '/account/signout'},
    ]},
];
const mainEl = document.querySelector('main')
const topMenuEl = document.getElementById('top-menu')
const subMenuEl = document.getElementById('sub-menu')
const topMenuLinks = document.querySelectorAll('#top-menu a');

mainEl.style.setProperty('background-color', 'var(--main-bg)')
mainEl.innerHTML = '<h1>SEI Rocks!</h1>'
mainEl.classList.add('flex-ctr')

topMenuEl.style.height = '100%'
topMenuEl.style.setProperty('background-color', 'var(--top-menu-bg)')
topMenuEl.classList.add('flex-around')

menuLinks.forEach((link) => {
    const aEl = document.createElement('a')
    aEl.setAttribute('href', link.href)
    aEl.textContent = link.text
    topMenuEl.appendChild(aEl)
})

subMenuEl.style.height = '100%'
subMenuEl.style.backgroundColor = 'var(--sub-menu-bg)'
subMenuEl.classList.add('flex-around')
subMenuEl.style.position = 'absolute'
subMenuEl.style.top = '0'

let showingSubMenu = false;

topMenuEl.addEventListener('click', (event => {
    event.preventDefault();
    const link = event.target;
    if (link.tagName !== 'A') return;

    if (link.classList.contains('active')) {
        link.classList.remove('active');
        showingSubMenu = false;
        subMenuEl.style.top = '0';
        return;
    }
    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    });

    link.classList.add('active');

    const linkData = menuLinks.find(linkObj => linkObj.text === link.textContent);
    showingSubMenu = 'subLinks' in linkData;

    if (showingSubMenu === true) {
        buildSubMenu(linkData.subLinks) 
        subMenuEl.style.top = '100%';
        } else {
            subMenuEl.style.top = '0';
            mainEl.innerHTML = '<h1>about</h1>';
        }

    function buildSubMenu(subLinks) {
        subMenuEl.innerHTML = ' ';
        subLinks.forEach(link => { 
            const linkEl = document.createElement('a');
            linkEl.setAttribute('href', link.href);
            linkEl.textContent = link.text;
            subMenuEl.appendChild(linkEl);
        });
    } 
}))

subMenuEl.addEventListener('click', (event => {
    event.preventDefault();
    const subLink = event.target;
    if (subLink.tagName !== 'A') return;

    showingSubMenu = false;
    subMenuEl.style.top = '0';

    topMenuLinks.forEach(link => {
        link.classList.remove('active');
    });

    mainEl.innerHTML = `<h1>${subLink.textContent}</h1>`;
}))
