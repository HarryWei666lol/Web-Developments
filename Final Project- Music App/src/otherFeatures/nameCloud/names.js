let baseAngle = Math.PI / 360;
let R = 200;
let speed = 1;
let theAngleX = speed * baseAngle;
let theAngleY = -speed * baseAngle;
let theFocalLength = R * 1.5;

function Initialization(manyOptions) {
  this.manyOptions = manyOptions;
  this.dataArray = manyOptions.data;
  this.aContainer = manyOptions.aContainer;
  this.init();
}

Initialization.prototype.init = function() {
  let theNewTags = [];
  let theLen = this.dataArray.length;
  for (let i = 0; i < theLen; i++) {
    let color = "#" + Math.floor(Math.random() * 0xffffff).toString(16);
    let angA = Math.acos((2 * (i + 1) - 1) / theLen - 1);
    let angB = angA * Math.sqrt(theLen * Math.PI);
    let z = R * Math.cos(angA);
    let y = R * Math.sin(angA) * Math.sin(angB);
    let x = R * Math.sin(angA) * Math.cos(angB);
    this.dataArray[i].style.color = color;
    let aNewtag = new Tag(this.dataArray[i], x, y, z, this.manyOptions);
    aNewtag.move();
    theNewTags.push(aNewtag);
    this.animate();
  }
  this.theNewTags = theNewTags;
};

Initialization.prototype.rotateX = function() {
  let cos = Math.cos(theAngleX);
  let sin = Math.sin(theAngleX);
  this.theNewTags.forEach(tag => {
    let y = tag.y * cos - tag.z * sin;
    let z = tag.z * cos + tag.y * sin;
    tag.y = y;
    tag.z = z;
  });
};

Initialization.prototype.rotateY = function() {
  let cos = Math.cos(theAngleY);
  let sin = Math.sin(theAngleY);
  this.theNewTags.forEach(tag => {
    let x = tag.x * cos - tag.z * sin;
    let z = tag.z * cos + tag.x * sin;
    tag.x = x;
    tag.z = z;
  });
};

Initialization.prototype.animate = function() {
  let it = this;
  setInterval(function() {
    it.rotateX();
    it.rotateY();
    it.theNewTags.forEach(tag => {
      tag.move();
    });
  }, 30);
};

function Tag(data, x, y, z, manyOptions) {
  this.manyOptions = manyOptions;
  this.dataArray = manyOptions.data;
  this.data = data;
  this.x = x;
  this.y = y;
  this.z = z;
}

Tag.prototype.move = function() {
  let scaleValue = theFocalLength / (theFocalLength - this.z);
  let alphaValue = (this.z + R) / (2 * R);
  this.data.style.left = this.x + "px";
  this.data.style.top = this.y + "px";
  this.data.style.fontSize = 13 * scaleValue + "px";
  this.data.style.opacity = alphaValue + 0.5;
};

window.onload = function() {
  let tags = document.getElementsByTagName("a");
  let wrap = document.getElementById("wrap");
  let manyOptions = {
    data: tags,
    aContainer: wrap
  };
  let tagCloud = new Initialization(manyOptions);
  document.addEventListener("mousemove", function(e) {
    theAngleY =
      2 *
      (e.clientX / document.body.getBoundingClientRect().width - 0.5) *
      speed *
      baseAngle;
    theAngleX =
      2 *
      (e.clientY / document.body.getBoundingClientRect().height - 0.5) *
      speed *
      baseAngle;
  });
};
