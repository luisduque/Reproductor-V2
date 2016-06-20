var url;
var urlb;
var servir;
var band;

//musica y su metadata
var elementos = [{
        song: " About You",
        artist: "XX YY XX",
        album: "About You",
        audio: "./songs/About-You.mp3",
        cover: "./covers/About You.jpg",
        alt: "About You"
    },
    {
        song: " The View From The Afternoon",
        artist: "Artic Monkeys",
        album: "I Bet You Look Good On The Dancefloor",
        audio: "./songs/The_View_From_The_Afternoon.mp3",
        cover: "./covers/I_Bet_You_Look_Good_On_the_Dancefloor.jpg",
        alt: "I Bet You Look Good On The Dancefloor"
    },
    {
        song: " A Toast to the Future Kinds!",
        artist: "Emarosa",
        album: "Emarosa",
        audio: "./songs/A toast to the future kids.mp3",
        cover: "./covers/ema.PNG",
        alt: "Emarosa"
    },
    {
        song: " Otherside",
        artist: "Red Hot Chili Peppers",
        album: "Californication",
        audio: "./songs/otherside.mp3",
        cover: "./covers/otherside.jpg",
        alt: "Otherside"
    },
    {
        song: " Bohemian Rhapsody",
        artist: "Queen",
        album: "A Night at the Opera",
        audio: "./songs/bohemianRhapsody.mp3",
        cover: "./covers/bohemian.png",
        alt: "Bohemian Rhapsody"
    },
    {
        song: " Sweet Child O' Mine",
        artist: "Guns N' Roses",
        album: "Appetite for Destruction",
        audio: "./songs/sweetChildOMine.mp3",
        cover: "./covers/sweet.jpg",
        alt: "Sweet Child O' Mine"
    },
    {
        song: " Staying Alive",
        artist: "Bee Gees",
        album: "Saturday Night Fever",
        audio: "./songs/stayingAlive.mp3",
        cover: "./covers/staying.jpg",
        alt: "Staying Alive"
    },
    {
        song: " Someone Like You",
        artist: "Adele",
        album: "21",
        audio: "./songs/someoneLikeYou.mp3",
        cover: "./covers/someone.png",
        alt: "Someone Like You"
    },
    {
        song: " In The End",
        artist: "Linkin Park",
        album: "Hybrid Theory",
        audio: "./songs/inTheEnd.mp3",
        cover: "./covers/inTheEnd.jpg",
        alt: "In The End"
    },
    {
        song: " Man In The Mirror",
        artist: "Michael Jackson",
        album: "Bad",
        audio: "./songs/manInTheMirror.mp3",
        cover: "./covers/manInTheMirror.jpg",
        alt: "Man In The Mirror"
    },
    {
        song: " Animals",
        artist: "Martin Garrix",
        album: "Gold Skies - EP",
        audio: "./songs/animals.mp3",
        cover: "./covers/animals.jpg",
        alt: "Animals"
    },
    {
        song: " Mambo No 5",
        artist: "Lou Bega",
        album: "A Little Bit of Mambo",
        audio: "./songs/mambo.mp3",
        cover: "./covers/mambo.jpg",
        alt: "Mambo No 5"
    }];

