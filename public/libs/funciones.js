var ctx;
var Instasisas = {};

Instasisas.getPixels = function(src){
  var image = new Image();
  image.src = src;
	var c = this.getCanvas(image.width,image.height);
	ctx = c.getContext("2d");
	ctx.drawImage(image,0,0,c.width,c.height);
	return ctx.getImageData(0,0,c.width,c.height);
}

Instasisas.getCanvas = function(w,h){
	var c = document.getElementById("mYcanvas");
	c.width = w;
	c.height = h;
	return c;
}

Instasisas.grayscale = function(pixels) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
	
	  var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  return pixels;
};

Instasisas.brightness = function(pixels,ajuste) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i] += ajuste;
    var g = d[i+1] += ajuste;
    var b = d[i+2] += ajuste;
  }
  return pixels;
};

Instasisas.croma = function(pixels,values) {
  var d = pixels.data;
  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];

  	if (g === values.g && r === values.r && b === values.b){
        d[i+3] = 0;
    }
  }
  
  return pixels;
};


function render(src,opcion){
    var image = new Image();
    image.src = src;
    image.onload = function(){

      if(opcion != "revertir"){
      var c = Instasisas.getCanvas(this.width/2,this.height/2);
      ctx = c.getContext('2d');
      ctx.drawImage(this,0,0,this.width/2, this.height/2);
    }else{
      var c = Instasisas.getCanvas(this.width,this.height);
      ctx = c.getContext('2d');
      ctx.drawImage(this,0,0,this.width, this.height);
    }

      var div = document.getElementById("zona");

      removeAllChilds("zona");
      var p = document.createElement("p");
      p.innerHTML = "Original";
      div.appendChild(p);
      div.appendChild(c);
      document.body.appendChild(div);

      var canvas = document.getElementsByTagName("canvas")[0];
      var canvas2 = document.getElementById("mYcanvas");
      url = canvas2.toDataURL();
      var check = document.getElementById("byn").checked = false;
    }
}


    function addCanvas(imageData,refCanvas,title){

      var resultCanvas = document.getElementById("mYcanvas");
      resultCanvas.width = refCanvas.width;
      resultCanvas.height = refCanvas.height;
      ctx = resultCanvas.getContext('2d');
      ctx.putImageData(imageData,0,0);
      var div = document.getElementById("zona");
      removeAllChilds("zona");
      var p = document.createElement("p");
      p.innerHTML = title;
      div.appendChild(p);
      div.appendChild(resultCanvas);
      document.body.appendChild(div);

    }

function loadImage(src){
  var reader = new FileReader();
  reader.onload = function(e){
    render(e.target.result);
  };
  reader.readAsDataURL(src);
}

function removeAllChilds(a)
 {
 var a=document.getElementById(a);
 while(a.hasChildNodes())
  a.removeChild(a.firstChild);  
 }


  