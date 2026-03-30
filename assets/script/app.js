'use strict';

let isVisible = false;
let imageSrc = '';

const textArea = document.querySelector('textarea');
const postImage = document.querySelector('.post-image');
const fileInfo = document.querySelector('.file-info');
const postBtn = document.querySelector('.post');
const postBox = document.querySelector('.show-post');


postImage.addEventListener('change', () => {
  if (postImage.files && postImage.files[0]) {
    fileInfo.textContent = postImage.files[0].name;
  } else {
    fileInfo.textContent = '';
  }
});

function cleanTextArea() {
  textArea.value = '';
  postImage.value = '';
  fileInfo.textContent = '';
  imageSrc = '';
}

function showImage() {
  if (postImage.files && postImage.files[0]) {
    imageSrc = `<figure><img src="${URL.createObjectURL(postImage.files[0])}" class="posted-image"></figure>`;
  } else {
    imageSrc = '';
  }
}


function showPost() {
  showImage();

  if (textArea.value.trim() === '' && imageSrc === '') {
    return;
  }

  const newPost = document.createElement('div');
  newPost.className = 'the-post data';

  const now = new Date();

  newPost.innerHTML = `
      <header class="post-header flex">
      <div class="flex">
        <figure><img src="./assets/media/weiyu.jpg" class="profile" alt="profile"></figure>
        <h3>${subscriber.name}</h3>
      </div>
      <p>${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
    </header>
    <p>${textArea.value}</p>
    ${imageSrc}`;

  postBox.appendChild(newPost);
}

postBtn.addEventListener('click', () => {
  showPost();
  cleanTextArea();
});

export class User {
  #id;
  #name;
  #userName;
  #email;

  constructor(id, name, userName, email) {
    this.#id = id;
    this.#name = name;
    this.#userName = userName;
    this.#email = email;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get userName() {
    return this.#userName;
  }

  get email() {
    return this.#email;
  }

  getInfo() {
    return `${this.#id} ${this.#name} ${this.#userName} ${this.#email}`;
  }
}

export class Subscriber extends User {
  #pages = [];
  #groups = [];
  #canMonetize = true;

  constructor(id, name, userName, email, pages, groups, canMonetize) {
    super(id, name, userName, email);
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    return this.#pages;
  }

  get groups() {
    return this.#groups;
  }

  get canMonetize() {
    return this.#canMonetize;
  }

  getInfo() {
    return `${super.getInfo()} ${this.#pages} ${this.#groups} ${this.#canMonetize}`
  }
}

const profileImage = document.querySelector('.profile');
const modal = document.getElementById('modal');
const overlay = document.querySelector('.overlay');

const subscriber = new Subscriber(
  98,
  'Weiyu Yin',
  'WS_YWY',
  'weiyuyin@student.mitt.ca',
  'Studing Page',
  'MITT SD Student',
  true
);

function displayInfo() {
  const userInfo = document.getElementById('modal');
  if (!userInfo) return;

  userInfo.innerHTML = `
    <div class="subscriber-info">
      <img src="./assets/media/weiyu.jpg" class="user-image" alt="profile">
      <h2>${subscriber.name}</h2>
      <p class="username">${subscriber.userName}</p>
      <div class="details">
        <p>${subscriber.email}</p>
        <p>Pages: ${subscriber.pages}</p>
        <p>Groups: ${subscriber.groups}</p>
        <p>Can Monetize: ${subscriber.canMonetize ? 'Yes' : 'No'}</p>
      </div>
      <button class="close" id="close" type="button">Close</button>
    </div>
  `;
  document.getElementById('close').addEventListener('click', closeModal);
}

function displayModal() {
  modal.classList.add('isvisible');
  overlay.classList.add('isvisible');
  displayInfo();
}

function closeModal() {
  modal.classList.remove('isvisible');
  overlay.classList.remove('isvisible');
}


function showMessage() {
  modal.classList.add('isvisible');
  overlay.classList.add('isvisible');
  isVisible = true;
}


profileImage.addEventListener('click', function () {
  displayModal();
  showMessage();
})

profileImage.addEventListener('click', displayModal);
