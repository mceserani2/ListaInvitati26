const invitati = [];

function aggiungiInvitato(e) {
    e.preventDefault();
    let cognome = document.querySelector("#cognome").value.trim();
    let nome = document.querySelector("#nome").value.trim();
    let email = document.querySelector("#email").value.trim();
    const invitato = {
        "cognome": cognome,
        "nome": nome,
        "email": email,
        "confermato": false
    };
    invitati.push(invitato);
    popolaLista();
    formInvitati.reset();
}

const formInvitati = document.querySelector("#form_invitati");
formInvitati.addEventListener('submit', aggiungiInvitato);

const btn_ordina = document.querySelector("#btn-ordina");
btn_ordina.addEventListener('click', (event) => {
    invitati.sort((a,b) => {
        if (a.cognome < b.cognome){
            return -1;
        } else {
            if (a.cognome > b.cognome) {
                return 1;
            } else {
                if (a.nome < b.nome){
                    return -1;
                } else if (a.nome > b.nome){
                    return 1;
                } else {
                    return 0;
                }
            }
        }
    });
    popolaLista();
});

function popolaLista(){
    
    const list = document.querySelector('#lista_invitati');

    while(list.firstChild){
        list.removeChild(list.firstChild);
    }

    invitati.forEach((inv,pos) => {
        const select = document.querySelector("#filtro");
        const cerca = document.querySelector("#search").value.trim();
        if (!cerca || `${inv.cognome} ${inv.nome} ${inv.email}`.contains(cerca)){
            if (select.value === "tutti" || (select.value === "confermati" && inv.confermato) || (select.value === "non_confermati" && !inv.confermato)){
                const item = document.createElement('li');
                item.innerHTML = `${inv.cognome} ${inv.nome} - ${inv.email} <input type="checkbox"> <button>X</button>`;
                const chk = item.querySelector('input[type="checkbox"]');
                if (inv.confermato === true){
                    chk.checked = true;
                    item.classList.add('conf');
                    item.classList.remove('n_conf');
                } else {
                    chk.checked = false;
                    item.classList.add('n_conf');
                    item.classList.remove('conf');
                }
                chk.addEventListener('input',(event) => {
                    inv.confermato = chk.checked;
                    if (inv.confermato){
                        item.classList.add('conf');
                        item.classList.remove('n_conf');
                    } else {
                        item.classList.add('n_conf');
                        item.classList.remove('conf');
                    }            
                });
                const btn = item.querySelector('button');
                btn.addEventListener('click', (event) => {
                    invitati.splice(pos,1);
                    popolaLista();
                });
                list.appendChild(item);
            }
        }
    });

}

const select = document.querySelector("#filtro");
select.addEventListener('change',popolaLista);

const search = document.querySelector("#search");
search.addEventListener('change',popolaLista);