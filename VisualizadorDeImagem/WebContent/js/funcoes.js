window.onload = function() {
	//setando o tamanho máximo da div que recebe a imagem, afim de não criar barra de rolagem.
	document.getElementById('divImagem').style.maxWidth = window.innerWidth + "px";
	document.getElementById('divImagem').style.maxHeight = (window.innerHeight - 20) + "px";
	
	//declarando os eventos do mouse para arrastar a imagem
	document.getElementById('imagem').onmousedown = startDrag;
	document.getElementById('imagem').onmouseup = stopDrag;
	
	//declarando o evento para carregar o arquivo
	document.getElementById('inpLocalArquivo').onchange = function() {
		if (this.files[0].type != 'image/png' && this.files[0].type != 'image/jpeg') {
			alert("São permitidas apenas as extensões 'png' e 'jpeg'");
			return;
		}
			
		mostrarImagem(this);
		this.style.display = 'none';
	};
};

function mostrarImagem(imagem) {
	var reader = new FileReader();
    reader.onload = function (e) {
		document.getElementById('imagem').src = e.target.result;
    };
    reader.readAsDataURL(imagem.files[0]);
}

function startDrag(evt) {
	// determine event object
	if (!evt) {
		var evt = window.event;
	}
	
    if(evt.preventDefault) evt.preventDefault();

	var elemento = evt.target ? evt.target : evt.srcElement;

	if (elemento.className != 'dragme')
		return;
	
	// calculate event X, Y coordinates
	offsetX = evt.clientX;
	offsetY = evt.clientY;

	// setando valores iniciais
	if (!elemento.style.left) elemento.style.left='0px';
	if (!elemento.style.top) elemento.style.top='0px';

	// calculate integer values for top and left 
	// properties
	coordX = parseInt(elemento.style.left);
	coordY = parseInt(elemento.style.top);
	
	areaHorizontal = document.body.clientWidth - elemento.clientWidth - 2;
    areaVertical = document.body.clientHeight - elemento.clientHeight - 2;

	drag = true;
	document.onmousemove = arrastarImagem;
	
    return false;
}

/**
 * Arrastar o elemento
 */
function arrastarImagem(e) {
	if (!drag) return;
	
	if (!e) var e = window.event;
	
	var targ = e.target? e.target : e.srcElement;
	
	//movendo o elemento
	targ.style.left = coordX + e.clientX - offsetX + 'px';
	targ.style.top = coordY + e.clientY- offsetY + 'px';
	return false;
}

function stopDrag() {
	drag=false;
}

/*############################

var objSelecionado = null;
var mouseOffset = null;
/*function addEvent(obj, evType, fn) {
    if (typeof obj == "string") {
        if (null == (obj = document.getElementById(obj))) {
            throw new Error("Elemento HTML não encontrado. Não foi possível adicionar o evento.");
        }
    }
    if (obj.attachEvent) {
        return obj.attachEvent(("on" + evType), fn);
    } else if (obj.addEventListener) {
        return obj.addEventListener(evType, fn, true);
    } else {
        throw new Error("Seu browser não suporta adição de eventos. Senta, chora e pega um navegador mais recente.");
    }
}
function mouseCoords(ev){
    if(typeof(ev.pageX)!=="undefined"){
        return {x:ev.pageX, y:ev.pageY};
    }else{
        return {
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y:ev.clientY + document.body.scrollTop  - document.body.clientTop
        };
    }
}
function getPosition(e, ev){
    var ev = ev || window.event;
    if(e.constructor==String){ e = document.getElementById(e);}
    var left = 0, top  = 0;
    var coords = mouseCoords(ev);    

    while (e.offsetParent){
        left += e.offsetLeft;
        top  += e.offsetTop;
        e     = e.offsetParent;
    }
    left += e.offsetLeft;
    top  += e.offsetTop;
    return {x: coords.x - left, y: coords.y - top};
}

function dragdrop(local_click, caixa_movida) {
    //local click indica quem é o cara que quando movido, move o caixa_movida
    if(local_click.constructor==String){ local_click = document.getElementById(local_click);}
    if(caixa_movida.constructor==String){ caixa_movida = document.getElementById(caixa_movida);}

    local_click.style.cursor = 'move';
    if(!caixa_movida.style.position || caixa_movida.style.position=='static'){
        caixa_movida.style.position='relative'
    }
    local_click.onmousedown = function(ev) {
        objSelecionado = caixa_movida;
        mouseOffset = getPosition(objSelecionado, ev);
        if(mouseOffset < 0){objSelecionado.style.margin = '50px';}
    };
    document.onmouseup = function() {
        objSelecionado = null;
    }
    document.onmousemove = function(ev) {
        if (objSelecionado) {
            var ev = ev || window.event;
            var mousePos = mouseCoords(ev);
            var pai = objSelecionado.parentNode;



            //as variáveis w e h definem a posição do(s) objeto(s) movido(s)

            var w = (mousePos.x - mouseOffset.x - pai.offsetLeft);
            var h = (mousePos.y - mouseOffset.y - pai.offsetTop);



            //as variáveis areaHorizontal e areaVertical definem a área maxima, onde o objeto será movido (nesse caso é a area maxima do browser)

            var areaHorizontal = document.body.clientWidth - objSelecionado.clientWidth - 2;
            var areaVertical = document.body.clientHeight - objSelecionado.clientHeight - 2;
            
            objSelecionado.style.left = w + 'px';
            objSelecionado.style.top = h + 'px';



            //essa é a estrutura de condição que reposiciona o objeto movido para não ultrapassar a área máxima
            if(w >= areaHorizontal){
                objSelecionado.style.left = areaHorizontal;
            }
            if(w <= 0){
                objSelecionado.style.left = 0;
            }
            if(h >= areaVertical){
                objSelecionado.style.top = areaVertical;
            }
            if(h <= 0){
                objSelecionado.style.top = 0;
            }



            objSelecionado.style.margin = '0px';
            return false;
        }
    }
}*/

//@ source=funcoes.js