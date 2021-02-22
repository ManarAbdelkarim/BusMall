'use strict';

const imageList = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair',
  'cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun',
  'unicorn','usb','water-can','wine-glass'
];
let counter = 1;

let firstImage = document.getElementById('first-image');
// console.log(firstImage);
let secondImage = document.getElementById('second-image');
// console.log(secondImage);
let thirdImage = document.getElementById('third-image');
let section = document.getElementById('main-section');
// console.log(thirdImage);

let imageId= [firstImage,secondImage,thirdImage];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
Images.all = [];
function Images(name){
  this.name = name;
  this.ext ='';
  this.path = '';
  this.votes = 0;
  this.visits = 0;

  Images.all.push(this);
}
Images.prototype.generateExtension = function(){
  if (this.name === 'usb') {
    this.ext = 'gif';
  }
  else if(this.name === 'sweep'){
    this.ext = 'png';
  }
  else{
    this.ext = 'jpg';
  }

};

Images.prototype.generatePath = function(){
  this.path= `./img/${this.name}.${this.ext}`;

};


for (let i = 0; i < imageList.length; i++) {
  new Images(imageList[i]);
  Images.all[i].generateExtension();
  Images.all[i].generatePath();
}
let countText = document.getElementById('counter');
let coun =0;
let arrCopy =[];
function render(){
  console.log(arrCopy);
  let count = 0 ;
  let arr = [];
  let val;
  let valCopy;
  let correct = true;
  while(count !== 3){
    valCopy = randomNumber(0,imageList.length-1);

    if (arrCopy.includes(valCopy) === false) {
      val = valCopy;
    }
    else{
      continue;
    }
    for (let i = 0; i < arr.length; i++) {
      if (val === arr[i]) {
        correct = false;
        break;
      }
      else correct = true;

    }
    if (correct) {
      arr.push(val);
      count++;
    }

  }
  arrCopy = arr;
  for (let i = 0; i < arr.length; i++) {
    imageId[i].src = Images.all[arr[i]].path;
    imageId[i].title = Images.all[arr[i]].name;
    imageId[i].alt = Images.all[arr[i]].name;
    Images.all[arr[i]].visits++;
    // console.log('this is the visitors for' + Images.all[arr[i]].name + ' ' + Images.all[arr[i]].visits);
  }
  coun++;
  countText.innerHTML = `${coun} of 25`;
}
render();

section.addEventListener('click', handleClick);

function handleClick(event) {


  // console.log('counter =' ,counter);
  // console.log('Target', event.target.id);
  if (event.target.id !== 'main-section') {
    for (let i = 0; i < Images.all.length; i++) {
      if (Images.all[i].name === event.target.title) {
        Images.all[i].votes++;
        // console.log('this is the voters for' + Images.all[i].name + ' ' + Images.all[i].votes);
        break;
        // Goat.all[i].votes = Goat.all[i].votes + 1
      }
    }
    // console.log(Images.all);
    if(counter !== 25){
      counter++;
      render();
    }


    else if (counter === 25) {
      showData();
      counter++;
      section.removeEventListener('click', handleClick);
      showStatistics();
      alert('the servery has finished ');
    }
  }
}



let results = document.getElementById('results');
let ulEl = document.createElement('ul');
results.appendChild(ulEl);
let liEl = document.createElement('li');

function showData(){
  for (let i = 0; i < Images.all.length; i++) {
    liEl = document.createElement('li');
    ulEl.appendChild(liEl);
    liEl.textContent = `${Images.all[i].name} had ${Images.all[i].votes}, and was seen ${Images.all[i].visits} times.`;
  }

}


function showStatistics() {
  document.getElementById('canvas').style.display = 'block';
  const ctx = document.getElementById('chart').getContext('2d');

  const productNames = [];
  const productVotes = [];
  const productVisits = [];
  for (let i = 0; i < Images.all.length; i++) {
    productNames.push(Images.all[i].name);
    productVotes.push(Images.all[i].votes);
    productVisits.push(Images.all[i].visits);
  }
  console.log('Votes', productVotes);
  new Chart(ctx, {
    type: 'bar',
    animationEnabled: true,
    title:{
      text: 'The statistics of visits and votes for 25 rounds'
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor:'pointer',
    },
    data: {
      labels: productNames,
      type: 'column',
      name: 'number of visits',
      datasets: [{

        barPercentage: 1,
        borderWidth: 2,
        label: 'No of visits:',
        backgroundColor: 'rgba(47, 47, 175, 0.90)',
        borderColor: 'rgb(0, 0, 0)',
        data:productVisits ,
      },

      {
        axisYType: 'secondary',
        barPercentage: 1,
        borderWidth: 2,
        label: 'No of votes:',
        backgroundColor: 'rgba(205, 92, 92, 0.90)',
        borderColor: 'rgb(0, 0, 0)',
        data:productVotes ,

      }
      ],
    },

    options: {},
  });
}



