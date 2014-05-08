window.onload = function() {
	
	if (isInternetExplorer()) {
		document.getElementById('inpLocalArquivo').disabled = true;
	}
	
	//setando o tamanho máximo da div que recebe a imagem, afim de não criar barra de rolagem.
	document.getElementById('fsImagem').style.maxWidth = window.innerWidth + "px";
	document.getElementById('fsImagem').style.maxHeight = (window.innerHeight - 100) + "px";
	document.getElementById('fsImagem').style.height = (window.innerHeight - 100) + "px";
	
	//setando os eventos de click do mouse
	document.getElementById('imagem').onmousedown = startDrag;
	document.getElementById('imagem').onmouseup = stopDrag;
	
	//setando os eventos de zoom
	document.getElementById('btnZoomIn').onclick = fnZoomIn;
	document.getElementById('btnZoomOut').onclick = fnZoomOut;
	
	document.getElementById('inpUrlImagem').onclick = mostrarImagemPelaUrl;
	
	//ação executada ao selecionar alguma imagem
	document.getElementById('inpLocalArquivo').onchange = function() {
		if (this.files[0].type != 'image/png' && this.files[0].type != 'image/jpeg') {
			alert("São permitidas apenas as extensões 'png' e 'jpeg'");
			return;
		}
		
		mostrarImagem(this);
	};
};

function isInternetExplorer() {
    var navegador = navigator.appName.toLowerCase();
    
    if (navegador.indexOf("explorer") != -1) {
    	return true;
    }
    
    return false;
}

function mostrarImagem(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
	    reader.onload = function (e) {
			document.getElementById('imagem').src = e.target.result;
	    };
	    reader.readAsDataURL(input.files[0]);
	} else {
		var img = input.value;
		document.getElementById('imagem').src = img;
	}
	
	heightInicial = document.getElementById('imagem').height;
	widthInicial = document.getElementById('imagem').heigth;
	
	document.getElementById('btnZoomIn').disabled = false;
	document.getElementById('btnZoomOut').disabled = false;
}

function startDrag(mouseEvt) {
	var evento = mouseEvt;
	
	if (!evento) {
		evento = window.event;
	}
	
    if(evento.preventDefault) evento.preventDefault();

	var elemento = evento.target ? evento.target : evento.srcElement;

	if (elemento.id != 'imagem')
		return;
	
	//pega as coordenadas do ponteiro do mouse
	offsetX = evento.clientX;
	offsetY = evento.clientY;

	//inicializando valores
	if (!elemento.style.left) elemento.style.left='0px';
	if (!elemento.style.top) elemento.style.top='0px';

	
	coordX = parseInt(elemento.style.left);
	coordY = parseInt(elemento.style.top);
	
	drag = true;
	
	//evento de arrastar a imagem, definindo a posição
	document.onmousemove = definirPosicaoImagem;
	
    return false;
}

function definirPosicaoImagem(mouseEvt) {
	var evento = mouseEvt;
	
	if (!evento) {
		evento = window.event;
	}
	
	if (!drag) return;
	
	//elemento clicado
	var elemento = mouseEvt.target? evento.target : evento.srcElement;
	
	if (elemento.id != 'imagem')
		return;
	
	//nova posição será a posição inicial da imagem (coord) + posição em que o mouse 
	//se encontra (mouseEvt.client) - posição inicial do mouse (offset)
	elemento.style.left = coordX + evento.clientX - offsetX + 'px';
	elemento.style.top = coordY + evento.clientY- offsetY + 'px';
	
	return false;
}

function stopDrag() {
	drag = false;
}

function fnZoomIn() {
	document.getElementById('imagem').height = document.getElementById('imagem').height * 1.1;
	document.getElementById('imagem').width = document.getElementById('imagem').width * 1.1;
}

function fnZoomOut(evento) {
	document.getElementById('imagem').height = document.getElementById('imagem').height / 1.1;
	document.getElementById('imagem').width = document.getElementById('imagem').width / 1.1;
}

function mostrarImagemPelaUrl(evento) {
	var srcImagem = prompt('Insira a URL');
	
	//click cancelar
	if (srcImagem == null) return;
	
	if (srcImagem != '') {
		document.getElementById('imagem').src = srcImagem;
		document.getElementById('inpLocalArquivo').files = [];
	} else {
		alert("Insira uma Url valida!");
	}
}

function clickRadio(radio) {
	if (radio.value == 'local') {
		document.getElementById('inpLocalArquivo').style.display = 'block';
		document.getElementById('inpUrlImagem').style.display = 'none';
	} else {
		document.getElementById('inpUrlImagem').style.display = 'block';
		document.getElementById('inpLocalArquivo').style.display = 'none';
	}
		
}

//@ source=funcoes.js