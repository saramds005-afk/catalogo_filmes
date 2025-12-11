
const URL = 'https://rafaelescalfoni.github.io/desenv_web/filmes.json';


const lista = document.getElementById('lista');


function carregarFilmes() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', URL, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      const dados = JSON.parse(xhr.responseText);

      dados.forEach(filme => {
       
        const div = document.createElement('div');
        div.className = 'filme';

       
        const img = document.createElement('img');
        img.src = filme.figura;

       
        const titulo = document.createElement('div');
        titulo.className = 'titulo';
        titulo.textContent = filme.titulo;

        
        const resumo = document.createElement('div');
        resumo.className = 'resumo';
        resumo.textContent = filme.resumo;
    
        const classificaco = document.createElement('div');
        classificaco.className = 'classificacao';
        classificaco.textContent = `Classificação: ${filme.classificacao}`;

       const similares = document.createElement("div");
        similares.style.marginTop = "10px";

        if (Array.isArray(filme.titulosSemelhantes)) {
          const label = document.createElement("strong");
          label.textContent = "Títulos semelhantes:";
          similares.appendChild(label);

          const linha = document.createElement("div");
          linha.style.display = "flex";
          linha.style.gap = "10px";
          linha.style.marginTop = "8px";

          filme.titulosSemelhantes.forEach(ref => {
            let similar;

            if (typeof ref === "number") {
              // quando o JSON usa números
              similar = dados[ref];
            } else {
              // quando o JSON usa nomes
              similar = dados.find(f => f.titulo === ref);
            }

            if (similar) {
              const imgSim = document.createElement("img");
              imgSim.src = similar.figura;
              imgSim.alt = similar.titulo;
              imgSim.title = similar.titulo;

              imgSim.style.width = "60px";
              imgSim.style.height = "80px";
              imgSim.style.objectFit = "cover";
              imgSim.style.borderRadius = "6px";

              linha.appendChild(imgSim);
            }
          });

          similares.appendChild(linha);
        }

        div.appendChild(img);
        div.appendChild(titulo);
        div.appendChild(resumo);
        div.appendChild(classificaco);
        div.appendChild(similares);
        lista.appendChild(div);
      });
    }
  };

  xhr.send();
}
carregarFilmes();