(function(){
    var app = angular.module('myApp', []);	

    app.config(['$routeProvider',
	function($routeProvider){
        $routeProvider.
        when('/',{
        templateUrl: 'views/index.html',
        controller: 'IndexController'
    })
    .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .otherwise({
        redirecTo: '/'
    });


	}]);

    app.controller('IndexController',function($scope){

        loadElements(elementos);

        var elements = document.getElementsByClassName('element');

        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mouseover",function(){
                this.getElementsByClassName("overlay")[0].style.display = "block";
            },false);
            elements[i].addEventListener("mouseleave",function(){   
                var sonando2 = this.getElementsByTagName("audio")[0];
                if (sonando2.id != "sonando") {
                    this.getElementsByClassName("overlay")[0].style.display = "none";
                };

            },false);

            var controls = elements[i].getElementsByClassName("overlay")[0];
 
            controls.addEventListener("click",function(){
                var player = this.getElementsByTagName("audio")[0];
                var sonando = document.getElementById("sonando");
            
                if(player.paused){
                    player.play();
                    player.id="sonando";
                    var nombre = this.getElementsByClassName("song")[0].innerHTML;
                    document.title = "Reproduciendo: "+nombre;  
                    this.getElementsByClassName("controls")[0].style.backgroundImage = "url('./assets/buttons/StopButton.png')";           
                 
                }else{
                    player.pause();
                    player.currentTime = 0;
                    player.id="pauso";
                    document.title = " Reproductor";
                }

                if(sonando != undefined){
                sonando.pause();
                sonando.currentTime = 0;
                var cambiar = sonando.parentNode;
                cambiar.style.backgroundImage = "url('./assets/buttons/PlayButton.png')";
                cambiar = cambiar.parentNode;
                cambiar.style.display = "none";
                sonando.id ="pauso";
                }
            },false);

        
        }; //final for del mouse over y leave


        //inico boton atras

        $scope.atras = function(){
            var sig = document.getElementById("sonando");
            var listaN = parseInt(sig.getAttribute('data-numero'));
            var sonara = document.body.children[listaN-1];
            if(listaN==1){
                var sonara = document.body.children[elementos.length];
            }
            console.log(sonara);
            var estilo = sonara.getElementsByClassName("overlay")[0];
            var controlsStyle = estilo.getElementsByClassName("controls")[0];
            var cancionA  = estilo.getElementsByTagName("audio")[0];
            console.log(estilo);
            console.log(cancionA);
            if(sig.paused){
                sig.play();
                sig.id="sonando";
            }else{
                sig.pause();
                sig.currentTime = 0;
                sig.id="pauso";
                var pariente = sig.parentNode;
                pariente.style.backgroundImage = "url('./assets/buttons/PlayButton.png')";
                pariente.parentNode.style.display = "none";
                cancionA.play();
                var nombre = sonara.getElementsByClassName("song")[0].innerHTML;
                document.title = "Reproduciendo: "+nombre;  
                cancionA.id ="sonando";
                estilo.style.display = "block";
                controlsStyle.style.backgroundImage = "url('./assets/buttons/StopButton.png')";
            }

        }
        //fin boton atras

        //inicio boton adelante
        $scope.adelante = function(){

            var sig = document.getElementById("sonando");
            var listaN = parseInt(sig.getAttribute('data-numero'));
            var sonara = document.body.children[listaN+1];
            if(listaN==elementos.length){
                var sonara = document.body.children[1];
            }
            console.log(sonara);
            var estilo = sonara.getElementsByClassName("overlay")[0];
            var controlsStyle = estilo.getElementsByClassName("controls")[0];
            var cancionA  = estilo.getElementsByTagName("audio")[0];
            console.log(estilo);
            console.log(cancionA);
            if(sig.paused){
                sig.play();
                sig.id="sonando";
            }else{
                sig.pause();
                sig.currentTime = 0;
                sig.id="pauso";
                var pariente = sig.parentNode;
                pariente.style.backgroundImage = "url('./assets/buttons/PlayButton.png')";
                pariente.parentNode.style.display = "none";
                cancionA.play();
                var nombre = sonara.getElementsByClassName("song")[0].innerHTML;
                document.title = "Reproduciendo: "+nombre;  
                cancionA.id ="sonando";
                estilo.style.display = "block";
                controlsStyle.style.backgroundImage = "url('./assets/buttons/StopButton.png')";
            }

        }
        //final boton adelante
    });
    //
    //final controller

})();

//funcion cargar musica
function loadElements(elementos){
    
    for (var i = 0; i < elementos.length; i++) {
 
        var gw = document.createElement("div");
        gw.className = "globalWrapper";
        var elementTag = document.createElement("div");
        elementTag.className = "element";

        var overlay = document.createElement("div");
        overlay.className = "overlay";

        var controls = document.createElement("div");
        controls.className = "controls";

        var playStop = document.createElement("div");
        playStop.className = "play-stop";



        var audio = document.createElement("audio");
        audio.src = elementos[i].audio;
        audio.dataset.numero = i+1;
        controls.appendChild(playStop);
        controls.appendChild(audio);



        var content = document.createElement("div");
        content.className = "content";
        var song = document.createElement("div");
        song.className = "song";
        song.innerHTML = elementos[i].song;
        var artist = document.createElement("div");
        artist.className = "artist";
        artist.innerHTML = elementos[i].artist;
        var album = document.createElement("div");
        album.className = "album";
        album.innerHTML = elementos[i].album;
        content.appendChild(song);
        content.appendChild(artist);
        content.appendChild(album);

        overlay.appendChild(controls);
        overlay.appendChild(content);

        var albumCover = document.createElement("div");
        albumCover.className = "albumCover";
        var img = document.createElement("img");
        img.src = elementos[i].cover;
        img.alt = elementos[i].alt;
        albumCover.appendChild(img);
        elementTag.appendChild(overlay);
        elementTag.appendChild(albumCover);

        gw.appendChild(elementTag);
        document.body.appendChild(gw);
    };

}




